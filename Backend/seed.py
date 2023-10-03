from faker import Faker
from models.dbconfig import db
from models.user import User
from models.movie import Movie
from models.review import Review
from models.usermovie import UserMovie
from app import app

fake = Faker()

# C application context
app.app_context().push()

# D function to seed user data
def seed_users(num_users):
    for _ in range(num_users):
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            password=fake.password(),
        )
        db.session.add(user)
    db.session.commit()
#function to seed movie data
def seed_movies(num_movies):
    for _ in range(num_movies):
        movie = Movie(
            title=fake.catch_phrase(),
            release_date=fake.date_this_decade(),
            genre=fake.word(),
            creator_id=fake.random_element(User.query.all()).id  
        )
        db.session.add(movie)
    db.session.commit()
# function to seed review data
def seed_reviews(num_reviews):
    for _ in range(num_reviews):
        review = Review(
            rating=fake.random_int(min=1, max=5),
            review_text=fake.text(),
            movie_id=fake.random_element(Movie.query.all()).id,
            user_id=fake.random_element(User.query.all()).id,
        )
        db.session.add(review)
    db.session.commit()

# function to seed user movie data
def seed_user_movies(num_user_movies):
    for _ in range(num_user_movies):
        user_movie = UserMovie(
            user_id=fake.random_element(User.query.all()).id,
            movie_id=fake.random_element(Movie.query.all()).id,
            favorite=fake.boolean(chance_of_getting_true=50),
            watched=fake.boolean(chance_of_getting_true=50),
            user_rating=fake.random_int(min=1, max=5, step=1),
        )
        db.session.add(user_movie)
    db.session.commit()

if __name__ == '__main__':
    num_users = 10  
    num_movies = 20  
    num_reviews = 50  
    num_user_movies = 30  

    seed_users(num_users)
    seed_movies(num_movies)
    seed_reviews(num_reviews)
    seed_user_movies(num_user_movies)

    print("Seed data has been successfully added to the database.")
