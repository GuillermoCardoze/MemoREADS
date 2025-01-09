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
        if session.get('user_id'):
            # Filter books by the current logged-in user
            books = Book.query.filter_by(user_id=session['user_id']).all()
            return [book.to_dict() for book in books], 200
        return {'error': '401 Unauthorized'}, 401

    def post(self):
        user_id = session.get('user_id')
        if user_id:

            request_json = request.get_json()

            title = request_json['title']
            rating = request_json['rating']
            author_id = request_json['author_id']
            genre_id = request_json['genre_id']

            try:
                book = Book(title=title,rating=rating,author_id=author_id,genre_id=genre_id, user_id=user_id)


                db.session.add(book)
                db.session.commit()
                return book.to_dict(),201
        
            except IntegrityError:

                return{'error': '422 Unprocessable Entity'}, 422
        return {'error': '401 Unauthorized'}, 401



api.add_resource(Books, '/books')

class BooksById(Resource):
    def get(self, id):
        if session.get('user_id'):
            books = Book.query.filter(Book.id==id).first()
            return [book.to_dict() for book in books],200

        return {'error': '401 Unauthorized'}, 401
    
    def patch(self, id):
        user_id = session.get('user_id')
        if user_id:

            request_json = request.get_json()

            title = request_json['title']
            rating = request_json['rating']

            try:
                book = Book.query.filter(Book.id==id).first()
                if book.user_id == session.get('user_id'):
                    book.title = title
                    book.rating = rating
                    
                    db.session.add(book)
                    db.session.commit()

                    response_dict = book.to_dict()
                    response = make_response(response_dict,202)
                    return response
            except IntegrityError:
                return {'error': '422 Unprocessable Entity'}, 422

        return {'error': '401 Unauthorized'}, 401


    def delete(self,id):
        if not session.get('user_id'):
            return {'error': '401 Unauthorized'}, 401

        book = Book.query.filter_by(id=id).first()
        if not book:
            return {'error': '404 Not Found'}, 404

        if book.user_id != session.get('user_id'):
            return {'error': '403 Forbidden'}, 403

        db.session.delete(book)
        db.session.commit()

        return {"message": "Item successfully deleted"}, 204

    
api.add_resource(BooksById, '/books/<int:id>')


class Authors(Resource):
    def get(self):
        if session.get('user_id'):
            authors = Author.query.all()

            return [author.to_dict() for author in authors], 200
        
        return {'error': '401 Unauthorized'}, 401    


    def post(self):
        user_id = session.get('user_id')
        if not user_id:
            return {'error': 'Unauthorized'}, 401

        # Get the author data from the request
        request_json = request.get_json()
        name = request_json.get('name')
        description = request_json.get('description')



        if not name or not description:
            return {'error': 'Name and description are required'}, 400

        # Check if the author already exists
        if Author.query.filter_by(name=name).first():
            return print({'error': 'Author already exists'}), 400
            

        # Create and save the new author
        try:
            # Instead of passing user_id directly, you create the author normally
            author = Author(name=name, description=description)
            # Associate the author with the logged-in user
            author.user = User.query.get(user_id)  # Associate the current user with the author

            db.session.add(author)
            db.session.commit()

            return author.to_dict(), 201

        except IntegrityError:
            db.session.rollback()
            return {'error': 'Unable to create author'}, 500


api.add_resource(Authors, "/authors")


class AuthorsById(Resource):
    def get(self, id):
        if session.get('user_id'):
            authors = Author.query.filter(Author.id==id).first()
            return [author.to_dict() for author in authors],200

        return {'error': '401 Unauthorized'}, 401


    def patch(self, id):
        user_id = session.get('user_id')
        if user_id:
            request_json = request.get_json()

            name= request_json['name']
            description= request_json['description']

            try:
                author = Author.query.filter(Author.id == id).first()
                if author.user_id == session.get('user_id'):
                    author.name= name
                    author.description= description

                    db.session.add(author)
                    db.session.commit()

                    response_dict = author.to_dict()
                    response = make_response(response_dict,202)
                    return response
            except IntegrityError:
                return {'error': '422 Unprocessable Entity'}, 422

        return {'error': '401 Unauthorized'}, 401
        
    def delete(self,id):
        if session.get('user_id'):
            author = Author.query.filter_by(id=id).first()
            if author.user_id == session.get('user_id'):
                db.session.delete(author)
                db.session.commit()

                response_dict = {"message": "author successfully deleted"}
                response = make_response(response_dict,204)
                return response
            return {'error': '401 Unauthorized'}, 401



api.add_resource(AuthorsById, "/authors/<int:id>")

class Genres(Resource):
    def get(self):
        if session.get('user_id'):
            genres = Genre.query.all()

            return [genre.to_dict() for genre in genres], 200
        
        return {'error': '401 Unauthorized'}, 401    
    
    def post(self):
        user_id = session.get('user_id')
        if not user_id:
            return {'error': 'Unauthorized'}, 401

        # Get the author data from the request
        request_json = request.get_json()
        name = request_json.get('name')
        description = request_json.get('description')



        if not name or not description:
            return {'error': 'Name and description are required'}, 400

        # Check if the author already exists
        if Genre.query.filter_by(name=name).first():
            return print({'error': 'Genre already exists'}), 400
            

        # Create and save the new genre
        try:
            # Instead of passing user_id directly, you create the genre normally
            genre = Genre(name=name, description=description)
            # Associate the genre with the logged-in user
            genre.user = User.query.get(user_id)  # Associate the current user with the genre

            db.session.add(genre)
            db.session.commit()

            return genre.to_dict(), 201

        except IntegrityError:
            db.session.rollback()
            return {'error': 'Unable to create genre'}, 500
        
api.add_resource(Genres, "/genres")

class GenresById(Resource):
    def get(self, id):
        if session.get('user_id'):
            genres = Genre.query.filter(Genre.id==id).first()
            return [genre.to_dict() for genre in genres],200

        return {'error': '401 Unauthorized'}, 401
    
    def patch(self, id):
        user_id = session.get('user_id')
        if user_id:
            request_json = request.get_json()
            name = request_json['name']
            description = request_json['description']

            try:
                genre = Genre.query.filter(Genre.id == id).first()
                if genre.user_id == session.get('user_id'):
                    genre.name = name
                    genre.description = description

                    db.session.add(genre)
                    db.session.commit()
                    response_dict = genre.to_dict()
                    response = make_response(response_dict,200)
                    return response
            except IntegrityError:
                return {'error': '422 Unprocessable Entity'}, 422

        return {'error': '401 Unauthorized'}, 401

        
    def delete(self,id):
        if session.get('user_id'):
            genre = Genre.query.filter_by(id=id).first()
            if genre.user_id == session.get('user_id'):
                db.session.delete(genre)
                db.session.commit()

                response_dict = {"message": "genre successfully deleted"}

                response = make_response(response_dict,204)
                return response
            return {'error': '401 Unauthorized'},401


api.add_resource(GenresById, "/genres/<int:id>")

class Signup(Resource):
    def post(self):
        form_json = request.get_json()

        user = User(
            username = form_json['username'],
            password = form_json['password'],
        )
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id
        print(session['user_id'])
        user_dict = user.to_dict()
        user_dict['books'] = []
        user_dict['authors'] = []
        user_dict['genres'] = []

        # return {'id': user.id, 'username': user.username}, 200
        return make_response(user_dict, 200)

api.add_resource(Signup, '/signup')

class Signin(Resource):
    def post(self):
        form_json = request.get_json()
        username = form_json["username"]
        password = form_json["password"]
        user = User.query.filter_by(username=username).first()
        if user and user.authenticate(password):
            session['user_id'] = user.id
            print(session['user_id'])
            user_dict = user.to_dict()
            user_dict['books'] = [
                {
                    "id": book.id,
                    "title": book.title,
                    "rating": book.rating,
                    "author": {
                        "id": book.author.id,
                        "name": book.author.name,
                        "description": book.author.description,
                    },
                    "genre": {
                        "id": book.genre.id,
                        "name": book.genre.name,
                        "description": book.genre.description,
                    },
                }
                for book in user.books
            ]
            user_authors = []
            for author in user.authors:
                auth = {
                        "id": author.id,
                        "name": author.name,
                        "description": author.description
                    }
                if auth not in user_authors:
                    # breakpoint()
                    
                    user_authors.append(auth)
            user_dict['authors'] = user_authors

            user_genres = []
            for genre in user.genres:
                gen = {
                        "id": genre.id,
                        "name": genre.name,
                        "description": genre.description
                    }
                if gen not in user_genres:
                    
                    user_genres.append(gen)
            user_dict['genres'] = user_genres

            # return {'id': user.id, 'username': user.username}, 200
            return make_response(user_dict, 200)
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
        user_id = session.get("user_id")
        if not user_id:
            return {}, 401

        # Retrieve the user
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return {}, 404

        # Structure response to include books with nested data
        user_dict = user.to_dict()
        user_dict['books'] = [
            {
                "id": book.id,
                "title": book.title,
                "rating": book.rating,
                "author": {
                    "id": book.author.id,
                    "name": book.author.name,
                    "description": book.author.description,
                },
                "genre": {
                    "id": book.genre.id,
                    "name": book.genre.name,
                    "description": book.genre.description,
                },
            }
            for book in user.books
        ]
        user_authors = []
        for author in user.authors:
            auth = {
                    "id": author.id,
                    "name": author.name,
                    "description": author.description
                }
            if auth not in user_authors:
                # breakpoint()
                
                user_authors.append(auth)
        user_dict['authors'] = user_authors

        user_genres = []
        for genre in user.genres:
            gen = {
                    "id": genre.id,
                    "name": genre.name,
                    "description": genre.description
                }
            if gen not in user_genres:
                
                user_genres.append(gen)
        user_dict['genres'] = user_genres
        
        return user_dict, 200
    
api.add_resource(CheckSession, '/check_session')

# @app.before_request
# def check_session():
#     print(session)
#     if session.get("user_id") is None:
#         session["user_id"] = None
#     else:
#         print("User is logged in")
#         print(session["user_id"])        


if __name__ == '__main__':
    app.run(port=5555, debug=True)