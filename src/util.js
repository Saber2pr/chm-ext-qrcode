const onMessage = (callback) =>
  chrome.runtime.onMessage
    .addListener(async (data, sender, sendResponse) => sendResponse(await callback(data, sender)))