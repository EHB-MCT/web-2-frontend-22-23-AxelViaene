window.onload=e=>{console.log("load encycopedia.js");var o=document.getElementById("overlay"),t=document.getElementById("monster_page"),n=document.getElementsByClassName("monsterName"),l=document.getElementsByClassName("monsterIcon");document.addEventListener("click",(function(e){(Array.from(n).some((o=>o===e.target))||Array.from(l).some((o=>o===e.target)))&&(o.style.display="block",console.log("open overlay"))})),document.addEventListener("click",(function(e){e.target!=o||t.contains(e.target)||(o.style.display="none",console.log("close overlay"))}))};