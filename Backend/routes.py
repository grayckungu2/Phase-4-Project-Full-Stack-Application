
from flask import Flask, request, jsonify, render_template, redirect, url_for, flash, g
from flask_cors import CORS
from models.movie import Movie
from models.review import Review
from models.usermovie import UserMovie
from models.user import User
import os
from models.dbconfig import db
from config import SQLAlchemyConfig
from datetime import datetime
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, validators
from wtforms.validators import DataRequired, Length, EqualTo, Email


def create_app():
    app = Flask(__name__)
    app.secret_key = 'your_secret_key'
    CORS(app)

    # Initialize database
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLAlchemyConfig.SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLAlchemyConfig.SQLALCHEMY_TRACK_MODIFICATIONS
    db.init_app(app)

    # Sample request hook
    @app.before_request
    def app_path():
        g.path = os.path.abspath(os.getcwd())

    

    # Define RegistrationForm
    class RegistrationForm(FlaskForm):
        username = StringField('Username', [validators.Length(min=4, max=25)])
        email = StringField('Email Address', [validators.Length(min=6, max=35), Email()])
        password = PasswordField('New Password', [
            validators.DataRequired(),
            validators.EqualTo('confirm', message='Passwords must match')
        ])
        confirm = PasswordField('Repeat Password')
        accept_tos = StringField('I accept the TOS', [validators.DataRequired()])

    # Define LoginForm
    class LoginForm(FlaskForm):
        username = StringField('Username', [validators.DataRequired()])
        password = PasswordField('Password', [validators.DataRequired()])

    # Registration route
    @app.route('/register', methods=['GET', 'POST'])
    def register():
        form = RegistrationForm(request.form)
        if request.method == 'POST' and form.validate():
            #
            flash('Thanks for registering')
            return redirect(url_for('login'))
        return render_template('register.html', form=form)

    # Login route
    @app.route('/login', methods=['GET', 'POST'])
    def login():
        form = LoginForm(request.form)
        if request.method == 'POST' and form.validate():
            #  typically authenticate the user (check credentials)
            flash('Logged in successfully')
            return redirect(url_for('dashboard'))
        return render_template('login.html', form=form)

    @app.route('/dashboard')
    def dashboard():
        return 'Welcome to the MovieReview'

    # REST API routes for movies and reviews           


    @app.route('/movies/<int:movie_id>/reviews', methods=['POST'])
    def create_review(movie_id):
        data = request.json
        user_id = data['user_id']
        rating = data['rating']
        review_text = data['review_text']

        # Check if the movie exists
        movie = Movie.query.get(movie_id)
        if movie is None:
            return jsonify({'message': 'Movie not found'}), 404
        # Create a new review
        review = Review(movie_id=movie_id, user_id=user_id, rating=rating, review_text=review_text)
        db.session.add(review)
        db.session.commit()

        return jsonify({'message': 'Review created successfully'}), 201

    @app.route('/movies/<int:movie_id>/reviews', methods=['GET'])
    def get_reviews(movie_id):
        reviews = Review.query.filter_by(movie_id=movie_id).all()

        if not reviews:
            return jsonify({'message': 'No reviews found for this movie'}), 404

        review_data = []
        for review in reviews:
            review_data.append({
                'id': review.id,
                'user_id': review.user_id,
                'rating': review.rating,
                'review_text': review.review_text,
                'date_created': review.date_created
            })

        return jsonify({'reviews': review_data}), 200

    @app.route('/reviews', methods=['GET'])
    def get_all_reviews():
        reviews = Review.query.all()

        review_data = []
        for review in reviews:
            review_data.append({
                'id': review.id,
                'user_id': review.user_id,
                'rating': review.rating,
                'review_text': review.review_text,
                'date_created': review.date_created
            })

        return jsonify({'reviews': review_data}), 200

    @app.route('/reviews/<int:review_id>', methods=['PUT'])
    def update_review(review_id):
        data = request.json
        new_rating = data['rating']
        new_review_text = data['review_text']

        review = Review.query.get(review_id)

        if review is None:
            return jsonify({'message': 'Review not found'}), 404

        review.rating = new_rating
        review.review_text = new_review_text
        db.session.commit()

        return jsonify({'message': 'Review updated successfully'}), 200

    @app.route('/reviews/<int:review_id>', methods=['DELETE'])
    def delete_review(review_id):
        review = Review.query.get(review_id)

        if review is None:
            return jsonify({'message': 'Review not found'}), 404

        db.session.delete(review)
        db.session.commit()

        return jsonify({'message': 'Review deleted successfully'}), 200

    # Create a new user
    @app.route('/users', methods=['POST'])
    def create_user():
        data = request.json
        username = data['username']
        email = data['email']
        password = data['password']

        # Check if the user already exists
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({'message': 'Username already exists'}), 400

        # Create a new user
        user = User(username=username, email=email, password=password)
        db.session.add(user)
        db.session.commit()

        return jsonify({'message': 'User created successfully'}), 201

    # Get user information by ID
    @app.route('/users/<int:user_id>', methods=['GET'])
    def get_user(user_id):
        user = User.query.get(user_id)

        if user is None:
            return jsonify({'message': 'User not found'}), 404

        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email
        }

        return jsonify({'user': user_data}), 200

    # Create a new movie
    @app.route('/movies', methods=['POST'])
    def create_movie():
        data = request.json
        title = data['title']
        release_date_str = data['release_date']  
        genre = data['genre']
        creator_id = data['creator_id']

        # Convert release_date string to a Python date object
        release_date = datetime.strptime(release_date_str, '%Y-%m-%d').date()

        # Create a new movie listing
        movie = Movie(
            title=title,
            release_date=release_date,
            genre=genre,
            creator_id=creator_id
        )

        try:
            db.session.add(movie)
            db.session.commit()
            return jsonify({'message': 'Movie listing created successfully'}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': 'Error creating movie listing', 'error': str(e)}), 500

    # Get a list of all available movies
    @app.route('/movies', methods=['GET'])
    def get_all_movies():
        movies = Movie.query.all()

        movie_data = []
        for movie in movies:
            movie_data.append({
                'id': movie.id,
                'title': movie.title,
                'release_date': movie.release_date.strftime('%Y-%m-%d'),
                'genre': movie.genre,
                'creator_id': movie.creator_id
            })

        return jsonify({'movies': movie_data}), 200

    # Create a new user movie entry
    @app.route('/usermovies', methods=['POST'])
    def create_user_movie():
        data = request.json
        user_id = data['user_id']
        movie_id = data['movie_id']
        favorite = data.get('favorite', False)
        watched = data.get('watched', False)
        user_rating = data.get('user_rating', None)

        # Create a new user movie entry
        user_movie = UserMovie(
            user_id=user_id,
            movie_id=movie_id,
            favorite=favorite,
            watched=watched,
            user_rating=user_rating
        )
        db.session.add(user_movie)
        db.session.commit()

        return jsonify({'message': 'User movie entry created successfully'}), 201

    # Get all user movie entries
    @app.route('/usermovies', methods=['GET'])
    def get_all_user_movies():
        user_movies = UserMovie.query.all()

        user_movie_data = []
        for user_movie in user_movies:
            user_movie_data.append({
                'id': user_movie.id,
                'user_id': user_movie.user_id,
                'movie_id': user_movie.movie_id,
                'favorite': user_movie.favorite,
                'watched': user_movie.watched,
                'user_rating': user_movie.user_rating
            })

        return jsonify({'user_movies': user_movie_data}), 200

    return app
