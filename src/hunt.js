window.onload = (event) => {

    const userdata = sessionStorage.getItem('user');
    const user = JSON.parse(userdata);
    let link = ''
    let weaponsData = []
    let selectedRegion = ''
    var monsterList = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 39,
        40, 41, 42, 43, 44, 45, 48, 49, 50, 53]
    let randomMonster = ''
    let elementModifier = 0
    const rankIcons = document.querySelectorAll('.rankIcon');
    const mainElement = document.getElementById('main')
    const overlay = document.getElementById('overlay')
    var monsterRankSelected = -1;
    const regionStars = {
        'Ancient Forest': 1,
        'Wildspire Waste': 3,
        'Coral Highlands': 5,
        'Rotten Vale': 7,
        "Elder's Recess": 8
    }

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
            link = data.filter(function (result) {
                return result.UserId === UserId;
            });

            link.sort((a, b) => a.GreatswordId - b.GreatswordId)
            console.log(link)
            const weaponCount = Object.keys(link).length

            // fetching MHW apidata based on weapons stored in the user's armory and
            // inserting it in the HTML
            Promise.all(link.slice(0, 88).map(result => {
                    const id = result.GreatswordId
                    return fetch(`https://mhw-db.com/weapons/${id}`).then(
                        response => response.json())
                        })).then(data => {
                        weaponsData = data
                        data.forEach((apidata, index) => {

                        const elementCount = Object.keys(apidata.elements).length
                     

                        let html = `<div class="slide${index+1}">
                            <div class="greatsword gs1">
                                <div class="gsInternal">
                                    <div class="gsTop">
                                        <p class="gsName">${apidata.name}<p>
                                    </div>
                                    <img class="gsIcon" src="../icons/greatswords/Greatsword${apidata.rarity}.png" alt="">
                                    <div class="gsStatsLeft">
                                        <p>Rarity:</p>
                                        <p>Element:</p>
                                    </div>
                                    <div class="gsStatsRight">
                                        <p class="gsAttack">${apidata.rarity}</p>
                                        
                                            <p class="gsElementDamage"></p>`

                                            if (elementCount === 1) {
                                                html += `<img class="gsElement" src="../icons/elements/${apidata.elements[0].type}.png" alt="">`
                                            } else {
                                                html += `<p class="noElement">None</p>`
                                            }
                    
                                            html += `
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
            selectedRegion = event.target.textContent;
            regionButton.textContent = selectedRegion;
            dropdown.style.display = 'none';

            monsterRankSelected = regionStars[selectedRegion]

            rankIcons.forEach((icon, index) => {
                if (index < monsterRankSelected) {
                    icon.src = '../icons/star-full.png'
                } else {
                    icon.src = '../icons/star-empty.png'
                }
            })
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

            //gather chosen weapon, monsterrank and region
            const currentWeaponApidata = weaponsData[currentIndex]
            const currentWeaponId = currentWeaponApidata.id
            console.log('------------------')

            //Based on region, get a monster from mhwAPI
            async function fetchMonsters() {
            
                try {
                    var monstersArray = []; // Initialize the array

                    const fetchPromises = monsterList.map(async function(monster) {
                        const response = await fetch(`https://mhw-db.com/monsters/${monster}`)
                         const allMonsterData = await response.json()
                        monstersArray.push(allMonsterData)
                    })

                    await Promise.all(fetchPromises)
                    const filteredByLocation = monstersArray.filter(monsterData => {
                        return monsterData.locations.some(location => location.name === selectedRegion)
                        })
            
                    // console.log('Monsters in selected region:', filteredByLocation)

                    //get random monster from filtered location list
                    if (filteredByLocation.length > 0) {
                        const randomIndex = Math.floor(Math.random()* filteredByLocation.length)
                        randomMonster = filteredByLocation[randomIndex]
                        console.log('Random Monster:', randomMonster.name)
                    } else {
                        console.log('No monster found in selected region.')
                    }

                } catch (error) {
                    console.error('Error fetching monster data:', error)
                }
            
            }
            fetchMonsters().then(async ()=> {
            //calculate difference in rank between monster and weapon

            // console.log(monsterRankSelected)
            console.log(currentWeaponApidata)

            const rankDif = currentWeaponApidata.rarity - monsterRankSelected

            //check for resistances and weaknesses between monster and weapon
          

            const elementCount = currentWeaponApidata.elements.length
            //check if weapon has element
            if (elementCount === 1) {
                const weaponElement = currentWeaponApidata.elements[0].type
                const isResistant = randomMonster.resistances.some(resistance => resistance.element === weaponElement)
                //check if monster is resistant
                if (isResistant) {
                    console.log('resistant')
                    elementModifier = -20
                } else {
                    console.log('not resistant')
                    //check if monster is weak (3 stars)
                    const isWeak = randomMonster.weaknesses.some(weakness => weakness.stars === 3 && weakness.element === weaponElement)
                    if (isWeak) {
                        elementModifier = 20
                        console.log('is weak')
                    } else {
                        console.log('not weak, so neutral')
                    }
                }
            }            
            

            //calculate hunt based on rankdifference, resis/weak & default succesrate
            const defaultResult = 75 + Math.random()*10
            const battleResult = defaultResult + rankDif*20 + elementModifier
            console.log('random:',battleResult)
            

            //determine success/failure
            const succes = Math.random()*100
                if (battleResult > succes) {
                    console.log('succes')
                    overlayHuntWin()
                    //success = save hunt
                    try {
                        await fetch('https://web2-course-project.onrender.com/hunts').then(response => response.json())
                        .then(async currentHunts => {
                        let availableHuntId = 10000

                        for (let i = 1; i<= currentHunts.length + 1; i++) {
                            const idTaken = currentHunts.some(obj => obj.HuntId === i)

                            if (!idTaken) {
                                availableHuntId = i
                                break
                            }
                        }

                        let newHunt = {}
                        newHunt.UserId = UserId
                        newHunt.GreatswordId = currentWeaponApidata.id
                        newHunt.MonsterId = randomMonster.id
                        newHunt.location = selectedRegion
                        newHunt.HuntId = availableHuntId

                        await postHunt(
                            "https://web2-course-project.onrender.com/save_hunt",
                            "POST",
                            newHunt
                        ).then(data => {
                            console.log(data)
                        })

                    })
                    } catch (error) {
                        console.error('Error during saving hunt', error)
                    }
                     

                    //add upgraded weapon if possible
                    const craftingData = currentWeaponApidata.crafting
                    if (craftingData.branches && craftingData.branches.length > 0) {
                        const randomBranchIndex = Math.floor(Math.random() * craftingData.branches.length)
                        const randomBranch = craftingData.branches[randomBranchIndex]
                        console.log('Random Branch:', randomBranch)


                         //check available id
                        let availableUGSId = null
                        for (let i = 1; i <= link.length +1; i++) {
                            const UGSIdTaken = link.some(obj => obj.UserGreatswordId === i)

                            if (!UGSIdTaken) {
                                availableUGSId = i
                                break
                            }
                        }

                        let newUser_Greatsword = {}
                        newUser_Greatsword.UserId = UserId
                        newUser_Greatsword.GreatswordId = randomBranch
                        newUser_Greatsword.UserGreatswordId = availableUGSId
                        console.log(newUser_Greatsword)

                        // post upgrade user_greatsword
                        try {
                            await postUpgrade(
                            "https://web2-course-project.onrender.com/save_user_greatsword",
                            "POST",
                            newUser_Greatsword
                        )

                        const deleteResponse = await fetch(
                            `https://web2-course-project.onrender.com/delete_UGS_by_id?UserId=${UserId}&GreatswordId=${currentWeaponId}`,
                            {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                        )

                        if (deleteResponse.ok) {
                            console.log("downgrade and removal succes")
                        } else {
                            console.log("Error during removal: HTTP status:", deleteResponse.status)
                        }

                        console.log('upgrade and removal complete')
                        } catch (error) {
                            console.error('error during upgrade and removal', error)
                        }

                    } else {
                        console.log('No branches available.')
                    }
                    

                } else {
                    //failed hunt
                    console.log('fail')
                    overlayHuntFail()
                    const crafting = currentWeaponApidata.crafting
                    //check if there is a previous version of the weapon to rollback to
                    if (crafting.previous) {
                        const rollback = crafting.previous
                        console.log('Previous weapon ID:', rollback)

                    

                        //check available id
                        let availableUGSId = null
                        for (let i = 1; i <= link.length +1; i++) {
                            const UGSIdTaken = link.some(obj => obj.UserGreatswordId === i)

                            if (!UGSIdTaken) {
                                availableUGSId = i
                                break
                            }
                        }

                        let newUser_Greatsword = {}
                        newUser_Greatsword.GreatswordId = rollback
                        newUser_Greatsword.UserGreatswordId = availableUGSId
                        newUser_Greatsword.UserId = UserId
                        console.log(newUser_Greatsword)

                        //post downgrade user_greatsword
                        try { 
                            console.log('newUser_Greatsword', newUser_Greatsword)
                            await postDowngrade(
                            "https://web2-course-project.onrender.com/save_user_greatsword",
                            "POST",
                            newUser_Greatsword
                        )
                            // remove 'old' weapon
                             const deleteResponse = await fetch(
                                `https://web2-course-project.onrender.com/delete_UGS_by_id?UserId=${UserId}&GreatswordId=${currentWeaponId}`,
                                {method: 'DELETE'}
                            )
                            if (deleteResponse.ok) {
                                console.log("downgrade and removal succes")
                            } else {
                                console.log("Error during removal: HTTP status:", deleteResponse.status)
                            }
                            console.log("Downgrade and removal complete")
                        } catch (error) {
                            console.error('Error during downgrade and removal', error)
                            console.error('Error response:', error.response)
                            console.error('Response data:', error.data)
                        }

                        
                    }
                }
                
                
            })
            
           

        }
    }

    async function postHunt(url, method, data) {
        try {
          const resp = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(!resp.ok) {
            throw new Error(`Request failed with status: ${resp.status}`)
        }
        const responseData = await resp.text()
        console.log('Response Data:', responseData)
        return responseData
        } catch (error) {
            console.error('Error during API call', error)
            throw error
        }
        
    }

    async function postUpgrade(url, method, data) {
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`)
            }

          return response.text()
        } catch (error) {
            console.error('Error during upgrade API call', error)
            throw error
        }                   
    }

    async function postDowngrade(url, method, data) {
        try {
            const resp = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!resp.ok) {
            throw new Error(`Request failed with status: ${resp.status}`)
        }

        const responseData = await resp.text()
        console.log('Response Data:', responseData)
        return responseData
        return await resp.json()
        } catch (error) {
            console.error('Error during API call', error)
            throw error
        }   
    }

    function overlayHuntWin() {
        const huntOverlay = document.getElementById('huntOverlay')
        console.log('hi')
        let html = ` <p class="huntResult">SUCCES</p>
        <img class="overlayMonster" src="../icons/monsters/${randomMonster.name}.png" alt="">
        <p class="huntMessage">You successfully hunted a:</p>
        <p class="rankMonster">${randomMonster.name}</p>`

        huntOverlay.innerHTML = html
        overlay.appendChild(huntOverlay)
    }

    function overlayHuntFail() {
        const huntOverlay = document.getElementById('huntOverlay')

        let html = `<p class="huntResult">FAIL</p>
        <img class="overlayMonster" src="../icons/monsters/${randomMonster.name}.png" alt="">
        <p class="huntMessage">You failed to hunted a:</p>
        <p class="rankMonster">?</p>`

        huntOverlay.innerHTML = html
        overlay.appendChild(huntOverlay)
    }

    function huntResultClose(event) {
        if (event.target == overlay && !nonOverlay.contains(event.target)) {
            overlay.style.display = 'none';
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