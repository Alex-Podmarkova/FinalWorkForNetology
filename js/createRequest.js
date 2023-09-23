function createRequest (body, callback) {
	fetch("https://jscp-diplom.netoserver.ru/", {
		method: "POST", 
		body: body,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded", 
		},
	})
	    .then((responce) => {
	    	if (!responce.ok) {
	    		throw new Error("Error occurred")
	    	}
	    	return responce.json()
	    })
	    .then((data) => {
	    	callback(data);
	    })
	    .catch((e) => {
	    	console.log(e);
	    })
}