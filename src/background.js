// src/background.js (Manifest V3)

const COM_QRCODE = "Qrcode Edit";
const COM_QUERY = "querySelector";
const COM_SAVE = "Save as file";

const menus = [COM_QRCODE, COM_QUERY, COM_SAVE];

// 安装或更新时创建菜单
chrome.runtime.onInstalled.addListener(() => {
  menus.forEach((menu) => {
    chrome.contextMenus.create({
      id: menu,
      title: menu,
      contexts: ["all"],
    });
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (menus.includes(info.menuItemId)) {
    chrome.tabs.sendMessage(tab.id, {
      menuItemId: info.menuItemId, // 👈 保证内容脚本能拿到
      type: info.menuItemId,
      data: info,
    });
  }
});
