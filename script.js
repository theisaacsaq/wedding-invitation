const weddingDate = new Date('2026-12-19T19:00:00');
const countdown = document.getElementById('countdown');
function updateCountdown(){
  const diff = weddingDate - new Date();
  if(diff <= 0){ countdown.innerHTML = '<div><strong>Today</strong><span>Celebrate!</span></div>'; return; }
  const days=Math.floor(diff/86400000),hours=Math.floor(diff/3600000)%24,mins=Math.floor(diff/60000)%60,secs=Math.floor(diff/1000)%60;
  countdown.innerHTML=[['Days',days],['Hours',hours],['Minutes',mins],['Seconds',secs]].map(([l,v])=>`<div><strong>${String(v).padStart(2,'0')}</strong><span>${l}</span></div>`).join('');
}
updateCountdown();setInterval(updateCountdown,1000);

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const petalLayer=document.getElementById('petalLayer');
function makePetal(){
  const p=document.createElement('i');
  const leaf=Math.random()<.28;
  p.className='petal'+(leaf?' leaf':'');
  p.style.left=Math.random()*100+'vw';
  p.style.opacity=(.35+Math.random()*.55).toFixed(2);
  p.style.transform=`scale(${.65+Math.random()*.7})`;
  p.style.setProperty('--drift',`${-80+Math.random()*160}px`);
  p.style.setProperty('--spin',`${240+Math.random()*720}deg`);
  p.style.animationDuration=`${7+Math.random()*8}s`;
  p.style.animationDelay=`${Math.random()*1.5}s`;
  petalLayer.appendChild(p);
  setTimeout(()=>p.remove(),17000);
}
for(let i=0;i<18;i++) setTimeout(makePetal,i*180);
setInterval(makePetal,700);

const welcome=document.getElementById('welcome');
const openInvite=document.getElementById('openInvite');
const music=document.getElementById('bgMusic');
const musicToggle=document.getElementById('musicToggle');
music.volume=.34;
async function startMusic(){try{await music.play();musicToggle.classList.remove('muted');musicToggle.textContent='♫';}catch(e){musicToggle.classList.add('muted');}}
openInvite.addEventListener('click',async()=>{welcome.classList.add('hidden');await startMusic();setTimeout(()=>welcome.remove(),1100);});
musicToggle.addEventListener('click',async()=>{if(music.paused){await startMusic()}else{music.pause();musicToggle.classList.add('muted');musicToggle.textContent='♪'}});

document.addEventListener('visibilitychange',()=>{if(document.hidden&&!music.paused) music.dataset.wasPlaying='1'; if(!document.hidden&&music.dataset.wasPlaying==='1') startMusic();});

const countInputs=['maleCount','femaleCount','childrenCount'].map(n=>document.querySelector(`[name="${n}"]`));
const guestTotal=document.getElementById('guestTotal');
function updateTotal(){guestTotal.textContent=countInputs.reduce((s,i)=>s+(Number(i.value)||0),0)}
countInputs.forEach(i=>i.addEventListener('input',updateTotal));updateTotal();
function getRSVPText(){const form=document.getElementById('rsvpForm');const data=new FormData(form);const events=data.getAll('events').join(', ')||'None selected';const total=countInputs.reduce((s,i)=>s+(Number(i.value)||0),0);return `Wedding RSVP — Ayesha & Hamza\n\nGuest/Family: ${data.get('guestName')||'-'}\nAttendance: ${data.get('attendance')||'-'}\nMale: ${data.get('maleCount')||0}\nFemale: ${data.get('femaleCount')||0}\nChildren: ${data.get('childrenCount')||0}\nTotal: ${total}\nEvents: ${events}\nMeal: ${data.get('mealPreference')||'-'}\nNotes: ${data.get('notes')||'-'}`}
document.getElementById('whatsappBtn').addEventListener('click',()=>{const whatsappNumber='923001234567';window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(getRSVPText())}`,'_blank','noopener')});
document.getElementById('shareBtn').addEventListener('click',async()=>{const data={title:'Ayesha & Hamza — Wedding Invitation',text:'You are warmly invited to celebrate with us.',url:location.href};if(navigator.share){try{await navigator.share(data)}catch(e){}}else{try{await navigator.clipboard.writeText(location.href);alert('Invitation link copied.')}catch(e){}}});
