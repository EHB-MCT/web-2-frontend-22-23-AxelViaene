window.onload = (event) => {

let user = sessionStorage.getItem('user')

if(user) {
    console.log(`Welcome ${user.name}`)
} else {
    window.location.href = "../html/login.html"
}



}