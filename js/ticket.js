window.addEventListener("DOMContentLoaded", () => {
    let currentSeance = JSON.parse(localStorage.getItem("seance"));
    fetch("https://jscp-diplom.netoserver.ru/", {
		method: "POST", 
		body: `event=sale_add&timestamp=${currentSeance.seanceTimeMark}&hallId=${currentSeance.hallId}&seanceId=${currentSeance.seanceId}&hallConfiguration=${currentSeance.hallConfig}`,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded", 
		},
	})
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
	console.log(currentSeance);

    let qrCode = document.querySelector("#qr_code");

    let qrContent = `
    Билет на фильм: "${currentSeance.filmName}" 
    Начало сеанса ${movieTime} 
    ${currentSeance.hallName} 
    Ряд/место: ${ticketChairs.textContent}`;
    
    qrCode.append(QRCreator(qrContent).result);
    qrCode.querySelector('canvas').style.display = 'block';
    qrCode.querySelector('canvas').style.margin = '0 auto';
})