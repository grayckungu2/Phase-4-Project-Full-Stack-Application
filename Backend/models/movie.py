from .dbconfig import db
from datetime import datetime

class Movie(db.Model):
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    release_date = db.Column(db.Date, nullable=False)
    genre = db.Column(db.String(50), nullable=False)
    # One-to-many relationship with reviews
    reviews = db.relationship('Review', backref='movie', lazy=True)
    # Many-to-many relationship with users through UserMovie
    user_movies = db.relationship('UserMovie', backref='movie', lazy=True)
