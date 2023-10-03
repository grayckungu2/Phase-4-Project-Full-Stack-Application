from .dbconfig import db

class User(db.Model):
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(25), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    # One-to-Many Relationship
    reviews = db.relationship('Review', backref='author', lazy=True)
    # One-to-Many Relationship
    movies = db.relationship('Movie', backref='creator', lazy=True)
