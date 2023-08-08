window.onload = (event) => {
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

//Taking UserId from sessionStorage and looking in Hunts what monsters have been encountered by this UserId
const UserId = user.UserId;
fetch('https://web2-course-project.onrender.com/hunts').then(response =>
response.json()).then(data => {

var link = data.filter(function(result) {
  return result.UserId === UserId
})

//getting the Id's of the monsters
var allMonsters = link.map(function(result) {
  return result.MonsterId.toString()
})
var uniqueMonsters = new Set(allMonsters)

var HTMLmain = document.getElementById('main');
var monstercounter = 1

//insert all empty monsters
//make list of all monster ID's
var monsterList = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 39,
                  40, 41, 42, 43, 44, 45, 48, 49, 50, 53]
//pull from list and put in div to insert
monsterList.forEach(function(monster) {
let htmldata = 
          `<div id="${monster}" class="monster m${monster} test-section">
          <div class="monsterInternal">
            <img id="img${monster}" class="monsterIcon encyclick" src="../icons/unknown.png" alt="">
            <p id="name${monster}" class="monsterName encyclick"> -</p>
          </div>
          </div>`;
          HTMLmain.insertAdjacentHTML('beforeend', htmldata);
})

//displaying the amount of monsters in user collection
uniqueMonsters.forEach(function(monster) {
  fetch(`https://mhw-db.com/monsters/${monster}`).then(response => 
      response.json()).then(apidata=> {

          let htmldata = 
          `<div id="${monster}" class="monster m${monster} test-section">
          <div class="monsterInternal">
            <img id="img${monster}" class="monsterIcon encyclick" src="../icons/monsters/${apidata.name}.png" alt="">
            <p id="name${monster}" class="monsterName encyclick">${apidata.name}</p>
          </div>
          </div>`;

          HTMLmain.insertAdjacentHTML('beforeend', htmldata);
          monstercounter++;
      })
  })    



//overlay
var overlay = document.getElementById("overlay")
var openOverlay = document.getElementsByClassName("monsterName")
var openOverlay2 = document.getElementsByClassName("monsterIcon")


var overlayHTML = document.getElementById('overlay');
//insert the overlay

var fClick = true
var motherdivId = 1

if (fClick) {
fClick = false
document.addEventListener('click', function (event) {
    var clickedSection = event.target.closest('.test-section')
    if (clickedSection) {
      motherdivId = clickedSection.id;
    } 
  })
}

function on(event) {
  if (Array.from(openOverlay).some(element => element === event.target) || Array.from(openOverlay2).some(element => element === event.target)) 
  {
    fetch(`https://mhw-db.com/monsters/${motherdivId}`).then(response =>
       response.json()).then(apidata => {

        const zoneCount = Math.min(Object.keys(apidata.locations).length, 5);
        const resisCount = Object.keys(apidata.resistances).length
        const weakCount = Object.keys(apidata.weaknesses).length

        if(allMonsters.includes(motherdivId.toString())){
          
          var htmlOverlay = `<div id="monster_page">
        <div class="overlay_left">
          <p class="overlay_monster_species">${apidata.species}</p>
          <p class="overlay_monster_name">${apidata.name}</p>
          <img class="overlay_img" src="../icons/monsters/${apidata.name}.png" alt="">
        </div>
        <div class="overlay_right">
          <p class="overlay_known_regions">Known Regions</p>`

          for (let i = 0; i < zoneCount; i++) {
            htmlOverlay += `<p class="overlay_regions">${apidata.locations[i].name}</p>`;
          }
          
          htmlOverlay += `<p class="overlay_characteristics">Characteristics</p>
          <p class="overlay_description">${apidata.description}</p>
          <div class="overlay_weaknesses">
            <p>Weaknesses</p>`

            if (resisCount >= 1) {
              for (let i = 0; i < resisCount; i++) {
                            htmlOverlay += `<img class="overlay_weaknesses_icon" src="../icons/elements/${apidata.resistances[i].element}.png">`
                          }
            } else {
              htmlOverlay += `<p> None </p>`
            }
            
          htmlOverlay += `</div>
          <div class="overlay_resistances">
            <p>Resistances</p>`
            
            if (weakCount >= 1) {
              for (let i = 0; i < weakCount; i++) {
                if (apidata.weaknesses[i].stars === 3)
                htmlOverlay += `<img class="overlay_resistances_icon" src="../icons/elements/${apidata.weaknesses[i].element}.png">`
              }
            }
            htmlOverlay += `</div>
            </div>
          </div>`;
    
          overlayHTML.insertAdjacentHTML('beforeend', htmlOverlay)
          overlay.style.display = 'block';
        } else {
          console.log("Monster not discovered by user")
        }    
    })
  }
}

 
 
 function off(event) {   
     if (event.target == overlay) {
      resetOverlay()
         overlay.style.display = 'none';
     }    
 }

 function resetOverlay(){
  document.getElementById('overlay').innerHTML = ``
}

document.addEventListener("click", on)
document.addEventListener("click", off);

}) 

function logout() {
  sessionStorage.removeItem('user')
  window.location.assign("../html/login.html")
}

const logoutButton = document.getElementById('logoutButton')
logoutButton.addEventListener('click', logout)

}

