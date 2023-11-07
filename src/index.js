// Your  code here 

// Define the base URL for your local server
document.addEventListener("DOMContentLoaded", function () {
    const baseUrl = "http://localhost:3000"; // Corrected variable name

    // Function to fetch movie details and update the movie details area
    function fetchMovieDetails(movieId) {
        fetch(`${baseUrl}/movies/${movieId}`)
            .then((response) => response.json())
            .then((data) => {
                // ... Rest of the code remains the same ...
            })
            .catch((error) => {
                console.error("Error fetching movie details: ", error);
            });
    }

    // Event listener for buying a ticket
    document.getElementById("buy-ticket").addEventListener("click", () => {
        if (currentMovieId !== null) {
            // Make a PATCH request to update tickets_sold on the server
            fetch(`${baseUrl}/movies/${currentMovieId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tickets_sold: 1 }), // Assuming 1 ticket is purchased
            })
                .then((response) => response.json())
                .then((data) => {
                    // Update the movie details with the new data
                    fetchMovieDetails(currentMovieId);
                })
                .catch((error) => {
                    console.error("Error buying a ticket: ", error);
                });
        }
    });

    // Event listener for deleting a movie
    document.getElementById("films").addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-movie")) {
            const movieId = event.target.getAttribute("data-id");

            // Make a DELETE request to delete the movie on the server
            fetch(`${baseUrl}/movies/${movieId}`, {
                method: "DELETE",
            })
                .then(() => {
                    // Remove the movie item from the list
                    event.target.parentElement.remove();
                })
                .catch((error) => {
                    console.error("Error deleting the movie: ", error);
                });
        }
    });

    // Initially, load details of the first movie or set a default movie
    const initialMovieId = 1; // You can set this to the desired default movie
    fetchMovieDetails(initialMovieId);
});

