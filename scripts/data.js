class Details {
    constructor(ip) {
//         this.url = `http://ip-api.com/json/${ip}`;
           this.url = `https://ipapi.co/${ip}/json/`;
    }

    async getIP() {
        const data = await fetch(this.url);

        const json = await data.json();

        return {
            json
        }
    }
}

const go = document.querySelector('#go');
const ipAdd = document.querySelector('#ip');
const showIP = document.querySelector('.ip');
const address = document.querySelector('.add');
const timezone = document.querySelector('.timezone');
const cc = document.querySelector('.cc');


go.addEventListener('click', e => {
    const ip = ipAdd.value;

    const details = new Details(`${ip}`)

    details.getIP()
        .then(data => {
//             showIP.textContent = data.json.query;
//             address.textContent = data.json.city + ", " + data.json.country;
//             timezone.textContent = data.json.timezone;
//             isp.textContent = data.json.isp;
            
            //as per our new api
            showIP.textContent = data.json.ip;
            address.textContent = data.json.city + ", " + data.json.region + ", " + data.json.country_name;
            timezone.textContent = data.json.timezone;
            cc.textContent = data.json.org;
        
            let lat = data.json.lat;
            let lon = data.json.lon;
            console.log(data.json.lat)
            console.log(data.json.lon)

            mapboxgl.accessToken = 'pk.eyJ1IjoiZXVnZW5pY3MiLCJhIjoiY2t2MGM0b3N1MDFqdDJvbHNkcjlrZTNlMSJ9.fK6MzVndal6J3DSmNxsFsw';
            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [lon, lat],
                zoom: 13
            });
        })
})

mapboxgl.accessToken = 'pk.eyJ1IjoiZXVnZW5pY3MiLCJhIjoiY2t2MGM0b3N1MDFqdDJvbHNkcjlrZTNlMSJ9.fK6MzVndal6J3DSmNxsFsw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [3.328670, 6.452560],
    zoom: 10
});
