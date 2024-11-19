console.log('this is background');
import request from 'crx_request'

// 处理来自 content script 的消息
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  const { type, data } = message
  if (type === 'req') {
    let res = await request(data, sendResponse);
    sendResponse(res)
    return true
  }
  if (type === 'storage') {
    chrome.storage.local.set(data)
    return true // 需要返回 true 来保持消息通道开启
  }
});

// tab 监听
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == 'complete') {
    chrome.tabs.sendMessage(tabId, { changeInfo, tab, message: 'injectEntry' })
  }
})
