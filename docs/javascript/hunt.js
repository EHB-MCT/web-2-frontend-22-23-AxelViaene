window.onload=e=>{const t=sessionStorage.getItem("user"),n=JSON.parse(t);let o=[],s="";var l=[17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,44,45,48,49,50,53];try{if(!t)return void(window.location.href="../html/login.html");n?(document.getElementById("authname").innerText=`Welcome ${n.name}`,console.log(`Welcomeeee ${n.name}`)):window.location.href="../html/login.html"}catch(e){console.error("error",e)}var c=document.getElementById("regionDropdown"),a=document.getElementById("regionButton"),r=(document.getElementsByClassName("regionOption"),document.getElementById("overlay")),i=document.getElementById("huntButton"),d=document.getElementById("huntOverlay"),m=document.getElementById("carousel"),g=0,u=[],p=document.getElementById("previousWeapon"),h=document.getElementById("nextWeapon"),y=document.getElementById("carouselNumber");document.addEventListener("click",(function(e){e.target===a&&(c.style.display="block"),e.target.classList.contains("regionOption")&&(s=e.target.textContent,a.textContent=s,c.style.display="none",console.log(s))})),document.addEventListener("click",(function(e){e.target!==a&&(c.style.display="none")})),document.addEventListener("click",(function(e){if(e.target===i){r.style.display="block",console.log(`Rank: ${w}`),console.log(`Region: ${s}`);const e=o[g];console.log("Showing weapon at index:",e.name),async function(){try{var e=[];const t=l.map((async function(t){const n=await fetch(`https://mhw-db.com/monsters/${t}`),o=await n.json();e.push(o)}));await Promise.all(t);const n=e.filter((e=>e.locations.some((e=>e.name===s))));if(console.log("Monsters in selected region:",n),n.length>0){const e=n[Math.floor(Math.random()*n.length)];console.log("Random Monster:",e.name)}else console.log("No monster found in selected region.")}catch(e){console.error("Error fetching monster data:",e)}}()}})),document.addEventListener("click",(function(e){e.target!=r||d.contains(e.target)||(r.style.display="none")})),p.addEventListener("click",(function(){--g<0&&(g=u.length-1),v(g)})),h.addEventListener("click",(function(){++g>=u.length&&(g=0),v(g)}));const f=n.UserId;function v(e){u.forEach(((t,n)=>{t.style.display=n===e?"block":"none"})),y.textContent=e+1+"/"+u.length}fetch("https://web2-course-project.onrender.com/user_greatswords").then((e=>e.json())).then((e=>{var t=e.filter((function(e){return e.UserId===f}));t.sort(((e,t)=>e.GreatswordId-t.GreatswordId)),Object.keys(t).length,Promise.all(t.slice(0,88).map((e=>{const t=e.GreatswordId;return fetch(`https://mhw-db.com/weapons/${t}`).then((e=>e.json()))}))).then((e=>{o=e,e.forEach(((e,t)=>{const n=Object.keys(e.elements).length;let o=`<div class="slide${t+1}">\n                            <div class="greatsword gs1">\n                                <div class="gsInternal">\n                                    <div class="gsTop">\n                                        <p class="gsName">${e.name}<p>\n                                    </div>\n                                    <img class="gsIcon" src="../icons/greatswords/Greatsword${e.rarity}.png" alt="">\n                                    <div class="gsStatsLeft">\n                                        <p>Rarity:${e.rarity}</p>\n                                        <p>Element:</p>\n                                    </div>\n                                    <div class="gsStatsRight">\n                                        <p class="gsAttack">Attack: ${e.attack.display}</p>\n                                        <div class="element">\n                                            <p class="gsElementDamage"></p>`;o+=1===n?`<p class="gsElementDamage">${e.elements[0].damage}</p>\n                                                        <img class="gsElement" src="../icons/elements/water.png" alt="">`:'<p class="gsElementDamage">0</p>',o+="</div>\n                                                    </div>\n                                                </div>";const s=document.createElement("div");s.classList.add("slide"),s.classList.add(`slide${t+1}`),s.innerHTML=o,m.appendChild(s)})),(u=document.querySelectorAll(".slide"))[g].style.display="block",v(g)}))}));var E=document.querySelectorAll(".rankIcon"),w=-1;E.forEach((function(e,t){e.addEventListener("click",(function(){E.forEach((function(e,n){e.src=n<=t?"../icons/star-full.png":"../icons/star-empty.png"})),w=t+1,console.log(w)}))})),document.getElementById("logoutButton").addEventListener("click",(function(){sessionStorage.removeItem("user"),window.location.assign("../html/login.html")}))};