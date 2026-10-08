const LOCATIONS = [
  { code: "DE", flag: "🇩🇪" },
  { code: "SG", flag: "🇸🇬" },
  { code: "UK", flag: "🇬🇧" },
];

const PAYMENT_URL = "";

const DOWNLOADS = [
  {
    id: "macos",
    label: "macOS",
    icon: "apple",
    apps: [
      {
        name: "Happ",
        url: "https://apps.apple.com/app/happ-proxy-utility/id6504287215?platform=mac",
      },
      {
        name: "Shadowrocket",
        url: "https://apps.apple.com/app/shadowrocket/id932747118?platform=mac",
      },
    ],
  },
  {
    id: "ios",
    label: "iPhone / iPad",
    icon: "apple",
    apps: [
      {
        name: "Happ",
        url: "https://apps.apple.com/app/happ-proxy-utility/id6504287215",
      },
      {
        name: "Shadowrocket",
        url: "https://apps.apple.com/app/shadowrocket/id932747118",
      },
    ],
  },
  {
    id: "android",
    label: "Android",
    icon: "android",
    apps: [
      {
        name: "Happ",
        url: "https://play.google.com/store/apps/details?id=com.happproxy",
      },
    ],
  },
  {
    id: "windows",
    label: "Windows",
    icon: "windows",
    apps: [
      {
        name: "Happ",
        url: "https://github.com/Happ-proxy/happ-desktop/releases/latest/download/setup-Happ.x64.exe",
      },
    ],
  },
];

const OS_ICONS = {
  apple:
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-.1 2.9-2.2c.7-1 1.2-2.1 1.5-3.2-3.9-1.5-3.8-5.5-3.8-5.3zM14.7 6.2c.6-.8 1.1-1.9.9-3-1 .1-2.1.6-2.8 1.4-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.5 2.9-1.3z"/></svg>',
  android:
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M7.2 8.2h9.6v7.2c0 .7-.5 1.2-1.2 1.2h-.6V19a1 1 0 0 1-2 0v-2.4h-2V19a1 1 0 0 1-2 0v-2.4h-.6c-.7 0-1.2-.5-1.2-1.2V8.2zM8.2 7.2l-.9-1.6a.4.4 0 0 1 .7-.4l1 1.6a6.2 6.2 0 0 1 5.9 0l1-1.6a.4.4 0 1 1 .7.4l-.9 1.6A5.2 5.2 0 0 1 17 10H7a5.2 5.2 0 0 1 1.2-2.8zM9 9.1a.7.7 0 1 0 0-1.4.7.7 0 0 0 0 1.4zm6 0a.7.7 0 1 0 0-1.4.7.7 0 0 0 0 1.4z"/></svg>',
  windows:
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M3 5.2 10.2 4.2v6.7H3V5.2zm8.2-1.1L21 2.6v8.3h-9.8V4.1zM3 12.1h7.2v6.8L3 17.9v-5.8zm8.2 0H21v8.4l-9.8-1.4v-7z"/></svg>',
};

const OWNER_ID = 1450200632;
const OWNER_NAME = "cameonurface";

function telegramApp() {
  return window.Telegram?.WebApp;
}

function isOwner() {
  const user = telegramApp()?.initDataUnsafe?.user;
  if (!user) return false;
  if (Number(user.id) === OWNER_ID) return true;
  return String(user.username || "").toLowerCase() === OWNER_NAME;
}

function renderOwnerPlan() {
  const button = document.getElementById("pay-btn");
  if (!button || !isOwner()) return;
  button.classList.add("owner-plan");
  button.replaceChildren();
  const label = document.createElement("span");
  label.textContent = "INFINITY";
  const mark = document.createElement("img");
  mark.src = "./infinity.png?v=2";
  mark.alt = "";
  button.append(label, mark);
}

function openExternal(url) {
  if (!url) return;
  const tg = telegramApp();
  if (tg?.openLink) {
    tg.openLink(url);
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

function openPayment() {
  openExternal(PAYMENT_URL);
}

function currentPlatform() {
  const platform = (telegramApp()?.platform || "").toLowerCase();
  const ua = navigator.userAgent || "";
  if (platform === "ios" || /iPhone|iPad|iPod/.test(ua)) return "ios";
  if (platform === "android" || /Android/.test(ua)) return "android";
  if (platform === "macos" || /Mac/.test(ua)) return "macos";
  if (platform === "windows" || /Windows/.test(ua)) return "windows";
  return "";
}

function configLink() {
  return new URLSearchParams(window.location.search).get("config") || "";
}

function copyText(text) {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.top = "0";
  area.style.left = "0";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.focus();
  area.select();
  area.setSelectionRange(0, area.value.length);
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  area.remove();
  if (ok) return Promise.resolve(true);
  if (!navigator.clipboard?.writeText) return Promise.resolve(false);
  return navigator.clipboard.writeText(text).then(
    () => true,
    () => false
  );
}

function renderLaunch() {
  const sheet = document.getElementById("launch-sheet");
  const openButton = document.getElementById("launch-btn");
  const copyButton = document.getElementById("launch-copy");
  if (!sheet || !openButton || !copyButton) return;

  const close = () => {
    sheet.hidden = true;
    if (document.getElementById("download-sheet")?.hidden !== false) {
      document.body.style.overflow = "";
    }
  };

  openButton.addEventListener("click", () => {
    copyButton.textContent = "Скопировать ссылку";
    sheet.hidden = false;
    document.body.style.overflow = "hidden";
  });

  copyButton.addEventListener("click", () => {
    const link = configLink();
    if (!link) return;
    copyText(link);
    copyButton.textContent = "Ссылка скопирована";
  });

  document.getElementById("launch-close")?.addEventListener("click", close);
  sheet.addEventListener("click", (event) => {
    if (event.target === sheet) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !sheet.hidden) close();
  });
}

function renderDownloads() {
  const sheet = document.getElementById("download-sheet");
  const osView = document.getElementById("download-os");
  const appsView = document.getElementById("download-apps");
  const osList = document.getElementById("os-list");
  const appList = document.getElementById("app-list");
  const osTitle = document.getElementById("download-os-title");
  const openButton = document.getElementById("download-btn");
  if (!sheet || !osList || !openButton) return;

  const mine = currentPlatform();

  const showPlatforms = () => {
    osView.hidden = false;
    appsView.hidden = true;
    document.getElementById("download-title")?.focus();
  };

  const showApps = (item) => {
    osTitle.textContent = item.label;
    appList.innerHTML = "";
    item.apps.forEach((app) => {
      const link = document.createElement("a");
      link.className = "app-link";
      link.href = app.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = app.name;
      link.addEventListener("click", (event) => {
        event.preventDefault();
        openExternal(app.url);
      });
      appList.appendChild(link);
    });
    osView.hidden = true;
    appsView.hidden = false;
  };

  osList.innerHTML = "";
  DOWNLOADS.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "os-row";
    const current = item.id === mine;
    if (current) button.classList.add("is-current");
    button.innerHTML = `${OS_ICONS[item.icon] || ""}<span>${item.label}</span>${
      current
        ? '<span class="os-badge">ВАШЕ УСТРОЙСТВО</span>'
        : '<span class="os-chevron" aria-hidden="true">›</span>'
    }`;
    button.addEventListener("click", () => showApps(item));
    osList.appendChild(button);
  });

  const close = () => {
    sheet.hidden = true;
    document.body.style.overflow = "";
    showPlatforms();
  };

  openButton.addEventListener("click", () => {
    showPlatforms();
    sheet.hidden = false;
    document.body.style.overflow = "hidden";
  });
  document.getElementById("download-close")?.addEventListener("click", close);
  document.getElementById("download-back")?.addEventListener("click", showPlatforms);
  sheet.addEventListener("click", (event) => {
    if (event.target === sheet) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !sheet.hidden) close();
  });
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

function preserveAppLinks() {
  const search = window.location.search;
  if (!search) return;
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (href.startsWith("./") && href.includes(".html") && !href.includes("?")) {
      link.setAttribute("href", href + search);
    }
  });
}

function renderConfig() {
  const page = document.getElementById("config-page");
  if (!page) return;
  const params = new URLSearchParams(window.location.search);
  const subscription = params.get("config") || "";
  const key = params.get("key") || "";
  const subNode = document.getElementById("sub-url");
  const keyNode = document.getElementById("de-key");
  const copySub = document.getElementById("copy-sub");
  const copyKey = document.getElementById("copy-key");

  if (subNode && subscription) subNode.textContent = subscription;
  if (keyNode && key) keyNode.textContent = key;

  const bindCopy = (button, value, done) => {
    if (!button) return;
    button.addEventListener("click", () => {
      if (!value) return;
      copyText(value);
      button.textContent = done;
    });
  };
  bindCopy(copySub, subscription, "Ссылка скопирована");
  bindCopy(copyKey, key, "Ключ скопирован");
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
    telegramApp()?.sendData?.(JSON.stringify({ action }));
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
renderDownloads();
renderLaunch();
renderOwnerPlan();
renderConfig();
preserveAppLinks();
document.getElementById("pay-btn")?.addEventListener("click", () => {
  if (isOwner()) return;
  openPayment();
});

document.querySelectorAll("[data-toast]").forEach((button) => {
  button.addEventListener("click", () => toast(button.dataset.toast));
});

const tg = telegramApp();
if (tg) {
  tg.ready();
  tg.expand();
  tg.setHeaderColor("#070b16");
  tg.setBackgroundColor("#070b16");
}
