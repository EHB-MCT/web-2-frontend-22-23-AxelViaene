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
// console.log(uniqueMonsters)

var HTMLmain = document.getElementById('main');
var monstercounter = 1

//displaying the amount of monsters in user collection
uniqueMonsters.forEach(function(monster) {
    fetch(`https://mhw-db.com/monsters/${monster}`).then(response => 
        response.json()).then(apidata=> {
            // console.log(apidata)
            // console.log(apidata.name)


            let htmldata = 
            `<div class="monster monster${monstercounter}">
            <div class="monsterInternal">
              <img id="monsterIcon${monstercounter}" src="../icons/monsters/${apidata.name}.png" alt="">
              <p id="monsterName${monstercounter}">${apidata.name}</p>
            </div>
            </div>`;

            HTMLmain.insertAdjacentHTML('beforeend', htmldata);
            monstercounter++;
        })
    })
})

   //overlay
   var overlay = document.getElementById("overlay")
   var openOverlay = document.querySelectorAll("#monsterName1, #monstername2")
   var openOverlay2 = document.querySelectorAll("#monsterIcon1, #monsterIcon2")
   console.log(openOverlay)
//    var monsterSections = document.querySelectorAll('.monsterIcon, .monsterName');
//    console.log(Array.from(monsterSections))

   //saving specific clicked monster
   monsterSections.forEach(function(section) {
    section.addEventListener('click', function(event) {
        var clickedElement = event.target;
        if(clickedElement.classList.contains('monsterIcon') || clickedElement.classList.contains('monsterName')) {
            var monsterCard = section;
            console.log(monsterCard)
        }
    })
   })
   
   function on(event) {
       if (Array.from(openOverlay).some(element => element === event.target) || Array.from(openOverlay2).some(element => element === event.target)) {
        // openOverlay.parentElement.style.display = 'flex'
        
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

