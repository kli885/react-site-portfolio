globe = new ENCOM.Globe(window.innerWidth, window.innerHeight - (main.clientTop + main.clientHeight), {
    font: "Inconsolata",
    data: data,
    tiles: grid.tiles,
    baseColor: "#000000",
    markerColor: "rgb(183, 17, 17)",
    pinColor: "#aacfd1",
    satelliteColor: "#aacfd1",
    scale: 1,
    dayLength: 25000,
    introLinesDuration: 2000,
    maxPins: 500,
    maxMarkers: 4,
    viewAngle: 0.3
});
document.getElementById('globe-container').appendChild(globe.domElement);
// document.getElementById('main').appendChild(globe.domElement);


function animate() {
    if (globe) {
        globe.tick();
    }
    requestAnimationFrame(animate);
}

initGlobe = () => {
    globe.init();
    animate();
    //Hard coded test location
    // let loc = {
    //     latitude: 36.67809524620863, 
    //     longitude: 138.83136351039371,
    //     city: "Tokyo"
    // }
    // if ((loc.latitude >= 53.33508154968209 && loc.latitude <= 53.71648044600668) && 
    //         (loc.longitude >= -113.7175643914543 && loc.longitude <= -113.27211535683806)) {
    //     globe.addMarker(loc.latitude, loc.longitude, `Edmonton (We're both here!)`);
    //     globe.addPin(loc.latitude, loc.longitude, " ");
    // } else {
    //     let far = haversineDistance([53.655, -113.3784], [loc.latitude, loc.longitude])/1000 >= 2000;
    //     globe.addMarker(53.655, -113.3784, "Edmonton (I'm here)");
    //     globe.addPin(53.655, -113.3784, " ");
    //     globe.addMarker(loc.latitude, loc.longitude, `${loc.city} (You're here)`, far);
    //     globe.addPin(loc.latitude, loc.longitude, " ");
    // }

    let jsonLocation = localStorage.getItem("location")
    try {
        let loc = JSON.parse(jsonLocation);
        if (!(loc.latitude >= -90 && loc.latitude <= 90) || 
            !(loc.longitude >= -180 && loc.longitude <= 180) ||
            !(typeof loc.city === "string")) {
                throw new Error("Invalid Location")
            }
        populateGlobe(loc)
    } catch (error) {
        try {
            // https://my-json-server.typicode.com/kli885/demo/location
            fetch('https://ip-api.io/json').then(r => r.json()).then(loc => {
                populateGlobe(loc)
                localStorage.setItem("location", JSON.stringify(loc))
            });
        } catch (fetchError) {
            globe.addMarker(53.655, -113.3784, "Edmonton (I'm here)");
            globe.addPin(53.655, -113.3784, " ");
            console.log(fetchError)
        }
    }
    
    setTimeout(function(){
        var constellation = [];
        var opts = {
            coreColor: "#ff0000",
            numWaves: 8
        };
        var alt = 1;
    
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 3; j++) {
                constellation.push({
                    lat: 50 * i - 30 + 15 * Math.random(),
                    lon: 120 * j - 120 + 30 * i,
                    altitude: alt
                });
            }
        }
    
        globe.addConstellation(constellation, opts);
    }, 4000)

}
window.addEventListener('resize', () => {
    if (globe.camera) {
        let h = window.innerHeight - (main.clientTop + main.clientHeight);
        globe.camera.aspect = window.innerWidth / h;
        globe.camera.updateProjectionMatrix();
        globe.renderer.setSize(window.innerWidth, h);
    }
})

function checkNearby(latitude, longitude) {
    return (
        (latitude >= 53.33508154968209 && latitude <= 53.71648044600668) && 
        (longitude >= -113.7175643914543 && longitude <= -113.27211535683806)
    )
}

function populateGlobe(loc) {
    if (checkNearby(loc.latitude, loc.longitude)) {
        globe.addMarker(loc.latitude, loc.longitude, `Edmonton (We're both here!)`);
        globe.addPin(loc.latitude, loc.longitude, " ");
    } else {
        let far = haversineDistance([53.655, -113.3784], [loc.latitude, loc.longitude])/1000 >= 2000;
        globe.addMarker(53.655, -113.3784, "Edmonton (I'm here)");
        globe.addPin(53.655, -113.3784, " ");
        globe.addMarker(loc.latitude, loc.longitude, `${loc.city} (You're here)`, far);
        globe.addPin(loc.latitude, loc.longitude, " ");
    }
}