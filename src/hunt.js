window.onload = (event) => {
console.log('loaded')

var dropdown = document.getElementById('regionDropdown');
var regionButton = document.getElementById('regionButton');
var overlay = document.getElementById("overlay");
var openOverlay = document.getElementById("huntButton");
var nonOverlay = document.getElementById("huntOverlay");


//Carousel//

var carousel = document.querySelector('.carousel');
var slides = carousel.getElementsByClassName('slide');
var currentIndex = 0;
var previousButton = document.getElementById("PreviousWeapon");
var nextButton = document.getElementById("nextWeapon");

function showWeapon(index) {
    for (var i =0; i < slides.length; i++) {
        slides[i].classList.remove('activeWeapon');
    }
    console.log('showing')
    slides[index].classList.add('activeWeapon');
}

function nextWeapon() {
    currentIndex++;
    if(currentIndex >= slides.length) {
        currentIndex = 0
    }
    showWeapon(currentIndex);
}

function previousWeapon() {
    currentIndex--;
    if(currentIndex < 0) {
        currentIndex = slides.length -1;
    }
    showWeapon(currentIndex);
}

function toggleDropdownOn(event) {
    if (event.target === regionButton ) {
        dropdown.style.display = 'block';
        console.log("Select region open");        
    }
}

function toggleDropdownOff(event) {
    if (event.target !== regionButton) {
        dropdown.style.display = 'none';
        console.log("Select region close");
    }
}

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

document.addEventListener("click", toggleDropdownOn);
document.addEventListener("click", toggleDropdownOff);
document.addEventListener("click", on);
document.addEventListener("click", off);
previousButton.addEventListener('click', previousWeapon);
nextButton.addEventListener('click', nextWeapon);
}

