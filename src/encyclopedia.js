window.onload = (event) => {
    console.log('load encycopedia.js')

    try {
        const userdata = sessionStorage.getItem('user');
        if (!userdata) {
            window.location.href = '../html/login.html'
            return
        }

    const user = JSON.parse(userdata)
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
        console.log("open overlay")
    }
}

function off(event) {   
    if (event.target == overlay && !nonOverlay.contains(event.target)) {
        overlay.style.display = 'none';
        console.log("close overlay")
    }    
}

document.addEventListener("click", on)
document.addEventListener("click", off);

}

