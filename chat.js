/* Studio Pakiza Assistant — bilingual (English / Roman Urdu / Urdu) sales assistant.
   Understands service + question type (price, time, details, order…), remembers context, and hands over to WhatsApp. */
(function(){
const WA='923444720578';
const css=`.spc-btn{position:fixed;right:22px;bottom:92px;z-index:70;height:54px;padding:0 20px 0 16px;border-radius:999px;border:0;background:#121A2C;color:#fff;font:600 15px Inter,system-ui,sans-serif;display:flex;align-items:center;gap:10px;box-shadow:0 14px 30px -10px rgba(0,0,0,.45);cursor:pointer}
.spc-btn i{width:10px;height:10px;border-radius:50%;background:#2BD67B;box-shadow:0 0 0 4px rgba(43,214,123,.25)}
.spc{position:fixed;right:22px;bottom:92px;z-index:71;width:380px;max-width:calc(100vw - 24px);height:580px;max-height:calc(100vh - 120px);background:#fff;border-radius:20px;box-shadow:0 30px 70px -20px rgba(18,26,44,.45);display:none;flex-direction:column;overflow:hidden;font-family:Inter,system-ui,sans-serif}
.spc.on{display:flex}
.spc-h{background:#121A2C;color:#fff;padding:14px 16px;display:flex;align-items:center;gap:10px}
.spc-h .av{width:38px;height:38px;border-radius:50%;background:#B9774E;display:grid;place-items:center;font:26px 'Pinyon Script',Georgia,serif;flex:none}
.spc-h b{display:block;font-size:15px}.spc-h small{display:block;white-space:nowrap;font-size:12px;color:#B8C0CE}
.spc-lg{margin-left:auto;display:flex;gap:4px}.spc-lg button{background:rgba(255,255,255,.1);border:0;color:#cfd5e2;border-radius:999px;padding:4px 8px;font:600 11.5px Inter,sans-serif;cursor:pointer}.spc-lg button.on{background:#B9774E;color:#fff}
.spc-x{margin-left:6px;background:none;border:0;color:#fff;font-size:20px;cursor:pointer}
.spc-m{flex:1;overflow-y:auto;padding:16px;background:#F5F6F8;display:flex;flex-direction:column;gap:10px}
.spc-m .spc-bb{position:static;transform:none;filter:none;opacity:1;width:auto;height:auto;max-width:86%;padding:11px 14px;border-radius:14px;font-size:14.5px;line-height:1.5;white-space:pre-line}
.spc-m .spc-bb.bot{background:#fff;color:#2B3446;border:1px solid #E4E7EC;border-top-left-radius:4px}
.spc-m .spc-bb.me{background:#121A2C;color:#fff;align-self:flex-end;border-top-right-radius:4px}
.spc-m .spc-ty{align-self:flex-start;background:#fff;border:1px solid #E4E7EC;border-radius:14px;padding:10px 14px;color:#8a93a3;font-size:13px}
.spc-m a{color:#9A5F3B;font-weight:600}
.spc-q{display:flex;flex-wrap:wrap;gap:6px;padding:10px 12px;border-top:1px solid #E4E7EC;background:#fff;max-height:96px;overflow-y:auto}
.spc-q button{border:1px solid #E4E7EC;background:#fff;border-radius:999px;padding:7px 11px;font:500 13px Inter,sans-serif;color:#2B3446;cursor:pointer}
.spc-q button:hover{border-color:#121A2C}
.spc-f{display:flex;gap:8px;padding:10px 12px;border-top:1px solid #E4E7EC}
.spc-f input{flex:1;border:1px solid #E4E7EC;border-radius:10px;padding:11px 12px;font:14.5px Inter,sans-serif;outline:none;min-width:0}
.spc-f button{border:0;background:#B9774E;color:#fff;border-radius:10px;padding:0 16px;font-weight:700;cursor:pointer}
@media(max-width:560px){.spc{right:8px;left:8px;width:auto;max-width:none;bottom:12px;height:74vh}.spc-btn{right:14px;bottom:84px;height:44px;padding:0 14px;font-size:13.5px}.spc-h{padding:12px}.spc-h b{font-size:14px}.spc-h .av{width:34px;height:34px;font-size:22px}}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

/* ---------- prices ---------- */
const BASE={
 PKR:{s:'Rs ',s_shopify:15000,s_wp:20000,s_fiverr:3500,s_social:2500,s_brand:6000,s_pin:2000,s_va:800,s_land:8000,s_biz:20000,s_ecom:30000,s_inv:800,s_invset:3000,s_inv_v:1500,s_ppt:1500,s_doc:500,s_pdf:400,s_cv:1500,f_flyer:1500,f_fix:3000,p_min:499},
 USD:{s:'$',s_shopify:79,s_wp:99,s_fiverr:25,s_social:15,s_brand:35,s_pin:12,s_va:5,s_land:49,s_biz:99,s_ecom:149,s_inv:5,s_invset:19,s_inv_v:10,s_ppt:10,s_doc:5,s_pdf:4,s_cv:12,f_flyer:10,f_fix:20,p_min:5},
 GBP:{s:'£',s_shopify:59,s_wp:75,s_fiverr:19,s_social:12,s_brand:27,s_pin:9,s_va:4,s_land:39,s_biz:75,s_ecom:119,s_inv:4,s_invset:15,s_inv_v:8,s_ppt:8,s_doc:4,s_pdf:3,s_cv:9,f_flyer:8,f_fix:15,p_min:4}
};
const TZ=(()=>{try{return Intl.DateTimeFormat().resolvedOptions().timeZone||''}catch(e){return ''}})();
const PK=/Karachi/.test(TZ);
function curCode(){try{const c=document.getElementById('cur');if(c&&c.value)return c.value}catch(e){}return PK?'PKR':(/London|Dublin/.test(TZ)?'GBP':'USD')}
function tbl(){const c=curCode();return Object.assign({},BASE[c]||BASE.USD,(window.PR&&PR[c])||{})}
function price(k){const t=tbl();if(t[k]===undefined)return BASE.USD[k]!==undefined?'$'+BASE.USD[k]:'';return t.s+Number(t[k]).toLocaleString('en-US')}
function priceNum(k){return tbl()[k]}

/* ---------- language ---------- */
let L='en';
const RU=/\b(kya|kia|kiya|hai|hain|hy|mujhe|muje|mjhe|mujhy|chahiye|chahye|chaiye|chahie|kitne|kitna|kitni|kitny|kaise|kese|kaisay|kesy|banwana|banwani|banana|banani|karna|krna|krni|karwana|krwana|aap|ap|apka|apki|apko|bhai|baji|api|kab|kahan|kidhar|nahi|nhi|nai|haan|han|ji|acha|achha|theek|thik|salam|shukriya|shukria|mein|mai|mae|hum|wala|wali|shadi|shaadi|qeemat|keemat|paise|pese|rabta|bata|batao|bataen|batain|dein|dy|karo|kr|krdo|kardo|sakti|sakte|skti|skty|din|ghante|jaldi|abhi|sasta|mehnga|chahta|chahti|zaroor|sath|saath|liye|lye|ka|ki|ke|ko|se|sy)\b/gi;
function detect(t){if(/[؀-ۿ]/.test(t))return 'ur';const words=t.trim().split(/\s+/);const m=(t.match(RU)||[]).length;if(m>=2||(m>=1&&words.length<=3&&/salam|shukri|kitn|chahiye|batao|kya|kab/i.test(t)))return 'ru';if(/^[a-z0-9 ?!.,'&\/$£€-]+$/i.test(t)&&words.length>=3&&m===0)return 'en';return L}
const tr=(en,ru,ur)=>({en,ru,ur})[L];

/* ---------- fuzzy text helpers ---------- */
const norm=t=>' '+t.toLowerCase().replace(/[?!.,؟،۔:;()"']/g,' ').replace(/\s+/g,' ')+' ';
const AR=/[؀-ۿ]/;
function lev(a,b){if(Math.abs(a.length-b.length)>1)return 9;const d=[];for(let i=0;i<=a.length;i++){d[i]=[i];for(let j=1;j<=b.length;j++)d[i][j]=i?Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1)):j}return d[a.length][b.length]}
function has(q,keys){let s=0;const toks=q.trim().split(' ');for(const k of keys){if(q.includes(k.length<4&&!AR.test(k)?' '+k+' ':k)){s+=k.length;continue}if(k.length>=6&&!k.includes(' ')&&!AR.test(k)){for(const w of toks)if(w.length>=5&&lev(w,k)<=1){s+=k.length-1;break}}}return s}

/* ---------- services ---------- */
const S=[
 {id:'shopify',k:['shopify','shopfy','shopify store','dropship','dropshipping','شاپیفائی'],n:['Shopify store','Shopify store','شاپیفائی اسٹور'],p:'s_shopify',t:['5–7 working days','5–7 din','5–7 دن'],inc:['theme & branding, up to 20 products, pages, policies, payment & shipping setup and a test order','theme aur branding, 20 products tak, pages, policies, payment aur shipping setup, aur test order','تھیم اور برانڈنگ، 20 پروڈکٹس تک، پیجز، پالیسیز، پیمنٹ اور شپنگ سیٹ اپ، اور ٹیسٹ آرڈر'],link:'web-studio.html'},
 {id:'ecom',k:['ecommerce','e-commerce','online store','online shop','woocommerce','woo commerce','dukan','store','shop','آن لائن شاپ','دکان','اسٹور'],n:['E-commerce store (Shopify or WooCommerce)','E-commerce store (Shopify ya WooCommerce)','ای کامرس اسٹور (شاپیفائی یا ووکامرس)'],p:'s_ecom',t:['7–10 working days','7–10 din','7–10 دن'],inc:['complete online store, up to 20 products, payments, shipping, policies and a test order','mukammal online store, 20 products tak, payment, shipping, policies aur test order','مکمل آن لائن اسٹور، 20 پروڈکٹس تک، پیمنٹ، شپنگ، پالیسیز اور ٹیسٹ آرڈر'],link:'web-studio.html'},
 {id:'web',k:['website','web site','webside','wordpress','word press','business site','business website','company website','site','web','ویب سائٹ','ویب','ورڈپریس','سائٹ'],n:['Business website (WordPress)','Business website (WordPress)','بزنس ویب سائٹ (ورڈپریس)'],p:'s_biz',t:['5–7 working days','5–7 din','5–7 دن'],inc:['up to 6 pages, your branding & content, contact form, Google map, WhatsApp button, speed & basic SEO, mobile-friendly','6 pages tak, aap ki branding aur content, contact form, Google map, WhatsApp button, speed aur basic SEO, mobile-friendly','6 پیجز تک، آپ کی برانڈنگ اور مواد، کانٹیکٹ فارم، گوگل میپ، واٹس ایپ بٹن، اسپیڈ اور بنیادی SEO، موبائل فرینڈلی'],link:'web-studio.html'},
 {id:'land',k:['landing page','landing','one page','single page','لینڈنگ'],n:['Landing page','Landing page','لینڈنگ پیج'],p:'s_land',t:['3–4 days','3–4 din','3–4 دن'],inc:['1 beautiful mobile-friendly page with WhatsApp & contact form and basic SEO','1 khoobsurat mobile-friendly page, WhatsApp aur contact form ke saath, basic SEO','ایک خوبصورت موبائل فرینڈلی پیج، واٹس ایپ اور کانٹیکٹ فارم کے ساتھ'],link:'web-studio.html'},
 {id:'fix',k:['fix','redesign','update my site','bug','slow','speed','error','theek karna','مسئلہ','ٹھیک کرنا'],n:['Website fixes / redesign','Website fix / redesign','ویب سائٹ فکس / ری ڈیزائن'],p:'f_fix',t:['1–3 days','1–3 din','1–3 دن'],inc:['speed, bugs, layout fixes or a fresh new look for your current site','speed, bugs, layout theek karna ya purani site ko naya look','اسپیڈ، بگز، لے آؤٹ ٹھیک کرنا یا پرانی سائٹ کو نیا لک'],link:'web-studio.html'},
 {id:'inv',k:['invitation','invite','card','cards','nikah','walima','valima','mehndi','mehendi','mayun','mayoun','baraat','barat','dholki','birthday','bday','aqiqa','aqeeqa','wedding','shadi','shaadi','engagement','mangni','دعوت','کارڈ','نکاح','ولیمہ','مہندی','مایوں','بارات','ڈھولکی','شادی','سالگرہ','عقیقہ','منگنی'],n:['Invitation card','Invitation card','دعوت نامہ کارڈ'],p:'s_inv',t:['24 hours','24 ghante','24 گھنٹے'],inc:['your names, date, time & venue in a custom design — ready for WhatsApp and printing. Full set (e.g. Mehndi + Baraat + Walima) from {s_invset}, video invitation from {s_inv_v}','aap ke naam, tareekh, waqt aur jagah ke saath custom design — WhatsApp aur print dono ke liye. Poora set (Mehndi + Baraat + Walima) {s_invset} se, video invitation {s_inv_v} se','آپ کے نام، تاریخ، وقت اور جگہ کے ساتھ کسٹم ڈیزائن — واٹس ایپ اور پرنٹ دونوں کے لیے۔ پورا سیٹ {s_invset} سے، ویڈیو دعوت نامہ {s_inv_v} سے'],link:'invitations.html'},
 {id:'ppt',k:['ppt','powerpoint','power point','presentation','slides','slide','پریزنٹیشن','پی پی ٹی','سلائیڈ'],n:['PowerPoint presentation','PowerPoint presentation','پاورپوائنٹ پریزنٹیشن'],p:'s_ppt',t:['24–48 hours','24–48 ghante','24–48 گھنٹے'],inc:['clean professional slides for class, university or business (around 10 slides), with icons, charts and your content','class, university ya business ke liye saaf professional slides (taqreeban 10 slides), icons aur charts ke saath','کلاس، یونیورسٹی یا بزنس کے لیے صاف ستھری پروفیشنل سلائیڈز (تقریباً 10)'],link:'docs-studio.html'},
 {id:'doc',k:['document','documents','word file','ms word','typing','formatting','format','assignment','assignments','thesis','report','urdu typing','ڈاکیومنٹ','ٹائپنگ','اسائنمنٹ','فارمیٹنگ'],n:['Document typing & formatting','Document typing aur formatting','ڈاکیومنٹ ٹائپنگ اور فارمیٹنگ'],p:'s_doc',t:['same or next day','usi din ya agle din','اسی دن یا اگلے دن'],inc:['Word typing (English & Urdu), headings, page numbers, table of contents, references and proofreading. Note: we format and polish your work — we don\'t write assignments for you','Word typing (English aur Urdu), headings, page numbers, table of contents, references aur proofreading. Note: hum aap ka kaam format aur polish karte hain — assignment khud nahi likhte','ورڈ ٹائپنگ (انگلش اور اردو)، ہیڈنگز، پیج نمبرز، فہرست، ریفرنسز اور پروف ریڈنگ۔ نوٹ: ہم آپ کا کام فارمیٹ کرتے ہیں — اسائنمنٹ خود نہیں لکھتے'],link:'docs-studio.html'},
 {id:'pdf',k:['pdf','pdf edit','pdf to word','convert','conversion','excel','پی ڈی ایف'],n:['PDF editing & conversion','PDF editing aur conversion','پی ڈی ایف ایڈیٹنگ اور کنورژن'],p:'s_pdf',t:['same day','usi din','اسی دن'],inc:['edit text in PDFs, merge/split, PDF ↔ Word/Excel conversion','PDF mein text edit, merge/split, PDF ↔ Word/Excel conversion','پی ڈی ایف میں ایڈیٹ، مرج/اسپلٹ، پی ڈی ایف ↔ ورڈ/ایکسل'],link:'docs-studio.html'},
 {id:'cv',k:['cv','resume','biodata','سی وی','ریزیومے'],n:['CV / resume design','CV / resume design','سی وی / ریزیومے ڈیزائن'],p:'s_cv',t:['24 hours','24 ghante','24 گھنٹے'],inc:['modern, ATS-friendly CV in Word + PDF','modern, ATS-friendly CV, Word + PDF mein','جدید، ATS فرینڈلی سی وی، ورڈ اور پی ڈی ایف میں'],link:'docs-studio.html'},
 {id:'brand',k:['logo','brand','branding','brand kit','لوگو','برانڈ'],n:['Logo & brand kit','Logo aur brand kit','لوگو اور برانڈ کٹ'],p:'s_brand',t:['about 48 hours','taqreeban 48 ghante','تقریباً 48 گھنٹے'],inc:['logo, colour palette, fonts and a one-page brand board','logo, colours, fonts aur ek page ka brand board','لوگو، رنگ، فونٹس اور ایک صفحے کا برانڈ بورڈ'],link:'home.html#services'},
 {id:'social',k:['social media','instagram','insta','facebook','post','posts','canva','story','stories','پوسٹ','انسٹاگرام','فیس بک'],n:['Social media posts','Social media posts','سوشل میڈیا پوسٹس'],p:'s_social',t:['2–3 days','2–3 din','2–3 دن'],inc:['5 branded post designs (Instagram / Facebook), ready to upload','5 branded post designs (Instagram / Facebook), upload ke liye tayyar','5 برانڈڈ پوسٹ ڈیزائنز، اپلوڈ کے لیے تیار'],link:'home.html#services'},
 {id:'flyer',k:['menu','gym','diet','diet plan','flyer','poster','banner','price list','rate list','مینیو','جم','ڈائٹ','فلائر','پوسٹر','بینر'],n:['Menu / flyer / price-list design','Menu / flyer / price list design','مینیو / فلائر / ریٹ لسٹ ڈیزائن'],p:'f_flyer',t:['24–48 hours','24–48 ghante','24–48 گھنٹے'],inc:['restaurant menus, gym price lists, diet plans, flyers and banners — print & social ready','restaurant menu, gym price list, diet plan, flyers aur banners — print aur social dono ke liye','ریسٹورنٹ مینیو، جم ریٹ لسٹ، ڈائٹ پلان، فلائرز اور بینرز'],link:'home.html#work'},
 {id:'pin',k:['pinterest','pins','پنٹرسٹ'],n:['Pinterest pins','Pinterest pins','پنٹرسٹ پنز'],p:'s_pin',t:['2 days','2 din','2 دن'],inc:['5 pins with keyword research, titles and descriptions','5 pins, keyword research, titles aur descriptions ke saath','5 پنز، کی ورڈ ریسرچ اور ٹائٹلز کے ساتھ'],link:'pinterest-marketing.html'},
 {id:'fiverr',k:['fiverr','gig','gigs','upwork','freelancing profile','فائیور'],n:['Fiverr profile & gigs','Fiverr profile aur gigs','فائیور پروفائل اور گِگز'],p:'s_fiverr',t:['2–3 days','2–3 din','2–3 دن'],inc:['bio, up to 3 gigs, packages, tags and thumbnails','bio, 3 gigs tak, packages, tags aur thumbnails','بائیو، 3 گِگز تک، پیکجز، ٹیگز اور تھمب نیلز'],link:'fiverr-gig-setup.html'},
 {id:'va',k:['virtual assistant','assistant','va','data entry','admin','listing','listings','product upload','excel sheet','ڈیٹا انٹری','اسسٹنٹ'],n:['Virtual assistant / data entry','Virtual assistant / data entry','ورچوئل اسسٹنٹ / ڈیٹا انٹری'],p:'s_va',per:['/hour','/ghanta',' فی گھنٹہ'],t:['flexible, any time zone','aap ke time ke hisaab se','آپ کے وقت کے مطابق'],inc:['Excel/Sheets, product listings, inbox and admin work','Excel/Sheets, product listing, inbox aur admin ka kaam','ایکسل، پروڈکٹ لسٹنگ، ان باکس اور ایڈمن کا کام'],link:'virtual-assistant-services.html'},
 {id:'digital',k:['digital product','digital products','planner','planners','caption','captions','checklist','template','templates','ebook','download','bundle','ڈیجیٹل','پلانر'],n:['Digital products','Digital products','ڈیجیٹل پروڈکٹس'],p:'p_min',t:['instant download (launching soon)','foran download (jald launch)','فوری ڈاؤن لوڈ (جلد لانچ)'],inc:['planners, caption packs, Shopify checklist, Fiverr kit, brand palettes — instant PDFs, launching very soon','planners, caption packs, Shopify checklist, Fiverr kit, brand palettes — PDF, bohat jald launch','پلانرز، کیپشن پیکس، شاپیفائی چیک لسٹ، فائیور کٹ — بہت جلد لانچ'],link:'home.html#shop'}
];
const SV=Object.fromEntries(S.map(s=>[s.id,s]));
const li=a=>a[{en:0,ru:1,ur:2}[L]];
const fill=t=>t.replace(/\{(\w+)\}/g,(m,k)=>price(k));
function pickService(q){let best=null,sc=0;for(const s of S){const v=has(q,s.k);if(v>sc){sc=v;best=s}}
 if(best&&(best.id==='ecom'||best.id==='web')&&has(q,SV.shopify.k))best=SV.shopify;
 if(best&&best.id==='web'&&has(q,SV.land.k))best=SV.land;
 if(best&&best.id==='web'&&has(q,['woocommerce','online store','online shop','ecommerce','e-commerce']))best=SV.ecom;
 if(best&&best.id==='doc'&&has(q,SV.ppt.k))best=SV.ppt;
 return best}

/* ---------- intents ---------- */
const I={
 greet:['hi','hello','hey','salam','assalam','aoa','asalam','slam','hy','good morning','good evening','سلام','السلام','ہیلو'],
 thanks:['thanks','thank','thx','shukriya','shukria','jazak','jazakallah','شکریہ','جزاک'],
 bye:['bye','allah hafiz','khuda hafiz','see you','اللہ حافظ','خدا حافظ'],
 how:['how are you','kaise ho','kese ho','kaisi ho','kesi ho','کیسے ہیں','کیسی ہیں'],
 bot:['are you a bot','are you human','robot','ai ho','insaan','human ho','bot ho','بوٹ','انسان'],
 price:['price','prices','cost','rate','rates','charges','charge','fee','fees','how much','kitne','kitna','kitni','kitny','paise','pese','qeemat','keemat','budget','package','packages','قیمت','ریٹ','کتنے','کتنا','کتنی','پیسے','چارجز','پیکج'],
 time:['how long','how many days','time','days','deadline','delivery','deliver','kab tak','kitne din','kitny din','kitna time','kab','when','ready','وقت','دن','کب','ڈیلیوری'],
 details:['what is included','included','include','details','detail','kya milega','kya kya','features','what do i get','کیا ملے گا','تفصیل'],
 urgent:['urgent','asap','today','aaj','kal tak','tomorrow','jaldi','ارجنٹ','آج','کل تک','جلدی'],
 discount:['discount','sasta','cheap','special offer','deal','kam kar','کم کر','ڈسکاؤنٹ','سستا'],
 pay:['pay','payment','bank','easypaisa','easy paisa','jazzcash','jazz cash','paypal','wise','advance','پیمنٹ','ایزی پیسہ','جاز کیش','ادائیگی','ایڈوانس'],
 rev:['revision','revisions','changes','tabdeeli','not happy','refund','تبدیلی','ریفنڈ'],
 samples:['sample','samples','portfolio','previous work','examples','dikhao','show me','نمونے','دکھائیں'],
 order:['order','book','booking','pre-book','prebook','hire','buy','i want','need','chahiye','chahye','chaiye','banwana','banwani','karwana','krwana','bana do','banwa','آرڈر','بک','بنوانا','بنوانی','چاہیے','بنا دیں'],
 contact:['contact','whatsapp','number','phone','call','email','talk to','rabta','pakiza se','رابطہ','نمبر','واٹس'],
 about:['who are you','about you','who is pakiza','owner','kaun ho','company','your team','کون','کمپنی'],
 where:['where are you','location','lahore','address','kahan','kidhar','office','کہاں','لاہور','پتہ'],
 hours:['timing','timings','hours','available','kab available','اوقات','دستیاب'],
 domain:['domain','hosting','server','.com','ڈومین','ہوسٹنگ'],
 seo:['seo','google','ranking','گوگل'],
 mobile:['mobile','responsive','موبائل'],
 lang:['urdu','english','language','زبان','اردو','انگلش'],
 learn:['learn','course','classes','teach','sikhna','sikhao','youtube','tutorial','students','student','سیکھنا','کورس','یوٹیوب'],
 services:['services','what do you do','kya karte','kya kya karte','all services','سروسز','کیا کرتے'],
 complain:['worst','not working','complain','complaint','fraud','kharab','scam','شکایت','خراب']
};
const hasI=(q,n)=>has(q,I[n])>0;

/* ---------- copy ---------- */
const T={
 wa:{en:'Continue on WhatsApp →',ru:'WhatsApp par baat karein →',ur:'واٹس ایپ پر بات کریں ←'},
 ph:{en:'Type your question…',ru:'Apna sawal likhein…',ur:'اپنا سوال لکھیں…'},
 sub:{en:'Online now · English & Urdu',ru:'Online · English & Urdu',ur:'آن لائن · English & اردو'},
 q:{en:['Website price?','Shopify store','Wedding card','PPT / documents','How many days?','Place an order','Talk to Pakiza'],
    ru:['Website kitne ki?','Shopify store','Shadi card','PPT / documents','Kitne din lagenge?','Order karna hai','Pakiza se baat'],
    ur:['ویب سائٹ کتنے کی؟','شاپیفائی اسٹور','شادی کارڈ','پی پی ٹی / ڈاکیومنٹس','کتنے دن لگیں گے؟','آرڈر کرنا ہے','پاکیزہ سے بات']}
};
const wa=t=>`<a href="https://wa.me/${WA}?text=${encodeURIComponent(t)}" target="_blank" rel="noopener">${T.wa[L]}</a>`;
const lnk=(h,t)=>`<a href="${h}">${t}</a>`;
const sp=s=>price(s.p)+(s.per?li(s.per):'');

function overviewPrices(){return tr(
`Here are our starting prices:\n• Website (WordPress) — ${price('s_biz')}\n• Landing page — ${price('s_land')}\n• Shopify store — ${price('s_shopify')}\n• Full e-commerce store — ${price('s_ecom')}\n• Invitation card — ${price('s_inv')}\n• PowerPoint — ${price('s_ppt')} · CV — ${price('s_cv')}\n• Logo & brand kit — ${price('s_brand')}\n• 5 social posts — ${price('s_social')}\nWhich one are you interested in? I'll give you the exact details.`,
`Hamari shuru ki qeematein:\n• Website (WordPress) — ${price('s_biz')}\n• Landing page — ${price('s_land')}\n• Shopify store — ${price('s_shopify')}\n• Mukammal e-commerce store — ${price('s_ecom')}\n• Shadi/birthday card — ${price('s_inv')}\n• PowerPoint — ${price('s_ppt')} · CV — ${price('s_cv')}\n• Logo aur brand kit — ${price('s_brand')}\n• 5 social posts — ${price('s_social')}\nAap ko kaunsi service chahiye? Main poori detail bata deti hoon.`,
`ہماری ابتدائی قیمتیں:\n• ویب سائٹ (ورڈپریس) — ${price('s_biz')}\n• لینڈنگ پیج — ${price('s_land')}\n• شاپیفائی اسٹور — ${price('s_shopify')}\n• مکمل ای کامرس اسٹور — ${price('s_ecom')}\n• شادی/سالگرہ کارڈ — ${price('s_inv')}\n• پاورپوائنٹ — ${price('s_ppt')} · سی وی — ${price('s_cv')}\n• لوگو اور برانڈ کٹ — ${price('s_brand')}\n• 5 سوشل پوسٹس — ${price('s_social')}\nآپ کو کون سی سروس چاہیے؟ میں پوری تفصیل بتا دیتی ہوں۔`)}
function overviewTime(){return tr(
`Typical delivery times:\n• Invitation card / CV — 24 hours\n• PPT — 24–48 hours · PDF/typing — same day\n• Logo & brand kit — ~48 hours\n• Social posts — 2–3 days\n• Landing page — 3–4 days\n• Website / Shopify — 5–7 working days\n• Full e-commerce store — 7–10 days\nUrgent work is possible too — just tell me your deadline.`,
`Aam delivery time:\n• Shadi card / CV — 24 ghante\n• PPT — 24–48 ghante · PDF/typing — usi din\n• Logo aur brand kit — ~48 ghante\n• Social posts — 2–3 din\n• Landing page — 3–4 din\n• Website / Shopify — 5–7 din\n• Mukammal e-commerce store — 7–10 din\nUrgent kaam bhi ho jata hai — bas apni deadline bata dein.`,
`عام ڈیلیوری ٹائم:\n• شادی کارڈ / سی وی — 24 گھنٹے\n• پی پی ٹی — 24–48 گھنٹے · پی ڈی ایف/ٹائپنگ — اسی دن\n• لوگو اور برانڈ کٹ — تقریباً 48 گھنٹے\n• سوشل پوسٹس — 2–3 دن\n• لینڈنگ پیج — 3–4 دن\n• ویب سائٹ / شاپیفائی — 5–7 دن\n• مکمل ای کامرس اسٹور — 7–10 دن\nارجنٹ کام بھی ہو جاتا ہے — بس اپنی ڈیڈ لائن بتا دیں۔`)}
function svcAll(s){return tr(
`${s.n[0]}\n💰 Price: from ${sp(s)}\n⏱ Delivery: ${s.t[0]}\n✅ Includes: ${fill(s.inc[0])}\nMore: ${lnk(s.link,'see details')}\nWould you like to book it?`,
`${s.n[1]}\n💰 Qeemat: ${sp(s)} se shuru\n⏱ Delivery: ${s.t[1]}\n✅ Is mein: ${fill(s.inc[1])}\nDetail: ${lnk(s.link,'yahan dekhein')}\nKya main aap ki booking kar doon?`,
`${s.n[2]}\n💰 قیمت: ${sp(s)} سے شروع\n⏱ ڈیلیوری: ${s.t[2]}\n✅ اس میں شامل: ${fill(s.inc[2])}\nتفصیل: ${lnk(s.link,'یہاں دیکھیں')}\nکیا میں آپ کی بکنگ کر دوں؟`)}
function svcPrice(s){return tr(
`${s.n[0]} starts from ${sp(s)}. It includes ${fill(s.inc[0])}. The final price depends on your exact needs — tell me a little about your project and I'll guide you.`,
`${s.n[1]} ${sp(s)} se shuru hai. Is mein ${fill(s.inc[1])}. Final qeemat aap ki zaroorat par depend karti hai — thora sa apne kaam ke baare mein bata dein.`,
`${s.n[2]} ${sp(s)} سے شروع ہے۔ اس میں ${fill(s.inc[2])}۔ حتمی قیمت آپ کی ضرورت پر منحصر ہے — تھوڑا سا اپنے کام کے بارے میں بتا دیں۔`)}
function svcTime(s){return tr(
`${s.n[0]} usually takes ${s.t[0]}. If you have an urgent deadline, tell me the date and we'll do our best to deliver earlier.`,
`${s.n[1]} aam tor par ${s.t[1]} mein tayyar ho jata hai. Agar jaldi chahiye to tareekh bata dein, hum koshish karenge pehle de dein.`,
`${s.n[2]} عام طور پر ${s.t[2]} میں تیار ہو جاتا ہے۔ اگر جلدی چاہیے تو تاریخ بتا دیں، ہم کوشش کریں گے پہلے دے دیں۔`)}
function svcDetails(s){return tr(`${s.n[0]} includes: ${fill(s.inc[0])}.\nPrice from ${sp(s)} · Delivery ${s.t[0]}.`,`${s.n[1]} mein: ${fill(s.inc[1])}.\nQeemat ${sp(s)} se · Delivery ${s.t[1]}.`,`${s.n[2]} میں: ${fill(s.inc[2])}۔\nقیمت ${sp(s)} سے · ڈیلیوری ${s.t[2]}۔`)}

/* ---------- lead capture ---------- */
const lead={};let lastSvc=null;
function startOrder(s){lead.step='name';lead.svc=s?s.n[0]:null;return tr(
`Great choice${s?' — '+s.n[0]:''}! Let's get it booked. May I have your name?`,
`Zabardast${s?' — '+s.n[1]:''}! Booking shuru karte hain. Aap ka naam kya hai?`,
`بہت خوب${s?' — '+s.n[2]:''}! بکنگ شروع کرتے ہیں۔ آپ کا نام کیا ہے؟`)}
function leadStep(t){
 if(lead.step==='name'){lead.name=t.replace(/^(my name is|i am|i'm|mera naam|main|mai)\s+/i,'').replace(/\s+(hai|he|hy)$/i,'').slice(0,40);if(lead.svc){lead.step='det';return tr(`Nice to meet you, ${lead.name}! Please share a few details — what you need, your deadline and budget (if any).`,`Shukriya ${lead.name}! Thori details bata dein — kya chahiye, kab tak, aur budget (agar ho).`,`شکریہ ${lead.name}! تھوڑی تفصیل بتا دیں — کیا چاہیے، کب تک، اور بجٹ (اگر ہو)۔`)}lead.step='svc';return tr(`Nice to meet you, ${lead.name}! Which service do you need? (website, Shopify, invitation card, PPT, CV, logo…)`,`Shukriya ${lead.name}! Aap ko kaunsi service chahiye? (website, Shopify, shadi card, PPT, CV, logo…)`,`شکریہ ${lead.name}! آپ کو کون سی سروس چاہیے؟ (ویب سائٹ، شاپیفائی، شادی کارڈ، پی پی ٹی، سی وی، لوگو…)`)}
 if(lead.step==='svc'){const s=pickService(norm(t));lead.svc=s?s.n[0]:t;lead.step='det';return tr(`Got it${s?' — '+s.n[0]+' (from '+sp(s)+', '+s.t[0]+')':''}. Now please share a few details: what you need, deadline and budget.`,`Theek hai${s?' — '+s.n[1]+' ('+sp(s)+' se, '+s.t[1]+')':''}. Ab thori details: kya chahiye, kab tak aur budget.`,`ٹھیک ہے${s?' — '+s.n[2]+' ('+sp(s)+' سے، '+s.t[2]+')':''}۔ اب تھوڑی تفصیل: کیا چاہیے، کب تک اور بجٹ۔`)}
 if(lead.step==='det'){lead.det=t;lead.step=null;const msg=`Hi Pakiza! New booking from your website.\nName: ${lead.name}\nService: ${lead.svc}\nDetails: ${lead.det}\nLanguage: ${L==='en'?'English':'Urdu'}`;
  return tr(`Thank you, ${lead.name}! Your booking request is ready. Tap below to send it — Pakiza will confirm the price and timeline within 24 hours (usually much sooner).\n${wa(msg)}`,`Shukriya ${lead.name}! Aap ki booking request tayyar hai. Neeche tap kar ke bhej dein — Pakiza 24 ghante ke andar (aksar foran) price aur time confirm kar dengi.\n${wa(msg)}`,`شکریہ ${lead.name}! آپ کی بکنگ تیار ہے۔ نیچے ٹیپ کر کے بھیج دیں — پاکیزہ 24 گھنٹے کے اندر قیمت اور وقت کنفرم کر دیں گی۔\n${wa(msg)}`)}
}

/* ---------- budget ---------- */
function budgetReply(q){const m=q.replace(/,/g,'').match(/(\d+(?:\.\d+)?)\s*(k|hazar|hazaar|ہزار)?/i);if(!m)return null;let n=parseFloat(m[1]);if(m[2])n*=1000;if(n<1)return null;
 const ok=S.filter(s=>s.id!=='digital'&&!s.per&&priceNum(s.p)!==undefined&&priceNum(s.p)<=n).sort((a,b)=>priceNum(b.p)-priceNum(a.p)).slice(0,5);
 if(!ok.length)return tr(`Thanks for sharing your budget. It's a little below our starting prices, but tell me what you need — Pakiza can often suggest a smaller package.\n${wa('Hi Pakiza! My budget is '+m[0]+'. Can you help?')}`,`Budget batane ka shukriya. Ye hamari starting price se thora kam hai, lekin bata dein kya chahiye — Pakiza aksar chhota package bana deti hain.\n${wa('Assalam o Alaikum! Mera budget '+m[0]+' hai, kya ho sakta hai?')}`,`بجٹ بتانے کا شکریہ۔ یہ ہماری ابتدائی قیمت سے تھوڑا کم ہے، لیکن بتا دیں کیا چاہیے — پاکیزہ اکثر چھوٹا پیکج بنا دیتی ہیں۔\n${wa('السلام علیکم! میرا بجٹ '+m[0]+' ہے')}`);
 return tr(`With that budget we can do:\n${ok.map(s=>'• '+s.n[0]+' — '+sp(s)).join('\n')}\nWhich one would you like?`,`Is budget mein ye ho sakta hai:\n${ok.map(s=>'• '+s.n[1]+' — '+sp(s)).join('\n')}\nIn mein se kaunsa chahiye?`,`اس بجٹ میں یہ ہو سکتا ہے:\n${ok.map(s=>'• '+s.n[2]+' — '+sp(s)).join('\n')}\nان میں سے کون سا چاہیے؟`)}

/* ---------- main brain ---------- */
function answer(t){
 if(!lead.step||AR.test(t)){L=detect(t);setLang(L,true)}
 const q=norm(t);
 const strongTime=has(q,['kitne din','kitny din','kitna time','kitna waqt','how long','how many days',' days ',' din ','کتنے دن','کتنا وقت'])>0;
 let isPrice=hasI(q,'price'),isTime=hasI(q,'time')||hasI(q,'urgent');
 if(strongTime&&!has(q,['price','cost','rate','qeemat','keemat','kitne ka','kitne ki','kitna ka','budget','charges','fee','how much','قیمت'])){isPrice=false;isTime=true}
 const looksQ=/[?؟]/.test(t)||isPrice||isTime||!!pickService(q)||hasI(q,'pay')||hasI(q,'services');
 if(lead.step==='name'&&looksQ){lead.step=null}
 else if(lead.step==='name'&&t.trim().split(/\s+/).length<=5)return leadStep(t);
 if(lead.step==='det'||(lead.step==='svc'&&!isPrice&&!isTime))return leadStep(t);
 const s=pickService(q);if(s)lastSvc=s;const sv=s||lastSvc;
 const isDet=hasI(q,'details'),isOrder=hasI(q,'order');
 const out=[];
 if(hasI(q,'complain'))return tr(`I'm really sorry to hear that. Please tell Pakiza directly so she can sort it out personally and quickly.\n${wa('Hi Pakiza, I have an issue: '+t)}`,`Bohat afsos hua sun kar. Barah-e-karam Pakiza ko seedha bata dein, woh khud jaldi hal karengi.\n${wa('Assalam o Alaikum Pakiza, mujhe masla hai: '+t)}`,`یہ سن کر بہت افسوس ہوا۔ براہِ کرم پاکیزہ کو براہِ راست بتا دیں، وہ خود جلدی حل کریں گی۔\n${wa('السلام علیکم پاکیزہ، مسئلہ: '+t)}`);
 if(hasI(q,'bot'))return tr(`I'm Pakiza's automated assistant 🤖 — I can answer prices and timelines and take your booking any time. For anything personal, Pakiza replies herself on WhatsApp.\n${wa('Hi Pakiza!')}`,`Main Pakiza ki automated assistant hoon 🤖 — price, time aur booking mein foran madad karti hoon. Personal baat ke liye Pakiza khud WhatsApp par jawab deti hain.\n${wa('Assalam o Alaikum Pakiza!')}`,`میں پاکیزہ کی خودکار اسسٹنٹ ہوں 🤖 — قیمت، وقت اور بکنگ میں فوری مدد کرتی ہوں۔ ذاتی بات کے لیے پاکیزہ خود واٹس ایپ پر جواب دیتی ہیں۔\n${wa('السلام علیکم پاکیزہ!')}`);
 if(/\b(budget|bajat)\b|بجٹ/.test(q)||(/\d{3,}/.test(q)&&!s&&isPrice)){const b=budgetReply(q);if(b)return b}
 if(s&&!isPrice&&!isTime&&!isDet&&!isOrder)return svcAll(s);
 if(sv&&isPrice)out.push(svcPrice(sv));
 if(sv&&isTime)out.push(svcTime(sv));
 if(sv&&isDet&&!isPrice)out.push(svcDetails(sv));
 if(!sv&&isPrice)out.push(overviewPrices());
 if(!sv&&isTime&&!isPrice)out.push(overviewTime());
 if(hasI(q,'discount'))out.push(tr(`We keep our prices fair for small businesses and students. For bigger projects or bundles (e.g. website + logo + posts) Pakiza can offer a better package price — and pre-bookings get early-bird pricing ✨`,`Hamari qeematein pehle hi students aur small business ke liye munasib hain. Bade project ya bundle (website + logo + posts) par Pakiza behtar package price de sakti hain — aur pre-booking par early-bird discount ✨`,`ہماری قیمتیں پہلے ہی مناسب ہیں۔ بڑے پروجیکٹ یا بنڈل پر پاکیزہ بہتر پیکج قیمت دے سکتی ہیں — اور پری بکنگ پر ارلی برڈ ڈسکاؤنٹ ✨`));
 if(hasI(q,'pay'))out.push(tr(`💳 Payment: in Pakistan — bank transfer, JazzCash or Easypaisa. International clients — Wise or the best option for your country. Projects: 50% advance, 50% on delivery. Small items (cards, CVs, PDFs) are paid upfront.`,`💳 Payment: Pakistan mein — bank transfer, JazzCash ya Easypaisa. Bahar ke clients — Wise ya jo aap ke mulk mein behtar ho. Projects: 50% advance, 50% delivery par. Chhote kaam (cards, CV, PDF) pehle payment.`,`💳 ادائیگی: پاکستان میں — بینک ٹرانسفر، جاز کیش یا ایزی پیسہ۔ بیرونِ ملک — وائز یا بہترین آپشن۔ پروجیکٹس: 50٪ ایڈوانس، 50٪ ڈیلیوری پر۔`));
 if(hasI(q,'rev'))out.push(tr(`✅ 2 rounds of changes are free. We keep working until you're happy with the result.`,`✅ 2 dafa changes bilkul free hain. Jab tak aap khush na hon hum theek karte rehte hain.`,`✅ دو بار تبدیلیاں مفت ہیں۔ جب تک آپ مطمئن نہ ہوں ہم ٹھیک کرتے رہتے ہیں۔`));
 if(hasI(q,'samples'))out.push(tr(`Here are some samples: ${lnk('invitations.html','invitation cards')} · ${lnk('home.html#work','portfolio')} · ${lnk('web-studio.html','website packages')}. Want something similar?`,`Ye kuch samples hain: ${lnk('invitations.html','invitation cards')} · ${lnk('home.html#work','portfolio')} · ${lnk('web-studio.html','website packages')}. Is jaisa chahiye?`,`کچھ نمونے: ${lnk('invitations.html','دعوت نامے')} · ${lnk('home.html#work','پورٹ فولیو')} · ${lnk('web-studio.html','ویب سائٹ پیکجز')}۔`));
 if(hasI(q,'domain'))out.push(tr(`Domain & hosting are bought in your own name (usually ${PK?'Rs 3,000–8,000':'$15–60'} per year, paid to the provider). We help you choose and set everything up — no hidden charges.`,`Domain aur hosting aap ke apne naam par li jati hai (aam tor par ${PK?'Rs 3,000–8,000':'$15–60'} saalana, provider ko). Hum choose aur setup mein poori madad karte hain — koi hidden charges nahi.`,`ڈومین اور ہوسٹنگ آپ کے اپنے نام پر لی جاتی ہے (عام طور پر ${PK?'3,000–8,000 روپے':'$15–60'} سالانہ)۔ ہم سیٹ اپ میں پوری مدد کرتے ہیں۔`));
 if(hasI(q,'seo'))out.push(tr(`🔍 Every website comes with basic SEO (titles, descriptions, speed, Google-ready pages) so customers can find you on Google.`,`🔍 Har website mein basic SEO shamil hai (titles, descriptions, speed) taake customers aap ko Google par dhoond saken.`,`🔍 ہر ویب سائٹ میں بنیادی SEO شامل ہے تاکہ گاہک آپ کو گوگل پر ڈھونڈ سکیں۔`));
 if(hasI(q,'mobile'))out.push(tr(`📱 Yes — every site we build is fully mobile-friendly.`,`📱 Jee haan — har website mobile par bilkul theek chalti hai.`,`📱 جی ہاں — ہر ویب سائٹ موبائل پر بالکل ٹھیک چلتی ہے۔`));
 if(hasI(q,'lang')&&!out.length)out.push(tr(`We work in both English and Urdu — you can chat with me in either one 😊`,`Hum English aur Urdu dono mein kaam karte hain — aap jis mein chahein baat karein 😊`,`ہم انگلش اور اردو دونوں میں کام کرتے ہیں — آپ جس میں چاہیں بات کریں 😊`));
 if(hasI(q,'learn'))out.push(tr(`🎓 We're starting easy lessons on our YouTube channel (e-commerce, Shopify, WordPress, digital products, PPTs & documents) in English & Urdu, plus a weekly live Q&A. Search "Studio Pakiza" on YouTube and subscribe!`,`🎓 Hum YouTube par aasan lessons shuru kar rahe hain (e-commerce, Shopify, WordPress, digital products, PPT & documents) English aur Urdu dono mein, aur har hafte live Q&A. YouTube par "Studio Pakiza" search kar ke subscribe kar lein!`,`🎓 ہم یوٹیوب پر آسان اسباق شروع کر رہے ہیں — انگلش اور اردو دونوں میں، اور ہر ہفتے لائیو سوال و جواب۔ یوٹیوب پر "Studio Pakiza" سرچ کریں!`));
 if(hasI(q,'where'))out.push(tr(`📍 We're based in Lahore, Pakistan and work 100% online with clients in Pakistan, the UK, USA, the Gulf and worldwide.`,`📍 Hum Lahore, Pakistan se hain aur poora kaam online karte hain — Pakistan, UK, USA, Gulf aur har jagah ke clients ke saath.`,`📍 ہم لاہور، پاکستان سے ہیں اور سارا کام آن لائن کرتے ہیں — دنیا بھر کے کلائنٹس کے ساتھ۔`));
 if(hasI(q,'hours'))out.push(tr(`I'm here 24/7 🌙 Pakiza personally replies on WhatsApp, usually within a few hours (always within 24h).`,`Main 24/7 yahan hoon 🌙 Pakiza khud WhatsApp par aksar kuch ghanton mein (24 ghante ke andar) jawab deti hain.`,`میں 24/7 یہاں ہوں 🌙 پاکیزہ خود واٹس ایپ پر چند گھنٹوں میں جواب دیتی ہیں۔`));
 if(hasI(q,'about'))out.push(tr(`Studio Pakiza is run by Pakiza Batool — web developer, designer and virtual assistant from Lahore, helping small businesses and students worldwide. We're now building our team too!`,`Studio Pakiza ko Pakiza Batool chalati hain — web developer, designer aur virtual assistant, Lahore se. Ab hum apni team bhi bana rahe hain!`,`اسٹوڈیو پاکیزہ، پاکیزہ بتول چلاتی ہیں — ویب ڈیولپر، ڈیزائنر اور ورچوئل اسسٹنٹ، لاہور سے۔`));
 if(hasI(q,'services')&&!out.length)out.push(tr(`We help with:\n💻 Websites, Shopify & WooCommerce\n💌 Wedding & birthday invitation cards\n📄 PPTs, documents, PDF editing, CVs\n🎨 Logos, social posts, menus & flyers\n🤝 Virtual assistant & Fiverr setup\n📦 Digital products (launching soon)\nWhat can I help you with?`,`Hum ye kaam karte hain:\n💻 Website, Shopify aur WooCommerce\n💌 Shadi aur birthday cards\n📄 PPT, documents, PDF editing, CV\n🎨 Logo, social posts, menu aur flyers\n🤝 Virtual assistant aur Fiverr setup\n📦 Digital products (jald)\nAap ko kis cheez mein madad chahiye?`,`ہم یہ کام کرتے ہیں:\n💻 ویب سائٹ، شاپیفائی اور ووکامرس\n💌 شادی اور سالگرہ کارڈز\n📄 پی پی ٹی، ڈاکیومنٹس، پی ڈی ایف، سی وی\n🎨 لوگو، سوشل پوسٹس، مینیو اور فلائرز\n🤝 ورچوئل اسسٹنٹ اور فائیور سیٹ اپ\n📦 ڈیجیٹل پروڈکٹس (جلد)\nآپ کو کس چیز میں مدد چاہیے؟`));
 if(hasI(q,'contact')&&!isOrder)out.push(tr(`📱 WhatsApp: +92 344 4720578\n✉️ zaidipakiza6@gmail.com\n${wa('Hi Pakiza! I found you on your website.')}`,`📱 WhatsApp: +92 344 4720578\n✉️ zaidipakiza6@gmail.com\n${wa('Assalam o Alaikum Pakiza! Website se rabta kar raha/rahi hoon.')}`,`📱 واٹس ایپ: 4720578 344 92+\n✉️ zaidipakiza6@gmail.com\n${wa('السلام علیکم پاکیزہ! ویب سائٹ سے رابطہ کر رہا/رہی ہوں۔')}`));
 const hardOrder=has(q,['order','book','booking','pre-book','prebook','hire','آرڈر','بک'])>0;
 if(isOrder&&!hardOrder&&s&&!isPrice&&!isTime&&!out.length)return svcAll(s);
 if(isOrder&&!isPrice&&!isTime)return (out.length?out.join('\n\n')+'\n\n':'')+startOrder(sv);
 if(out.length)return out.join('\n\n');
 if(hasI(q,'how'))return tr(`I'm doing great, thank you for asking! 😊 How can I help you today?`,`Main bilkul theek hoon, poochne ka shukriya! 😊 Bataiye kaise madad karoon?`,`میں بالکل ٹھیک ہوں، پوچھنے کا شکریہ! 😊 بتائیے کیسے مدد کروں؟`);
 if(hasI(q,'thanks'))return tr(`You're most welcome! 😊 Anything else I can help with?`,`Koi baat nahi! 😊 Aur kuch madad chahiye?`,`کوئی بات نہیں! 😊 اور کچھ مدد چاہیے؟`);
 if(hasI(q,'bye'))return tr(`Thank you for visiting Studio Pakiza! Take care 💜`,`Studio Pakiza visit karne ka shukriya! Allah Hafiz 💜`,`اسٹوڈیو پاکیزہ آنے کا شکریہ! اللہ حافظ 💜`);
 if(hasI(q,'greet'))return greet();
 if(/^(yes|yeah|yep|ok|okay|sure|haan|han|ji|jee|g|theek|thik|acha|ہاں|جی|ٹھیک)\b/i.test(t.trim())&&lastSvc)return startOrder(lastSvc);
 return tr(`I want to make sure I understand you correctly 🙂 Are you asking about a website, Shopify store, invitation card, PPT/documents, logo/design — or something else? You can also message Pakiza directly:\n${wa('Hi Pakiza! '+t)}`,`Main sahi samajhna chahti hoon 🙂 Kya aap website, Shopify store, shadi card, PPT/documents, logo/design ke baare mein pooch rahe hain — ya kuch aur? Aap Pakiza ko seedha message bhi kar sakte hain:\n${wa('Assalam o Alaikum Pakiza! '+t)}`,`میں صحیح سمجھنا چاہتی ہوں 🙂 کیا آپ ویب سائٹ، شاپیفائی، شادی کارڈ، پی پی ٹی، لوگو/ڈیزائن کے بارے میں پوچھ رہے ہیں — یا کچھ اور؟ آپ پاکیزہ کو براہِ راست میسج بھی کر سکتے ہیں:\n${wa('السلام علیکم پاکیزہ! '+t)}`);
}
function greet(){return tr(`Hello! 👋 Welcome to Studio Pakiza. I can tell you prices and delivery times for websites, Shopify stores, invitation cards, PPTs & documents, logos and more — and book your order. You can chat in English or Urdu. How can I help?`,`Assalam o Alaikum! 👋 Studio Pakiza mein khush aamdeed. Main website, Shopify store, shadi cards, PPT/documents, logo waghera ki qeemat aur delivery time bata sakti hoon aur aap ki booking bhi kar sakti hoon. Bataiye kya chahiye?`,`السلام علیکم! 👋 اسٹوڈیو پاکیزہ میں خوش آمدید۔ میں ویب سائٹ، شاپیفائی اسٹور، شادی کارڈز، پی پی ٹی، لوگو وغیرہ کی قیمت اور ڈیلیوری ٹائم بتا سکتی ہوں اور بکنگ بھی کر سکتی ہوں۔ بتائیے کیا چاہیے؟`)}

/* ---------- UI ---------- */
const btn=document.createElement('button');btn.className='spc-btn';btn.innerHTML='<i></i>Chat with us';
const box=document.createElement('div');box.className='spc';
box.innerHTML=`<div class="spc-h"><div class="av">P</div><div><b>Pakiza Assistant</b><small class="spc-sub"></small></div><div class="spc-lg"><button data-l="en">EN</button><button data-l="ru">Roman</button><button data-l="ur">اردو</button></div><button class="spc-x" aria-label="Close">✕</button></div><div class="spc-m"></div><div class="spc-q"></div><form class="spc-f"><input placeholder="Type your question…" aria-label="Message"><button>Send</button></form>`;
document.body.appendChild(btn);document.body.appendChild(box);
const M=box.querySelector('.spc-m'),Q=box.querySelector('.spc-q'),F=box.querySelector('form'),In=F.querySelector('input');
const add=(t,who)=>{const d=document.createElement('div');d.className='spc-bb '+who;d.dir='auto';if(who==='bot')d.innerHTML=t;else d.textContent=t;M.appendChild(d);M.scrollTop=M.scrollHeight};
const ask=t=>{add(t,'me');const ty=document.createElement('div');ty.className='spc-ty';ty.textContent='…';M.appendChild(ty);M.scrollTop=M.scrollHeight;let r;try{r=answer(t)}catch(e){r=wa('Hi Pakiza! '+t)}setTimeout(()=>{ty.remove();add(r,'bot')},Math.min(1100,350+r.length*2))};
function setLang(l,quiet){L=l;box.querySelectorAll('.spc-lg button').forEach(b=>b.classList.toggle('on',b.dataset.l===l));box.querySelector('.spc-sub').textContent=T.sub[l];In.placeholder=T.ph[l];In.dir=l==='ur'?'rtl':'auto';Q.innerHTML='';T.q[l].forEach(x=>{const b=document.createElement('button');b.type='button';b.textContent=x;b.onclick=()=>ask(x);Q.appendChild(b)});if(!quiet&&M.children.length)add(greet(),'bot')}
box.querySelectorAll('.spc-lg button').forEach(b=>b.onclick=()=>setLang(b.dataset.l));
setLang(/^ur/i.test(navigator.language||'')?'ur':(PK?'ru':'en'),true);
F.onsubmit=e=>{e.preventDefault();const t=In.value.trim();if(!t)return;In.value='';ask(t)};
btn.onclick=()=>{box.classList.add('on');btn.style.display='none';if(!M.children.length)add(greet(),'bot');In.focus()};
box.querySelector('.spc-x').onclick=()=>{box.classList.remove('on');btn.style.display='flex'};
window.SPC={answer:t=>answer(t)};
})();
