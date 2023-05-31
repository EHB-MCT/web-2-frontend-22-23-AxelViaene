window.onload = (event) => {
    console.log('load encycopedia.js')
    const userdata = sessionStorage.getItem('user');
    const user = JSON.parse(userdata)

    //authentication
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

var overlay = document.getElementById("overlay")
var nonOverlay = document.getElementById("monster_page");
var openOverlay = document.getElementsByClassName("monsterName")
var openOverlay2 = document.getElementsByClassName("monsterIcon")

function on(event) {
    if (Array.from(openOverlay).some(element => element === event.target) || Array.from(openOverlay2).some(element => element === event.target)) {
        overlay.style.display = 'block';
    }
}

function off(event) {   
    if (event.target == overlay && !nonOverlay.contains(event.target)) {
        overlay.style.display = 'none';
    }    
}

document.addEventListener("click", on)
document.addEventListener("click", off);

//Taking UserId from sessionStorage and looking in Users_Greatswords what weapons are owned by this UserId
const UserId = user.UserId;
console.log(UserId)
fetch('https://web2-course-project.onrender.com/hunts').then(response =>
response.json()).then(data => {
  
var link = data.filter(function(result) {
    return result.UserId === UserId
})

//getting the Id's of the monsters
var allMonsters = link.map(function(result) {
    return result.MonsterId
})
var uniqueMonsters = new Set(allMonsters)
console.log(uniqueMonsters)

var HTMLmain = document.getElementById('main');
var monstercounter = 1

//displaying the amount of monsters in user collection
uniqueMonsters.forEach(function(monster) {
    fetch(`https://mhw-db.com/monsters/${monster}`).then(response => 
        response.json()).then(apidata=> {
            console.log(apidata)
            console.log(apidata.name)


            let html = 
            `<div class="monster monster${monstercounter}">
            <div class="monsterInternal">
              <img class="monsterIcon" src="../icons/monsters/${apidata.name}.png" alt="">
              <p class="monsterName">${apidata.name}</p>
            </div>
            </div>`;

            HTMLmain.insertAdjacentHTML('beforeend', html)
            monstercounter++;
        })
    })

    //overlay
    

})  
}

