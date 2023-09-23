window.addEventListener("DOMContentLoaded", () => {
	let day = Array.from(document.querySelectorAll(".page-nav__day"));
    let dayWeek = document.querySelectorAll(".page-nav__day-week");
    let dayNumber = document.querySelectorAll(".page-nav__day-number");
    let weekDays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    let today = new Date ();

    for (let i = 0; i < dayNumber.length; i++) {
        today.setHours(0,0,0,0);
        let currentDay = new Date(today.getTime() + (i * 24 * 3600000));
        let tagTime = Math.trunc(currentDay / 1000);
        dayNumber[i].innerHTML = `${currentDay.getDate()}`;
        dayWeek[i].innerHTML = `${weekDays[currentDay.getDay()]}`;
        let dayI = dayNumber[i].parentNode;
        dayI.dataset.tagTime = tagTime;

        if ((dayWeek[i].textContent === "Вс") || (dayWeek[i].textContent === "Сб")) {
            dayNumber[i].parentNode.classList.add("page-nav__day_weekend");
        }
        else {
             dayNumber[i].parentNode.classList.remove("page-nav__day_weekend");
        }
    }


    createRequest("event=update", (responce) => {
    	let main = document.querySelector("main");
    	let arrOfinfo = {};
    	arrOfinfo.seances = responce.seances.result;
    	arrOfinfo.films = responce.films.result;
    	arrOfinfo.halls = responce.halls.result;
    	arrOfinfo.halls = arrOfinfo.halls.filter(hall => hall.hall_open == 1);

        
        arrOfinfo.films.forEach((film) => {
        	let filmList = "";
        	arrOfinfo.halls.forEach((hall) => {
        		let seances = arrOfinfo.seances.filter(seance => ((seance.seance_hallid == hall.hall_id) && (seance.seance_filmid == film.film_id)));

        		if (seances.length) {
                    filmList += `
                        <div class="movie-seances__hall">
                            <h3 class="movie-seances__hall-title">${hall.hall_name}</h3>
                            <ul class="movie-seances__list">`
                    seances.forEach(seance => 
                    	filmList += `
                    	        <li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html" data-film-name="${film.film_name}" 
                    	data-film-id="${film.film_id}" data-hall-name="${hall.hall_name}" data-hall-id="${hall.hall_id}" data-price-standart="${hall.hall_price_standart}" 
                    	data-price-vip="${hall.hall_price_vip}" data-seance-id="${seance.seance_id}" data-seance-start="${seance.seance_start}" data-seance-time="${seance.seance_time}">
                    	${seance.seance_time}</a></li>`);
                    filmList += `
                            </ul> 
                        </div>`
        		}
        	})

        	if(filmList) {
        		main.innerHTML += `
        		    <section class="movie">
                        <div class="movie__info">
                            <div class="movie__poster">
                                <img class="movie__poster-image" src="${film.film_poster}">
                            </div>
                            <div class="movie__description">
                                <h2 class="movie__title">${film.film_name}</h2>
                                <p class="movie__synopsis">${film.film_description}</p>
                                <p class="movie__data">
                                    <span class="movie__data-duration">${film.film_duration} мин</span>
                                    <span class="movie__data-origin">${film.film_origin}</span>
                                </p>
                            </div>
                        </div>    
                        ${filmList}
                    </section>`
        	}
        })

        let movieSeance = Array.from(document.querySelectorAll(".movie-seances__time"));
        day.forEach(element => element.addEventListener("click", (event) => {
            event.preventDefault();
            document.querySelector(".page-nav__day_chosen").classList.remove("page-nav__day_chosen");
            element.classList.add("page-nav__day_chosen");
            let xTime = +(event.target.dataset.tagTime);

            if (!xTime) {
                xTime = +(event.target.closest(".page-nav__day").dataset.tagTime);
            }
            movieSeance.forEach(movie => {
                let seanceStartDay = Number(movie.dataset.seanceStart) * 60;
                let tagSeance = xTime + seanceStartDay;
                let tagTimeNow = Math.trunc(+new Date() / 1000);
                movie.dataset.seanceTimeMark = tagSeance;
                if ((tagSeance - tagTimeNow) < 0) {
                    movie.classList.add("acceptin-button-disabled"); 
                }
                else {
                    movie.classList.remove("acceptin-button-disabled");
                }
            })

        })) 

        day[0].click();

        movieSeance.forEach(movie => movie.addEventListener("click", (event) => {
            let currentSeance = event.target.dataset;
            currentSeance.hallConfig = arrOfinfo.halls.find(hall => hall.hall_id == currentSeance.hallId).hall_config;
            console.log(currentSeance);
            localStorage.setItem("seance", JSON.stringify(currentSeance));
        }))
        
    })

})
