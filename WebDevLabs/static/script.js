function greetingFunc() {
    var d = new Date();
    var h = d.getHours();
    var E = document.getElementById("greeting");
    if (h >= 5 && h < 12) {
        E.innerHTML = " Good morning, I am Matthew";
    } else if (h >= 12 && h < 18) {
        E.innerHTML += " Good afternoon, I am Matthew";
    } else if (h >= 18 && h < 20) {
        E.innerHTML = " Good evening, I am Matthew";
    } else {
        E.innerHTML = "Good night, I am Matthew";
    }
}

function addYear() {
    var d = new Date();
    var y = d.getFullYear();
    var E = document.getElementById("copyYear");
    E.innerHTML += y;
}

// function showList() {
//     document.getElementById("FavList").style.display = "block";
//     document.getElementById("SeeMoreBTN").style.display = "none";
// }

$("#readLess").click(function() {
    $("#longIntro").hide();
    $("#readLess").hide();
    $("#readMore").show();
});

$("#readMore").click(function() {
    $("#longIntro").show();
    $("#readLess").show();
    $("#readMore").hide();
});

function validate() {
    var userName = document.getElementById("UserName");
    var userEmail = document.getElementById("UserEmail");
    var userText = document.getElementById("UserText");
    var msg = document.getElementById("ValidateMsg");
    
    if (!userName.checkValidity() || !userEmail.checkValidity() || !userText.checkValidity()) {
        msg.innerHTML = "Please fill out the form correctly so I can get back to you :)";
    }
}

// Initialize and add the map
let map;
async function initMap() {
    // The location of CMU
    const position = { lat:1.3044787311216668, lng: 103.87662288060007 };
    const position2 = { lat: 1.2818981, lng: 103.854339};
    
    
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    // The map, centered at CMU
    map = new Map(document.getElementById("map"), {
        zoom: 12,
        center: position,
        mapId: "DEMO_MAP_ID",
    });
    // The marker, positioned at CMU
    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "National Stadium",
    });
    const marker2 = new AdvancedMarkerElement({
        map: map,
        position: position2,
        title: "Gardens By the Bay",
    });
}

var L = window.location.href;
if (L.includes("fun.html")) {
    initMap();
}

function activeNav() {
    var x = document.getElementById("myTopnav");
 
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav"; 
    }
}