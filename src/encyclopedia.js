window.onload = (event) => {

const { over } = require("lodash");

var overlay = document.getElementById("overlay")
var nonOverlay = document.getElementById("monster_page");
var openOverlay = document.getElementsByClassName("monsterName")
var openOverlay2 = document.getElementsByClassName("monsterIcon")


function on(event) {
    if (Array.from(openOverlay).some(element => element === event.target) || Array.from(openOverlay2).some(element => element === event.target)) {
        overlay.style.display = 'block';
        console.log("open overlay")
    }
}

function off(event) {   
    if (event.target == overlay && !nonOverlay.contains(event.target)) {
        overlay.style.display = 'none';
        console.log("close overlay")
    }    
}

document.addEventListener("click", on)
document.addEventListener("click", off);

}

