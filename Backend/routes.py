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
from flask_bcrypt import Bcrypt

# create_app function
def create_app():
    app = Flask(__name__)
    app.secret_key = 'your_secret_key'
    CORS(app)

    # Initialize database
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLAlchemyConfig.SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLAlchemyConfig.SQLALCHEMY_TRACK_MODIFICATIONS
    db.init_app(app)
    bcrypt = Bcrypt(app)



    # Define the RegistrationForm
    class RegistrationForm(FlaskForm):
        username = StringField('Username', [validators.Length(min=4, max=25)])
        email = StringField('Email Address', [validators.Length(min=6, max=35), validators.Email()])
        password = PasswordField('New Password', [
            validators.DataRequired(),
            validators.EqualTo('confirm', message='Passwords must match')
        ])
        confirm = PasswordField('Repeat Password')

    # Define the LoginForm
    class LoginForm(FlaskForm):
        username = StringField('Username', [validators.DataRequired()])
        password = PasswordField('Password', [validators.DataRequired()])

    # Sample request hook
    @app.before_request
    def app_path():
        g.path = os.path.abspath(os.getcwd())

    # Combined registration and login route
    @app.route('/register-login', methods=['GET', 'POST'])
    def register_login():
        register_form = RegistrationForm(request.form)
        login_form = LoginForm(request.form)

        if request.method == 'POST':
            if 'register' in request.form:
                if register_form.validate():
                    username = register_form.username.data
                    email = register_form.email.data
                    password = bcrypt.generate_password_hash(register_form.password.data).decode('utf-8')

                    # Create a new user and add it to the database
                    new_user = User(username=username, email=email, password=password)
                    db.session.add(new_user)
                    db.session.commit()

                    flash('Thanks for registering')
                    return redirect(url_for('login'))
                else:
                    flash('Registration form validation failed.')

            elif 'login' in request.form:
                if login_form.validate():
                    username = login_form.username.data
                    password = login_form.password.data

                    user = User.query.filter_by(username=username).first()
                    if user and bcrypt.check_password_hash(user.password, password):
                        flash('Logged in successfully')
                        return redirect(url_for('dashboard'))
                    else:
                        flash('Invalid username or password')
                else:
                    flash('Login form validation failed.')

        return render_template('register_login.html', register_form=register_form, login_form=login_form)




    # REST API routes for movies and reviews

    @app.route('/movies/<int:movie_id>/reviews', methods=['POST'])
    def create_review(movie_id):
        data = request.json
        user_id = data['user_id']
        rating = data['rating']
        review_text = data['review_text']

        movie = Movie.query.get(movie_id)
        if movie is None:
            return jsonify({'message': 'Movie not found'}), 404

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

    @app.route('/users', methods=['GET'])
    def get_all_users():
        try:
            # Query all user records from the database
            users = User.query.all()

            # Convert the user objects to a list of dictionaries
            user_list = []
            for user in users:
                user_data = {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'password': user.password
                }
                user_list.append(user_data)

            # Return the list of users as JSON
            return jsonify({'users': user_list})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

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

    @app.route('/movies', methods=['POST'])
    def create_movie():
        data = request.json
        title = data['title']
        release_date_str = data['release_date']
        genre = data['genre']
        creator_id = data['creator_id']

        release_date = datetime.strptime(release_date_str, '%Y-%m-%d').date()

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

    @app.route('/usermovies', methods=['POST'])
    def create_user_movie():
        data = request.json
        user_id = data['user_id']
        movie_id = data['movie_id']
        favorite = data.get('favorite', False)
        watched = data.get('watched', False)
        user_rating = data.get('user_rating', None)

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


 