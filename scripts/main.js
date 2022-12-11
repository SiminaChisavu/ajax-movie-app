'use strict';
(function () {
  const apiUrl = 'http://localhost:3000/movies?_page=';
  const params = new URLSearchParams(location.search);
  const pageNo = params.get('page');

  let x = 1;
  let y = 2;
  let z = 3;
  let prev = document.querySelector('.prev');
  let next = document.querySelector('.next');
  let btn1 = document.querySelector('.btn1');
  let btn2 = document.querySelector('.btn2');
  let btn3 = document.querySelector('.btn3');

  function pagination() {
    btn1.innerText = `${x}`;

    btn2.innerText = `${y}`;

    btn3.innerText = `${z}`;
  }
  btn1.addEventListener('click', function () {
    window.location = `index.html?page=${x}`;
  });
  btn2.addEventListener('click', function () {
    window.location = `index.html?page=${y}`;
  });
  btn3.addEventListener('click', function () {
    window.location = `index.html?page=${z}`;
  });
  prev.addEventListener('click', function () {
    if (x > 1 || y > 2 || z > 3) {
      x--;
      y--;
      z--;
      pagination();
    }
  });

  next.addEventListener('click', function () {
    if (x < 50 && y < 50 && z < 50) {
      x++;
      y++;
      z++;
      pagination();
    }
  });

  function buildListItem(movie) {
    const card = document.createElement('a');
    const imgPoster = document.createElement('img');
    const name = document.createElement('h2');
    card.href = 'movieDetails.html?movieId=' + movie.id;
    card.dataset.getId = movie.id;
    imgPoster.src = movie.poster;
    name.innerText = movie.title;
    card.append(imgPoster, name);
    return card;
  }
  function displayListInPage(list) {
    const output = document.querySelector('.movies');
    output.append(list);
  }
  function renderMovieList() {
    function buildHtmlList(movies) {
      const list = document.createDocumentFragment();
      for (const movie of movies) {
        const card = buildListItem(movie);
        list.append(card);
      }
      return list;
    }
    function displayMovies(movies) {
      const list = buildHtmlList(movies);
      displayListInPage(list);
    }
    fetch(`${apiUrl}${pageNo}`)
      .then((res) => res.json())
      .then(displayMovies);
  }
  renderMovieList();
  fetch(`${apiUrl}${pageNo}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((movie) => {
      const listItem = buildListItem(movie);
      displayListInPage(listItem);
    })
    .catch(() => {
      console.warn('error');
    });
})();
