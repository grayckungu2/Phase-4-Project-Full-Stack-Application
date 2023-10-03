from models.dbconfig import db
from datetime import datetime

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    rating = db.Column(db.Integer, nullable=False)
    review_text = db.Column(db.Text, nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Many-to-One relationship with User
    author = db.relationship('User', back_populates='reviews')

    # Many-to-One relationship with Movie
    movie = db.relationship('Movie', back_populates='reviews')
