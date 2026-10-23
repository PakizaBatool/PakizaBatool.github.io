/* Studio Pakiza Assistant — answers common questions and hands over to WhatsApp */
(function(){
const WA='923444720578';
const css=`.spc-btn{position:fixed;right:22px;bottom:92px;z-index:70;height:54px;padding:0 20px 0 16px;border-radius:999px;border:0;background:#121A2C;color:#fff;font:600 15px Inter,system-ui,sans-serif;display:flex;align-items:center;gap:10px;box-shadow:0 14px 30px -10px rgba(0,0,0,.45);cursor:pointer}
.spc-btn i{width:10px;height:10px;border-radius:50%;background:#2BD67B;box-shadow:0 0 0 4px rgba(43,214,123,.25)}
.spc{position:fixed;right:22px;bottom:92px;z-index:71;width:370px;max-width:calc(100vw - 24px);height:560px;max-height:calc(100vh - 120px);background:#fff;border-radius:20px;box-shadow:0 30px 70px -20px rgba(18,26,44,.45);display:none;flex-direction:column;overflow:hidden;font-family:Inter,system-ui,sans-serif}
.spc.on{display:flex}
.spc-h{background:#121A2C;color:#fff;padding:16px 18px;display:flex;align-items:center;gap:12px}
.spc-h .av{width:40px;height:40px;border-radius:50%;background:#B9774E;display:grid;place-items:center;font:28px 'Pinyon Script',cursive}
.spc-h b{display:block;font-size:15px}.spc-h small{font-size:12px;color:#B8C0CE}
.spc-h button{margin-left:auto;background:none;border:0;color:#fff;font-size:20px;cursor:pointer}
.spc-m{flex:1;overflow-y:auto;padding:16px;background:#F5F6F8;display:flex;flex-direction:column;gap:10px}
.spc-m .b{max-width:85%;padding:11px 14px;border-radius:14px;font-size:14.5px;line-height:1.5;white-space:pre-line}
.spc-m .bot{background:#fff;color:#2B3446;border:1px solid #E4E7EC;border-top-left-radius:4px}
.spc-m .me{background:#121A2C;color:#fff;align-self:flex-end;border-top-right-radius:4px}
.spc-m a{color:#9A5F3B;font-weight:600}
.spc-q{display:flex;flex-wrap:wrap;gap:6px;padding:10px 12px;border-top:1px solid #E4E7EC;background:#fff}
.spc-q button{border:1px solid #E4E7EC;background:#fff;border-radius:999px;padding:7px 11px;font:500 13px Inter,sans-serif;color:#2B3446;cursor:pointer}
.spc-q button:hover{border-color:#121A2C}
.spc-f{display:flex;gap:8px;padding:10px 12px;border-top:1px solid #E4E7EC}
.spc-f input{flex:1;border:1px solid #E4E7EC;border-radius:10px;padding:11px 12px;font:14.5px Inter,sans-serif;outline:none}
.spc-f button{border:0;background:#B9774E;color:#fff;border-radius:10px;padding:0 16px;font-weight:700;cursor:pointer}
@media(max-width:560px){.spc{right:12px;bottom:84px}.spc-btn{right:12px;bottom:84px;padding:0 16px}}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const cur=()=>{try{const c=document.getElementById('cur');return c&&window.PR?c.value:null}catch(e){return null}};
const price=k=>{const c=cur();if(c&&window.PR&&PR[c]&&PR[c][k]!==undefined)return PR[c].s+Number(PR[c][k]).toLocaleString('en-US');const d={s_shopify:'$79',s_wp:'$99',s_fiverr:'$25',s_social:'$15',s_brand:'$35',s_pin:'$12',s_va:'$5'};return d[k]||''};
const wa=t=>`<a href="https://wa.me/${WA}?text=${encodeURIComponent(t)}" target="_blank" rel="noopener">Continue on WhatsApp →</a>`;
const lead={};
const KB=[
 {k:['hi','hello','salam','assalam','hey','aoa','hy'],a:()=>`Hello! 👋 I'm the Studio Pakiza assistant. I can help with websites, Shopify, design, invitation cards, documents & PPTs, and digital products. What do you need today?`},
 {k:['website','web','developer','wordpress','woocommerce','landing','site','portfolio site','business site'],a:()=>`💻 Web Studio — we build:\n• Business & portfolio websites\n• WordPress & WooCommerce online shops\n• Landing pages\n• Shopify stores\nWordPress starts from ${price('s_wp')}, Shopify from ${price('s_shopify')}. Usually ready in 5–7 working days.\nSee all packages: <a href="web-studio.html">Web Studio</a>`},
 {k:['shopify','store','ecommerce','e-commerce','online shop','dropship'],a:()=>`🛒 Shopify store setup starts from ${price('s_shopify')}: theme & branding, up to 20 products, pages, policies, payments, shipping and a test order. Ready in about 5–7 days. Want a quote? Tell me your business type.`},
 {k:['invitation','invite','card','nikah','walima','mehndi','mayun','baraat','dholki','birthday','aqiqa','wedding','shadi','shaadi'],a:()=>`💌 Invitation cards for Nikah, Mehndi, Mayun, Baraat, Walima, Dholki, Birthday & Aqiqa. Send your names, date, time and venue and we design it in 24 hours — ready for WhatsApp and printing.\nBrowse designs: <a href="invitations.html">Invitation Studio</a>`},
 {k:['assignment','ppt','powerpoint','presentation','slides','document','word','pdf','resume','cv','typing','format','docs'],a:()=>`📄 Docs & Slides Desk:\n• PowerPoint presentation design\n• Word document formatting & typing\n• PDF editing & conversion (PDF ↔ Word/Excel)\n• CV / resume design\n• Assignment formatting, referencing & proofreading\nSee: <a href="docs-studio.html">Docs & Slides Desk</a>`},
 {k:['logo','brand','branding','brand kit'],a:()=>`✨ Brand kit (logo, colours, fonts, brand board) starts from ${price('s_brand')}, delivered in about 48 hours.`},
 {k:['social','instagram','post','facebook','canva','design','menu','gym','diet','flyer','poster','banner'],a:()=>`🎨 Social media & graphic design — posts, stories, menus, gym price lists, diet plans, flyers and banners. 5 posts from ${price('s_social')}.`},
 {k:['pinterest','pins'],a:()=>`📌 Pinterest pins with keyword research, titles and descriptions — 5 pins from ${price('s_pin')}.`},
 {k:['va','virtual assistant','data entry','excel','sheets','admin','listing'],a:()=>`🤝 Virtual assistant & data entry from ${price('s_va')} per hour — Excel/Sheets, product listings, inbox and admin tasks. Remote, any time zone.`},
 {k:['fiverr','gig','upwork'],a:()=>`💼 Fiverr profile & gig setup from ${price('s_fiverr')} — bio, up to 3 gigs, packages, tags and thumbnails.`},
 {k:['digital product','pdf product','planner','caption','checklist','template','download','bundle'],a:()=>`📦 Our digital products (planners, caption packs, Shopify checklist, Fiverr kit and more) are launching very soon! Leave your WhatsApp and we'll message you on launch day.`},
 {k:['price','cost','rate','charges','kitne','kitna','fee','budget','how much'],a:()=>`Starting prices:\n• Shopify store ${price('s_shopify')}\n• WordPress website ${price('s_wp')}\n• Fiverr setup ${price('s_fiverr')}\n• Brand kit ${price('s_brand')}\n• 5 social posts ${price('s_social')}\n• VA ${price('s_va')}/hour\nExact quote depends on your project — tell me what you need.`},
 {k:['time','how long','days','deadline','delivery','urgent'],a:()=>`⏱ Typical timelines: invitation card 24h · brand kit 48h · social posts 2–3 days · Shopify/WordPress 5–7 working days. Urgent orders possible — just ask.`},
 {k:['pay','payment','bank','easypaisa','jazzcash','paypal','wise','card'],a:()=>`💳 In Pakistan: bank transfer / JazzCash / Easypaisa. International clients: we share the best option for your country. Usually 50% advance, 50% on delivery for projects.`},
 {k:['revision','edit','change','refund'],a:()=>`✅ Two rounds of revisions are included. If something isn't right, we fix it — you only pay for work you're happy with.`},
 {k:['who','about','pakiza','owner','you'],a:()=>`Studio Pakiza is run by Pakiza Batool — web developer, designer and virtual assistant based in Lahore, working remotely with clients worldwide.`},
 {k:['contact','whatsapp','number','call','email','talk','human'],a:()=>`📱 WhatsApp: +92 344 4720578\n✉️ zaidipakiza6@gmail.com\n${wa('Hi Pakiza! I found you on your website.')}`},
 {k:['order','book','quote','start','hire','buy','want'],a:()=>{lead.step='name';return `Great! Let's get your order started. What's your name?`}},
 {k:['thanks','thank','shukria','jazak'],a:()=>`You're welcome! 😊 Anything else I can help with?`},
];
function answer(t){
 const q=t.toLowerCase();
 if(lead.step){
  if(lead.step==='name'){lead.name=t;lead.step='svc';return `Nice to meet you, ${t}! Which service do you need? (e.g. website, Shopify, invitation card, PPT, logo…)`}
  if(lead.step==='svc'){lead.svc=t;lead.step='det';return `Got it. Please share a few details — deadline, budget or anything special.`}
  if(lead.step==='det'){lead.det=t;lead.step=null;const msg=`Hi Pakiza! New order request from your website.\nName: ${lead.name}\nService: ${lead.svc}\nDetails: ${lead.det}`;
   return `Perfect, ${lead.name}! Your request is ready. Tap below to send it — Pakiza will reply within 24 hours.\n${wa(msg)}\nOr use the order form: <a href="#contact" onclick="document.querySelector('.spc').classList.remove('on')">Order form</a>`}
 }
 let best=null,score=0;
 for(const it of KB){let s=0;for(const k of it.k){if(q.includes(k))s+=k.length}if(s>score){score=s;best=it}}
 if(best)return best.a();
 return `I'm not 100% sure about that one, but Pakiza can answer personally.\n${wa('Hi Pakiza! I have a question: '+t)}`;
}
const btn=document.createElement('button');btn.className='spc-btn';btn.innerHTML='<i></i>Chat with us';
const box=document.createElement('div');box.className='spc';
box.innerHTML=`<div class="spc-h"><div class="av">P</div><div><b>Studio Pakiza Assistant</b><small>Usually replies instantly</small></div><button aria-label="Close">✕</button></div><div class="spc-m"></div><div class="spc-q"></div><form class="spc-f"><input placeholder="Type your question…" aria-label="Message"><button>Send</button></form>`;
document.body.appendChild(btn);document.body.appendChild(box);
const M=box.querySelector('.spc-m'),Q=box.querySelector('.spc-q'),F=box.querySelector('form'),I=F.querySelector('input');
const add=(t,who)=>{const d=document.createElement('div');d.className='b '+who;if(who==='bot')d.innerHTML=t;else d.textContent=t;M.appendChild(d);M.scrollTop=M.scrollHeight};
const ask=t=>{add(t,'me');setTimeout(()=>add(answer(t),'bot'),350)};
['Website / Web Studio','Shopify store','Invitation cards','PPT & documents','Prices','Place an order','Talk to Pakiza'].forEach(x=>{const b=document.createElement('button');b.type='button';b.textContent=x;b.onclick=()=>ask(x);Q.appendChild(b)});
F.onsubmit=e=>{e.preventDefault();const t=I.value.trim();if(!t)return;I.value='';ask(t)};
btn.onclick=()=>{box.classList.add('on');btn.style.display='none';if(!M.children.length)add(KB[0].a(),'bot');I.focus()};
box.querySelector('.spc-h button').onclick=()=>{box.classList.remove('on');btn.style.display='flex'};
})();
