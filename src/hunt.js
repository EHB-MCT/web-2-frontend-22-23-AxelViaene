window.onload = (event) => {
console.log('load hunt.js')

try {
    const userdata = sessionStorage.getItem('user');
    if (!userdata) {
        window.location.href = '../html/login.html'
        return
    }

const user = JSON.parse(userdata)
if(user) {
    document.getElementById('authname').innerText = `Welcome ${user.name}`
    console.log(`Welcomeeee ${user.name}`)
    } else {
    window.location.href = '../html/login.html'
    }
} catch (error) {
    console.error('error', error)
}

//Region select
var dropdown = document.getElementById('regionDropdown');
var regionButton = document.getElementById('regionButton');
var regions = document.getElementsByClassName('regionOption');
var overlay = document.getElementById("overlay");
var openOverlay = document.getElementById("huntButton");
var nonOverlay = document.getElementById("huntOverlay");

 
//Carousel//
var carousel = document.querySelector('.carousel');
var slides = carousel.getElementsByClassName('slide');
var currentIndex = 0;
var previousButton = document.getElementById("previousWeapon");
var nextButton = document.getElementById("nextWeapon");
var carouselNumber = document.querySelector('.carouselNumber');

document.addEventListener("click", toggleDropdownOn);
document.addEventListener("click", toggleDropdownOff);
document.addEventListener("click", huntResultOverlay);
document.addEventListener("click", huntResultClose);
previousButton.addEventListener('click', previousWeapon);
nextButton.addEventListener('click', nextWeapon);



//carousel
function showWeapon(index) {
    for (var i =0; i < slides.length; i++) {
        slides[i].classList.remove('activeWeapon');
    }
    console.log('showing')
    slides[index].classList.add('activeWeapon');
    carouselNumber.textContent = (index + 1) + "/" + slides.length;
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


//region dropdown
function toggleDropdownOn(event) {
    if (event.target === regionButton ) {
        dropdown.style.display = 'block';
    }
    if (event.target.classList.contains('regionOption')) {
        var selectedRegion = event.target.textContent;
        regionButton.textContent = selectedRegion;
        dropdown.style.display = 'none';
    }
}

function toggleDropdownOff(event) {
    if (event.target !== regionButton) {
        dropdown.style.display = 'none';  
    }
}

//hunt overlay
function huntResultOverlay(event) {
    if (event.target === openOverlay) {
        overlay.style.display = 'block';
        console.log("open overlay")
    }
}

function huntResultClose(event) {   
    if (event.target == overlay && !nonOverlay.contains(event.target)) {
        overlay.style.display = 'none';
        console.log("close overlay")
    }    
}

//Monster rank select
var rankIcons = document.querySelectorAll('.rankIcon');
var monsterRankSelected = -1;

rankIcons.forEach(function(icon, index) {
    icon.addEventListener('click', function() {
     
      rankIcons.forEach(function(rank, i) {
        if (i <= index) {
          rank.src = '../icons/star-full.png';
        } else {
          rank.src = '../icons/star-empty.png';
        }
      });
  
      monsterRankSelected = index;
     
    });
  });
}