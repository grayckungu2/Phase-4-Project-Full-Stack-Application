from models.dbconfig import db

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    release_date = db.Column(db.Date, nullable=False)
    genre = db.Column(db.String(50), nullable=False)

    # One-to-Many relationship with reviews
    reviews = db.relationship('Review', back_populates='movie', lazy=True)

    # Many-to-Many relationship with users through UserMovie
    user_movies = db.relationship('UserMovie', back_populates='movie', lazy=True)

    # Many-to-One Relationship with User (creator relationship)
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    creator = db.relationship('User', back_populates='created_movies')
