'use strict';
(function () {
  const apiUrl = 'http://localhost:3000/movies';

  const params = new URLSearchParams(location.search);
  const movieId = params.get('movieId');

  function buildMovieList(movie) {
    const items = Object.keys(movie);

    const pageTitle = document.querySelector('title');
    pageTitle.innerText = movie.title;
    let imgPoster = document.createElement('img');
    imgPoster.src = movie.poster;

    const delBtn = document.createElement('button');
    delBtn.classList.add('fa-solid', 'fa-trash-can', 'fa-xl');
    delBtn.dataset.delMovie = movie.id;

    const editBtn = document.createElement('button');
    editBtn.innerText = 'Edit movie';
    editBtn.classList.add('editBtn');
    editBtn.dataset.editMovie = movie.id;

    for (let j = 0; j < items.length; j++) {
      if (
        !(items[j] === 'poster' || items[j] === 'ratings' || items[j] === 'id')
      ) {
        let item = document.createElement('div');
        item.classList.add('display');
        item.innerText = `${
          items[j].charAt(0).toUpperCase() + items[j].slice(1)
        }: ${movie[items[j]]}`;
        document
          .querySelector('.movie-details')
          .append(delBtn, editBtn, imgPoster, item);
      }
    }
  }

  fetch(`${apiUrl}/${movieId}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((movie) => {
      buildMovieList(movie);
    })
    .catch(() => {
      console.warn('error');
    });

  //Delete movie from DB

  function enableDeleteMovie() {
    document
      .querySelector('.movie-details')
      .addEventListener('click', handleDelete);

    function handleDelete(e) {
      const delMovie = e.target.dataset.delMovie;
      if (!(delMovie && window.confirm('Are you sure you want to delete?'))) {
        return;
      }

      fetch(`${apiDel}/${delMovie}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then(() => {
          window.location = 'index.html';
        })
        .catch(() => {
          console.warn('error');
        });
    }
  }
  enableDeleteMovie();

  //Edit movie

  function enableEditMovie() {
    document
      .querySelector('.movie-details')
      .addEventListener('click', handleDelete);

    function handleDelete(e) {
      const editMovie = e.target.dataset.editMovie;
      if (!editMovie) {
        return;
      } else {
        window.location = 'editMovie.html?movieId=' + editMovie;
      }
    }
  }
  enableEditMovie();
})();
