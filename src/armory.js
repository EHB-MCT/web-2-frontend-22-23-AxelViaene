const { forEach } = require("lodash");

window.onload = (event) => {
console.log('armory.js is loaded')

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
        console.log(`Welcomeeee ${user.name}`)
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
        // console.log(data);

        var link = data.filter(function(result) {
            return result.UserId === UserId;
        });
        // console.log(link)

        //getting the Id's of the greatswords
        var greatswords = link.map(function(result) {
            return result.GreatswordId
        })

        var HTMLmain = document.getElementById('main');
        var swordcounter = 1;
        
        //displaying the amount of greatswords in user collection
        greatswords.forEach(function(greatsword) {
            fetch(`https://mhw-db.com/weapons/${greatsword}`).then(response =>
            response.json()).then(apidata => {

               
                let html = `<div class="greatsword gs${swordcounter}">
                <div class="gsInternal">
                    <div class="gsTop">
                        <button class="close-button">
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
                            <p class="gsElementDamage">${apidata.elements[0].damage}</p>
                            <img class="gsElement" src="../icons/elements/${apidata.elements[0].type}.png" alt="">
                        </div>
                    </div>
                </div>
            </div>`;
                HTMLmain.insertAdjacentHTML('beforeend', html)
                swordcounter++;
            })
       })
})
}