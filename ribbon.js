/* Studio Pakiza — launch logic: auto-open on 27 Oct 2026, ribbon cutting for the first 3 days, launch offer bar */
(function(){
const LAUNCH=new Date('2026-10-27T00:00:00+05:00').getTime();
const END=new Date('2026-10-30T00:00:00+05:00').getTime();
const now=Date.now();
const page=(location.pathname.split('/').pop()||'index.html');
const isComing=!!document.getElementById('cd');
if(isComing&&now>=LAUNCH){location.replace('home.html');return}

/* offer bar on pages that don't already have one */
const OFFER='🎉 Launch offer: the first 100 customers get <b>50% OFF</b>';
if(!document.querySelector('.prebook')&&!isComing){
 const b=document.createElement('div');
 b.style.cssText='background:linear-gradient(90deg,#3a1f5c,#6b4bd6);color:#fff;text-align:center;font:600 14px Inter,system-ui,sans-serif;padding:9px 14px;position:relative;z-index:60';
 b.innerHTML=OFFER+' — <a href="#" style="color:#FFE14D;text-decoration:underline" onclick="var c=document.querySelector(\'.spc-btn\');if(c)c.click();return false">book now</a>';
 document.body.insertBefore(b,document.body.firstChild);
}

/* ribbon cutting: first 3 days after launch, once per visitor per day */
if(isComing||now<LAUNCH||now>=END)return;
let seen=null;try{seen=localStorage.getItem('sp_ribbon')}catch(e){}
const today=new Date().toDateString();
if(seen===today&&!/ribbon=1/.test(location.search))return;
try{localStorage.setItem('sp_ribbon',today)}catch(e){}

const css=`#rb{position:fixed;inset:0;z-index:9999;background:radial-gradient(circle at 50% 40%,#3a1f5c,#140d22 70%);display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Inter,system-ui,sans-serif;color:#fff;text-align:center;overflow:hidden;transition:opacity .8s}
#rb .k{letter-spacing:.35em;font-size:13px;color:#E9C46A;font-weight:600}
#rb h1{font-size:clamp(38px,7vw,78px);font-weight:900;margin:10px 0 6px;letter-spacing:-.03em;background:linear-gradient(90deg,#F3D27A,#E9A6C4,#B9A2FF);-webkit-background-clip:text;color:transparent}
#rb p{color:#d9d2ea;font-size:17px;margin:0 20px}
#rb .rib{position:absolute;left:0;right:0;top:58%;height:46px;display:flex;pointer-events:none}
#rb .rib i{flex:1;background:linear-gradient(180deg,#ff4d6d,#c9184a 60%,#a4133c);box-shadow:0 6px 18px rgba(0,0,0,.35);transition:transform 1.2s cubic-bezier(.6,-0.2,.4,1),opacity 1.2s}
#rb .bow{position:absolute;left:50%;top:calc(58% - 22px);transform:translateX(-50%);font-size:70px;transition:transform 1s,opacity 1s;pointer-events:none}
#rb button{margin-top:150px;border:0;border-radius:999px;padding:16px 34px;font:800 18px Inter,sans-serif;background:#FFE14D;color:#1b1030;cursor:pointer;box-shadow:0 12px 30px rgba(0,0,0,.35);animation:rbp 1.2s infinite}
@keyframes rbp{50%{transform:scale(1.06)}}
#rb .done{display:none;margin-top:28px}
#rb .offer{display:inline-block;background:#fff;color:#3a1f5c;border-radius:16px;padding:14px 22px;font-weight:800;font-size:18px;margin:14px 16px 0}
#rb .go{margin-top:22px}
#rb canvas{position:absolute;inset:0;pointer-events:none}
#rb.cut .rib i:first-child{transform:translate(-60%,40px) rotate(-12deg);opacity:0}
#rb.cut .rib i:last-child{transform:translate(60%,40px) rotate(12deg);opacity:0}
#rb.cut .bow{transform:translate(-50%,200px) rotate(40deg);opacity:0}
#rb.cut .cutbtn{display:none}#rb.cut .done{display:block}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const o=document.createElement('div');o.id='rb';
o.innerHTML=`<canvas></canvas><div class="k">GRAND OPENING · 27 OCTOBER 2026</div><h1>Studio Pakiza</h1><p>Websites · Shopify · Design · Invitation cards · Documents · Digital products</p>
<div class="rib"><i></i><i></i></div><div class="bow">🎀</div>
<button class="cutbtn" type="button">✂️ Cut the ribbon</button>
<div class="done"><h1 style="font-size:clamp(34px,6vw,64px)">We're LIVE! 🎉</h1><div class="offer">First 100 customers get 50% OFF</div><br><button class="go" type="button">Explore the website →</button></div>`;
document.body.appendChild(o);document.documentElement.style.overflow='hidden';
const cv=o.querySelector('canvas'),ctx=cv.getContext('2d');let P=[];
function size(){cv.width=innerWidth;cv.height=innerHeight}size();addEventListener('resize',size);
function burst(){const C=['#FFE14D','#E9A6C4','#B9A2FF','#ff4d6d','#7ee0b5','#fff'];for(let i=0;i<220;i++)P.push({x:innerWidth/2,y:innerHeight*.58,vx:(Math.random()-.5)*16,vy:-Math.random()*16-4,s:4+Math.random()*6,c:C[i%C.length],r:Math.random()*6,vr:(Math.random()-.5)*.3,l:160+Math.random()*80})}
(function loop(){ctx.clearRect(0,0,cv.width,cv.height);P=P.filter(p=>p.l-->0);for(const p of P){p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.vx*=.99;p.r+=p.vr;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle=p.c;ctx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);ctx.restore()}if(document.body.contains(o))requestAnimationFrame(loop)})();
let cutDone=false;
function cut(){if(cutDone)return;cutDone=true;o.classList.add('cut');burst();setTimeout(burst,400);setTimeout(burst,900)}
function close(){o.style.opacity=0;document.documentElement.style.overflow='';setTimeout(()=>o.remove(),800)}
o.querySelector('.cutbtn').onclick=cut;o.querySelector('.go').onclick=close;
setTimeout(cut,6000);
})();
