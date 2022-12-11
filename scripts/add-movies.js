'use strict';
(function () {
  const apiUrl = 'http://localhost:3000/movies';

  const form = document.querySelector('[data-validation-form]');
  const errors = document.querySelectorAll('.error');

  const inputs = form.elements.required;

  form.addEventListener('submit', handleAddMovie);

  function handleAddMovie(e) {
    e.preventDefault();
    const title = inputs[0].value;
    const poster = inputs[1].value;
    const imdbrating = inputs[2].value;
    const genre = inputs[3].value;
    const director = inputs[4].value;
    const plot = inputs[5].value;

    //Form validation

    inputs.forEach((element, index) => {
      errors[index].classList.toggle('showError', !element.value);
    });
    if (!(title && poster && imdbrating && genre && director && plot)) {
      return;
    }

    //Add movie in DB
    fetch(apiUrl, {
      method: 'POST',
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
      })
      .catch(() => {
        console.warn('error');
      });
  }
})();
