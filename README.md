# AJAX & Promises

## Setup and Start

Clone this repo and run `npm install`.

Start the development API server with `npm start`. The server starts on localhost port 3000

## Description

### One

Page which lists all movies: index.html

In this page:

1. Is displayed a grid of movies (in cards) with poster image and underneath that the title (3 items per row)
2. Each card in the grid is a link to the movieDetails.html

### Two

Page which lists the details of a single movie: movieDetails.html

1. Are displayed all details of each movie. This means each card in the list is linked to movieDetails.html?movieId=!whatever-id-the-movie-has!

### Three

Page which adds a new movies: addMovie.html

1. On this page is displayed a form to add a new movie
2. User can add a movie with title, image, imdb rating, genre, director and plot
3. The image is a url
4. The plot is a textarea
5. The rating is a range
6. The genre is a select box

### Four

On the movieDetails.html page, user can delete the movie via a button or edit the same movie from another button.

1. Before deleting the movie, the user is asked for confirmation using a confirm(). If the user declines, the movie won't be deleted.
2. After the delete succeeds, the user is redirected to the list page (index.html)
3. The edit button navigates the user to a new page called editMovie.html
4. On editMovie.html there is a form similar to the addMovie form (same fields). The form is prefilled with all the correct values from the DB, the user only needs to change them
