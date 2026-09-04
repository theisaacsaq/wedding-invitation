/* =========================================
   WEDDING INVITATION CONFIG
========================================= */

const CONFIG = {
  bride: "عائشہ",
  groom: "حمزہ",
  host: "چوہدری علی",
  father: "چوہدری علی",
  whatsapp: "923080117630",
  maxGuests: 4,

  barat: {
    dateText: "بروز ہفتہ، ۱۲ دسمبر ۲۰۲۶",
    timeText: "شام ۷:۰۰ بجے",
    venue: "باراتی ہال، کراچی",
    mapQuery: "Karachi Pakistan",
    start: "20261212T140000Z",
    end: "20261212T180000Z"
  },

  walima: {
    dateText: "بروز اتوار، ۱۳ دسمبر ۲۰۲۶",
    timeText: "رات ۸:۰۰ بجے",
    venue: "پرل بینکوئٹ، کراچی",
    mapQuery: "Karachi Pakistan",
    start: "20261213T150000Z",
    end: "20261213T190000Z"
  },

  countdownTo: "2026-12-12T19:00:00+05:00"
};


/* =========================================
   URL PARAMETERS
========================================= */

const params = new URLSearchParams(location.search);

const inviteType =
  params.get("invite") || "both";
// both | walima | barat

const guest =
  params.get("guest") || "معزز مہمان";

const withFamily =
  params.get("family") === "yes";

const guestDisplay = withFamily
  ? `${guest} و اہلِ خانہ`
  : guest;

const maxGuests = Math.max(
  1,
  Math.min(
    20,
    Number(params.get("max")) || CONFIG.maxGuests
  )
);


/* =========================================
   COUNTERS
========================================= */

const counts = {
  ladies: 0,
  gents: 0,
  children: 0
};


/* =========================================
   HELPERS
========================================= */

const $ = id =>
  document.getElementById(id);

const setText = (id, value) => {
  const el = $(id);

  if(el){
    el.textContent = value;
  }
};


/* =========================================
   CALENDAR
========================================= */

function calendarUrl(title, event){

  return (
    `https://calendar.google.com/calendar/render` +
    `?action=TEMPLATE` +
    `&text=${encodeURIComponent(title)}` +
    `&dates=${event.start}%2F${event.end}` +
    `&location=${encodeURIComponent(event.venue)}`
  );

}


/* =========================================
   APPLY CONTENT
========================================= */

function applyContent(){

  [
    "coverBride",
    "brideName",
    "footerBride",
  ].forEach(id =>
    setText(id, CONFIG.bride)
  );


  [
    "coverGroom",
    "groomName",
    "footerGroom",
  ].forEach(id =>
    setText(id, CONFIG.groom)
  );


  [
    "coverGuest",
    "guestName",
    "invitedGuest"
  ].forEach(id =>
    setText(id, guestDisplay)
  );


  setText(
    "hostName",
    CONFIG.host
  );

  setText(
    "closingHost",
    CONFIG.host
  );
   setText("closingFather", CONFIG.father);


  /* BARAT */

  setText(
    "baratDate",
    CONFIG.barat.dateText
  );

  setText(
    "baratTime",
    CONFIG.barat.timeText
  );

  setText(
    "baratVenue",
    CONFIG.barat.venue
  );


  /* WALIMA */

  setText(
    "walimaDate",
    CONFIG.walima.dateText
  );

  setText(
    "walimaTime",
    CONFIG.walima.timeText
  );

  setText(
    "walimaVenue",
    CONFIG.walima.venue
  );


  /* GUEST LIMIT */

  setText(
    "guestLimit",
    `زیادہ سے زیادہ ${maxGuests} افراد`
  );


  /* MAPS */

  const baratMap = $("baratMap");

  if(baratMap){
    baratMap.href =
      `https://www.google.com/maps/search/?api=1&query=` +
      encodeURIComponent(CONFIG.barat.mapQuery);
  }


  const walimaMap = $("walimaMap");

  if(walimaMap){
    walimaMap.href =
      `https://www.google.com/maps/search/?api=1&query=` +
      encodeURIComponent(CONFIG.walima.mapQuery);
  }


  /* CALENDAR */

  const baratCalendar =
    $("baratCalendar");

  if(baratCalendar){

    baratCalendar.href =
      calendarUrl(
        `بارات — ${CONFIG.bride} و ${CONFIG.groom}`,
        CONFIG.barat
      );

  }


  const walimaCalendar =
    $("walimaCalendar");

  if(walimaCalendar){

    walimaCalendar.href =
      calendarUrl(
        `ولیمہ — ${CONFIG.bride} و ${CONFIG.groom}`,
        CONFIG.walima
      );

  }


  /* =====================================
     INVITATION TYPE
  ===================================== */

  const baratCard =
    $("baratCard");

  const walimaCard =
    $("walimaCard");

  const baratAttendance =
    $("baratAttendance");

  const simpleRsvp =
    $("simpleRsvp");

  const attendanceSection =
    document.querySelector(".attendance");

  const fullRsvpActions =
    $("fullRsvpActions");


  /* WALIMA ONLY */

  if(inviteType === "walima"){

    if(baratCard){
      baratCard.classList.add("hidden");
    }

    if(baratAttendance){
      baratAttendance.classList.add("hidden");
    }

    setText(
      "rsvpHeading",
      "ولیمہ میں شرکت"
    );

    setText(
      "rsvpIntro",
      "براہِ کرم اپنی شرکت کی تصدیق فرمائیے۔"
    );

  }


  /* BARAT ONLY */

  if(inviteType === "barat"){

    if(walimaCard){
      walimaCard.classList.add("hidden");
    }

    setText(
      "rsvpHeading",
      "تقریبِ بارات میں شرکت"
    );

    setText(
      "rsvpIntro",
      "براہِ کرم اپنی شرکت کی تصدیق فرمائیے۔"
    );

  }


  /* =====================================
     BOTH = COUNTER
     SINGLE EVENT = DIRECT WHATSAPP
  ===================================== */

  if(inviteType === "both"){

    if(simpleRsvp){
      simpleRsvp.classList.add("hidden");
    }

    if(attendanceSection){
      attendanceSection.classList.remove("hidden");
    }

    if(fullRsvpActions){
      fullRsvpActions.classList.remove("hidden");
    }

  }else{

    if(simpleRsvp){
      simpleRsvp.classList.remove("hidden");
    }

    if(attendanceSection){
      attendanceSection.classList.add("hidden");
    }

    if(fullRsvpActions){
      fullRsvpActions.classList.add("hidden");
    }

  }


  updateLinks();

}


/* =========================================
   PETALS
========================================= */

function createPetals(){

  const layer =
    $("petalLayer");

  if(!layer) return;


  const count =
    window.innerWidth < 600
      ? 12
      : 20;


  for(let i = 0; i < count; i++){

    const petal =
      document.createElement("i");

    petal.className =
      "petal";

    petal.style.left =
      `${Math.random() * 100}%`;

    petal.style.setProperty(
      "--size",
      `${8 + Math.random() * 10}px`
    );

    petal.style.setProperty(
      "--opacity",
      `${.28 + Math.random() * .48}`
    );

    petal.style.setProperty(
      "--duration",
      `${10 + Math.random() * 11}s`
    );

    petal.style.setProperty(
      "--delay",
      `${-Math.random() * 18}s`
    );

    layer.appendChild(petal);

  }

}


/* =========================================
   COUNTER LOGIC
========================================= */

function total(){

  return (
    counts.ladies +
    counts.gents +
    counts.children
  );

}


function updateCounters(){

  Object.keys(counts)
    .forEach(key => {

      setText(
        `${key}Count`,
        counts[key]
      );

    });

  updateLinks();

}


/* PLUS / MINUS */

document
  .querySelectorAll(".counter button")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.type;

        const action =
          button.dataset.action;


        if(
          !Object.prototype
            .hasOwnProperty
            .call(counts, type)
        ){
          return;
        }


        /* PLUS */

        if(action === "plus"){

          if(total() < maxGuests){

            counts[type]++;

          }

        }


        /* MINUS */

        if(action === "minus"){

          if(counts[type] > 0){

            counts[type]--;

          }

        }


        updateCounters();

      }
    );

  });


/* =========================================
   WHATSAPP LINKS
========================================= */

function updateLinks(){

  const selectedTotal =
    total();


  /* =====================================
     BOTH EVENTS
  ===================================== */

  let acceptMessage;

  if(inviteType === "both"){

    acceptMessage =
`السلام علیکم،

${guestDisplay} ان شاء اللہ ${CONFIG.bride} اور ${CONFIG.groom} کی شادی کی تقریبات میں شرکت کریں گے۔

شرکت کرنے والے افراد:

خواتین: ${counts.ladies}
حضرات: ${counts.gents}
بچے: ${counts.children}

کل افراد: ${selectedTotal}
مقررہ حد: ${maxGuests}

براہِ کرم ہماری شرکت کی تصدیق فرما دیجیے۔

بہت شکریہ۔`;

  }


  /* =====================================
     WALIMA ONLY
  ===================================== */

  else if(inviteType === "walima"){

    acceptMessage =
`السلام علیکم،

${guestDisplay} ان شاء اللہ ${CONFIG.bride} اور ${CONFIG.groom} کی دعوتِ ولیمہ میں شرکت کریں گے۔

براہِ کرم ہماری شرکت کی تصدیق فرما دیجیے۔

بہت شکریہ۔`;

  }


  /* =====================================
     BARAT ONLY
  ===================================== */

  else{

    acceptMessage =
`السلام علیکم،

${guestDisplay} ان شاء اللہ ${CONFIG.bride} اور ${CONFIG.groom} کی تقریبِ بارات میں شرکت کریں گے۔

براہِ کرم ہماری شرکت کی تصدیق فرما دیجیے۔

بہت شکریہ۔`;

  }


  const regretMessage =
`السلام علیکم،

${guestDisplay} معذرت کے ساتھ تقریب میں شرکت نہیں کر سکیں گے۔

ہماری دعائیں ${CONFIG.bride} اور ${CONFIG.groom} کے ساتھ ہیں۔`;


  /* MAIN RSVP BUTTONS */

  const acceptBtn =
    $("acceptBtn");

  const regretBtn =
    $("regretBtn");


  if(acceptBtn){

    acceptBtn.href =
      `https://wa.me/${CONFIG.whatsapp}?text=` +
      encodeURIComponent(acceptMessage);

  }


  if(regretBtn){

    regretBtn.href =
      `https://wa.me/${CONFIG.whatsapp}?text=` +
      encodeURIComponent(regretMessage);

  }


  /* =====================================
     SIMPLE RSVP
  ===================================== */

  const simpleAcceptBtn =
    $("simpleAcceptBtn");

  const simpleRegretBtn =
    $("simpleRegretBtn");


  let eventName;

  if(inviteType === "walima"){

    eventName =
      "دعوتِ ولیمہ";

  }else{

    eventName =
      "تقریبِ بارات";

  }


  const simpleAcceptMessage =
`السلام علیکم،

${guestDisplay} ${eventName} میں شرکت کی تصدیق کرتے ہیں۔

بہت شکریہ۔`;


  const simpleRegretMessage =
`السلام علیکم،

${guestDisplay} معذرت کے ساتھ ${eventName} میں شرکت نہیں کر سکیں گے۔

دعاؤں کے ساتھ۔`;


  if(simpleAcceptBtn){

    simpleAcceptBtn.href =
      `https://wa.me/${CONFIG.whatsapp}?text=` +
      encodeURIComponent(
        simpleAcceptMessage
      );

  }


  if(simpleRegretBtn){

    simpleRegretBtn.href =
      `https://wa.me/${CONFIG.whatsapp}?text=` +
      encodeURIComponent(
        simpleRegretMessage
      );

  }

}


/* =========================================
   MUSIC
========================================= */

let audioCtx;
let master;
let musicTimer;
let muted = false;


function playTone(
  freq,
  when,
  duration,
  volume
){

  const osc =
    audioCtx.createOscillator();

  const gain =
    audioCtx.createGain();


  osc.type =
    "sine";

  osc.frequency.value =
    freq;


  gain.gain.setValueAtTime(
    0,
    when
  );

  gain.gain.linearRampToValueAtTime(
    volume,
    when + .7
  );

  gain.gain.exponentialRampToValueAtTime(
    .0001,
    when + duration
  );


  osc
    .connect(gain)
    .connect(master);


  osc.start(when);

  osc.stop(
    when + duration
  );

}


function musicPhrase(){

  if(!audioCtx) return;


  const now =
    audioCtx.currentTime;


  [
    261.63,
    329.63,
    392,
    493.88
  ].forEach(
    (freq, index) => {

      playTone(
        freq,
        now + index * 1.8,
        5,
        .035
      );

    }
  );

}


function startMusic(){

  try{

    audioCtx =
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();


    master =
      audioCtx.createGain();


    master.gain.value =
      .8;


    master.connect(
      audioCtx.destination
    );


    musicPhrase();


    musicTimer =
      setInterval(
        musicPhrase,
        7200
      );

  }catch(error){

    const toggle =
      $("musicToggle");

    if(toggle){
      toggle.classList.add("hidden");
    }

  }

}


/* MUSIC BUTTON */

const musicToggle =
  $("musicToggle");

if(musicToggle){

  musicToggle.addEventListener(
    "click",
    () => {

      if(!audioCtx) return;


      muted =
        !muted;


      master.gain.setTargetAtTime(
        muted ? 0 : .8,
        audioCtx.currentTime,
        .15
      );


      musicToggle.classList.toggle(
        "muted",
        muted
      );


      musicToggle.textContent =
        muted
          ? "♩"
          : "♫";

    }
  );

}


/* =========================================
   OPENING ANIMATION
========================================= */

const envelope =
  $("envelope");

const openInvite =
  $("openInvite");

const sparkBurst =
  $("sparkBurst");


function createRoyalSparks(){

  if(!sparkBurst) return;


  sparkBurst.innerHTML =
    "";


  for(let i = 0; i < 32; i++){

    const spark =
      document.createElement(
        "span"
      );


    spark.className =
      "spark";


    const angle =
      Math.random() *
      Math.PI *
      2;


    const distance =
      80 +
      Math.random() *
      180;


    spark.style.setProperty(
      "--spark-x",
      `${
        Math.cos(angle) *
        distance
      }px`
    );


    spark.style.setProperty(
      "--spark-y",
      `${
        Math.sin(angle) *
        distance
      }px`
    );


    spark.style.animationDelay =
      `${Math.random() * .12}s`;


    sparkBurst.appendChild(
      spark
    );

  }


  setTimeout(
    () => {

      sparkBurst.innerHTML =
        "";

    },
    1600
  );

}


/* OPEN BUTTON */

if(openInvite && envelope){

  openInvite.addEventListener(
    "click",
    () => {

      openInvite.disabled =
        true;


      envelope.classList.add(
        "ribbon-opening"
      );


      createRoyalSparks();


      if(!audioCtx){

        startMusic();

      }


      setTimeout(
        () => {

          envelope.classList.add(
            "opened"
          );


          document.body
            .classList
            .remove(
              "locked"
            );


          setTimeout(
            () => {

              const mainContent =
                $("mainContent");

              if(mainContent){

                mainContent
                  .scrollIntoView({
                    behavior:
                      "smooth"
                  });

              }

            },
            150
          );

        },
        1250
      );

    }
  );

}


/* =========================================
   COUNTDOWN
========================================= */

function tick(){

  const diff =
    Math.max(
      0,
      new Date(
        CONFIG.countdownTo
      ) -
      new Date()
    );


  const units = [
    ["دن", 86400000],
    ["گھنٹے", 3600000],
    ["منٹ", 60000],
    ["سیکنڈ", 1000]
  ];


  let rest =
    diff;


  const countdown =
    $("countdown");


  if(!countdown){
    return;
  }


  countdown.innerHTML =
    units
      .map(
        ([label, ms]) => {

          const number =
            Math.floor(
              rest / ms
            );


          rest %=
            ms;


          return `
            <div class="time-box">
              <strong>
                ${String(number).padStart(2,"0")}
              </strong>

              <span>
                ${label}
              </span>
            </div>
          `;

        }
      )
      .join("");

}


/* =========================================
   SCROLL REVEAL
========================================= */

const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(
        entry => {

          if(entry.isIntersecting){

            entry.target
              .classList
              .add(
                "visible"
              );

          }

        }
      );

    },
    {
      threshold: .12
    }
  );


document
  .querySelectorAll(".reveal")
  .forEach(
    element => {

      observer.observe(
        element
      );

    }
  );


/* =========================================
   START
========================================= */

createPetals();

applyContent();

updateCounters();

tick();

setInterval(
  tick,
  1000
);
