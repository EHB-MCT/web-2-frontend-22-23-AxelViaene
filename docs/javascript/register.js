window.onload=e=>{document.getElementById("form").addEventListener("submit",(e=>{e.preventDefault();let t={};t.name=document.getElementById("registerUsername").value,t.email=document.getElementById("registerEmail").value,t.password=document.getElementById("registerPassword").value,t.passwordconfirm=document.getElementById("confirmregisterPassword").value,t.password==t.passwordconfirm?async function(e,t,n){let o=await fetch("https://web2-course-project.onrender.com/saveusers",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});return await o.json()}(0,0,t).then((e=>{alert(e.message)})):alert("Passwords do not match.")})),document.getElementById("loginButton").addEventListener("click",(function(){window.location.href="login.html"}))};