document.addEventListener("DOMContentLoaded", function () {
    class Movie {
        constructor(id, seatsAvailable = 10) {
            this.id = id;
            this.seatsAvailable = seatsAvailable;
        }

        updateSeatsDisplay() {
            document.querySelectorAll(`#availableSeats${this.id.replace(/\s+/g, "")}`)
                .forEach(el => el.textContent = this.seatsAvailable);
        }

        reserveSeats(requestedSeats) {
            if (requestedSeats > 0 && requestedSeats <= this.seatsAvailable) {
                this.seatsAvailable -= requestedSeats;
                this.updateSeatsDisplay();
                alert(`${requestedSeats} seats reserved for ${this.id}`);
            } else {
                alert("Invalid seat selection or not enough seats available.");
            }
        }

        removeSeats(requestedSeats) {
            if (requestedSeats > 0) {
                this.seatsAvailable += requestedSeats;
                if (this.seatsAvailable > 10) this.seatsAvailable = 10;
                this.updateSeatsDisplay();
                alert(`${requestedSeats} seats removed from reservation for ${this.id}`);
            } else {
                alert("Invalid seat removal request.");
            }
        }
    }

    const movies = [
        new Movie("Wicked"),
        new Movie("CellsAtWork"),
        new Movie("PaddingtonInPeru"),
        new Movie("Interstellar10thYearAnniversary"),
        new Movie("SonicTheHedgehog"),
        new Movie("HelloLoveAgain"),
        new Movie("MufasaTheLionKing"),
        new Movie("Moana2"),
    ];

    document.querySelectorAll(".reserveBtn").forEach(button => {
        button.addEventListener("click", function () {
            const movieId = this.dataset.movie.replace(/\s+/g, "");
            const input = document.querySelector(`#seats${movieId}`);
            const requestedSeats = parseInt(input.value, 10);
            const movie = movies.find(m => m.id === movieId);
            if (movie) movie.reserveSeats(requestedSeats);
        });
    });

    document.querySelectorAll(".removeBtn").forEach(button => {
        button.addEventListener("click", function () {
            const movieId = this.dataset.movie.replace(/\s+/g, "");
            const input = document.querySelector(`#seats${movieId}`);
            const requestedSeats = parseInt(input.value, 10);
            const movie = movies.find(m => m.id === movieId);
            if (movie) movie.removeSeats(requestedSeats);
        });
    });
});