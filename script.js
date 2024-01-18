$(document).ready(function () {
  const apiUrl = 'https://api.tvmaze.com/shows';
  const searchInput = document.querySelector('#search-box-input');
  const imagesGrid = document.querySelector('#movie-list');

  const renderMovies = (movies) => {
    imagesGrid.innerHTML = ''; // Clear the current grid

    movies.slice(0, 3).forEach((show) => {
      var newDiv = $(
        '<div id="show_' +
          show.id +
          '" class="col">' +
          '<div class="card border-0 h-100 rounded-0">' +
          '<img src="' +
          show.image.medium +
          '" class="card-img-top" alt="...">' +
          '<button type="button" class="btn btn-dark text-grey position-absolute top-0 end-0 m-2 rounded-0" aria-label="Close" onclick="removeItem(' +
          show.id +
          ')"><i class="fa-solid fa-xmark"></i></button>' +
          '<div class="card-body bg-light-grey" style="color: #eaeaea;">' +
          '<h5 class="card-title">' +
          show.name +
          '</h5>' +
          '<p class="card-text">' +
          show.summary +
          '</p>' +
          '</div>' +
          '</div>' +
          '</div>'
      );
      $('#movie-list').append(newDiv);
    });
  };

  // Fetch initial data
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Initial rendering
      renderMovies(data.slice(0, 3));

      // Event listener for search input
      searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredMovies = data.filter((show) =>
          show.name.toLowerCase().includes(searchTerm)
        );

        renderMovies(filteredMovies);
      });
    })
    .catch((error) => console.error('Error fetching data:', error));
});

function removeItem(elementId) {
  $('#show_' + elementId).remove();
}
