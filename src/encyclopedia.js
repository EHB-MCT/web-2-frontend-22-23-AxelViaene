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
            <img id="img${monster}" class="monsterIcon encyclick" src="../icons/monsters/Kirin.png" alt="">
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
      console.log(motherdivId)
    } 
  })
}

function on(event) {
  if (Array.from(openOverlay).some(element => element === event.target) || Array.from(openOverlay2).some(element => element === event.target)) 
  {
    fetch(`https://mhw-db.com/monsters/${motherdivId}`).then(response =>
       response.json()).then(apidata => {
        console.log(motherdivId)
        console.log(apidata)

        

        var htmlOverlay = `<div id="monster_page">
        <div class="overlay_left">
          <p class="overlay_monster_species">Flying Wyvern</p>
          <p class="overlay_monster_name">${apidata.name}</p>
          <img class="overlay_img" src="../icons/monsters/${apidata.name}.png" alt="">
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
      </div>`;
    
      overlayHTML.insertAdjacentHTML('beforeend', htmlOverlay)
    
            
      overlay.style.display = 'block';


       })

  // uniqueMonsters.forEach(function(monster) {
  //     fetch(`https://mhw-db.com/monsters/${monster}`).then(response =>
  //     response.json()).then(apidata => {
        
       

  //       //apidata WHERE apidata.id = motherdivId
  //       var monsterArray = Object.values(apidata)

  //       var clickedMotherId = typeof motherdivId === 'string' ? parseInt(motherdivId) : motherdivId

  //       // var clickedMonster = apidata[clickedMonsterId]
  //       var compareIds = monsterArray.find(({id}) => id === clickedMotherId)
  //       console.log(monsterArray)

  //       //WORKS FROM HERE ON
  //       //log to check if the clicked monster is in the users collection
  //       // console.log("Is motherdivId in allMonsters?", allMonsters.includes(motherdivId.toString()))

  //       // console.log("apidata:", apidata)

        
  //       const monsters = [];
  //       for (let i = 0; i < apidata.length; i += 2) {
  //         const monsterId = apidata[i];
  //         const monsterProps = apidata[i + 1];
  //         console.log(monsterId)
  //       const monsterObj = {
  //         id: monsterId,
  //         type: monsterProps[0],
  //         species: monsterProps[1],
  //         name: monsterProps[3],
  //         description: monsterProps[4],
  //         zones: monsterProps[6],
  //         resistances: monsterProps[7],
  //         weaknesses: monsterProps[8]
  //       }
  //       monsters.push(monsterObj)
  //     }
      
      

  //       // console.log("monsterArray:", monsterArray)
  //       var clickedMonster = monsterArray.find(monster => monster.id === motherdivId)
  //       // console.log("ClickedMonster",clickedMonster)

  //       if(clickedMonster) {
  //         var clickedMonsterName = clickedMonster.name
  //         console.log("Clicked Monster Name:", clickedMonsterName)
  //       } else {
  //         console.log("Monster not found for MotherDivId", motherdivId)
  //       }
        

  //       // var filteredMonster2 = {}
  //       // for (var key in apidata) {
  //       //   if (apidata[key] && apidata[key].id === motherdivId) {
  //       //     filteredMonster2[key] = apidata[key]
  //       //   }
  //       // }
        
  //       // console.log(JSON.stringify(filteredMonster2, null, 2))
  //       // console.log(filteredMonster2)

  //       // var filteredMonster = apidata.filter(monster => monster.id === motherdivId)
  //       // console.log(filteredMonster)


        
  //     })
  //   console.log("test2")
  // })
  
  
  }

    // if (fClick) {
    //   fClick = false
    //   document.addEventListener('click', function (event) {
    //       var clickedSection = event.target.closest('.test-section')
    //       if (clickedSection) {
    //         var motherdivId = clickedSection.id;
    //         console.log(motherdivId)
    //       } 
    //     })
    // }

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
}

