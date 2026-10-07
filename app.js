const LOCATIONS = [
  { code: "DE", flag: "🇩🇪" },
  { code: "SG", flag: "🇸🇬" },
  { code: "UK", flag: "🇬🇧" },
];

const PAYMENT_URL = "";

const tg = window.Telegram?.WebApp;

function openPayment() {
  if (!PAYMENT_URL) return;
  if (tg?.openLink) {
    tg.openLink(PAYMENT_URL);
    return;
  }
  window.open(PAYMENT_URL, "_blank", "noopener,noreferrer");
}

function renderSky() {
  if (document.querySelector(".sky")) return;
  const sky = document.createElement("div");
  sky.className = "sky";
  sky.setAttribute("aria-hidden", "true");
  sky.innerHTML = `
    <span class="nebula nebula-gold"></span>
    <span class="nebula nebula-low"></span>
    <span class="nebula nebula-core"></span>
    <span class="spark lg" style="left:12%;top:9%;animation-duration:8s"></span>
    <span class="spark" style="left:28%;top:15%;animation-duration:11s;animation-delay:2s"></span>
    <span class="spark" style="left:63%;top:7%;animation-duration:6.5s;animation-delay:1s"></span>
    <span class="spark lg" style="left:88%;top:18%;animation-duration:9s;animation-delay:4s"></span>
    <span class="spark" style="left:41%;top:31%;animation-duration:13s;animation-delay:3s"></span>
    <span class="spark" style="left:7%;top:44%;animation-duration:10s;animation-delay:1.5s"></span>
    <span class="spark lg" style="left:93%;top:48%;animation-duration:7.5s;animation-delay:5s"></span>
    <span class="spark" style="left:54%;top:62%;animation-duration:12s;animation-delay:2.5s"></span>
    <span class="spark" style="left:19%;top:71%;animation-duration:9.5s;animation-delay:6s"></span>
    <span class="spark lg" style="left:76%;top:78%;animation-duration:14s;animation-delay:0.8s"></span>
    <span class="spark" style="left:38%;top:88%;animation-duration:8.5s;animation-delay:3.5s"></span>
    <span class="spark" style="left:84%;top:91%;animation-duration:11.5s;animation-delay:4.5s"></span>
  `;
  document.body.prepend(sky);
}

function renderRipple() {
  if (document.querySelector(".ripple")) return;
  const ripple = document.createElement("div");
  ripple.className = "ripple";
  ripple.setAttribute("aria-hidden", "true");
  ripple.innerHTML = "<i></i><i></i><i></i>";
  document.body.appendChild(ripple);

  const waveMs = 11200;
  const pauseMs = 20000;
  const firstMs = 5000;

  const play = () => {
    ripple.classList.remove("is-on");
    void ripple.offsetWidth;
    ripple.classList.add("is-on");
    window.setTimeout(() => {
      ripple.classList.remove("is-on");
      window.setTimeout(play, pauseMs);
    }, waveMs);
  };

  window.setTimeout(play, firstMs);
}

function renderLocations() {
  const root = document.getElementById("loc-list");
  if (!root) return;
  root.innerHTML = "";
  LOCATIONS.forEach((place, index) => {
    const chip = document.createElement("span");
    const wave = ["de", "sg", "uk"][index] || "uk";
    chip.className = `chip pulse-${wave}`;
    chip.innerHTML = `<b>${place.code}</b> <span class="flag">${place.flag}</span>`;
    root.appendChild(chip);
  });
}

function notifyBot(action) {
  try {
    tg?.sendData?.(JSON.stringify({ action }));
  } catch {
    /* sendData works only inside Telegram */
  }
}

function toast(text) {
  const node = document.getElementById("toast");
  node.textContent = text;
  node.hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => {
    node.hidden = true;
  }, 2200);
}

renderSky();
renderRipple();
renderLocations();
document.getElementById("pay-btn")?.addEventListener("click", openPayment);

document.querySelectorAll("[data-toast]").forEach((button) => {
  button.addEventListener("click", () => toast(button.dataset.toast));
});

if (tg) {
  tg.ready();
  tg.expand();
  tg.setHeaderColor("#070b16");
  tg.setBackgroundColor("#070b16");
}
