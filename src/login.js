window.onload = (event) => {
  
    document.getElementById('form').addEventListener("submit", event => {
                event.preventDefault()
                let user = {}
                user.email = document.getElementById('loginUsername').value;
                user.password = document.getElementById('loginPassword').value;

                console.log(user.email, user.password);
        
                //check for login
                getData("https://web2-course-project.onrender.com/loginuser", "POST", user).then(result => {
                    sessionStorage.setItem('user', JSON.stringify(result.data))
                    
                })
            })
        
    async function getData(url, method, data){
        let resp = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await resp.json();
    }

    const registerButton = document.getElementById('registerButton');
    registerButton.addEventListener('click', function() {
        window.location.href = 'register.html';
    });

}