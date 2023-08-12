window.onload = (event) => {
  

                document.getElementById('form').addEventListener("submit", event => {
                event.preventDefault()
                let user = {}
                user.name = document.getElementById('registerUsername').value;
                user.email = document.getElementById('registerEmail').value;
                user.password = document.getElementById('registerPassword').value;
                user.passwordconfirm = document.getElementById('confirmregisterPassword').value;

                //check the passwords
                if(user.password == user.passwordconfirm) {
                    //register the user
                    getData("https://web2-course-project.onrender.com/saveusers", "POST", user).then(data => {
                        alert(data.message)
                    })
                } else {
                    alert("Passwords do not match.")
                }   
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

        const loginButton = document.getElementById('loginButton');
        loginButton.addEventListener('click', function() {
            window.location.href = 'login.html';
        });

}