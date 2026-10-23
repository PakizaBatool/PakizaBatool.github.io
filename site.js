const PR={
 GBP:{s:'£',p1:4,p2:6,p3:4,p4:5,p5:5,p6:4,bundle:18,worth:28,s_social:12,s_brand:27,s_pin:9,s_va:4,s_fiverr:19,s_shopify:59,s_wp:75,b:[40,80,200]},
 USD:{s:'$',p1:5,p2:8,p3:5,p4:7,p5:7,p6:5,bundle:24,worth:37,s_social:15,s_brand:35,s_pin:12,s_va:5,s_fiverr:25,s_shopify:79,s_wp:99,b:[50,100,250]},
 EUR:{s:'€',p1:5,p2:7,p3:5,p4:6,p5:6,p6:5,bundle:21,worth:34,s_social:14,s_brand:32,s_pin:11,s_va:5,s_fiverr:23,s_shopify:72,s_wp:89,b:[45,90,225]},
 CAD:{s:'C$',p1:7,p2:11,p3:7,p4:9,p5:9,p6:7,bundle:32,worth:50,s_social:20,s_brand:48,s_pin:16,s_va:7,s_fiverr:35,s_shopify:109,s_wp:135,b:[70,140,350]},
 AUD:{s:'A$',p1:8,p2:12,p3:8,p4:10,p5:10,p6:8,bundle:36,worth:56,s_social:23,s_brand:53,s_pin:18,s_va:8,s_fiverr:38,s_shopify:119,s_wp:149,b:[75,150,375]},
 SAR:{s:'SAR ',p1:19,p2:29,p3:19,p4:25,p5:25,p6:19,bundle:89,worth:136,s_social:55,s_brand:129,s_pin:45,s_va:19,s_fiverr:95,s_shopify:295,s_wp:369,b:[190,375,940]},
 AED:{s:'AED ',p1:19,p2:29,p3:19,p4:25,p5:25,p6:19,bundle:89,worth:136,s_social:55,s_brand:129,s_pin:45,s_va:19,s_fiverr:95,s_shopify:289,s_wp:365,b:[185,370,920]},
 PKR:{s:'Rs ',p1:499,p2:799,p3:499,p4:599,p5:599,p6:499,bundle:2499,worth:3494,s_social:2500,s_brand:6000,s_pin:2000,s_va:800,s_fiverr:3500,s_shopify:15000,s_wp:20000,b:[5000,15000,40000]},
 INR:{s:'₹',p1:399,p2:599,p3:399,p4:499,p5:499,p6:399,bundle:1799,worth:2694,s_social:1200,s_brand:2900,s_pin:999,s_va:399,s_fiverr:1999,s_shopify:6500,s_wp:7999,b:[4000,8000,20000]}
};
const LABEL={GBP:'£ GBP',USD:'$ USD',EUR:'€ EUR',CAD:'C$ CAD',AUD:'A$ AUD',SAR:'SAR',AED:'AED',PKR:'Rs PKR',INR:'₹ INR'};
function detect(){
  try{const sv=localStorage.getItem('cur');if(sv&&PR[sv])return sv}catch(e){}
  const tz=(Intl.DateTimeFormat().resolvedOptions().timeZone||'');
  const lang=(navigator.language||'en-US').toUpperCase();
  if(tz==='Asia/Karachi')return'PKR';
  if(tz==='Asia/Riyadh')return'SAR';
  if(tz==='Asia/Dubai'||tz==='Asia/Muscat')return'AED';
  if(tz==='Asia/Kolkata'||tz==='Asia/Calcutta')return'INR';
  if(tz==='Europe/London'||tz==='Europe/Dublin'&&lang.endsWith('GB'))return'GBP';
  if(tz.startsWith('Australia/'))return'AUD';
  if(/^America\/(Toronto|Vancouver|Edmonton|Winnipeg|Halifax|Regina|St_Johns|Montreal)/.test(tz)||lang.endsWith('-CA'))return'CAD';
  if(tz.startsWith('Europe/'))return'EUR';
  if(tz.startsWith('America/'))return'USD';
  return'USD';
}
const fmt=(c,v)=>PR[c].s+Number(v).toLocaleString('en-US');
const curSel=document.getElementById('cur');
Object.keys(PR).forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=LABEL[c];curSel.appendChild(o)});
function applyCur(c){const t=PR[c];curSel.value=c;
 document.querySelectorAll('[data-k]').forEach(el=>{const k=el.dataset.k;
  if(el.classList.contains('order')){const msg=(el.dataset.svc?'Hi Pakiza! I would like to book: ':'Hi Pakiza! I would like to order: ')+el.dataset.product+' ('+(el.dataset.from?'from ':'')+fmt(c,t[k])+')';el.href='https://wa.me/923444720578?text='+encodeURIComponent(msg);el.target='_blank';el.rel='noopener';}
  else if(k==='save'){el.textContent=fmt(c,t.worth-t.bundle)} else if(t[k]!==undefined){el.textContent=fmt(c,t[k])}});}
curSel.addEventListener('change',()=>{try{localStorage.setItem('cur',curSel.value)}catch(e){}applyCur(curSel.value)});
applyCur(detect());
document.querySelectorAll('#menu a').forEach(a=>a.addEventListener('click',()=>document.getElementById('menu').classList.remove('open')));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.getElementById('yr').textContent=new Date().getFullYear();
