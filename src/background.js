const COM_QRCODE = 'Qrcode Edit'

chrome.contextMenus.create({
  id: COM_QRCODE,
  title: 'Qrcode Edit',
  contexts: ['all']
})

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === COM_QRCODE) {
    sendMessage(info)
  }
})