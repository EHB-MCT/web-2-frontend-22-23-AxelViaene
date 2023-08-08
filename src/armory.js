const { delay } = require("lodash");

window.onload = (event) => {

const userdata = sessionStorage.getItem('user');
const user = JSON.parse(userdata);

    //Login authentication 
    try {
        if (!userdata) {
            window.location.href = '../html/login.html'
            return
        }

    if(user) {
        document.getElementById('authname').innerText = `Welcome ${user.name}`
        console.log(`Welcome ${user.name}`)
        } else {
        window.location.href = '../html/login.html'
        }
    } catch (error) {
        console.error('error', error)
    }

    //Taking UserId from sessionStorage and looking in Users_Greatswords what weapons are owned by this UserId
    const UserId = user.UserId;
    fetch('https://web2-course-project.onrender.com/user_greatswords').then(response => 
    response.json()).then(data => {
        var link = data.filter(function(result) {
            return result.UserId === UserId;
        });

        link.sort((a, b) => a.GreatswordId - b.GreatswordId)

        const weaponCount = Object.keys(link).length
        console.log(link)

        //fetching MHW apidata based on weapons stored in the user's armory and inserting it in the HTML
        Promise.all(link.slice(0, 88).map(result => {
            const id = result.GreatswordId
            return fetch(`https://mhw-db.com/weapons/${id}`).then(response => response.json())
            })).then(weaponsData => {   
            weaponsData.forEach((apidata, index) => {

                const elementCount = Object.keys(apidata.elements).length
                const UGSWId = link[index].UserGreatswordId
                console.log(UGSWId)

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
                                        <p>Rarity:${apidata.rarity}</p>
                                        <p>Element:</p>
                                    </div>
                                    <div class="gsStatsRight">
                                        <p class="gsAttack">Attack: ${apidata.attack.display}</p>
                                        <div class="element">
                                            <p class="gsElementDamage"></p>`

                                            if (elementCount === 1){
                                                html += `<p class="gsElementDamage">${apidata.elements[0].damage}</p>
                                                <img class="gsElement" src="../icons/elements/water.png" alt="">`
                                            } else {
                                                html += `<p class="gsElementDamage">0</p>`
                                            }

                                            html += `</div>
                                            </div>
                                        </div>`;

                            
                            //inserting html
                            var gsDiv = document.createElement('div')
                            gsDiv.className = `greatsword gs${swordcounter}`
                            gsDiv.id = `${UGSWId}`
                            
                            gsDiv.innerHTML = html
                            var mainElement = document.getElementById('main')
                            mainElement.appendChild(gsDiv)

                            //remove the clicked weapon out of Users_Greatswords
                            var closeButton = gsDiv.getElementsByClassName(`btn${swordcounter}`)[0]
                            closeButton.addEventListener('click', function() {
                                    var confirmation = confirm('Are you sure you want to remove this weapon from your collection?')
                                    if(confirmation) {
                                    console.log("Deleted")
                                    function removeWeapon() {
                                        var parentDiv = closeButton.parentNode.parentNode
                                        var removedWeaponId = parentDiv.id
                                        console.log(`Removed weapon with UserGreatswordId ${UGSWId}`)
                                    }
                                    removeWeapon()

                                    fetch(`https://web2-course-project.onrender.com/delete_user_greatsword?usergreatswordid=${UGSWId}`, {
                                        method: 'DELETE'
                                    })

                                    } else {
                                        console.log("NO DELETE ONLY CLICK")
                                    }
                                    
                            });
                            // move the variables and if statement around so it can reach parts outside of the forEach funtion
                            swordcounter++;

            });
        });

        

        //getting the Id's of the greatswords
        var greatswords = link.map(function(result) {
            return result.GreatswordId
        })
        var swordcounter = 1;
        console.log(greatswords)
    
        //displaying the amount of greatswords in user collection
        // greatswordIds.forEach(function(i) {
        //     fetch(`https://mhw-db.com/weapons/${i}`).then(response =>
        //     response.json()).then(apidata => {

        //         console.log(apidata)

                
          
        //     })
        // })
       //to add new weapon:
       //check how many greatsword the user has. if less than 8?10? then the option for a new swords gets added
})
}