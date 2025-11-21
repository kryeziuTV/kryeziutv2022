// ======== IPTV PROXY URL (YOUR WORKER) =========
const PROXY = "https://krz.leonmartineyyy.workers.dev/?url=";

// ======== CHANNEL LIST =========
const liveChannels = [
  { 
    name:"RTK 1",
    logo:"http://vimg.ipko.tv/logo/color/rtk1.png",
    url: PROXY + encodeURIComponent("http://gjvideo-live-xk.gjirafa.net/gjvideo-livestream/98r-d35-487-v6m/tracks-v4a1/mono.ts.m3u8")
  },
  { 
    name:"RTK 3",
    logo:"http://vimg.ipko.tv/logo/color/rtk3.png",
    url: PROXY + encodeURIComponent("http://gjirafa-video-live.gjirafa.net/gjvideo-livestream/rtk3/tracks-v4a1/mono.ts.m3u8")
  },
  { 
    name:"RTV 21",
    logo:"http://vimg.ipko.tv/logo/color/rtv21.png",
    url: PROXY + encodeURIComponent("http://gjirafa-video-live.gjirafa.net/gjvideo-live/2cz-npl-jfn-9he/tracks-v2a1/mono.m3u8")
  },
  { 
    name:"KTV",
    logo:"http://vimg.ipko.tv/logo/color/ktv.png",
    url: PROXY + encodeURIComponent("http://gjirafa-video-live.gjirafa.net/gjvideo-livestream/lj9-pxm-o53-rp0/tracks-v4a1/mono.ts.m3u8")
  },
  { 
    name:"T7",
    logo:"http://vimg.ipko.tv/logo/color/t7.png",
    url: PROXY + encodeURIComponent("http://gjirafa-video-live.gjirafa.net/gjvideo-livestream-specific/1z8-byc-4ee-lc9/tracks-v3a1/mono.ts.m3u8")
  }
];

// Placeholder categories
const movies = liveChannels;
const sports = liveChannels;
const kids = liveChannels;

// ======== ELEMENTS =========
const categories = document.getElementById("categories");
const channelsDiv = document.getElementById("channels");
const playerContainer = document.getElementById("player-container");
const backBtn = document.getElementById("backBtn");
const video = document.getElementById("videoPlayer");

let hls = null;

// ======== DATE/TIME =========
function updateDateTime() {
  document.getElementById("datetime").textContent = new Date().toLocaleString();
}
setInterval(updateDateTime, 1000);
updateDateTime();

// ======== CATEGORY BUTTON CLICK =========
document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => openCategory(btn.dataset.cat));
});

// ======== OPEN CATEGORY =========
function openCategory(cat) {
  categories.classList.add("hidden");
  channelsDiv.classList.remove("hidden");
  channelsDiv.innerHTML = "";

  let list = liveChannels;
  if (cat === "movies") list = movies;
  if (cat === "sports") list = sports;
  if (cat === "kids") list = kids;

  list.forEach((ch, index) => {
    let c = document.createElement("div");
    c.className = "ch-btn";
    c.tabIndex = 0;

    c.innerHTML = `
      <img src="${ch.logo}" class="ch-logo"/>
      <span>${ch.name}</span>
    `;

    c.addEventListener("click", () => playChannel(ch.url));
    channelsDiv.appendChild(c);
  });

  focusIndex = 0;
  updateFocus();
}

// ======== PLAY CHANNEL (HLS.js) =========
function playChannel(url) {
  channelsDiv.classList.add("hidden");
  playerContainer.classList.remove("hidden");

  if (hls) hls.destroy();

  if (Hls.isSupported()) {
    hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
  } else {
    video.src = url;
  }

  video.muted = false;
  video.play().catch(() => {});

  // Try fullscreen
  if (video.requestFullscreen) video.requestFullscreen();
}

// ======== BACK BUTTON =========
backBtn.addEventListener("click", () => {
  playerContainer.classList.add("hidden");
  categories.classList.remove("hidden");
  video.pause();
  if (hls) hls.destroy();
});

// ======== REMOTE / KEYBOARD NAVIGATION =========
let focusIndex = 0;

function updateFocus() {
  const items = [...document.querySelectorAll(".ch-btn, .cat-btn")];
  if (!items.length) return;
  items.forEach(el => el.classList.remove("focused"));
  items[focusIndex].classList.add("focused");
  items[focusIndex].focus();
}

document.addEventListener("keydown", e => {
  const items = [...document.querySelectorAll(".ch-btn, .cat-btn")];
  if (!items.length) return;

  if (e.key === "ArrowRight") {
    focusIndex = (focusIndex + 1) % items.length;
    updateFocus();
  }
  if (e.key === "ArrowLeft") {
    focusIndex = (focusIndex - 1 + items.length) % items.length;
    updateFocus();
  }
  if (e.key === "Enter") {
    items[focusIndex].click();
  }
  if (e.key === "Backspace" || e.key === "Escape") {
    if (!playerContainer.classList.contains("hidden")) backBtn.click();
  }
});

updateFocus();
