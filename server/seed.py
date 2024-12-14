from app import app 
from models import db, User, Book, Author, Genre
from faker import Faker
from random import randint
faker = Faker()

if __name__ == '__main__':
    with app.app_context():
        print("Start Seeding")


  # Delete all existing data in the tables before seeding new data
        # db.session.query(Book).delete()
        # db.session.query(Author).delete()
        # db.session.query(Genre).delete()
        # db.session.query(User).delete()
        db.drop_all()
        db.create_all()


        # Commit the changes (deletes)
        db.session.commit()

        # Creating 3 Users
        user1 = User(username="memo", password="password")
        user2 = User(username="erin", password="password")
        user3 = User(username="ivy", password="password")
        
        db.session.add(user1)
        db.session.add(user2)
        db.session.add(user3)
        db.session.commit()
        print("Users seed complete")

        # Creating 2 Authors
        author1 = Author(name="J.K. Rowling", description="Author of the Harry Potter series.")
        author2 = Author(name="George R. R. Martin", description="Author of the A Song of Ice and Fire series.")
        
        db.session.add(author1)
        db.session.add(author2)
        db.session.commit()
        print("Authors seed complete")

        # Creating 2 Genres
        genre1 = Genre(name="Fantasy", description="A genre of speculative fiction that uses magic or other supernatural phenomena as a primary plot element.")
        genre2 = Genre(name="Science Fiction", description="A genre that deals with futuristic technology, space exploration, time travel, and other speculative concepts.")
        
        db.session.add(genre1)
        db.session.add(genre2)
        db.session.commit()
        print("Genre seed complete")

        # Creating 3 Books and associating them with authors, genres, and users
        book1 = Book(title="Harry Potter and the Sorcerer's Stone", rating=5, author_id=author1.id, genre_id=genre1.id, user_id=user1.id)
        book2 = Book(title="A Game of Thrones", rating=4, author_id=author2.id, genre_id=genre1.id, user_id=user2.id)
        book3 = Book(title="The Martian", rating=4, author_id=author1.id, genre_id=genre2.id, user_id=user3.id)
        
        db.session.add(book1)
        db.session.add(book2)
        db.session.add(book3)
        db.session.commit()
        print("Books seed complete")

        print("Seeding complete.")