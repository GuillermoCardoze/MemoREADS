from sqlalchemy_serializer import SerializerMixin
import re
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, flask_bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates


class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer)
    author_id = db.Column(db.Integer, db.ForeignKey('authors.id'), nullable=False)
    genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relationships to Author, Genre, and User
    author = db.relationship('Author', back_populates='books')
    genre = db.relationship('Genre', back_populates='books')
    user = db.relationship('User', back_populates='books')

    # Serialization rules
    serialize_rules = ('-author.books', '-genre.books', '-user.books')  

    @validates('title')
    def validate_title(self, key, title):
        if not title or not isinstance(title, str):
            raise ValueError('Title must be a non-empty string')
        if len(title) > 255:
            raise ValueError('Title cannot exceed 255 characters')
        return title

    @validates('rating')
    def validate_rating(self, key, rating):
        if rating is not None and (not isinstance(rating, int) or rating < 0 or rating > 5):
            raise ValueError('Rating must be an integer between 0 and 5')
        return rating

    def __repr__(self):
        return (f'<Book ID:{self.id}, Title:{self.title}, Rating:{self.rating}, '
                f'AuthorID:{self.author_id}, GenreID:{self.genre_id}, UserID:{self.user_id}>')


class Author(db.Model, SerializerMixin):
    __tablename__ = 'authors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)

    # Relationship to Book
    books = db.relationship('Book', back_populates='author', cascade='all, delete-orphan')

    # Serialization rules
    serialize_rules = ('-books.author',)  

    @validates('name')
    def validate_name(self, key, name):
        if not name or not isinstance(name, str):
            raise ValueError('Author name must be a non-empty string')
        if len(name) > 100:
            raise ValueError('Author name cannot exceed 100 characters')
        return name

    @validates('description')
    def validate_description(self, key, description):
        if not description or not isinstance(description, str):
            raise ValueError('Description must be a non-empty string')
        if len(description) > 500:
            raise ValueError('Description cannot exceed 500 characters')
        return description

    def __repr__(self):
        return f'<Author Name:{self.name}, Description:{self.description}, ID:{self.id}>'


class Genre(db.Model, SerializerMixin):
    __tablename__ = 'genres'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)

    # Relationship to Book
    books = db.relationship('Book', back_populates='genre', cascade='all, delete-orphan')

    # Serialization rules
    serialize_rules = ('-books.genre',)  

    @validates('name')
    def validate_name(self, key, name):
        if not name or not isinstance(name, str):
            raise ValueError('Genre name must be a non-empty string')
        if len(name) > 100:
            raise ValueError('Genre name cannot exceed 100 characters')
        return name

    @validates('description')
    def validate_description(self, key, description):
        if not description or not isinstance(description, str):
            raise ValueError('Description must be a non-empty string')
        if len(description) > 500:
            raise ValueError('Description cannot exceed 500 characters')
        return description

    def __repr__(self):
        return f'<Genre Name:{self.name}, Description:{self.description}, ID:{self.id}>'


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column("password_hash", db.String)


    # Relationship to Book
    books = db.relationship('Book', back_populates='user', cascade='all, delete-orphan')

    # Serialization rules
    serialize_rules = ('-books.user', '-password_hash')  

    @validates("username")
    def validate_username(self, key, username):
        if not re.match(r"^[a-zA-Z0-9_]+$", username):
            raise ValueError("Username must be alphanumeric with underscores only")
        return username
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash

    #6.2 Create a setter method to set the password using bcrypt
    @password_hash.setter
    def password(self, password):
        password_hash = flask_bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    #6.3 Create an authentication method to check the password using bcrypt
    def authenticate(self,password):
        return flask_bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))







    # @hybrid_property
    # def password(self):
    #     raise AttributeError('Passwords are private, set-only')

    # @password.setter
    # def password(self, password_to_validate):
    #     if not isinstance(password_to_validate, str):
    #         raise TypeError('Password must be a string')
    #     if len(password_to_validate) < 8:
    #         raise ValueError('Password must be at least 8 characters long')
    #     hashed_password = flask_bcrypt.generate_password_hash(password_to_validate).decode("utf-8")
    #     self._password_hash = hashed_password

    # def authenticate(self, password_to_check):
    #     return flask_bcrypt.check_password_hash(self._password_hash, password_to_check)

    # def __repr__(self):
    #     return f'User #{self.id}: {self.username}'