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
.spc-lg{margin-left:auto;display:flex;gap:4px}.spc-lg button{background:rgba(255,255,255,.1);border:0;color:#cfd5e2;border-radius:999px;padding:4px 8px;font:600 11.5px Inter,sans-serif;cursor:pointer}.spc-lg button.on{background:#B9774E;color:#fff}.spc-x{margin-left:6px;background:none;border:0;color:#fff;font-size:20px;cursor:pointer}
.spc-m{flex:1;overflow-y:auto;padding:16px;background:#F5F6F8;display:flex;flex-direction:column;gap:10px}
.spc-m .spc-bb{position:static;transform:none;filter:none;opacity:1;width:auto;height:auto;inset:auto;max-width:85%;padding:11px 14px;border-radius:14px;font-size:14.5px;line-height:1.5;white-space:pre-line}
.spc-m .spc-bb.bot{background:#fff;color:#2B3446;border:1px solid #E4E7EC;border-top-left-radius:4px}
.spc-m .spc-bb.me{background:#121A2C;color:#fff;align-self:flex-end;border-top-right-radius:4px}
.spc-m a{color:#9A5F3B;font-weight:600}
.spc-q{display:flex;flex-wrap:wrap;gap:6px;padding:10px 12px;border-top:1px solid #E4E7EC;background:#fff}
.spc-q button{border:1px solid #E4E7EC;background:#fff;border-radius:999px;padding:7px 11px;font:500 13px Inter,sans-serif;color:#2B3446;cursor:pointer}
.spc-q button:hover{border-color:#121A2C}
.spc-f{display:flex;gap:8px;padding:10px 12px;border-top:1px solid #E4E7EC}
.spc-f input{flex:1;border:1px solid #E4E7EC;border-radius:10px;padding:11px 12px;font:14.5px Inter,sans-serif;outline:none}
.spc-f button{border:0;background:#B9774E;color:#fff;border-radius:10px;padding:0 16px;font-weight:700;cursor:pointer}
.spc-h small{display:block;white-space:nowrap}@media(max-width:560px){.spc-h{padding:14px 12px;gap:10px}.spc-h b{font-size:14px}.spc-h .av{width:34px;height:34px;font-size:24px}.spc{right:8px;left:8px;width:auto;max-width:none;bottom:12px;height:72vh}.spc-btn{right:14px;bottom:84px;height:44px;padding:0 14px;font-size:13.5px}}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const cur=()=>{try{const c=document.getElementById('cur');return c&&window.PR?c.value:null}catch(e){return null}};
const PK=(()=>{try{return /Karachi/.test(Intl.DateTimeFormat().resolvedOptions().timeZone)}catch(e){return false}})();
const price=k=>{const c=cur();if(c&&window.PR&&PR[c]&&PR[c][k]!==undefined)return PR[c].s+Number(PR[c][k]).toLocaleString('en-US');const d=PK?{s_shopify:'Rs 15,000',s_wp:'Rs 20,000',s_fiverr:'Rs 3,500',s_social:'Rs 2,500',s_brand:'Rs 6,000',s_pin:'Rs 2,000',s_va:'Rs 800'}:{s_shopify:'$79',s_wp:'$99',s_fiverr:'$25',s_social:'$15',s_brand:'$35',s_pin:'$12',s_va:'$5'};return d[k]||''};
let L='en';
const T={
 wa:{en:'Continue on WhatsApp →',ru:'WhatsApp par baat karein →',ur:'واٹس ایپ پر بات کریں ←'},
 ph:{en:'Type your question…',ru:'Apna sawal likhein…',ur:'اپنا سوال لکھیں…'},
 sub:{en:'Online now · English & Urdu',ru:'Online · English & Urdu',ur:'آن لائن · English & اردو'},
 fb:{en:t=>`I'm not 100% sure about that one, but Pakiza can answer personally.`,ru:t=>`Is ka pakka jawab Pakiza khud dengi — WhatsApp par message kar dein.`,ur:t=>`اس کا درست جواب پاکیزہ خود دیں گی — واٹس ایپ پر میسج کر دیں۔`},
 q:{en:['Website / Web Studio','Shopify store','Invitation cards','PPT & documents','Prices','Place an order','Talk to Pakiza'],
    ru:['Website banwani hai','Shopify store','Shadi card','PPT / documents','Prices kya hain?','Order karna hai','Pakiza se baat'],
    ur:['ویب سائٹ بنوانی ہے','شاپیفائی اسٹور','شادی کارڈ','پی پی ٹی / ڈاکیومنٹس','قیمتیں کیا ہیں؟','آرڈر کرنا ہے','پاکیزہ سے بات']},
 o1:{en:`Great! Let's get your order started. What's your name?`,ru:`Zabardast! Order shuru karte hain. Aap ka naam kya hai?`,ur:`بہت خوب! آرڈر شروع کرتے ہیں۔ آپ کا نام کیا ہے؟`},
 o2:{en:n=>`Nice to meet you, ${n}! Which service do you need? (e.g. website, Shopify, invitation card, PPT, logo…)`,ru:n=>`Shukriya ${n}! Aap ko kaunsi service chahiye? (jaise website, Shopify, shadi card, PPT, logo…)`,ur:n=>`شکریہ ${n}! آپ کو کون سی سروس چاہیے؟ (جیسے ویب سائٹ، شاپیفائی، شادی کارڈ، پی پی ٹی، لوگو…)`},
 o3:{en:`Got it. Please share a few details — deadline, budget or anything special.`,ru:`Theek hai. Thori details bata dein — kab tak chahiye, budget, ya koi khaas baat.`,ur:`ٹھیک ہے۔ تھوڑی تفصیل بتا دیں — کب تک چاہیے، بجٹ، یا کوئی خاص بات۔`},
 o4:{en:n=>`Perfect, ${n}! Your request is ready. Tap below to send it — Pakiza will reply within 24 hours.`,ru:n=>`Bohat khoob ${n}! Aap ki request tayyar hai. Neeche tap kar ke bhej dein — Pakiza 24 ghante mein jawab dengi.`,ur:n=>`بہت خوب ${n}! آپ کی درخواست تیار ہے۔ نیچے ٹیپ کر کے بھیج دیں — پاکیزہ 24 گھنٹے میں جواب دیں گی۔`}
};
const wa=t=>`<a href="https://wa.me/${WA}?text=${encodeURIComponent(t)}" target="_blank" rel="noopener">${T.wa[L]}</a>`;
const lead={};
const KB=[
 {k:['hi','hello','salam','assalam','hey','aoa','hy','سلام','السلام','ہیلو'],a:{
  en:()=>`Hello! 👋 I'm the Studio Pakiza assistant. I can help with websites, Shopify, design, invitation cards, documents & PPTs, and digital products. You can also chat in Urdu. What do you need today?`,
  ru:()=>`Assalam o Alaikum! 👋 Main Studio Pakiza ki assistant hoon. Website, Shopify, design, shadi/birthday cards, PPT aur documents — sab mein madad kar sakti hoon. Bataiye aap ko kya chahiye?`,
  ur:()=>`السلام علیکم! 👋 میں اسٹوڈیو پاکیزہ کی اسسٹنٹ ہوں۔ ویب سائٹ، شاپیفائی، ڈیزائن، شادی/برتھ ڈے کارڈز، پی پی ٹی اور ڈاکیومنٹس — سب میں مدد کر سکتی ہوں۔ بتائیے آپ کو کیا چاہیے؟`}},
 {k:['website','web','developer','wordpress','woocommerce','landing','site','ویب','سائٹ','ورڈپریس'],a:{
  en:()=>`💻 Web Studio — we build:\n• Business & portfolio websites\n• WordPress & WooCommerce online shops\n• Landing pages\n• Shopify stores\nWordPress starts from ${price('s_wp')}, Shopify from ${price('s_shopify')}. Usually ready in 5–7 working days.\nSee all packages: <a href="web-studio.html">Web Studio</a>`,
  ru:()=>`💻 Web Studio — hum banate hain:\n• Business aur portfolio websites\n• WordPress & WooCommerce online shop\n• Landing pages\n• Shopify stores\nWordPress ${price('s_wp')} se, Shopify ${price('s_shopify')} se shuru. Aam tor par 5–7 din mein tayyar.\nSaare packages: <a href="web-studio.html">Web Studio</a>`,
  ur:()=>`💻 ویب اسٹوڈیو — ہم بناتے ہیں:\n• بزنس اور پورٹ فولیو ویب سائٹس\n• ورڈپریس اور ووکامرس آن لائن شاپ\n• لینڈنگ پیجز\n• شاپیفائی اسٹورز\nورڈپریس ${price('s_wp')} سے، شاپیفائی ${price('s_shopify')} سے شروع۔ عام طور پر 5–7 دن میں تیار۔\nتمام پیکجز: <a href="web-studio.html">Web Studio</a>`}},
 {k:['shopify','store','ecommerce','e-commerce','online shop','dropship','dukan','دکان','اسٹور','شاپیفائی'],a:{
  en:()=>`🛒 Shopify store setup starts from ${price('s_shopify')}: theme & branding, up to 20 products, pages, policies, payments, shipping and a test order. Ready in about 5–7 days. Want a quote? Tell me your business type.`,
  ru:()=>`🛒 Shopify store ${price('s_shopify')} se shuru: theme aur branding, 20 products tak, pages, policies, payment, shipping aur test order. Taqreeban 5–7 din. Quote ke liye apna business type bata dein.`,
  ur:()=>`🛒 شاپیفائی اسٹور ${price('s_shopify')} سے شروع: تھیم اور برانڈنگ، 20 پروڈکٹس تک، پیجز، پالیسیز، پیمنٹ، شپنگ اور ٹیسٹ آرڈر۔ تقریباً 5–7 دن۔ کوٹ کے لیے اپنا بزنس بتا دیں۔`}},
 {k:['invitation','invite','card','nikah','walima','mehndi','mayun','baraat','barat','dholki','birthday','aqiqa','wedding','shadi','shaadi','دعوت','کارڈ','نکاح','ولیمہ','مہندی','بارات','شادی','سالگرہ'],a:{
  en:()=>`💌 Invitation cards for Nikah, Mehndi, Mayun, Baraat, Walima, Dholki, Birthday & Aqiqa. Send your names, date, time and venue and we design it in 24 hours — ready for WhatsApp and printing.\nBrowse designs: <a href="invitations.html">Invitation Studio</a>`,
  ru:()=>`💌 Nikah, Mehndi, Mayun, Baraat, Walima, Dholki, Birthday aur Aqiqa ke cards. Naam, tareekh, waqt aur jagah bhej dein — 24 ghante mein design tayyar, WhatsApp aur print dono ke liye.\nDesigns dekhein: <a href="invitations.html">Invitation Studio</a>`,
  ur:()=>`💌 نکاح، مہندی، مایوں، بارات، ولیمہ، ڈھولکی، سالگرہ اور عقیقہ کے کارڈز۔ نام، تاریخ، وقت اور جگہ بھیج دیں — 24 گھنٹے میں ڈیزائن تیار، واٹس ایپ اور پرنٹ دونوں کے لیے۔\nڈیزائن دیکھیں: <a href="invitations.html">Invitation Studio</a>`}},
 {k:['assignment','ppt','powerpoint','presentation','slides','document','word','pdf','resume','cv','typing','format','docs','پی پی ٹی','ڈاکیومنٹ','اسائنمنٹ','ٹائپنگ'],a:{
  en:()=>`📄 Docs & Slides Desk:\n• PowerPoint presentation design\n• Word document formatting & typing\n• PDF editing & conversion (PDF ↔ Word/Excel)\n• CV / resume design\n• Assignment formatting, referencing & proofreading\nSee: <a href="docs-studio.html">Docs & Slides Desk</a>`,
  ru:()=>`📄 Docs & Slides Desk:\n• PowerPoint presentation design\n• Word document formatting aur typing\n• PDF editing aur conversion (PDF ↔ Word/Excel)\n• CV / resume design\n• Assignment formatting, referencing aur proofreading\nDekhein: <a href="docs-studio.html">Docs & Slides Desk</a>`,
  ur:()=>`📄 ڈاکس اینڈ سلائیڈز ڈیسک:\n• پاورپوائنٹ پریزنٹیشن ڈیزائن\n• ورڈ ڈاکیومنٹ فارمیٹنگ اور ٹائپنگ\n• پی ڈی ایف ایڈیٹنگ اور کنورژن\n• سی وی / ریزیومے ڈیزائن\n• اسائنمنٹ فارمیٹنگ اور پروف ریڈنگ\nدیکھیں: <a href="docs-studio.html">Docs & Slides Desk</a>`}},
 {k:['logo','brand','branding','brand kit','لوگو','برانڈ'],a:{
  en:()=>`✨ Brand kit (logo, colours, fonts, brand board) starts from ${price('s_brand')}, delivered in about 48 hours.`,
  ru:()=>`✨ Brand kit (logo, colours, fonts, brand board) ${price('s_brand')} se shuru, taqreeban 48 ghante mein.`,
  ur:()=>`✨ برانڈ کٹ (لوگو، رنگ، فونٹس، برانڈ بورڈ) ${price('s_brand')} سے شروع، تقریباً 48 گھنٹے میں۔`}},
 {k:['social','instagram','post','facebook','canva','design','menu','gym','diet','flyer','poster','banner','ڈیزائن','پوسٹ','مینیو'],a:{
  en:()=>`🎨 Social media & graphic design — posts, stories, menus, gym price lists, diet plans, flyers and banners. 5 posts from ${price('s_social')}.`,
  ru:()=>`🎨 Social media aur graphic design — posts, stories, menu, gym price list, diet plan, flyers aur banners. 5 posts ${price('s_social')} se.`,
  ur:()=>`🎨 سوشل میڈیا اور گرافک ڈیزائن — پوسٹس، اسٹوریز، مینیو، جم پرائس لسٹ، ڈائٹ پلان، فلائرز اور بینرز۔ 5 پوسٹس ${price('s_social')} سے۔`}},
 {k:['pinterest','pins','پنٹرسٹ'],a:{
  en:()=>`📌 Pinterest pins with keyword research, titles and descriptions — 5 pins from ${price('s_pin')}.`,
  ru:()=>`📌 Pinterest pins keyword research, titles aur descriptions ke saath — 5 pins ${price('s_pin')} se.`,
  ur:()=>`📌 پنٹرسٹ پنز کی ورڈ ریسرچ، ٹائٹلز اور ڈسکرپشن کے ساتھ — 5 پنز ${price('s_pin')} سے۔`}},
 {k:['va','virtual assistant','data entry','excel','sheets','admin','listing','ڈیٹا','ایکسل'],a:{
  en:()=>`🤝 Virtual assistant & data entry from ${price('s_va')} per hour — Excel/Sheets, product listings, inbox and admin tasks. Remote, any time zone.`,
  ru:()=>`🤝 Virtual assistant aur data entry ${price('s_va')} per ghanta se — Excel/Sheets, product listing, inbox aur admin ka kaam.`,
  ur:()=>`🤝 ورچوئل اسسٹنٹ اور ڈیٹا انٹری ${price('s_va')} فی گھنٹہ سے — ایکسل/شیٹس، پروڈکٹ لسٹنگ، ان باکس اور ایڈمن کا کام۔`}},
 {k:['fiverr','gig','upwork','فائیور'],a:{
  en:()=>`💼 Fiverr profile & gig setup from ${price('s_fiverr')} — bio, up to 3 gigs, packages, tags and thumbnails.`,
  ru:()=>`💼 Fiverr profile aur gig setup ${price('s_fiverr')} se — bio, 3 gigs tak, packages, tags aur thumbnails.`,
  ur:()=>`💼 فائیور پروفائل اور گِگ سیٹ اپ ${price('s_fiverr')} سے — بائیو، 3 گِگز تک، پیکجز، ٹیگز اور تھمب نیلز۔`}},
 {k:['digital product','planner','caption','checklist','template','download','bundle','پلانر'],a:{
  en:()=>`📦 Our digital products (planners, caption packs, Shopify checklist, Fiverr kit and more) are launching very soon! Leave your WhatsApp and we'll message you on launch day.`,
  ru:()=>`📦 Hamare digital products (planners, caption packs, Shopify checklist, Fiverr kit) bohat jald launch ho rahe hain! Apna WhatsApp chhor dein, launch wale din message karenge.`,
  ur:()=>`📦 ہمارے ڈیجیٹل پروڈکٹس (پلانرز، کیپشن پیکس، شاپیفائی چیک لسٹ، فائیور کٹ) بہت جلد لانچ ہو رہے ہیں! اپنا واٹس ایپ چھوڑ دیں، لانچ والے دن میسج کریں گے۔`}},
 {k:['price','cost','rate','charges','kitne','kitna','kitni','fee','budget','how much','paise','qeemat','قیمت','ریٹ','کتنے','کتنا','پیسے'],a:{
  en:()=>`Starting prices:\n• Shopify store ${price('s_shopify')}\n• WordPress website ${price('s_wp')}\n• Fiverr setup ${price('s_fiverr')}\n• Brand kit ${price('s_brand')}\n• 5 social posts ${price('s_social')}\n• VA ${price('s_va')}/hour\nExact quote depends on your project — tell me what you need.`,
  ru:()=>`Shuru ki qeematein:\n• Shopify store ${price('s_shopify')}\n• WordPress website ${price('s_wp')}\n• Fiverr setup ${price('s_fiverr')}\n• Brand kit ${price('s_brand')}\n• 5 social posts ${price('s_social')}\n• VA ${price('s_va')}/ghanta\nPakki qeemat project par depend karti hai — bataiye kya chahiye.`,
  ur:()=>`ابتدائی قیمتیں:\n• شاپیفائی اسٹور ${price('s_shopify')}\n• ورڈپریس ویب سائٹ ${price('s_wp')}\n• فائیور سیٹ اپ ${price('s_fiverr')}\n• برانڈ کٹ ${price('s_brand')}\n• 5 سوشل پوسٹس ${price('s_social')}\n• اسسٹنٹ ${price('s_va')} فی گھنٹہ\nحتمی قیمت پروجیکٹ پر منحصر ہے — بتائیے کیا چاہیے۔`}},
 {k:['time','how long','days','deadline','delivery','urgent','kab','kitne din','jaldi','وقت','دن','کب','جلدی'],a:{
  en:()=>`⏱ Typical timelines: invitation card 24h · brand kit 48h · social posts 2–3 days · Shopify/WordPress 5–7 working days. Urgent orders possible — just ask.`,
  ru:()=>`⏱ Aam waqt: shadi card 24 ghante · brand kit 48 ghante · social posts 2–3 din · Shopify/WordPress 5–7 din. Urgent order bhi ho sakta hai — bata dein.`,
  ur:()=>`⏱ عام وقت: شادی کارڈ 24 گھنٹے · برانڈ کٹ 48 گھنٹے · سوشل پوسٹس 2–3 دن · شاپیفائی/ورڈپریس 5–7 دن۔ ارجنٹ آرڈر بھی ہو سکتا ہے۔`}},
 {k:['pay','payment','bank','easypaisa','jazzcash','paypal','wise','advance','پیمنٹ','ایزی پیسہ','جاز کیش','ادائیگی'],a:{
  en:()=>`💳 In Pakistan: bank transfer / JazzCash / Easypaisa. International clients: we share the best option for your country. Usually 50% advance, 50% on delivery for projects.`,
  ru:()=>`💳 Pakistan mein: bank transfer / JazzCash / Easypaisa. Bahar ke clients ke liye behtareen option bata dete hain. Projects mein aam tor par 50% advance, 50% delivery par.`,
  ur:()=>`💳 پاکستان میں: بینک ٹرانسفر / جاز کیش / ایزی پیسہ۔ بیرونِ ملک کلائنٹس کے لیے بہترین آپشن بتا دیتے ہیں۔ پروجیکٹس میں عام طور پر 50٪ ایڈوانس، 50٪ ڈیلیوری پر۔`}},
 {k:['revision','edit','change','refund','tabdeeli','تبدیلی'],a:{
  en:()=>`✅ Two rounds of revisions are included. If something isn't right, we fix it — you only pay for work you're happy with.`,
  ru:()=>`✅ Do dafa changes free hain. Kuch theek na lage to hum theek kar dete hain.`,
  ur:()=>`✅ دو بار تبدیلیاں مفت ہیں۔ کچھ ٹھیک نہ لگے تو ہم ٹھیک کر دیتے ہیں۔`}},
 {k:['who','about','pakiza','owner','kaun','کون','پاکیزہ'],a:{
  en:()=>`Studio Pakiza is run by Pakiza Batool — web developer, designer and virtual assistant based in Lahore, working remotely with clients worldwide.`,
  ru:()=>`Studio Pakiza Pakiza Batool chalati hain — web developer, designer aur virtual assistant, Lahore se, duniya bhar ke clients ke saath kaam.`,
  ur:()=>`اسٹوڈیو پاکیزہ، پاکیزہ بتول چلاتی ہیں — ویب ڈیولپر، ڈیزائنر اور ورچوئل اسسٹنٹ، لاہور سے، دنیا بھر کے کلائنٹس کے ساتھ۔`}},
 {k:['contact','whatsapp','number','call','email','talk','human','rabta','رابطہ','نمبر','واٹس'],a:{
  en:()=>`📱 WhatsApp: +92 344 4720578\n✉️ zaidipakiza6@gmail.com\n${wa('Hi Pakiza! I found you on your website.')}`,
  ru:()=>`📱 WhatsApp: +92 344 4720578\n✉️ zaidipakiza6@gmail.com\n${wa('Assalam o Alaikum Pakiza! Website se aap ka number mila.')}`,
  ur:()=>`📱 واٹس ایپ: 4720578 344 92+\n✉️ zaidipakiza6@gmail.com\n${wa('السلام علیکم پاکیزہ! ویب سائٹ سے آپ کا نمبر ملا۔')}`}},
 {k:['order','book','quote','start','hire','buy','want','chahiye','chahye','banwana','banwani','karwana','آرڈر','بنوانا','بنوانی','چاہیے','بک'],a:{en:()=>{lead.step='name';return T.o1.en},ru:()=>{lead.step='name';return T.o1.ru},ur:()=>{lead.step='name';return T.o1.ur}},order:1},
 {k:['thanks','thank','shukria','shukriya','jazak','شکریہ','جزاک'],a:{en:()=>`You're welcome! 😊 Anything else I can help with?`,ru:()=>`Koi baat nahi! 😊 Aur kuch madad chahiye?`,ur:()=>`کوئی بات نہیں! 😊 اور کچھ مدد چاہیے؟`}},
];
const RU=/\b(kya|kia|hai|hain|mujhe|muje|mjhe|chahiye|chahye|chaiye|kitne|kitna|kitni|kaise|kese|kaisay|banwana|banwani|karna|krna|krni|karwana|aap|ap|apka|bhai|baji|api|kab|kahan|nahi|nhi|haan|han|acha|theek|thik|salam|shukriya|shukria|mein|mai|hum|wala|wali|shadi|shaadi|qeemat|paise|rabta|bata|batao|bataen|dein|karo|kr|krdo|kardo)\b/gi;
function detect(t){if(/[؀-ۿ]/.test(t))return 'ur';const m=(t.match(RU)||[]).length;if(m>=2||(m>=1&&t.split(/\s+/).length<=3&&/salam|shukri|kitne|kitna|chahiye|batao/i.test(t)))return 'ru';if(/^[a-z0-9 ?!.,'&\/-]+$/i.test(t)&&t.split(/\s+/).length>=2)return 'en';return L}
function answer(t){
 if(!lead.step||/[\u0600-\u06FF]/.test(t)){L=detect(t);setLang(L,true)}
 const q=t.toLowerCase();
 if(lead.step){
  if(lead.step==='name'){lead.name=t;lead.step='svc';return T.o2[L](t)}
  if(lead.step==='svc'){lead.svc=t;lead.step='det';return T.o3[L]}
  if(lead.step==='det'){lead.det=t;lead.step=null;const msg=`Hi Pakiza! New order request from your website.\nName: ${lead.name}\nService: ${lead.svc}\nDetails: ${lead.det}\nLanguage: ${L==='en'?'English':'Urdu'}`;
   return `${T.o4[L](lead.name)}\n${wa(msg)}`}
 }
 let best=null,score=0;
 for(const it of KB){let s=0;for(const k of it.k){if(q.includes(k))s+=k.length*(it.order?0.6:1)}if(s>score){score=s;best=it}}
 if(best)return best.a[L]();
 return `${T.fb[L](t)}\n${wa('Hi Pakiza! '+t)}`;
}
const btn=document.createElement('button');btn.className='spc-btn';btn.innerHTML='<i></i>Chat with us';
const box=document.createElement('div');box.className='spc';
box.innerHTML=`<div class="spc-h"><div class="av">P</div><div><b>Pakiza Assistant</b><small class="spc-sub"></small></div><div class="spc-lg"><button data-l="en">EN</button><button data-l="ru">Roman</button><button data-l="ur">اردو</button></div><button class="spc-x" aria-label="Close">✕</button></div><div class="spc-m"></div><div class="spc-q"></div><form class="spc-f"><input placeholder="Type your question…" aria-label="Message"><button>Send</button></form>`;
document.body.appendChild(btn);document.body.appendChild(box);
const M=box.querySelector('.spc-m'),Q=box.querySelector('.spc-q'),F=box.querySelector('form'),I=F.querySelector('input');
const add=(t,who)=>{const d=document.createElement('div');d.className='spc-bb '+who;d.dir='auto';if(who==='bot')d.innerHTML=t;else d.textContent=t;M.appendChild(d);M.scrollTop=M.scrollHeight};
const ask=t=>{add(t,'me');setTimeout(()=>add(answer(t),'bot'),350)};
function setLang(l,quiet){L=l;box.querySelectorAll('.spc-lg button').forEach(b=>b.classList.toggle('on',b.dataset.l===l));box.querySelector('.spc-sub').textContent=T.sub[l];I.placeholder=T.ph[l];I.dir=l==='ur'?'rtl':'auto';Q.innerHTML='';T.q[l].forEach(x=>{const b=document.createElement('button');b.type='button';b.textContent=x;b.onclick=()=>ask(x);Q.appendChild(b)});if(!quiet&&M.children.length)add(KB[0].a[l](),'bot')}
box.querySelectorAll('.spc-lg button').forEach(b=>b.onclick=()=>setLang(b.dataset.l));
setLang(/^ur/i.test(navigator.language||'')?'ur':(PK?'ru':'en'),true);
F.onsubmit=e=>{e.preventDefault();const t=I.value.trim();if(!t)return;I.value='';ask(t)};
btn.onclick=()=>{box.classList.add('on');btn.style.display='none';if(!M.children.length)add(KB[0].a[L](),'bot');I.focus()};
box.querySelector('.spc-x').onclick=()=>{box.classList.remove('on');btn.style.display='flex'};
})();
