/* =========================================
   WEDDING INVITATION
   DATA SOURCE: client-data.js
========================================= */


/* =========================================
   CONFIG
   client-data.js is optional. If it is missing,
   the invitation still boots with the values shown
   in the HTML instead of crashing on mobile.
========================================= */

const CLIENT_DATA = window.CLIENT || {
  bride: "عائشہ",
  groom: "حمزہ",
  father: "چوہدری علی",
  host: "جناب و محترمہ __________",
  whatsapp: "923000000000",
  maxGuests: 6,
  elders: [],
  cousins: [],

  barat: {
    enabled: true,
    dateText: "بروز ہفتہ، ۱۲ دسمبر ۲۰۲۶",
    timeText: "شام ۷:۰۰ بجے",
    venue: "باراتی ہال، کراچی",
    mapQuery: "باراتی ہال، کراچی",
    start: "2026-12-12T19:00:00",
    end: "2026-12-12T22:00:00"
  },

  walima: {
    enabled: true,
    dateText: "بروز اتوار، ۱۳ دسمبر ۲۰۲۶",
    timeText: "رات ۸:۰۰ بجے",
    venue: "پرل بینکوئٹ، کراچی",
    mapQuery: "پرل بینکوئٹ، کراچی",
    start: "2026-12-13T20:00:00",
    end: "2026-12-13T23:00:00"
  },

  countdownTo: "2026-12-12T19:00:00"
};


const CONFIG = {
  bride: CLIENT_DATA.bride,
  groom: CLIENT_DATA.groom,
  father: CLIENT_DATA.father,
  host: CLIENT_DATA.host,
  whatsapp: CLIENT_DATA.whatsapp,
  maxGuests: CLIENT_DATA.maxGuests,
  barat: { ...(CLIENT_DATA.barat || {}) },
  walima: { ...(CLIENT_DATA.walima || {}) },
  countdownTo: CLIENT_DATA.countdownTo
};


/* =========================================
   URL PARAMETERS
========================================= */

const params = new URLSearchParams(window.location.search);

const inviteType =
  params.get("invite") || "both";
// both | walima | barat

const guest =
  params.get("guest") || "معزز مہمان";

const withFamily =
  params.get("family") === "yes";

const guestDisplay =
  withFamily
    ? `${guest} و اہلِ خانہ`
    : guest;


/* =========================================
   MAX GUESTS
========================================= */

const maxGuests = Math.max(
  1,
  Math.min(
    20,
    Number(params.get("max")) ||
    Number(CONFIG.maxGuests) ||
    1
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

  if (el) {
    el.textContent = value;
  }

};


/* =========================================
   FAMILY LIST
========================================= */

function renderNameList(id, names) {

  const container = $(id);

  if (!container) {
    return;
  }

  container.innerHTML = "";

  (names || []).forEach(name => {

    if (!name) {
      return;
    }

    const p =
      document.createElement("p");

    p.textContent = name;

    container.appendChild(p);

  });

}


/* =========================================
   CALENDAR
========================================= */

function calendarUrl(title, event) {

  if (
    !event ||
    !event.start ||
    !event.end
  ) {
    return "#";
  }

  return (
    `https://calendar.google.com/calendar/render` +
    `?action=TEMPLATE` +
    `&text=${encodeURIComponent(title)}` +
    `&dates=${event.start}%2F${event.end}` +
    `&location=${encodeURIComponent(event.venue || "")}`
  );

}


/* =========================================
   APPLY CLIENT DATA
========================================= */

function applyContent() {


  /* BRIDE */

  [
    "coverBride",
    "brideName",
    "footerBride"
  ].forEach(id => {

    setText(
      id,
      CONFIG.bride
    );

  });


  /* GROOM */

  [
    "coverGroom",
    "groomName",
    "footerGroom"
  ].forEach(id => {

    setText(
      id,
      CONFIG.groom
    );

  });


  /* GUEST */

  [
    "coverGuest",
    "guestName",
    "invitedGuest"
  ].forEach(id => {

    setText(
      id,
      guestDisplay
    );

  });


  /* START SCREEN */

  setText("coverBrideTop", CONFIG.bride);
  setText("coverGroomTop", CONFIG.groom);
  setText("startDate", CONFIG.barat.dateText);
  setText("startTime", CONFIG.barat.timeText);
  setText("startVenue", CONFIG.barat.venue);


  /* FAMILY / HOST */

  setText(
    "hostName",
    CONFIG.host
  );

  setText(
    "closingHost",
    CONFIG.host
  );

  setText(
    "closingFather",
    CONFIG.father
  );


  /* FAMILY ROSTER */

  renderNameList(
    "eldersList",
    CLIENT_DATA.elders
  );

  renderNameList(
    "cousinsList",
    CLIENT_DATA.cousins
  );


  /* =====================================
     BARAT DATA
  ===================================== */

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


  /* =====================================
     WALIMA DATA
  ===================================== */

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


  /* GOOGLE MAPS */

  const baratMap =
    $("baratMap");

  if (baratMap) {

    baratMap.href =
      `https://www.google.com/maps/search/?api=1&query=` +
      encodeURIComponent(
        CONFIG.barat.mapQuery ||
        CONFIG.barat.venue ||
        ""
      );

  }


  const walimaMap =
    $("walimaMap");

  if (walimaMap) {

    walimaMap.href =
      `https://www.google.com/maps/search/?api=1&query=` +
      encodeURIComponent(
        CONFIG.walima.mapQuery ||
        CONFIG.walima.venue ||
        ""
      );

  }


  /* CALENDAR LINKS */

  const baratCalendar =
    $("baratCalendar");

  if (baratCalendar) {

    baratCalendar.href =
      calendarUrl(
        `بارات — ${CONFIG.bride} و ${CONFIG.groom}`,
        CONFIG.barat
      );

  }


  const walimaCalendar =
    $("walimaCalendar");

  if (walimaCalendar) {

    walimaCalendar.href =
      calendarUrl(
        `ولیمہ — ${CONFIG.bride} و ${CONFIG.groom}`,
        CONFIG.walima
      );

  }


  /* ELEMENTS */

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


  /* OPTIONAL ENABLE / DISABLE */

  if (
    CONFIG.barat.enabled === false &&
    baratCard
  ) {
    baratCard.classList.add("hidden");
  }


  if (
    CONFIG.walima.enabled === false &&
    walimaCard
  ) {
    walimaCard.classList.add("hidden");
  }


  /* WALIMA ONLY */

  if (inviteType === "walima") {

    if (baratCard) {
      baratCard.classList.add("hidden");
    }

    if (baratAttendance) {
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

  if (inviteType === "barat") {

    if (walimaCard) {
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


  /* BARAT + WALIMA */

  if (inviteType === "both") {

    if (simpleRsvp) {
      simpleRsvp.classList.add("hidden");
    }

    if (attendanceSection) {
      attendanceSection.classList.remove("hidden");
    }

    if (fullRsvpActions) {
      fullRsvpActions.classList.remove("hidden");
    }

  }

  /* SINGLE EVENT */

  else {

    if (simpleRsvp) {
      simpleRsvp.classList.remove("hidden");
    }

    if (attendanceSection) {
      attendanceSection.classList.add("hidden");
    }

    if (fullRsvpActions) {
      fullRsvpActions.classList.add("hidden");
    }

  }


  updateLinks();

}


/* =========================================
   PETALS
========================================= */

function createPetals() {

  const layer =
    $("petalLayer");

  if (!layer) {
    return;
  }

  const count =
    window.innerWidth < 600
      ? 12
      : 20;


  for (
    let i = 0;
    i < count;
    i++
  ) {

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
      `${0.28 + Math.random() * 0.48}`
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
   COUNTER
========================================= */

function total() {

  return (
    counts.ladies +
    counts.gents +
    counts.children
  );

}


function updateCounters() {

  Object.keys(counts)
    .forEach(key => {

      setText(
        `${key}Count`,
        counts[key]
      );

    });

  updateLinks();

}


/* =========================================
   PLUS / MINUS BUTTONS
========================================= */

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


        if (
          !Object.prototype
            .hasOwnProperty
            .call(
              counts,
              type
            )
        ) {
          return;
        }


        /* PLUS */

        if (action === "plus") {

          if (
            total() <
            maxGuests
          ) {
            counts[type]++;
          }

        }


        /* MINUS */

        if (action === "minus") {

          if (
            counts[type] > 0
          ) {
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

function updateLinks() {

  const selectedTotal =
    total();

  let acceptMessage;


  /* BOTH */

  if (inviteType === "both") {

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


  /* WALIMA ONLY */

  else if (inviteType === "walima") {

    acceptMessage =
`السلام علیکم،

${guestDisplay} ان شاء اللہ ${CONFIG.bride} اور ${CONFIG.groom} کی دعوتِ ولیمہ میں شرکت کریں گے۔

بہت شکریہ۔`;

  }


  /* BARAT ONLY */

  else {

    acceptMessage =
`السلام علیکم،

${guestDisplay} ان شاء اللہ ${CONFIG.bride} اور ${CONFIG.groom} کی تقریبِ بارات میں شرکت کریں گے۔

بہت شکریہ۔`;

  }


  /* REGRET MESSAGE */

  const regretMessage =
`السلام علیکم،

${guestDisplay} معذرت کے ساتھ تقریب میں شرکت نہیں کر سکیں گے۔

ہماری دعائیں ${CONFIG.bride} اور ${CONFIG.groom} کے ساتھ ہیں۔`;


  /* MAIN RSVP BUTTONS */

  const acceptBtn =
    $("acceptBtn");

  const regretBtn =
    $("regretBtn");


  if (acceptBtn) {

    acceptBtn.href =
      `https://wa.me/${CONFIG.whatsapp}?text=` +
      encodeURIComponent(
        acceptMessage
      );

  }


  if (regretBtn) {

    regretBtn.href =
      `https://wa.me/${CONFIG.whatsapp}?text=` +
      encodeURIComponent(
        regretMessage
      );

  }


  /* SIMPLE RSVP */

  const simpleAcceptBtn =
    $("simpleAcceptBtn");

  const simpleRegretBtn =
    $("simpleRegretBtn");


  let eventName;


  if (inviteType === "walima") {

    eventName =
      "دعوتِ ولیمہ";

  } else {

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


  if (simpleAcceptBtn) {

    simpleAcceptBtn.href =
      `https://wa.me/${CONFIG.whatsapp}?text=` +
      encodeURIComponent(
        simpleAcceptMessage
      );

  }


  if (simpleRegretBtn) {

    simpleRegretBtn.href =
      `https://wa.me/${CONFIG.whatsapp}?text=` +
      encodeURIComponent(
        simpleRegretMessage
      );

  }

}


/* =========================================
   BACKGROUND MUSIC PLAYLIST
========================================= */

const musicTracks = [
  "./background1.mp3",
  "./background.mp3"
];

let currentTrack = 0;
let muted = false;

const backgroundMusic = new Audio(musicTracks[currentTrack]);

backgroundMusic.volume = 0.45;
backgroundMusic.preload = "auto";

/* Play next song automatically */
backgroundMusic.addEventListener("ended", () => {
  currentTrack++;

  // After second song, go back to first
  if (currentTrack >= musicTracks.length) {
    currentTrack = 0;
  }

  backgroundMusic.src = musicTracks[currentTrack];
  backgroundMusic.load();

  backgroundMusic.play().catch(error => {
    console.log("Next music track could not start:", error);
  });
});


/* =========================================
   START MUSIC
========================================= */

function startMusic() {

  if (!backgroundMusic.paused) {
    return;
  }

  backgroundMusic
    .play()
    .then(() => {
      console.log("Background music started.");
    })
    .catch(error => {
      console.log(
        "Background music could not start:",
        error
      );
    });
}


/* =========================================
   MUSIC BUTTON
========================================= */

const musicToggle = $("musicToggle");

if (musicToggle) {

  musicToggle.addEventListener("click", () => {

    if (backgroundMusic.paused) {
      startMusic();
    }

    muted = !muted;

    backgroundMusic.muted = muted;

    musicToggle.classList.toggle(
      "muted",
      muted
    );

    musicToggle.textContent =
      muted ? "♩" : "♫";
  });

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


/* =========================================
   GOLD SPARK BURST
========================================= */

function createRoyalSparks() {

  if (!sparkBurst) {
    return;
  }


  sparkBurst.innerHTML =
    "";


  for (
    let i = 0;
    i < 32;
    i++
  ) {

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
      `${Math.random() * 0.12}s`;


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


/* =========================================
   OPEN INVITATION
========================================= */

if (
  openInvite &&
  envelope
) {

  openInvite.addEventListener(
    "click",
    () => {

      openInvite.disabled =
        true;


      /*
         IMPORTANT:
         Start MP3 immediately inside the
         user's click event.

         This is the most reliable way to
         satisfy Chrome/Safari/mobile
         autoplay restrictions.
      */

      startMusic();


      envelope.classList.add(
        "ribbon-opening"
      );


      createRoyalSparks();


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


              if (mainContent) {

                mainContent.scrollIntoView({
                  behavior: "smooth"
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

function tick() {

  const target =
    new Date(
      CONFIG.countdownTo
    );


  const diff =
    Math.max(
      0,
      target -
      new Date()
    );


  const units = [

    [
      "دن",
      86400000
    ],

    [
      "گھنٹے",
      3600000
    ],

    [
      "منٹ",
      60000
    ],

    [
      "سیکنڈ",
      1000
    ]

  ];


  const renderCountdown =
    (element, labels) => {

      if (!element) {
        return;
      }

      let rest = diff;


      element.innerHTML = units
        .map(([urduLabel, ms], index) => {

          const number =
            Math.floor(rest / ms);

          rest %= ms;


          return `
            <div class="time-box">
              <strong>${String(number).padStart(2, "0")}</strong>
              <span>${labels ? labels[index] : urduLabel}</span>
            </div>
          `;

        })
        .join("");

    };


  renderCountdown(
    $("countdown")
  );


  renderCountdown(
    $("startCountdown"),
    [
      "DAYS",
      "HOURS",
      "MINUTES",
      "SECONDS"
    ]
  );

}


/* =========================================
   SCROLL REVEAL
========================================= */

const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(
        entry => {

          if (
            entry.isIntersecting
          ) {

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
      threshold: 0.12
    }
  );


document
  .querySelectorAll(
    ".reveal"
  )
  .forEach(
    element => {

      observer.observe(
        element
      );

    }
  );


/* =========================================
   START APP
========================================= */

createPetals();

applyContent();

updateCounters();

tick();

setInterval(
  tick,
  1000
);






/* =========================================
   BASIC SOURCE / DEVTOOLS DETERRENTS
========================================= */

// Disable right click
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

// Block common DevTools / source shortcuts
document.addEventListener("keydown", function (e) {

  // F12
  if (e.key === "F12") {
    e.preventDefault();
    return false;
  }

  // Ctrl + Shift + I  -> Inspect
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
    e.preventDefault();
    return false;
  }

  // Ctrl + Shift + J -> Console
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") {
    e.preventDefault();
    return false;
  }

  // Ctrl + Shift + C -> Element picker
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "c") {
    e.preventDefault();
    return false;
  }

  // Ctrl + U -> View Source
  if (e.ctrlKey && e.key.toLowerCase() === "u") {
    e.preventDefault();
    return false;
  }

});


document.addEventListener("contextmenu", e => {
  e.preventDefault();
});

document.addEventListener("keydown", e => {

  const key = e.key.toLowerCase();

  if (
    e.key === "F12" ||

    // Windows/Linux
    (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) ||
    (e.ctrlKey && key === "u") ||

    // macOS
    (e.metaKey && e.altKey && ["i", "j", "c"].includes(key)) ||
    (e.metaKey && key === "u")
  ) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

});
