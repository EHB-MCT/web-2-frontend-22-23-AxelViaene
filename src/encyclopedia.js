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

//Taking UserId from sessionStorage and looking in Users_Greatswords what weapons are owned by this UserId
const UserId = user.UserId;
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
var overlayHTML = document.getElementById('overlay');
var monstercounter = 1

//displaying the amount of monsters in user collection
uniqueMonsters.forEach(function(monster) {
    fetch(`https://mhw-db.com/monsters/${monster}`).then(response => 
        response.json()).then(apidata=> {
            console.log(apidata)
            console.log(apidata.name)


            let htmldata = 
            `<div class="monster monster${monstercounter}">
            <div class="monsterInternal">
              <img class="monsterIcon" src="../icons/monsters/${apidata.name}.png" alt="">
              <p class="monsterName" id="monstername${monstercounter}">${apidata.name}</p>
            </div>
            </div>`;

            let overlaydata = `<div id="monster_page${monstercounter}">
            <div class="overlay_left">
              <p class="overlay_monster_species">Flying Wyvern</p>
              <p class="overlay_monster_name">${apidata.name}</p>
              <img class="overlay_img" src="../icons/monsters/Behemoth.png" alt="">
            </div>
            <div class="overlay_right">
              <p class="overlay_known_regions">Known Regions</p>
              <p class="overlay_regions">Ancient Forest</p>
              <p class="overlay_regions">Ancient Forest</p>
              <p class="overlay_regions">Ancient Forest</p>
              <p class="overlay_regions">Ancient Forest</p>
              <p class="overlay_regions">Ancient Forest</p>
              <p class="overlay_characteristics">Characteristics</p>
              <p class="overlay_description">A nefarious flying wyvern that travels the New World in search of prey. It
                scatters explosive scales over a wide area to prey on whatever gets caught in the blast.</p>
              <div class="overlay_weaknesses">
                <p>Weaknesses</p>
                <img class="overlay_weaknesses_icon" src="../icons/elements/Dragon.png" alt="">
                <img class="overlay_weaknesses_icon" src="../icons/elements/Poison.png" alt="">
                <img class="overlay_weaknesses_icon" src="../icons/elements/Water.png" alt="">
              </div>
              <div class="overlay_resistances">
                <p>Resistances</p>
                <img class="overlay_resistances_icon" src="../icons/elements/Fire.png" alt="">
              </div>
            </div>
          </div>`

            HTMLmain.insertAdjacentHTML('beforeend', htmldata);
            overlayHTML.insertAdjacentHTML('beforeend', overlaydata)
            monstercounter++;
        })
    })
})  

   //overlay
   var overlay = document.getElementById("overlay")
   var openOverlay = document.getElementsByClassName("monsterName")
   var openOverlay2 = document.getElementsByClassName("monsterIcon")
   
   function on(event) {
       if (Array.from(openOverlay).some(element => element === event.target) || Array.from(openOverlay2).some(element => element === event.target)) {
           overlay.style.display = 'block';
       }
   }
   
   function off(event) {   
       if (event.target == overlay) {
           overlay.style.display = 'none';
       }    
   }
   
   document.addEventListener("click", on)
   document.addEventListener("click", off);


}

