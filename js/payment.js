window.addEventListener("DOMContentLoaded", () => {
	let currentSeance = JSON.parse(localStorage.getItem("seance"));
	let ticketTitle = document.querySelector(".ticket__title");
	ticketTitle.innerHTML = currentSeance.filmName;
	let ticketChairs = document.querySelector(".ticket__chairs");
	let aarOfTicketChairs = [];
	let price = 0;
	for (let i = 0; i < currentSeance.buyPlaces.length; i++) {
		aarOfTicketChairs.push(`${currentSeance.buyPlaces[i].row}/${currentSeance.buyPlaces[i].place}`);
		if (currentSeance.buyPlaces[i].type === "standart") {
			price += Number(currentSeance.priceStandart);
		}
		else {
			price += Number(currentSeance.priceVip);
		}
	}
	ticketChairs.textContent = aarOfTicketChairs.join(", ");
	let ticketHall = document.querySelector(".ticket__hall");
	ticketHall.innerHTML = currentSeance.hallName;
	let ticketStart = document.querySelector(".ticket__start");
	let date = new Date(currentSeance.seanceTimeMark * 1000);
	let movieTime = date.toLocaleString().slice(0, -3);
	ticketStart.innerHTML = movieTime;
	let ticketCost = document.querySelector(".ticket__cost");
	ticketCost.textContent = price;
	let acceptButton = document.querySelector(".acceptin-button");
	 
})

