### full stack  application 
# Movie review application 
# user stories for our movie review system:

**MVP User Stories:**

1. As a user, I can sign up for an account.
2. As a user, I can log in to the site and remain logged in.
3. As a user, I can log out.
4. As a user, I can view a list of all available movies and their respective details (title, release date, average rating).
5. As a user, I can view the details of a specific movie, including its title, release date, average rating, and user reviews.
6. As a user, I can submit a review for a specific movie.
7. As a user, I can modify or delete a review that I left.
8. As a user, I can submit a new movie listing.

**Stretch User Stories:**
9. As a user, I can search for movies based on their title or release date.
10. As a user, I can filter movies based on their genre, rating, or release year.

### we have three primary models and their relationships:

1. **User Model:**
   - Attributes:
     - User ID
     - Username
     - Email
     - Password (hashed and securely stored)
   - Relationships:
     - One-to-Many with Reviews: A user can write multiple movie reviews.
     - One-to-Many with Movies (for user-submitted movies): A user can create and submit multiple movies.

2. **Movie Model:**
   - Attributes:
     - Movie ID
     - Title
     - Release Date
     -Genre (e.g., Action, Comedy, Drama, etc.)
   - Relationships:
     - One-to-Many with Reviews: A movie can have multiple user reviews.
     - Many-to-Many with Users (for user-submitted movies): Multiple users can contribute to the same movie listing.

3. **Review Model:**
   - Attributes:
     - Review ID
     - Movie ID (foreign key)
     - User ID (foreign key)
     - Rating (e.g., out of 5 stars)
     - Review Text (user's comments/review)
     - Date Created (timestamp)
   - Relationships:
     - Many-to-One with Movies: Many reviews can be associated with one movie.
     - Many-to-One with Users: Many reviews can be associated with one user.

### frontend overview 


**1. Landing Page:**
   - This  will include the welcomes users and provides some information about the site.
   -it is have the navigation bar at the top with options to log in or sign up.
   - Users who are already logged in may see their username or profile picture in the navigation bar.

**2. User Registration / Sign-Up Page:**
   - Users can sign up for a new account by providing a username, email, and password.
   - Include validation for password strength and email format.
   - After successful registration, users are redirected to the login page.

**3. User Login Page:**
   - Users can log in with their registered email and password.
   - Include a "Remember Me" option for users who want to remain logged in.
   - After successful login, users are redirected to the main dashboard.

**4. Main Dashboard:**
   - Displays a list of available movies, including their titles and release dates.
   - Each movie card may show an average rating based on user reviews (if available).
   - Users can click on a movie card to view more details or read reviews.

**5. Movie Details Page:**
   - Shows detailed information about a selected movie, such as title, release date, and user-submitted reviews.
   - Users can see individual user reviews, including ratings and review text.
   - If the user is logged in, they can submit their own review with a rating and comments.
   - Provides options to go back to the main dashboard.

**6. User Profile Page:**
   - Users can view their own profile information, including username and email.
   - Lists the movies and reviews they have contributed to the system.
   - Users can edit their profile details and change their password.

**7. Review Management:**
   - Users can modify or delete reviews that they have submitted.
   - A "Delete" or "Edit" button is available next to each review they own.
   
**8. Navigation Bar:**
   - The navigation bar at the top remains accessible on all pages.
   - It includes links to the main dashboard, user profile, and options to log out.

**9. Log Out:**
   - Users can log out from any page, which returns them to the landing page or login page.

**10. Error Handling:**
    - Implement error handling for scenarios like invalid login credentials, duplicate email during registration, or missing required fields.

The key functionalities include user registration, authentication, movie listing, detailed movie views, user reviews, and review management. As users interact with the system, their reviews contribute to the overall movie rating, creating an engaging movie review platform.
