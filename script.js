const ipAdd = document.querySelector('#ip');
const go = document.querySelector('#go');
const showIP = document.querySelector('.ip');
const address = document.querySelector('.add');
const timezone = document.querySelector('.timezone');
const cc = document.querySelector('.cc');

let latitude, longitude;

go.addEventListener('click', async function() {
    const ip = ipAdd.value;

    fetch(`https://ipapi.co/${ip}/json/`)
        .then(res => res.json())
        .then(data => {
            if (data.status == "fail") {
                throw new Error("Invalid IP Address");
            }

            //displaying content
            showIP.textContent = data.ip;
            address.textContent = data.city + ", " + data.region + ", " + data.country_name;
            timezone.textContent = data.timezone;
            cc.textContent = data.org;

            //loading map
            latitude = data.latitude;
            longitude = data.longitude;

            const coords = [latitude, longitude];
            const map = L.map('map').setView(coords, 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            //displaying popup
            L.marker(coords).addTo(map)
                .bindPopup("IP: " + data.ip)
                .openPopup();

        })
        .catch(err => alert(err.message))
        
        ipAdd.value = '';
})
