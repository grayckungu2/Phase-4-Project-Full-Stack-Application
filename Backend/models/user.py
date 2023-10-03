from models.dbconfig import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(25), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    # One-to-Many Relationship with Reviews
    reviews = db.relationship('Review', back_populates='author', lazy=True)

    # One-to-Many Relationship with Movies (creator relationship)
    created_movies = db.relationship('Movie', back_populates='creator', lazy=True)

    # One-to-Many Relationship with UserMovies (user_movies relationship)
    user_movies = db.relationship('UserMovie', back_populates='user', lazy=True)
