#!/usr/bin/env python3
from flask_restful import Resource
from werkzeug.exceptions import NotFound
from flask import request, make_response, jsonify, abort, session, g
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
        if not books:
            return make_response({'message': 'No books found'}, 200)
        return make_response(books, 200)

    def post(self):
        if not request.is_json:
            return make_response({'error': 'Request must be JSON'}, 400)

        try:
            json = request.get_json()

            # Retrieve related entities
            author_id = json.get('author_id')
            genre_id = json.get('genre_id')
            user_id = json.get('user_id')

            if not author_id or not genre_id or not user_id:
                return make_response({'error': 'Missing author_id, genre_id, or user_id'}, 400)

            author = Author.query.get(author_id)
            genre = Genre.query.get(genre_id)
            user = User.query.get(user_id)

            if not author:
                return make_response({'error': 'Author not found'}, 404)
            if not genre:
                return make_response({'error': 'Genre not found'}, 404)
            if not user:
                return make_response({'error': 'User not found'}, 404)

            # Create the book
            book = Book(
                title=json['title'],
                rating=json['rating'],
                author=author,
                genre=genre,
                user=user
            )

            db.session.add(book)
            db.session.commit()

            return make_response(jsonify(book.to_dict()), 201)

        except KeyError as e:
            return make_response({'error': f'Missing key: {str(e)}'}, 400)
        except Exception as e:
            db.session.rollback()  # Rollback session on error
            return make_response({'error': 'Failed to create book', 'message': str(e)}, 500)

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
            abort(404, "The book was not found.")

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
            db.session.commit()
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
        
    def delete(self,id):
        author = Author.query.filter(Author.id==id).first()

        if not author :
            abort(404, "thr author was not found.")

        db.session.delete(author)
        db.session.commit()

        return {},204


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
            db.session.commit()
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
        
    def delete(self,id):
        genre = Genre.query.filter(Genre.id==id).first()

        if not genre:
            abort(404, "thr genre was not found.")

        db.session.delete(genre)
        db.session.commit()

        return {},204


api.add_resource(GenresById, "/genres/<int:id>")

class Signup(Resource):
    def post(self):
        form_json = request.get_json()

        new_user = User(
            username = form_json['username'],
            password = form_json['password'],
        )
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        print(session['user_id'])
        return make_response(
            new_user.to_dict(), 201)
api.add_resource(Signup, '/signup')

class Signin(Resource):
    def post(self):
        form_json = request.get_json()
        username = form_json["username"]
        password = form_json["password"]
        user = User.query.filter_by(username=username).first()
        if user and user.authenticate(password):
            session["user_id"] = user.id
            return make_response(user.to_dict(), 200)
        else:
            return make_response("Invalid Credentials", 401)
        
api.add_resource(Signin, '/signin')    

class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            session['user_id'] = None
            print(session['user_id'])
        return make_response({}, 204)
api.add_resource(Logout, '/logout')

class CheckSession(Resource):
    def get(self):
        user_id = session["user_id"]

        if user_id:
            user = User.query.filter(User.id==user_id).first()
            return user.to_dict(),200
        return {},401
    
api.add_resource(CheckSession, '/check_session')


@app.before_request
def check_session():
    print(session)
    if session.get("user_id") is None:
        session["user_id"] = None
    else:
        print("User is logged in")
        print(session["user_id"])        


if __name__ == '__main__':
    app.run(port=5555, debug=True)