from flask import Flask, request, jsonify, g
from flask_cors import CORS
from models.movie import Movie
from models.review import Review
from models.usermovie import UserMovie
from models.user import User
import os
from models.dbconfig import db
from config import CloudinaryConfig, SQLAlchemyConfig  # Correct import

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Initialize database
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLAlchemyConfig.SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLAlchemyConfig.SQLALCHEMY_TRACK_MODIFICATIONS
    db.init_app(app)

    # Sample request hook
    @app.before_request
    def app_path():
        g.path = os.path.abspath(os.getcwd())

    # Define your routes for movies, reviews, and users here

    return app
