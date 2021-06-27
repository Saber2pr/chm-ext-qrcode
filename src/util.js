const sendMessage = data => new Promise(resolve =>
  chrome.tabs.query({ active: true, currentWindow: true }, tabs =>
    chrome.tabs.sendMessage(tabs[0].id, data, resolve)
  ))

const onMessage = (callback) =>
  chrome.runtime.onMessage
    .addListener(async (data, sender, sendResponse) => sendResponse(await callback(data, sender)))