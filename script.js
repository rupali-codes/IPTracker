const ipAdd = document.querySelector('#ip');
const go = document.querySelector('#go');
const showIP = document.querySelector('.ip'); 
const address = document.querySelector('.add'); 
const timezone = document.querySelector('.timezone'); 
const cc = document.querySelector('.cc'); 


go.addEventListener('click', async function(){
	const ip = ipAdd.value;
	
	fetch(`https://ipapi.co/${ip}/json/`)
	.then(res => res.json())
	.then(data => {
		if(data.status == "fail"){
			throw new Error("Invalid IP Address");
		}

		showIP.textContent = data.ip;
		address.textContent = data.city + ", " + data.region + ", " + data.country_name;
		timezone.textContent = data.timezone;
		cc.textContent = data.org;
	})
	.catch(err => alert(err.message))
})

/*
//mine
49.15.226.69
//pinku
102.64.48.0
*/
