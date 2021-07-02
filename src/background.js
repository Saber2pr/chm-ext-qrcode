const COM_QRCODE = 'Qrcode Edit'
const COM_QUERY = 'querySelector'
const COM_SAVE = 'Save as file'

const menus = [
  COM_QRCODE,
  COM_QUERY,
  COM_SAVE
]

chrome.runtime.onInstalled.addListener(() => {
  menus.forEach(menu => chrome.contextMenus.create({
    id: menu,
    title: menu,
    contexts: ['all']
  }))
})

chrome.contextMenus.onClicked.addListener((info) => {
  if(menus.includes(info.menuItemId)){
    sendMessage(info)
  }
})