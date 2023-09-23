window.addEventListener("DOMContentLoaded", () => {
    let currentSeance = JSON.parse(localStorage.getItem("seance"));
    let infoTitle = document.querySelector(".buying__info-title");
    infoTitle.innerHTML = currentSeance.filmName;
    let infoStart = document.querySelector(".buying__info-start");
    infoStart.innerHTML = `Начало сеанса: ${currentSeance.seanceTime}`;
    let infoHall = document.querySelector(".buying__info-hall");
    infoHall.innerHTML = currentSeance.hallName;
    let priceStandart = document.querySelector(".price-standart");
    let priceVip = document.querySelector(".price-vip");
    priceStandart.innerHTML = currentSeance.priceStandart;
    priceVip.innerHTML = currentSeance.priceVip;
    let stepWrapper = document.querySelector(".conf-step__wrapper");

    
    createRequest(`event=get_hallConfig&timestamp=${currentSeance.seanceTimeMark}&hallId=${currentSeance.hallId}&seanceId=${currentSeance.seanceId}`, (responce) => {
        if(responce) {
	    	currentSeance.hallConfig = responce;
	    }
	    stepWrapper.innerHTML = currentSeance.hallConfig;
        let chairs = Array.from(document.querySelectorAll(".conf-step__row .conf-step__chair"));
        let acceptButton = document.querySelector(".acceptin-button");
        acceptButton.setAttribute("disabled", true);

        chairs.forEach((chair) => {
        	chair.addEventListener ("click", (event) => {
                if (event.target.classList.contains("conf-step__chair_taken")) {
                	return;
                }
                event.target.classList.toggle("conf-step__chair_selected");
                let chairSelected = Array.from(document.querySelectorAll(".conf-step__row .conf-step__chair_selected"));
                if (chairSelected.length > 0) {
                    acceptButton.removeAttribute("disabled");
                }
                else {
                	acceptButton.setAttribute("disabled", true);
                }
        	})
        })
        acceptButton.addEventListener("click", (event) => {
            let selectChair = Array.from(document.querySelectorAll(".conf-step__row .conf-step__chair_selected"));
            let selectChairs = [];
            selectChair.forEach((chair) => {
            	let row = chair.closest(".conf-step__row");
            	let rowIndex = Array.from(row.parentNode.children).indexOf(row) + 1;
            	let chairIndex = Array.from(row.children).indexOf(chair) + 1;
            	let chairType = (chair.classList.contains("conf-step__chair_standart")) ? "standart" : "vip";
            	selectChairs.push({
            		row: rowIndex,
            		place: chairIndex,
            		type: chairType
            	});
            })

            currentSeance.hallConfig = stepWrapper.innerHTML;
            currentSeance.buyPlaces = selectChairs;
            localStorage.setItem("seance", JSON.stringify(currentSeance));
            window.location.href = "payment.html";
        })
    })
 })
