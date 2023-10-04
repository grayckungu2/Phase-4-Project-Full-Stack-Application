
from models.dbconfig import db

class UserMovie(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'), nullable=False)
    favorite = db.Column(db.Boolean, default=False)
    watched = db.Column(db.Boolean, default=False)
    user_rating = db.Column(db.Integer)

    # Many-to-One relationship with User
    user = db.relationship('User', back_populates='user_movies')

    # Many-to-One relationship with Movie
    movie = db.relationship('Movie', back_populates='user_movies')
