window.onload=e=>{try{const e=sessionStorage.getItem("user");if(!e)return void(window.location.href="../html/login.html");const o=JSON.parse(e);o?(document.getElementById.apply("authname").innerText=`Welcome ${o.name}`,console.log(`Welcomeeee ${o.name}`)):window.location.href="../html/login.html"}catch(e){console.error("error",e)}};