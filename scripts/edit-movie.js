'use strict';
(function () {
  const apiUrl = 'http://localhost:3000/movies';
  const params = new URLSearchParams(location.search);
  const movieId = params.get('movieId');

  const form = document.querySelector('[data-validation-form]');

  const inputs = form.elements.required;

  //Prefill form with all the correct values from the DB

  function prefillForm(movie) {
    inputs[0].value = movie.title;
    inputs[1].value = movie.poster;
    inputs[2].value = movie.imdbrating;
    inputs[3].value = movie.genre;
    inputs[4].value = movie.director;
    inputs[5].value = movie.plot;
  }

  fetch(`${apiUrl}/${movieId}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((movie) => {
      prefillForm(movie);
    })
    .catch(() => {
      console.warn('error');
    });

  form.addEventListener('submit', handleEditMovie);

  function handleEditMovie(e) {
    e.preventDefault();
    const title = inputs[0].value;
    const poster = inputs[1].value;
    const imdbrating = inputs[2].value;
    const genre = inputs[3].value;
    const director = inputs[4].value;
    const plot = inputs[5].value;

    if (!(title && poster && imdbrating && genre && director && plot)) {
      return;
    }

    //Edit movie details in db
    fetch(`${apiUrl}/${movieId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title,
        poster,
        imdbrating,
        genre,
        director,
        plot,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        window.location = 'movieDetails.html?movieId=' + movieId;
      })
      .catch(() => {
        console.warn('error');
      });
  }
})();
