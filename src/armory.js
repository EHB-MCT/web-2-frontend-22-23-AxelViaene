window.onload = (event) => {

    const userdata = sessionStorage.getItem('user');
    const user = JSON.parse(userdata);
    const mainElement = document.getElementById('main')

    //Login authentication
    try {
        if (!userdata) {
            window.location.href = '../html/login.html'
            return
        }

        if (user) {
            document.getElementById('authname').innerText = `Welcome ${user.name}`
                console.log(`Welcome ${user.name}`)
        } else {
            window.location.href = '../html/login.html'
        }
    } catch (error) {
        console.error('error', error)
    }

    // Taking UserId from sessionStorage and looking in Users_Greatswords what
    // weapons are owned by this UserId
    const UserId = user.UserId;
    fetch('https://web2-course-project.onrender.com/user_greatswords')
        .then(
            response => response.json()
        )
        .then(data => {
            var link = data.filter(function (result) {
                return result.UserId === UserId;
            });

            link.sort((a, b) => a.GreatswordId - b.GreatswordId)

            const weaponCount = Object.keys(link).length

            // fetching MHW apidata based on weapons stored in the user's armory and
            // inserting it in the HTML
            Promise
                .all(link.slice(0, 88).map(result => {
                    const id = result.GreatswordId
                    return fetch(`https://mhw-db.com/weapons/${id}`).then(
                        response => response.json()
                    )
                }))
                .then(weaponsData => {
                    weaponsData.forEach((apidata, index) => {
                        const elementCount = Object.keys(apidata.elements).length
                        const UGSWId = link[index].UserGreatswordId
                        console.log(apidata)

                        let html = `<div class="gsInternal">
                                    <div class="gsTop">
                                        <button class="close-button btn${swordcounter}">
                                            <span class="close-icon">&times;</span>
                                        </button>
                                        <p class="gsName">${apidata.name}
                                        <p>
                                    </div>
                                    <img class="gsIcon" src="../icons/greatswords/Greatsword${apidata.rarity}.png" alt="">
                                    <div class="gsStatsLeft">
                                        <p>Rarity:</p>
                                        <p>Element:</p>
                                    </div>
                                    <div class="gsStatsRight">
                        
                                       <p class="gsAttack">${apidata.rarity}</p>
                                          `

                        if (elementCount === 1) {
                            html += `
                                    <img class="gsElement" src="../icons/elements/${apidata.elements[0].type}.png" alt="">`
                        } else {
                            html += `<p class="noElement">None</p>`
                        }

                        html += `
                        
                                            </div>
                                        </div>`;

                        //inserting html
                        var gsDiv = document.createElement('div')
                        gsDiv.className = `greatsword gs${swordcounter}`
                        gsDiv.id = `${UGSWId}`

                        gsDiv.innerHTML = html
                        mainElement.appendChild(gsDiv)

                        //remove the clicked weapon out of Users_Greatswords
                        var closeButton = gsDiv.getElementsByClassName(`btn${swordcounter}`)[0]
                        closeButton.addEventListener('click', function () {
                            var confirmation = confirm(
                                'Are you sure you want to remove this weapon from your collection?'
                            )
                            if (confirmation) {
                                console.log(`Removed weapon with UserGreatswordId ${UGSWId}`)
                                fetch(
                                    `https://web2-course-project.onrender.com/delete_user_greatsword?usergreatswordid=${UGSWId}`,
                                    {method: 'DELETE'}
                                )
                                setTimeout(function () {
                                    location.reload();
                                }, 2000);

                            } else {
                                console.log("NO DELETE ONLY CLICK")
                            }
                        });
                        swordcounter++;
                    });

                    // to add new weapon: check how many greatsword the user has. if less than 10
                    // then the option for a new sword gets added
                    if (weaponCount < 10) {
                        let newSwordHTML = `
                                <div class="gsInternal">
                                    <div class="gsTop">
                                        <p class="gsName">New weapon</p>
                                    </div>
                                    <p id="newGS" class="newSword">Click here for a new weapon</p>                                
                                </div>`

                        var newGsDiv = document.createElement('div')
                        newGsDiv.className = `greatsword gs${weaponCount + 1}`
                        newGsDiv.innerHTML = newSwordHTML
                        mainElement.appendChild(newGsDiv)
                    } else {
                        null
                    }

                    var addWeapon = document.getElementById('newGS')
                    addWeapon.addEventListener('click', function () {
                        fetch('https://mhw-db.com/weapons/1')
                            .then(response => response.json())
                            .then(newWeapon => {
                                fetch('https://web2-course-project.onrender.com/user_greatswords')
                                    .then(
                                        response => response.json())
                                    .then(currentGSs => {
                                        let availableId = null

                                        //check which id is available
                                        for (let i = 1; i <= currentGSs.length + 1; i++) {
                                            const idTaken = currentGSs.some(obj => obj.UserGreatswordId === i)

                                            if (!idTaken) {
                                                availableId = i
                                                break
                                            }
                                        }
                                        console.log("Available ID:", availableId)
                                        console.log(currentGSs)
                                        let newGreatsword = {}
                                        newGreatsword.UserId = UserId
                                        newGreatsword.GreatswordId = 1
                                        newGreatsword.UserGreatswordId = availableId
                                        postWeapon(
                                            "https://web2-course-project.onrender.com/save_user_greatsword",
                                            "POST",
                                            newGreatsword
                                        ).then(data => {
                                            console.log(data)
                                        })
                                        setTimeout(function () {
                                            location.reload();
                                        }, 2000);
                                    })
                                async function postWeapon(url, method, data) {
                                    let resp = await fetch(url, {
                                        method: method,
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(data)
                                    })
                                    return await resp.json()

                                }
                            })

                    })

                });

            var swordcounter = 1;

        })

    function logout() {
        sessionStorage.removeItem('user')
        window
            .location
            .assign("../html/login.html")
    }

    const logoutButton = document.getElementById('logoutButton')
    logoutButton.addEventListener('click', logout)

}