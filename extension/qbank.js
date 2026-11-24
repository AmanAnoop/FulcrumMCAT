// Runs on qbank sites. Adds a "Send to Triage" button and an optional auto-send.
(() => {
  if (window.__weakspotLoaded) return; window.__weakspotLoaded = true;
  const MAX = 50000;
  const readPage = () => {
    const sel = String(getSelection() || '').trim();
    if (sel.length > 40) return sel;
    let text = document.body.innerText || '';
    for (const f of document.querySelectorAll('iframe')) {
      try { text += '\n' + (f.contentDocument?.body?.innerText || ''); } catch (e) { /* other-origin frame */ }
    }
    return text.slice(0, MAX);
  };
  const hash = (s) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return String(h); };
  async function send(auto) {
    const text = readPage();
    if (text.trim().length < 40) return toast('Nothing to send on this page.');
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const { queue = [], appUrl } = await chrome.storage.local.get(['queue', 'appUrl']);
    queue.push({ id, text, site: location.hostname.replace(/^www\./, ''), url: location.href, at: new Date().toISOString() });
    await chrome.storage.local.set({ queue: queue.slice(-30) });
    toast(auto ? 'Sent to Triage' : 'Sent. Open Triage to practice it.', appUrl);
  }
  // Floating button
  const host = document.createElement('div');
  host.style.cssText = 'position:fixed;right:18px;bottom:18px;z-index:2147483647';
  const root = host.attachShadow({ mode: 'open' });
  root.innerHTML = `<style>
    .w{font:500 13px/1.3 system-ui,sans-serif;display:flex;flex-direction:column;align-items:flex-end;gap:8px}
    button{all:unset;cursor:pointer;background:#121416;color:#f1efe9;padding:10px 14px;border-radius:10px;box-shadow:0 4px 16px rgba(0,0,0,.25);display:flex;gap:8px;align-items:center}
    button:hover{background:#000} i{width:8px;height:8px;border-radius:50%;background:#d33a3f;display:inline-block}
    label{background:#fff;color:#111;padding:6px 10px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.15);display:none;gap:6px;align-items:center;cursor:pointer}
    .w:hover label{display:flex}
    .t{background:#121416;color:#fff;padding:9px 12px;border-radius:8px;display:none;max-width:260px} .t a{color:#f3a5a5}
  </style><div class="w"><div class="t" id="t"></div><label><input type="checkbox" id="auto"> Auto-send after each answer</label><button id="b"><i></i>Send to Triage</button></div>`;
  document.documentElement.appendChild(host);
  const t = root.getElementById('t');
  function toast(msg, appUrl) {
    t.innerHTML = ''; t.append(msg);
    if (appUrl) { const a = document.createElement('a'); a.href = appUrl; a.target = '_blank'; a.textContent = ' Open'; t.append(a); }
    t.style.display = 'block'; clearTimeout(toast.h); toast.h = setTimeout(() => (t.style.display = 'none'), 4000);
  }
  root.getElementById('b').onclick = () => send(false);
  // Auto-send: when a page shows an answered question, send it once.
  const auto = root.getElementById('auto');
  chrome.storage.local.get('auto').then(({ auto: on }) => { auto.checked = !!on; });
  auto.onchange = () => chrome.storage.local.set({ auto: auto.checked });
  const answered = /(correct answer|incorrect|you answered|your answer|explanation)/i;
  let lastSent = '', timer = null;
  new MutationObserver(() => {
    if (!auto.checked) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      const text = readPage();
      if (!answered.test(text)) return;
      const h = hash(text.slice(0, 1500));
      if (h === lastSent) return;
      lastSent = h; send(true);
    }, 1500);
  }).observe(document.body, { childList: true, subtree: true, characterData: true });
  chrome.runtime.onMessage.addListener((m) => { if (m?.type === 'weakspot-send-now') send(false); });
})();
