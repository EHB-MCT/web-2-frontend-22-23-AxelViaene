window.onload = (event) => {

    const userdata = sessionStorage.getItem('user');
    const user = JSON.parse(userdata);
    const mainElement = document.getElementById('main');

    //Login authentication
    try {
        if (!userdata) {
            window.location.href = '../html/login.html'
            return
        }

        //check if still logged in
        if (user) {
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
    var carousel = document.getElementById('carousel');
    var currentIndex = 0;
    var slides = [];
    var previousButton = document.getElementById("previousWeapon");
    var nextButton = document.getElementById("nextWeapon");
    var carouselNumber = document.getElementById("carouselNumber");

    document.addEventListener("click", toggleDropdownOn);
    document.addEventListener("click", toggleDropdownOff);
    document.addEventListener("click", huntResultOverlay);
    document.addEventListener("click", huntResultClose);
    previousButton.addEventListener('click', previousWeapon);
    nextButton.addEventListener('click', nextWeapon);

    // Taking UserId from sessionStorage and looking in Users_Greatswords what
    // weapons are owned by this UserId
    const UserId = user.UserId;
    fetch('https://web2-course-project.onrender.com/user_greatswords')
        .then(response => response.json()).then(data => {
            var link = data.filter(function (result) {
                return result.UserId === UserId;
            });

            link.sort((a, b) => a.GreatswordId - b.GreatswordId)

            const weaponCount = Object.keys(link).length

            // fetching MHW apidata based on weapons stored in the user's armory and
            // inserting it in the HTML
            Promise.all(link.slice(0, 88).map(result => {
                    const id = result.GreatswordId
                    return fetch(`https://mhw-db.com/weapons/${id}`).then(
                        response => response.json())
                        })).then(weaponsData => {
                        weaponsData.forEach((apidata, index) => {

                        const elementCount = Object.keys(apidata.elements).length

                        let html = `<div class="slide${index+1}">
                            <div class="greatsword gs1">
                                <div class="gsInternal">
                                    <div class="gsTop">
                                        <p class="gsName">${apidata.name}<p>
                                    </div>
                                    <img class="gsIcon" src="../icons/greatswords/Greatsword${apidata.rarity}.png" alt="">
                                    <div class="gsStatsLeft">
                                        <p>Rarity:${apidata.rarity}</p>
                                        <p>Element:</p>
                                    </div>
                                    <div class="gsStatsRight">
                                        <p class="gsAttack">Attack: ${apidata.attack.display}</p>
                                        <div class="element">
                                            <p class="gsElementDamage"></p>`

                                            if (elementCount === 1) {
                                                html += `<p class="gsElementDamage">${apidata.elements[0].damage}</p>
                                                        <img class="gsElement" src="../icons/elements/water.png" alt="">`
                                            } else {
                                                html += `<p class="gsElementDamage">0</p>`
                                            }
                    
                                            html += `</div>
                                                    </div>
                                                </div>`;
                        
                        const slide = document.createElement('div')
                        slide.classList.add('slide')
                        slide.classList.add(`slide${index + 1}`)
                        slide.innerHTML = html

                        //inserting html
                        carousel.appendChild(slide)
                    });
                    slides = document.querySelectorAll('.slide')
                    slides[currentIndex].style.display = 'block'
                    showWeapon(currentIndex)
                })
        })

    //carousel
    function showWeapon(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none'
        })
        carouselNumber.textContent = (index +1 ) + '/' + slides.length
    }

    function nextWeapon() {
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0
        }
        showWeapon(currentIndex);
    }

    function previousWeapon() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }
        showWeapon(currentIndex);
    }

    //region dropdown
    function toggleDropdownOn(event) {
        if (event.target === regionButton) {
            dropdown.style.display = 'block';
        }
        if (event.target.classList.contains('regionOption')) {
            var selectedRegion = event.target.textContent;
            regionButton.textContent = selectedRegion;
            dropdown.style.display = 'none';
            console.log(selectedRegion)
        }
    }

    function toggleDropdownOff(event) {
        if (event.target !== regionButton) {
            dropdown.style.display = 'none';
        }
    }

    //Monster rank select
    var rankIcons = document.querySelectorAll('.rankIcon');
    var monsterRankSelected = -1;

    rankIcons.forEach(function (icon, index) {
        icon.addEventListener('click', function () {

            rankIcons.forEach(function (rank, i) {
                if (i <= index) {
                    rank.src = '../icons/star-full.png';
                } else {
                    rank.src = '../icons/star-empty.png';
                }
            });

            monsterRankSelected = index;
            console.log(monsterRankSelected+1)
        });
    });

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

    function logout() {
        sessionStorage.removeItem('user')
        window
            .location
            .assign("../html/login.html")
    }

    const logoutButton = document.getElementById('logoutButton')
    logoutButton.addEventListener('click', logout)

}