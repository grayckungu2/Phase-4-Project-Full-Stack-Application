from .dbconfig import db
from datetime import datetime

class Review(db.Model):
    # Primary Key
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    rating = db.Column(db.Integer, nullable=False)
    review_text = db.Column(db.Text, nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    # Foreign Key 
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Many-to-one relationship with Movie
    movie = db.relationship('Movie', backref='reviews', lazy=True)
    # Many-to-one relationship with User
    user = db.relationship('User', backref='user_reviews', lazy=True)
