window.onload = (event) => {

    let user = JSON.parse(sessionStorage.getItem('user'))
console.log(user)

if(user) {
    document.getElementById('authname').innerText = `Welcome ${user.name}`
    console.log(`Welcomeeee ${user.name}`)
} else {
    window.location.href = "../html/login.html"
}
}



