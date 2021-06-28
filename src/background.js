const COM_QRCODE = 'Qrcode Edit'
const COM_QUERY = 'querySelector'

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: COM_QRCODE,
    title: 'Qrcode Edit',
    contexts: ['all']
  })

  chrome.contextMenus.create({
    id: COM_QUERY,
    title: 'querySelector',
    contexts: ['all']
  })
})

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === COM_QRCODE) {
    sendMessage(info)
  }
  if (info.menuItemId === COM_QUERY) {
    sendMessage(info)
  }
})