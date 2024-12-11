from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, flask_bcrypt
from sqlalchemy.ext.hybrid import hybrid_property


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

    # # Association proxies
    # author_name = association_proxy('author', 'name')  # Proxy to access author.name
    # genre_name = association_proxy('genre', 'name')    # Proxy to access genre.name
    # username = association_proxy('user', 'username')   # Proxy to access user.username

    # Serialization rules
    serialize_rules = ('-author.books', '-genre.books', '-user.books')  

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

    def __repr__(self):
        return f'<Genre Name:{self.name}, Description:{self.description}, ID:{self.id}>'


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, index=True)
    _password_hash = db.Column("password_hash", db.String)

    # Relationship to Book
    books = db.relationship('Book', back_populates='user', cascade='all, delete-orphan')

    # Serialization rules
    serialize_rules = ('-books.user', '-password_hash')  

    def __repr__(self):
        return f'User #{self.id}: {self.username}'
    
    @hybrid_property ##hybrid use for objects and a column for query. both object and database.
    def password(self):
        raise AttributeError('Passwords are private, set-only')

    @password.setter
    def password(self, password_to_validate):
        if not isinstance(password_to_validate, str):
            raise TypeError('password must be a string')
        if len(password_to_validate) < 8:
            raise ValueError('password must be a string with at least 8 characters')
        hashed_password = flask_bcrypt.generate_password_hash(password_to_validate).decode("utf-8")
        self._password_hash = hashed_password

    def authenticate(self, password_to_check):
        return flask_bcrypt.check_password_hash(self._password_hash, password_to_check)
        