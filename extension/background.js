// Toolbar button: send the current page from any site, even ones the helper doesn't list.
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;
  try {
    await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['qbank.js'] });
    await chrome.tabs.sendMessage(tab.id, { type: 'weakspot-send-now' });
  } catch (e) { /* pages like chrome:// can't be read */ }
});
// Show how many questions are waiting for the Fulcrum site.
async function badge() {
  const { queue = [] } = await chrome.storage.local.get('queue');
  chrome.action.setBadgeBackgroundColor({ color: '#9f1239' });
  chrome.action.setBadgeText({ text: queue.length ? String(queue.length) : '' });
}
chrome.storage.onChanged.addListener((c) => { if (c.queue) badge(); });
chrome.runtime.onInstalled.addListener(badge);
chrome.runtime.onStartup.addListener(badge);
