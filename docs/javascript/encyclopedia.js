window.onload=e=>{console.log("load encycopedia.js");const n=sessionStorage.getItem("user"),t=JSON.parse(n);try{if(!n)return void(window.location.href="../html/login.html");t?(document.getElementById("authname").innerText=`Welcome ${t.name}`,console.log(`Welcomeeee ${t.name}`)):window.location.href="../html/login.html"}catch(e){console.error("error",e)}var o=document.getElementById("overlay"),s=document.getElementById("monster_page"),r=document.getElementsByClassName("monsterName"),c=document.getElementsByClassName("monsterIcon");document.addEventListener("click",(function(e){(Array.from(r).some((n=>n===e.target))||Array.from(c).some((n=>n===e.target)))&&(o.style.display="block")})),document.addEventListener("click",(function(e){e.target!=o||s.contains(e.target)||(o.style.display="none")}));const m=t.UserId;console.log(m),fetch("https://web2-course-project.onrender.com/hunts").then((e=>e.json())).then((e=>{var n=e.filter((function(e){return e.UserId===m})).map((function(e){return e.MonsterId})),t=new Set(n);console.log(t);var o=document.getElementById("main"),s=1;t.forEach((function(e){fetch(`https://mhw-db.com/monsters/${e}`).then((e=>e.json())).then((e=>{console.log(e),console.log(e.name);let n=`<div class="monster monster${s}">\n            <div class="monsterInternal">\n              <img class="monsterIcon" src="../icons/monsters/${e.name}.png" alt="">\n              <p class="monsterName">${e.name}</p>\n            </div>\n            </div>`;o.insertAdjacentHTML("beforeend",n),s++}))}))}))};