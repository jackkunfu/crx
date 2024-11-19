export default async function req(data: any) {
  // 发送消息给 background script
  const response = await chrome.runtime.sendMessage({
    type: 'req',
    data
  });
  return response
}