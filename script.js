const bootScreen =
  document.getElementById("bootScreen");

const playerScreen =
  document.getElementById("playerScreen");

const mainContent =
  document.getElementById("mainContent");

const progress =
  document.getElementById("loadingProgress");

const percent =
  document.getElementById("loadingPercent");

const loadingText =
  document.getElementById("loadingText");

const messageWrapper =
  document.getElementById("messageWrapper");

const music =
  document.getElementById("music");

const musicBtn =
  document.getElementById("musicBtn");


/* =========================
   BOOT SEQUENCE
========================= */

let loading = 0;

const loadingMessages = [
  "Initializing system...",
  "Loading birthday data...",
  "Scanning player...",
  "Checking XP...",
  "Preparing surprise...",
  "System ready."
];

const loadingInterval =
  setInterval(() => {

    loading += 1;

    progress.style.width =
      loading + "%";

    percent.textContent =
      loading + "%";

    const messageIndex =
      Math.min(
        Math.floor(
          loading / 17
        ),
        loadingMessages.length - 1
      );

    loadingText.textContent =
      loadingMessages[messageIndex];

    if (loading >= 100) {

      clearInterval(
        loadingInterval
      );

      setTimeout(() => {

        bootScreen.classList.add(
          "hide"
        );

        playerScreen.classList.add(
          "active"
        );

      }, 600);

    }

  }, 35);


/* =========================
   START MISSION
========================= */

function startMission() {

  playerScreen.style.display =
    "none";

  mainContent.classList.add(
    "active"
  );

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  launchConfetti();
}


/* =========================
   OPEN SURPRISE
========================= */

function openSurprise() {

  messageWrapper.classList.add(
    "active"
  );

  messageWrapper.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  launchConfetti();

}


/* =========================
   CONFETTI
========================= */

function launchConfetti() {

  for (let i = 0; i < 80; i++) {

    const piece =
      document.createElement("div");

    piece.style.position =
      "fixed";

    piece.style.width =
      "7px";

    piece.style.height =
      "7px";

    piece.style.left =
      "50%";

    piece.style.top =
      "45%";

    piece.style.zIndex =
      "999";

    piece.style.pointerEvents =
      "none";

    piece.style.background =
      [
        "#45a8ff",
        "#8b5cf6",
        "#38d9ff",
        "#ffffff"
      ][
        Math.floor(
          Math.random() * 4
        )
      ];

    piece.style.borderRadius =
      Math.random() > .5
        ? "50%"
        : "2px";

    document.body.appendChild(
      piece
    );

    const x =
      (Math.random() - .5) * 800;

    const y =
      (Math.random() - .5) * 700;

    const rotate =
      Math.random() * 720;

    piece.animate(
      [
        {
          transform:
            "translate(-50%, -50%) scale(1)",
          opacity: 1
        },

        {
          transform:
            `translate(
              calc(-50% + ${x}px),
              calc(-50% + ${y}px)
            )
            rotate(${rotate}deg)
            scale(.4)`,

          opacity: 0
        }
      ],
      {
        duration:
          1000 +
          Math.random() * 1200,

        easing:
          "cubic-bezier(.1,.7,.2,1)"
      }
    ).onfinish = () => {

      piece.remove();

    };

  }

}


/* =========================
   REPLAY
========================= */

function replay() {

  messageWrapper.classList.remove(
    "active"
  );

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  setTimeout(() => {

    launchConfetti();

  }, 500);

}


/* =========================
   MUSIC
========================= */

function toggleMusic() {

  if (music.paused) {

    music.play()
      .then(() => {

        musicBtn.textContent =
          "🔊";

      })
      .catch(() => {

        alert(
          "Pastikan assets/music.mp3 tersedia."
        );

      });

  } else {

    music.pause();

    musicBtn.textContent =
      "🔇";

  }

}