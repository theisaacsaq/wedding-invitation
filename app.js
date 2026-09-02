/* Edit this object with the final family, event and contact details. */
const CONFIG = {
  bride: "عائشہ",
  groom: "حمزہ",
  host: "__________",
  whatsapp: "923001234567",
  maxGuests: 4,
  barat: { dateText: "بروز ہفتہ، ۱۲ دسمبر ۲۰۲۶", timeText: "شام ۷:۰۰ بجے", venue: "باراتی ہال، کراچی", mapQuery: "Karachi Pakistan", start: "20261212T140000Z", end: "20261212T180000Z" },
  walima: { dateText: "بروز اتوار، ۱۳ دسمبر ۲۰۲۶", timeText: "رات ۸:۰۰ بجے", venue: "پرل بینکوئٹ، کراچی", mapQuery: "Karachi Pakistan", start: "20261213T150000Z", end: "20261213T190000Z" },
  countdownTo: "2026-12-12T19:00:00+05:00"
};

const params = new URLSearchParams(location.search);
const inviteType = params.get("invite") || "both"; // both | walima
const guest = params.get("guest") || "معزز مہمان و اہلِ خانہ";
const maxGuests = Math.max(1, Math.min(20, Number(params.get("max")) || CONFIG.maxGuests));
const counts = { ladies: 0, gents: 0, children: 0 };
const $ = id => document.getElementById(id);
const setText = (id, value) => { const el = $(id); if (el) el.textContent = value; };

function applyContent(){
  ["coverBride","brideName","footerBride"].forEach(id=>setText(id,CONFIG.bride));
  ["coverGroom","groomName","footerGroom"].forEach(id=>setText(id,CONFIG.groom));
  ["coverGuest","guestName"].forEach(id=>setText(id,guest));
  setText("hostName",CONFIG.host);
  setText("baratDate",CONFIG.barat.dateText); setText("baratTime",CONFIG.barat.timeText); setText("baratVenue",CONFIG.barat.venue);
  setText("walimaDate",CONFIG.walima.dateText); setText("walimaTime",CONFIG.walima.timeText); setText("walimaVenue",CONFIG.walima.venue);
  setText("guestLimit",`زیادہ سے زیادہ ${maxGuests} افراد`);
  $("baratMap").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.barat.mapQuery)}`;
  $("walimaMap").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.walima.mapQuery)}`;
  $("baratCalendar").href = calendarUrl(`بارات — ${CONFIG.bride} و ${CONFIG.groom}`,CONFIG.barat);
  $("walimaCalendar").href = calendarUrl(`ولیمہ — ${CONFIG.bride} و ${CONFIG.groom}`,CONFIG.walima);
  if(inviteType === "walima"){
    $("baratCard").classList.add("hidden"); $("baratAttendance").classList.add("hidden");
    setText("rsvpHeading","ولیمہ میں شرکت"); setText("rsvpIntro","براہِ کرم واٹس ایپ پر اپنی شرکت کی تصدیق فرمائیں۔");
  }
  updateLinks();
}

function createPetals(){
  const layer=$("petalLayer");
  const count=window.innerWidth<600?12:20;
  for(let i=0;i<count;i++){
    const petal=document.createElement("i");
    petal.className="petal";
    petal.style.left=`${Math.random()*100}%`;
    petal.style.setProperty("--size",`${8+Math.random()*10}px`);
    petal.style.setProperty("--opacity",`${.28+Math.random()*.48}`);
    petal.style.setProperty("--duration",`${10+Math.random()*11}s`);
    petal.style.setProperty("--delay",`${-Math.random()*18}s`);
    layer.appendChild(petal);
  }
}

function calendarUrl(title,event){ return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${event.start}%2F${event.end}&location=${encodeURIComponent(event.venue)}`; }
function total(){ return counts.ladies + counts.gents + counts.children; }
function updateCounters(){ Object.keys(counts).forEach(k=>setText(`${k}Count`,counts[k])); updateLinks(); }
function updateLinks(){
  let accept;
  if(inviteType === "walima") accept=`السلام علیکم، ${guest} ان شاء اللہ ${CONFIG.bride} اور ${CONFIG.groom} کی دعوتِ ولیمہ میں شرکت کریں گے۔ بہت شکریہ۔`;
  else accept=`السلام علیکم، ${guest} ان شاء اللہ ${CONFIG.bride} اور ${CONFIG.groom} کی تقریبِ بارات میں شرکت کریں گے۔\nخواتین: ${counts.ladies}\nحضرات: ${counts.gents}\nبچے: ${counts.children}\nکل افراد: ${total()}`;
  const regret=`السلام علیکم، ${guest} معذرت کے ساتھ تقریب میں شرکت نہیں کر سکیں گے، مگر ہماری دعائیں ${CONFIG.bride} اور ${CONFIG.groom} کے ساتھ ہیں۔`;
  $("acceptBtn").href=`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(accept)}`;
  $("regretBtn").href=`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(regret)}`;
}

document.querySelectorAll(".counter button").forEach(btn=>btn.addEventListener("click",()=>{
  const key=btn.dataset.type;
  if(btn.dataset.action==="plus" && total()<maxGuests) counts[key]++;
  if(btn.dataset.action==="minus" && counts[key]>0) counts[key]--;
  updateCounters();
}));

let audioCtx, master, musicTimer, muted=false;
function playTone(freq,when,duration,volume){ const osc=audioCtx.createOscillator(), gain=audioCtx.createGain(); osc.type="sine"; osc.frequency.value=freq; gain.gain.setValueAtTime(0,when); gain.gain.linearRampToValueAtTime(volume,when+.7); gain.gain.exponentialRampToValueAtTime(.0001,when+duration); osc.connect(gain).connect(master); osc.start(when); osc.stop(when+duration); }
function musicPhrase(){ if(!audioCtx) return; const now=audioCtx.currentTime; [261.63,329.63,392,493.88].forEach((f,i)=>playTone(f,now+i*1.8,5,.035)); }
function startMusic(){ try{ audioCtx=new (window.AudioContext||window.webkitAudioContext)(); master=audioCtx.createGain(); master.gain.value=.8; master.connect(audioCtx.destination); musicPhrase(); musicTimer=setInterval(musicPhrase,7200); }catch(e){ $("musicToggle").classList.add("hidden"); } }
$("musicToggle").addEventListener("click",()=>{ if(!audioCtx)return; muted=!muted; master.gain.setTargetAtTime(muted?0:.8,audioCtx.currentTime,.15); $("musicToggle").classList.toggle("muted",muted); $("musicToggle").textContent=muted?"♩":"♫"; });
$("openInvite").addEventListener("click",()=>{ $("envelope").classList.add("opened"); document.body.classList.remove("locked"); startMusic(); setTimeout(()=>$("mainContent").scrollIntoView(),500); });

function tick(){ const diff=Math.max(0,new Date(CONFIG.countdownTo)-new Date()); const units=[["دن",86400000],["گھنٹے",3600000],["منٹ",60000],["سیکنڈ",1000]]; let rest=diff; $("countdown").innerHTML=units.map(([label,ms])=>{const n=Math.floor(rest/ms);rest%=ms;return `<div class="time-box"><strong>${String(n).padStart(2,"0")}</strong><span>${label}</span></div>`}).join(""); }
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12}); document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
createPetals(); applyContent(); tick(); setInterval(tick,1000);
