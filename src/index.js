// Your code here

document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "http://localhost:3001";
    const movieTitle = document.getElementById("title");
    const movieDuration = document.getElementById("runtime");
    const movieInfo = document.getElementById("film-info");
    const availTickets = document.getElementById("ticket-num");
    const ticketPurchaseBtn = document.getElementById("buy-ticket");
    const movieList = document.getElementById("films");
    const posterImage = document.getElementById("poster");

    // Fetch details of the first movie
    function fetchFirstMovieDetails() {
        fetch(`${baseURL}/films/1`)
            .then((response) => response.json())
            .then((movieDetails) => {
                displayMovieDetails(movieDetails);
            });
    }

    // Display movie details on the page
    function displayMovieDetails(movieDetails) {
        movieTitle.textContent = movieDetails.title;
        movieDuration.textContent = `${movieDetails.runtime} mins`;
        movieInfo.textContent = movieDetails.description;
        availTickets.textContent = movieDetails.capacity - movieDetails.tickets_sold;
        posterImage.src = movieDetails.poster;

        // Update button text and disable if sold out
        if (availTickets.textContent == 0) {
            ticketPurchaseBtn.textContent = "Sold Out";
            ticketPurchaseBtn.disabled = true;
        } else {
            ticketPurchaseBtn.textContent = "Buy Ticket";
            ticketPurchaseBtn.disabled = false;
        }
    }

    // Fetch all movies and populate the movie list
    function fetchAllMovies() {
        fetch(`${baseURL}/films`)
            .then((response) => response.json())
            .then((movies) => {
                populateMovieList(movies);
            });
    }

    // Populate the movie list in the sidebar
    function populateMovieList(movies) {
        movies.forEach((movie) => {
            const li = document.createElement("li");
            li.textContent = movie.title;
            li.onclick = () => {
                fetchMovieDetailsAndUpdateUI(movie.id);
            };
            movieList.appendChild(li);
        });
    }

    // Fetch details of a specific movie and update the UI
    function fetchMovieDetailsAndUpdateUI(movieId) {
        fetch(`${baseURL}/films/${movieId}`)
            .then((response) => response.json())
            .then((movieDetails) => {
                displayMovieDetails(movieDetails);
            });
    }

    // Event listener for the Buy Ticket button
    ticketPurchaseBtn.addEventListener("click", () => {
        if (ticketPurchaseBtn.textContent === "Buy Ticket") {
            // Simulate ticket purchase (decrease available tickets)
            let remTickets = Math.max(0, parseInt(availTickets.textContent, 10) - 1);
            availTickets.textContent = remTickets;
        }
    });

    // Initial setup: Fetch first movie details and all movies
    fetchFirstMovieDetails();
    fetchAllMovies();
});
