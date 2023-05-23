window.onload = (event) => {
console.log('loaded')
function selectRegion() {
    document.getElementById('regionDropdown').classList.toggle("show");
}

document.getElementById('regionDropdown').onclick = selectRegion()

var overlay = document.getElementById("overlay")
var openOverlay = document.getElementById("huntButton")
var nonOverlay = document.getElementsByClassName("huntOverlay");

function on(event) {
    if (event.target === openOverlay) {
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

