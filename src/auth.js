window.onload = (event) => {
    try {
        const userdata = sessionStorage.getItem('user');
        if (!userdata) {
            window.location.href = '../html/login.html'
            return
        }
  

    const user = JSON.parse(userdata)

    if(user) {
        document.getElementById.apply('authname').innerText = `Welcome ${user.name}`
        console.log(`Welcomeeee ${user.name}`)
    } else {
        window.location.href = '../html/login.html'
    }
  } catch (error) {
    console.error('error', error)
  }

}



