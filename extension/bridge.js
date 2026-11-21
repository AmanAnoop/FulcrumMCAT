// Runs on the Fulcrum website. Hands queued questions to the app, then clears them.
(() => {
  if (!document.querySelector('meta[name="weakspot-app"]')) return;
  chrome.storage.local.set({ appUrl: location.origin + location.pathname });
  let busy = false;
  async function flush() {
    if (busy) return; busy = true;
    const { queue = [] } = await chrome.storage.local.get('queue');
    for (const item of queue) {
      const done = await new Promise((res) => {
        const on = (e) => { if (e.source === window && e.data?.type === 'weakspot-captured' && e.data.id === item.id) { removeEventListener('message', on); res(true); } };
        addEventListener('message', on);
        window.postMessage({ type: 'weakspot-capture', id: item.id, text: item.text, site: item.site }, '*');
        setTimeout(() => { removeEventListener('message', on); res(false); }, 120000);
      });
      if (!done) break;
      const cur = (await chrome.storage.local.get('queue')).queue || [];
      await chrome.storage.local.set({ queue: cur.filter((q) => q.id !== item.id) });
    }
    busy = false;
  }
  setTimeout(flush, 1500);
  chrome.storage.onChanged.addListener((c) => { if (c.queue && (c.queue.newValue || []).length > (c.queue.oldValue || []).length) flush(); });
})();
