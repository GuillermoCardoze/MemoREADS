
# MemoReads

A simple personal booklist where the user can create an author, genre, and book, to put on their list and rate once read.


## Tech Used

- Python 3.8+
- Flask: A lightweight WSGI web application framework
- Flask-SQLAlchemy: A SQL toolkit for Python
- Flask-RESTful: An extension for Flask that adds support for quickly building REST APIs
- Flask-Migrate: A SQLAlchemy database migration framework
- Flask-CORS: A Flask extension for handling - Cross-Origin Resource Sharing (CORS)
- SQLAlchemy: SQL toolkit and - Object-Relational Mapping (ORM)
- Faker: A library for generating fake data
- Alembic: A lightweight database migration tool for SQLAlchemy
- IPDB: Python debugger
- React: A JavaScript library for building user interfaces
- Redux-Thunk: A middleware for Redux that allows you to write action creators that return a function instead of an action object.


## Installation

Clone this repository:


```bash
  https://github.com/GuillermoCardoze/MemoREADS
  cd MemoREADS
```

## Install the required dependencies:


```bash
  pipenv install && pipenv shell
```
    
## Start up server:
```
    cd server
    export FLASK_APP=app.py
    export FLASK_RUN_PORT=5555
    flask db migrate
    python seed.py
    flask run
```

## Navigate to the client directory and install the dependencies and start client application:
```
    cd client
    npm install && npm start 
```


## API Reference

### User Model
- /check_session - checks if a user is in session.
- /logout - deletes the users session
- /signin - posts a new session of the current user
- /signup - posts a new user to the database

### Book Model
- /books - get and posts books only of the user in session
- /books/<int:id> - gets and patches a single book of the user in session so that it can update or delete

### Author Route
- /authors - get and posts authors only of the user in session


### Genre Route
- /genres - get and posts genres only of the user in session


## Contributing

Contributions are always welcome!

If you'd like to contribute to this project, feel free to fork the repository, make your changes, and submit a pull request. Please make sure to follow the code style and add tests for any new features.

