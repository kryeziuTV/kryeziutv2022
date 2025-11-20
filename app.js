// ========== CHANNEL LIST ==========
const liveChannels = [
 {name:"RTK 1", url:"http://gjirafa-video-live.gjirafa.net/gjvideo-livestream/98r-d35-487-v6m/tracks-v4a1/mono.ts.m3u8"},
 {name:"RTK 3", url:"http://gjirafa-video-live.gjirafa.net/gjvideo-livestream/rtk3/tracks-v4a1/mono.ts.m3u8"},
 {name:"T7", url:"http://gjirafa-video-live.gjirafa.net/gjvideo-livestream-specific/1z8-byc-4ee-lc9/tracks-v2a1/mono.m3u8"},
 {name:"RTV21 HD", url:"http://gjirafa-video-live.gjirafa.net/gjvideo-live/2cz-npl-jfn-9he/tracks-v2a1/mono.m3u8"},
 {name:"KTV HD", url:"http://gjirafa-video-live.gjirafa.net/gjvideo-livestream/lj9-pxm-o53-rp0/tracks-v4a1/mono.m3u8"},
 {name:"Test 1", url:"#"},
 {name:"Test 2", url:"#"},
 {name:"Test 3", url:"#"},
 {name:"Test 4", url:"#"},
 {name:"Test 5", url:"#"}
];

// Placeholder for other categories
const movies = liveChannels;
const sports = liveChannels;
const kids = liveChannels;

// ========== ELEMENTS ==========
const categories = document.getElementById("categories");
const channelsDiv = document.getElementById("channels");
const playerContainer = document.getElementById("player-container");

let player = null;

// ========== DATE/TIME ==========
function updateDateTime() {
  const now = new Date();
  document.getElementById("datetime").textContent = now.toLocaleString();
}
setInterval(updateDateTime, 1000);
updateDateTime();

// ========== HOME CATEGORY CLICK ==========
document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => openCategory(btn.dataset.cat));
});

// ========== OPEN CATEGORY ==========
function openCategory(cat) {
  categories.classList.add("hidden");
  channelsDiv.classList.remove("hidden");
  channelsDiv.innerHTML = "";

  let list = liveChannels;
  if (cat === "movies") list = movies;
  if (cat === "sports") list = sports;
  if (cat === "kids") list = kids;

  list.forEach(ch => {
    let c = document.createElement("div");
    c.className = "ch-btn";
    c.tabIndex = 0;
    c.textContent = ch.name;
    c.addEventListener("click", () => playChannel(ch.url));
    channelsDiv.appendChild(c);
  });
}

// ========== PLAY CHANNEL ==========
function playChannel(url) {
  channelsDiv.classList.add("hidden");
  playerContainer.classList.remove("hidden");

  if (player) player.dispose();

  player = videojs("videoPlayer", {
    autoplay: true,
    controls: false,
    muted: false
  });

  player.src({ src: url, type: "application/x-mpegURL" });

  player.play();
}