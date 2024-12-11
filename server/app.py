#!/usr/bin/env python3
from flask_restful import Resource
from werkzeug.exceptions import NotFound
from flask import request, make_response, jsonify
# Local imports
from config import app, db, api
# Add your model imports
from models import Book, Author, Genre, User

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

                

if __name__ == '__main__':
    app.run(port=5555, debug=True)

