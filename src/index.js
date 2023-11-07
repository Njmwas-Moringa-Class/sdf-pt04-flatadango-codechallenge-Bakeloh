
// Your  code here 

document.addEventListener("DOMContentLoaded", function () {
    
    const baseUrl = "http://localhost:3000";


    function fetchMovieDetails(movieId) {

        fetch(`${baseUrl}/films/${movieId}`)
            .then((response) => response.json())
            .then((data) => {

                const posterElement = document.getElementById("poster");
                const titleElement = document.getElementById("title");
                const runtimeElement = document.getElementById("runtime");
                const showtimeElement = document.getElementById("showtime");
                const availableTicketsElement = document.getElementById("available-tickets");

                posterElement.src = data.poster;
                titleElement.textContent = data.title;
                runtimeElement.textContent = `${data.runtime} minutes`;
                showtimeElement.textContent = data.showtime;

                const availableTickets = data.capacity - data.tickets_sold;
                availableTicketsElement.textContent = availableTickets;


                const buyTicketButton = document.getElementById("buy-ticket");
                if (availableTickets === 0) {
                    buyTicketButton.textContent = "Sold Out";
                    buyTicketButton.disabled = true;
                } else {
                    buyTicketButton.textContent = "Buy Ticket";
                    buyTicketButton.disabled = false;
                }
            })
            .catch((error) => {
                console.error("Error fetching movie details: ", error);
            });
    }


    document.getElementById("buy-ticket").addEventListener("click", () => {
        if (currentMovieId !== null) {

            const availableTicketsElement = document.getElementById("available-tickets");
            const availableTickets = parseInt(availableTicketsElement.textContent);
            if (availableTickets > 0) {
                r
                fetch(`${baseUrl}/films/${currentMovieId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ tickets_sold: 1 }),
                })
                    .then((response) => response.json())
                    .then((data) => {

                        fetchMovieDetails(currentMovieId);
                    })
                    .catch((error) => {
                        console.error("Error buying a ticket: ", error);
                    });
            }
        }
    });


    const initialMovieId = 1;
    fetchMovieDetails(initialMovieId);
});
