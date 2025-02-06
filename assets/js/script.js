document.addEventListener("DOMContentLoaded", () => {
    movies.forEach(movie => {
        const reserveButton = document.querySelector(`.reserveBtn[data-movie="${movie.id}"]`);
        const removeButton = document.querySelector(`.removeBtn[data-movie="${movie.id}"]`);
        const seatInput = document.querySelector(`#seats${movie.id.replace(/\s+/g, "")}`);
        
        reserveButton.addEventListener("click", () => {
            const requestedSeats = parseInt(seatInput.value);
            movie.reserveSeats(requestedSeats);
        });

        removeButton.addEventListener("click", () => {
            const requestedSeats = parseInt(seatInput.value);
            movie.removeSeats(requestedSeats);
        });
    });
});

class Movie {
    constructor(id, price, seatsAvailable = 10) {
        this.id = id;
        this.price = price;
        this.seatsAvailable = seatsAvailable;
    }

    updateSeatsDisplay() {
        document.querySelector(`#availableSeats${this.id.replace(/\s+/g, "")}`)
            .textContent = this.seatsAvailable;
    }

    reserveSeats(requestedSeats) {
        if (requestedSeats > 0 && requestedSeats <= this.seatsAvailable) {
            this.seatsAvailable -= requestedSeats;
            this.updateSeatsDisplay();
            this.showPaymentOptions(requestedSeats);
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

    showPaymentOptions(seats) {
        const totalPrice = seats * this.price;
        const paymentMethod = prompt(
            `You have reserved ${seats} seats for ${this.id}. Total: ₱${totalPrice}. 
            Choose a payment method: (1) Credit Card, (2) PayPal, (3) GCash`
        );

        if (paymentMethod === "1") {
            alert("Payment successful via Credit Card. Enjoy your movie!");
        } else if (paymentMethod === "2") {
            alert("Payment successful via PayPal. Enjoy your movie!");
        } else if (paymentMethod === "3") {
            alert("Payment successful via GCash. Enjoy your movie!");
        } else {
            alert("Invalid payment method. Please try again.");
        }
    }
}

const movies = [
    new Movie("Wicked", 390),
    new Movie("CellsAtWork", 480),
    new Movie("PaddingtonInPeru", 480),
    new Movie("Interstellar10thYearAnniversary", 390),
    new Movie("SonicTheHedgehog", 390),
    new Movie("HelloLoveAgain", 390),
    new Movie("MufasaTheLionKing", 480),
    new Movie("Moana2", 390),
];
