#!/usr/bin/env python3
from flask_restful import Resource, session
from werkzeug.exceptions import NotFound
from flask import request, make_response, jsonify, abort
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
# Add your model imports
from models import Book, Author, Genre, User

@app.errorhandler(NotFound)
def not_found(error):
    return {"error": error.description}, 404


class Books(Resource):
    def get(self):
        books = [book.to_dict() for book in Book.query.all()]
        return make_response(books, 200)

    def post(self):
        try:
            json = request.get_json()
            author = Author.query.get(json['author_id'])
            genre = Genre.query.get(json['genre_id'])
            user = User.query.get(json['user_id'])

            if not author or not genre or not user:
                return make_response({'error': 'Author, Genre, or User not found'}, 404)

            book = Book(
                title = json(['title']),
                rating = json(['rating']),
                author = author,
                genre = genre,
                user = user
            )

            db.session.add(book)
            db.session.commit()

            return make_response(jsonify(book.to_dict()), 201)
        except KeyError as e:
            return make_response({'error': f'Missing key: {str(e)}'},400)
        except Exception as e:
            return make_response({'error': 'Failed to create book', 'message':str(e)},500)

api.add_resource(Books, '/books')

class BooksById(Resource):
    def get(self, id):
        books = Book.query.filter(Book.id==id).first()

        if not books:
            abort(404, "The book was not found.")

        return books.to_dict(),200
    
    def patch(self, id):
        books = Book.query.filter(Book.id==id).first()

        if not books:
            abort(404, "The book was not found.")

        data = request.get_json()

        for key in data:
            setattr(books, key, data[key])

        db.session.add(books)
        db.session.commit()
        return books.to_dict(),202 

    def delete(self,id):
        book = Book.query.filter(Book.id==id).first()

        if not book:
            abort(404, "thr book was not found.")

        db.session.delete(book)
        db.session.commit()

        return {},204
    
api.add_resource(BooksById, '/books/<int:id>')


class Authors(Resource):
    def get(self):
        authors = [author.to_dict() for author in Author.query.all()]
        return make_response(authors,200)
    
    def post(self):
        json = request.get_json()
        try:
            new_author = Author(
                name = json['name'],
                description = json['description']
            )
            db.session.add(new_author)
            db.commit()
            return make_response(new_author.to_dict(), 201)
        
        except ValueError as e:
            return {'errors': str(e)}, 400
        except Exception as e:
            return {'errors': "Failed to add author to database", 'message': str(e)},500

api.add_resource(Authors, "/authors")

class AuthorsById(Resource):
    def get(self, id):
        authors = Author.query.filter(Author.id==id).first()
        return make_response(authors.to_dict(),200)

    def patch(self, id):
        json = request.get_json()
        author = Author.query.filter(Author.id==id).first()

        if author:
            if not json.get('name') or not json.get('description'):
                return make_response({'error': "All fields (name, description) are required"},400)

            try:
                author.name = json['name']
                author.description = json['description']

                db.session.commit()
                return make_response(author.to_dict(), 202)
            except Exception as e:
                return make_response({'errors': "Failed to update author", "message": str(e)},400)
        else:
            return make_response({'error': "Author not found"},404)

api.add_resource(AuthorsById, "/authors/<int:id>")

class Genres(Resource):
    def get(self):
        genres = [genre.to_dict() for genre in Genre.query.all()]
        return make_response(genres,200)
    
    def post(self):
        try:
            json = request.get_json()
            new_genre = Genre(
                name = json['name'],
                description = json['description']
            )
            db.session.add(new_genre)
            db.commit()
            return make_response(new_genre.to_dict(), 201)
        except ValueError as e:
            return {'errors': str(e)}, 400
        except Exception as e:
            return {'errors': "Failed to add genre to database", 'message': str(e)},500

api.add_resource(Genres, "/genres")

class GenresById(Resource):
    def get(self, id):
        genres = Genre.query.filter(Genre.id==id).first()
        return make_response(genres.to_dict(),200)
    
    def patch(self, id):
        json = request.get_json()
        genre = Genre.query.filter(Genre.id==id).first()

        if genre:
            if not json.get('name') or not json.get('description'):
                return make_response({'error': "All fields (name, description) are required"},400)

            try:
                genre.name = json['name']
                genre.description = json['description']

                db.session.commit()
                return make_response(genre.to_dict(), 202)
            except Exception as e:
                return make_response({'errors': "Failed to update genre", "message": str(e)},400)
        else:
            return make_response({'error': "Genre not found"},404)

api.add_resource(GenresById, "/genres/<int:id>")
        



class CurrentUser(Resource):
    def get(self):
        try:
            if "user_id" in session:
                if user := db.session.get(User, session["user_id"]):
                    return make_response(user.to_dict(), 200)
                del session["user_id"]
                return make_response({"error": "Unauthorized, user_id in session does not exist, it has been removed"}, 401)
            return make_response({"error": "Unauthorized, please login!"}, 401)
        except Exception as e:
            return make_response({"error": str(e)}, 422)
        
api.add_resource(CurrentUser, "/current-user")
        
class Login(Resource):
    def post(self):
        try:
            #! 1. Get the data through the request context
            data = request.json
            #! Check that you can find a user by that email AND that the password matches
            user = User.query.filter_by(username=data.get("username", "")).first()
            if user and user.authenticate(data.get("password", "")):
                #! if so, you can login the user (aka store their id in the session)
                session["user_id"] = user.id #! THIS IS HOW WE LOGIN
                return make_response(user.to_dict(), 200)
            else:
                return make_response({"error": "Invalid Credentials"}, 401)
        except Exception as e:
            return make_response({"error": str(e)}, 400)
        
api.add_resource(Login, "/login")

        
class Logout(Resource):
    def delete(self):
        try:
            response = make_response({}, 204)
            #! 1. if no one is logged in, there is no one to logout
            #! 2. but if we do, then we need to remove their traces from the session
            if "user_id" in session:
                del session["user_id"]
            response.delete_cookie("session")
            return response
        except Exception as e:
            return make_response({"error": str(e)}, 422)
        
api.add_resource(Logout, "/logout")

        
class Signup(Resource):
    def post(self):
        #! 1. extract the data out of the request (username, email, psswd)
        #! 2. Instantiate a user with the info above
        #! 3. db.session.add(user)
        #! 4. db.session.commit()
        #! 5. NOW set the user_id in session
        try:
            data = request.json
            user = User(username=data.get("username"))
            user.password = data.get("password")
            db.session.add(user)
            db.session.commit()
            session["user_id"] = user.id
            return make_response(user.to_dict(), 201)
        except IntegrityError as e:
            return make_response({"error": str(e.orig)}, 422)
        except Exception as e:
            return make_response({"error": str(e)}, 422)
        
api.add_resource(Signup, "/signup")


                

if __name__ == '__main__':
    app.run(port=5555, debug=True)

