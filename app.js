const LOCATIONS = [
  { code: "DE", flag: "🇩🇪" },
  { code: "SG", flag: "🇸🇬" },
  { code: "UK", flag: "🇬🇧" },
  { code: "KZ", flag: "🇰🇿" },
  { code: "RU", flag: "🇷🇺" },
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

function renderPlanUntil() {
  const node = document.getElementById("plan-until");
  if (!node) return;
  const until = new URLSearchParams(window.location.search).get("until") || "";
  if (isOwner() || !/^\d{2}\.\d{2}\.\d{4}$/.test(until)) {
    node.hidden = true;
    return;
  }
  node.textContent = "До " + until;
  node.hidden = false;
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
    if (!href.startsWith("./") || !href.includes(".html")) return;
    link.setAttribute("href", href.split("?")[0] + search);
  });
}

function renderConfig() {
  const page = document.getElementById("config-page");
  if (!page) return;
  const params = new URLSearchParams(window.location.search);
  const key = params.get("key") || "";
  const keyNode = document.getElementById("de-key");
  const copyKey = document.getElementById("copy-key");

  if (keyNode) {
    keyNode.textContent = key || "Ключ появится после повторного /start.";
  }
  const fold = document.getElementById("de-fold");
  if (fold && !fold.dataset.bound) {
    fold.dataset.bound = "1";
    fold.addEventListener("click", () => {
      fold.classList.toggle("is-open");
    });
  }
  if (!copyKey || copyKey.dataset.bound) return;
  copyKey.dataset.bound = "1";
  copyKey.addEventListener("click", () => {
    const value = keyNode?.textContent || "";
    if (!value.startsWith("vless://")) return;
    copyText(value);
    copyKey.textContent = "Ключ скопирован";
  });
}

function renderLocations() {
  const root = document.getElementById("loc-list");
  if (!root) return;
  root.innerHTML = "";
  LOCATIONS.forEach((place, index) => {
    const chip = document.createElement("span");
    chip.className = `chip pulse-${place.code.toLowerCase()}`;
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
  if (!node) return;
  node.textContent = text;
  node.hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => {
    node.hidden = true;
  }, 2200);
}

const PROFILE_FIELDS = ["config", "key", "until", "uid", "tokens", "refs", "api"];
const PROFILE_STORE = "aevum-profile";

function profileFromParams(params) {
  const data = {};
  PROFILE_FIELDS.forEach((name) => {
    const value = params.get(name) || "";
    if (value) data[name] = value;
  });
  if (!String(data.key || "").startsWith("vless://")) return null;
  return data;
}

function currentTelegramId() {
  const id = telegramApp()?.initDataUnsafe?.user?.id;
  return id ? String(id) : "";
}

function profileMatchesUser(data) {
  const id = currentTelegramId();
  if (!id || !data?.uid) return !id;
  return String(data.uid) === id;
}

function readStoredProfile(raw) {
  try {
    const data = JSON.parse(raw || "");
    if (!data || !String(data.key || "").startsWith("vless://")) return null;
    if (!profileMatchesUser(data)) return null;
    return data;
  } catch {
    return null;
  }
}

function applyProfile(data) {
  const params = new URLSearchParams(window.location.search);
  PROFILE_FIELDS.forEach((name) => {
    if (data[name]) params.set(name, data[name]);
  });
  const search = params.toString();
  const next = window.location.pathname + "?" + search + window.location.hash;
  if (window.location.pathname + window.location.search + window.location.hash !== next) {
    history.replaceState(null, "", next);
  }
}

function writeBrowserProfile(data) {
  try {
    localStorage.setItem(PROFILE_STORE, JSON.stringify(data));
  } catch {
    /* private mode can block storage */
  }
}

function storageSet(storage, data) {
  if (!storage?.setItem) return;
  try {
    storage.setItem(PROFILE_STORE, JSON.stringify(data), () => {});
  } catch {
    /* this Telegram client has no cloud storage */
  }
}

function rememberProfile(params) {
  const data = profileFromParams(params);
  if (!data) return;
  if (!data.uid && currentTelegramId()) data.uid = currentTelegramId();
  writeBrowserProfile(data);
  const app = telegramApp();
  storageSet(app?.DeviceStorage, data);
  storageSet(app?.CloudStorage, data);
}

function storageGet(storage) {
  return new Promise((resolve) => {
    if (!storage?.getItem) {
      resolve(null);
      return;
    }
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };
    let timer = 0;
    try {
      timer = window.setTimeout(() => finish(null), 1500);
      storage.getItem(PROFILE_STORE, (error, value) => {
        window.clearTimeout(timer);
        const data = error ? null : readStoredProfile(value);
        if (settled) {
          if (!data || new URLSearchParams(window.location.search).get("key")) return;
          applyProfile(data);
          writeBrowserProfile(data);
          renderPlanUntil();
          renderConfig();
          preserveAppLinks();
          renderPartner();
          return;
        }
        finish(data);
      });
    } catch {
      window.clearTimeout(timer);
      finish(null);
    }
  });
}

function startApp() {
  renderSky();
  renderRipple();
  renderLocations();
  renderDownloads();
  renderLaunch();
  renderOwnerPlan();
  renderPlanUntil();
  renderConfig();
  preserveAppLinks();
  document.getElementById("pay-btn")?.addEventListener("click", () => {
    if (isOwner()) return;
    window.location.href = "./pay.html" + (window.location.search || "");
  });
  bindOfferPicks();
  renderPayMethod();
  renderCrypto();
}

const OFFERS = {
  "1": {
    title: "1 месяц",
    days: "30 дней",
    rub: "99 ₽",
    stars: "66 звёзд",
    tokens: "2 токена",
    invoice: "https://t.me/$h-bZHqw1QEqqGAAAso-qMPBwDic",
    token: "token1",
  },
  "3": {
    title: "3 месяца",
    days: "90 дней",
    rub: "269 ₽",
    stars: "178 звёзд",
    tokens: "6 токенов",
    invoice: "https://t.me/$UTMt-6w1QEqrGAAAZ9yN_uqYEj0",
    token: "token3",
  },
  "12": {
    title: "12 месяцев",
    days: "365 дней",
    rub: "999 ₽",
    stars: "713 звёзд",
    tokens: "24 токена",
    invoice: "https://t.me/$VJLS-qw1QEqsGAAAuQIgOys2JOk",
    token: "token12",
  },
};

function showPayStatus(text) {
  const status = document.getElementById("pay-status");
  if (!status) return;
  status.hidden = !text;
  status.textContent = text || "";
}

function openStarInvoice(url) {
  if (!url) {
    showPayStatus("Оплата временно недоступна.");
    return;
  }
  const tg = telegramApp();
  if (tg?.openInvoice) {
    tg.openInvoice(url, (result) => {
      if (result === "paid") showPayStatus("Оплата прошла. Срок подписки обновлён.");
      else if (result === "cancelled") showPayStatus("Оплата отменена.");
      else if (result === "pending") showPayStatus("Оплата ещё обрабатывается.");
      else showPayStatus("Оплата не прошла. Попробуйте ещё раз.");
    });
    return;
  }
  window.location.href = url;
}

function bindOfferPicks() {
  document.querySelectorAll(".offer-pick").forEach((link) => {
    if (link.dataset.bound) return;
    link.dataset.bound = "1";
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const params = new URLSearchParams(window.location.search);
      params.set("plan", link.dataset.plan || "");
      window.location.href = "./pay-method.html?" + params.toString();
    });
  });
}

const TOKEN_COST = { "1": 2, "3": 6, "12": 24 };
const TOKEN_API = "https://ba2ab02edda7fc.lhr.life";
let tokenSpendBusy = false;

function tokenBalance() {
  const raw = queryValue("tokens");
  return /^\d+$/.test(raw) ? Number(raw) : 0;
}

function tokenEndpoints() {
  const urls = [];
  const add = (base) => {
    if (!/^https:\/\/.+/i.test(base || "")) return;
    const url = base.replace(/\/$/, "") + "/api/tokens";
    if (!urls.includes(url)) urls.push(url);
  };
  add(queryValue("api"));
  add(TOKEN_API);
  return urls;
}

function untilStamp(value) {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value || "");
  if (!match) return 0;
  return Date.UTC(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
}

function fresherProfile(params) {
  const stored = readStoredProfile(localStorage.getItem(PROFILE_STORE)) || {};
  const data = {};
  PROFILE_FIELDS.forEach((name) => {
    const value = params.get(name) || stored[name] || "";
    if (value) data[name] = value;
  });
  if (untilStamp(stored.until) > untilStamp(data.until || "")) {
    data.until = stored.until;
    if (stored.tokens) data.tokens = stored.tokens;
  }
  return data;
}

function syncPaidProfile() {
  const merged = fresherProfile(new URLSearchParams(window.location.search));
  if (!String(merged.key || "").startsWith("vless://")) return;
  applyProfile(merged);
  rememberProfile(new URLSearchParams(window.location.search));
  renderPlanUntil();
  const count = document.getElementById("token-count");
  if (count && merged.tokens) count.textContent = merged.tokens;
  preserveAppLinks();
}

function rememberPaidProfile(tokens, until) {
  const params = new URLSearchParams(window.location.search);
  const stored = readStoredProfile(localStorage.getItem(PROFILE_STORE)) || {};
  PROFILE_FIELDS.forEach((name) => {
    if (!params.get(name) && stored[name]) params.set(name, stored[name]);
  });
  if (tokens != null && tokens !== "") params.set("tokens", String(tokens));
  if (until) params.set("until", until);
  const data = {};
  PROFILE_FIELDS.forEach((name) => {
    const value = params.get(name) || "";
    if (value) data[name] = value;
  });
  if (String(data.key || "").startsWith("vless://")) {
    writeBrowserProfile(data);
    const app = telegramApp();
    storageSet(app?.DeviceStorage, data);
    storageSet(app?.CloudStorage, data);
  }
  applyProfile(data);
  renderPlanUntil();
  preserveAppLinks();
}

async function spendTokens(plan) {
  if (tokenSpendBusy) return;
  const offer = OFFERS[plan];
  const cost = TOKEN_COST[plan] || 0;
  if (!offer || !cost) return;
  if (isOwner()) {
    toast("У вас уже безлимитный доступ.");
    return;
  }
  const endpoints = tokenEndpoints();
  const initData = telegramApp()?.initData || "";
  if (!endpoints.length || !initData) {
    if (tokenBalance() < cost) toast("недостаточно токенов для оплаты");
    else toast("Не удалось списать токены. Попробуйте ещё раз.");
    return;
  }
  tokenSpendBusy = true;
  try {
    for (const endpoint of endpoints) {
      let data;
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ initData, code: offer.token }),
        });
        data = await response.json();
      } catch {
        continue;
      }
      if (!data.ok) {
        if (data.error === "low") toast("недостаточно токенов для оплаты");
        else if (data.error === "owner") toast("У вас уже безлимитный доступ.");
        else toast("Не удалось списать токены. Попробуйте ещё раз.");
        if (data.tokens != null) rememberPaidProfile(data.tokens, "");
        return;
      }
      rememberPaidProfile(data.tokens, data.until || "");
      const confirm = document.getElementById("token-confirm");
      if (confirm) confirm.hidden = true;
      toast(data.until ? "Подписка продлена до " + data.until : "Подписка продлена");
      return;
    }
    toast("Не удалось списать токены. Попробуйте ещё раз.");
  } finally {
    tokenSpendBusy = false;
  }
}

function qrDataUrl(text) {
  if (!text || typeof qrcode !== "function") return "";
  try {
    const code = qrcode(0, "M");
    code.addData(text);
    code.make();
    return code.createDataURL(6, 0);
  } catch {
    return "";
  }
}

function renderCrypto() {
  const page = document.getElementById("pay-crypto");
  if (!page || page.dataset.bound) return;
  page.dataset.bound = "1";
  const catalog = {
    usd: { name: "USD", wallet: "", qr: "" },
    eth: { name: "ETH", wallet: "", qr: "" },
    btc: { name: "BTC", wallet: "", qr: "" },
    sol: { name: "SOL", wallet: "", qr: "" },
  };
  const list = document.getElementById("coin-list");
  const toggle = document.getElementById("crypto-toggle");
  const modal = document.getElementById("crypto-modal");
  const qrBox = document.getElementById("crypto-qr");
  const walletButton = document.getElementById("crypto-wallet");
  let currentWallet = "";

  const closeModal = () => {
    if (modal) modal.hidden = true;
  };
  toggle?.addEventListener("click", () => {
    if (!list) return;
    list.hidden = !list.hidden;
    toggle.setAttribute("aria-expanded", list.hidden ? "false" : "true");
  });
  document.getElementById("crypto-close")?.addEventListener("click", closeModal);
  document.getElementById("crypto-dismiss")?.addEventListener("click", closeModal);
  walletButton?.addEventListener("click", async () => {
    if (!currentWallet) {
      toast("Кошелёк появится позже.");
      return;
    }
    toast((await copyText(currentWallet)) ? "кошелёк скопирован" : "Не удалось скопировать.");
  });
  page.querySelectorAll("[data-coin]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = catalog[button.dataset.coin || ""] || { name: button.textContent.trim(), wallet: "", qr: "" };
      const title = document.getElementById("crypto-name");
      if (title) title.textContent = item.name || button.textContent.trim();
      currentWallet = item.wallet || "";
      if (walletButton) {
        walletButton.textContent = currentWallet || "Кошелёк появится позже";
      }
      if (qrBox) {
        qrBox.replaceChildren();
        const src = item.qr || qrDataUrl(currentWallet);
        if (src) {
          const image = document.createElement("img");
          image.src = src;
          image.alt = "QR-код";
          qrBox.append(image);
        } else {
          const empty = document.createElement("span");
          empty.textContent = "QR появится позже";
          qrBox.append(empty);
        }
      }
      if (modal) modal.hidden = false;
    });
  });
  fetch("./crypto.json?v=11")
    .then((response) => (response.ok ? response.json() : null))
    .then((data) => {
      if (!data || typeof data !== "object") return;
      Object.keys(catalog).forEach((id) => {
        const row = data[id];
        if (!row || typeof row !== "object") return;
        catalog[id].wallet = String(row.wallet || "");
        catalog[id].qr = String(row.qr || "");
      });
    })
    .catch(() => {});
}

function renderPayMethod() {
  const page = document.getElementById("pay-method");
  if (!page || page.dataset.bound) return;
  page.dataset.bound = "1";
  const offer = OFFERS[queryValue("plan")];
  if (!offer) {
    const params = new URLSearchParams(window.location.search);
    params.delete("plan");
    const rest = params.toString();
    window.location.replace("./pay.html" + (rest ? "?" + rest : ""));
    return;
  }
  const title = document.getElementById("sum-title");
  const days = document.getElementById("sum-days");
  const rub = document.getElementById("sum-rub");
  const sbp = document.getElementById("sbp-price");
  const stars = document.getElementById("star-price");
  const tokens = document.getElementById("token-price");
  if (title) title.textContent = offer.title;
  if (days) days.textContent = offer.days;
  if (rub) rub.textContent = offer.rub;
  if (sbp) sbp.textContent = offer.rub;
  if (stars) stars.textContent = offer.stars;
  if (tokens) tokens.textContent = offer.tokens;
  document.getElementById("pay-sbp")?.addEventListener("click", () => {
    showPayStatus("Оплата через СБП появится позже. Сумма: " + offer.rub + ".");
  });
  document.getElementById("pay-stars")?.addEventListener("click", () => {
    openStarInvoice(offer.invoice);
  });
  document.getElementById("pay-crypto")?.addEventListener("click", () => {
    const params = new URLSearchParams(window.location.search);
    window.location.href = "./pay-crypto.html?" + params.toString();
  });
  document.getElementById("pay-token")?.addEventListener("click", () => {
    const modal = document.getElementById("token-confirm");
    const sum = document.getElementById("token-sum");
    if (sum) sum.textContent = offer.tokens;
    if (!modal) {
      spendTokens(queryValue("plan"));
      return;
    }
    modal.hidden = false;
  });
  const closeConfirm = () => {
    const modal = document.getElementById("token-confirm");
    if (modal) modal.hidden = true;
  };
  document.getElementById("token-confirm-close")?.addEventListener("click", closeConfirm);
  document.getElementById("token-confirm-yes")?.addEventListener("click", () => {
    const modal = document.getElementById("token-confirm");
    if (modal) modal.hidden = true;
    spendTokens(queryValue("plan"));
  });
}

document.querySelectorAll("[data-invoice]").forEach((button) => {
  button.addEventListener("click", () => {
    const url = button.dataset.invoice || "";
    const status = document.getElementById("pay-status");
    const show = (text) => {
      if (!status) return;
      status.hidden = false;
      status.textContent = text;
    };
    if (!url) {
      show("Оплата временно недоступна.");
      return;
    }
    const tg = telegramApp();
    if (tg?.openInvoice) {
      tg.openInvoice(url, (result) => {
        if (result === "paid") show("Оплата прошла. Срок подписки обновлён.");
        else if (result === "cancelled") show("Оплата отменена.");
        else if (result === "pending") show("Оплата ещё обрабатывается.");
        else show("Оплата не прошла. Попробуйте ещё раз.");
      });
      return;
    }
    window.location.href = url;
  });
});

document.querySelectorAll("[data-toast]").forEach((button) => {
  button.addEventListener("click", () => toast(button.dataset.toast));
});

function queryValue(name) {
  return new URLSearchParams(window.location.search).get(name) || "";
}

function referralLink() {
  const fromQuery = queryValue("uid");
  const fromApp = telegramApp()?.initDataUnsafe?.user?.id;
  const id = /^\d+$/.test(fromQuery) ? fromQuery : fromApp ? String(fromApp) : "";
  return id ? "https://t.me/theaevum_bot?start=ref" + id : "";
}

function openShareUrl(link) {
  const share = "https://t.me/share/url?url=" + encodeURIComponent(link) + "&text=" + encodeURIComponent("\nПрисоединяйся ко мне в Aevum VPN!");
  const app = telegramApp();
  if (app?.openTelegramLink) app.openTelegramLink(share);
  else window.location.href = share;
}

async function shareReferral() {
  const link = referralLink();
  if (!link) {
    toast("Ссылка появится после входа через бота.");
    return;
  }
  const app = telegramApp();
  const initData = app?.initData || "";
  if (app?.shareMessage && initData) {
    const bases = [];
    const add = (base) => {
      if (!/^https:\/\/.+/i.test(base || "")) return;
      const url = base.replace(/\/$/, "");
      if (!bases.includes(url)) bases.push(url);
    };
    add(queryValue("api"));
    add(TOKEN_API);
    for (const base of bases) {
      try {
        const response = await fetch(base + "/api/invite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ initData }),
        });
        const data = await response.json();
        if (!data.ok || !data.id) continue;
        app.shareMessage(data.id, (sent) => {
          if (!sent) openShareUrl(link);
        });
        return;
      } catch {
        continue;
      }
    }
  }
  openShareUrl(link);
}

function paintReferrals(list, names) {
  list.replaceChildren();
  if (!names.length) {
    const empty = document.createElement("p");
    empty.textContent = "Пока никого нет.";
    list.append(empty);
    return;
  }
  const items = document.createElement("ul");
  names.forEach((name) => {
    const item = document.createElement("li");
    item.textContent = name;
    items.append(item);
  });
  list.append(items);
}

function referralNamesFromQuery() {
  return queryValue("refs")
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);
}

async function fetchReferralNames() {
  const initData = telegramApp()?.initData || "";
  if (!initData) return null;
  const bases = [];
  const add = (base) => {
    if (!/^https:\/\/.+/i.test(base || "")) return;
    const url = base.replace(/\/$/, "");
    if (!bases.includes(url)) bases.push(url);
  };
  add(queryValue("api"));
  add(TOKEN_API);
  for (const base of bases) {
    try {
      const response = await fetch(base + "/api/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initData }),
      });
      const data = await response.json();
      if (data.ok && Array.isArray(data.refs)) return data.refs;
    } catch {
      continue;
    }
  }
  return null;
}

function renderPartner() {
  const badge = document.getElementById("token-badge");
  const linkNode = document.getElementById("ref-link");
  const list = document.getElementById("ref-list");
  const toggle = document.getElementById("ref-toggle");
  if (!badge || !linkNode || !list || !toggle) return;
  const tokens = queryValue("tokens");
  const count = document.getElementById("token-count");
  if (count) count.textContent = /^\d+$/.test(tokens) ? tokens : "0";
  const link = referralLink();
  linkNode.textContent = link || "Ссылка появится после входа через бота.";
  linkNode.classList.toggle("is-empty", !link);
  let names = referralNamesFromQuery();
  const showNames = () => {
    if (!list.hidden) paintReferrals(list, names);
  };
  if (toggle.dataset.bound) return;
  toggle.dataset.bound = "1";
  toggle.addEventListener("click", () => {
    const open = list.hidden;
    list.hidden = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) showNames();
  });
  document.getElementById("ref-send")?.addEventListener("click", shareReferral);
  document.getElementById("ref-send-icon")?.addEventListener("click", shareReferral);
  fetchReferralNames().then((fresh) => {
    if (!fresh) return;
    names = fresh;
    showNames();
  });
}

document.querySelectorAll("[data-token]").forEach((button) => {
  button.addEventListener("click", () => {
    const code = button.dataset.token || "";
    if (code === "tokenpro") {
      toast("Этот тариф больше не действует.");
      return;
    }
    const plan = code === "token3" ? "3" : code === "token12" ? "12" : "1";
    spendTokens(plan);
  });
});

async function boot() {
  const tg = telegramApp();
  if (tg) {
    tg.ready();
    tg.expand();
    tg.setHeaderColor("#070b16");
    tg.setBackgroundColor("#070b16");
  }
  const current = new URLSearchParams(window.location.search);
  syncPaidProfile();
  if (!current.get("key")) {
    const local = readStoredProfile(localStorage.getItem(PROFILE_STORE));
    if (local) applyProfile(local);
  }
  startApp();
  renderPartner();
  if (current.get("key")) return;
  const app = telegramApp();
  const stored = await Promise.all([
    storageGet(app?.DeviceStorage),
    storageGet(app?.CloudStorage),
  ]);
  const saved = stored[1] || stored[0];
  if (!saved) return;
  applyProfile(saved);
  writeBrowserProfile(saved);
  renderPlanUntil();
  renderConfig();
  preserveAppLinks();
  renderPartner();
}

boot();

window.addEventListener("pageshow", (event) => {
  if (!event.persisted) return;
  syncPaidProfile();
  renderPlanUntil();
});
