window.onload=e=>{let o=JSON.parse(sessionStorage.getItem("user"));console.log(o),o?(document.getElementById("authname").innerText=`Welcome ${o.name}`,console.log(`Welcomeeee ${o.name}`)):window.location.href="../html/login.html"};