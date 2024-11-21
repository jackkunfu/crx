// // 直接调用 crx_request request 会把请求暴漏在页面 Network 里
// 此处通过 handleReq 发起请求 在 background 中触发真正请求
// import request from 'crx_request';


export async function login(data: any) {
  return await handleReq({
    url: '/login',
    method: 'POST',
    data
  });
}


// 在插件后台运行请求 不暴漏在前台请求 在插件服务服务工作进程中查看
async function handleReq(data: any) {
  return await sendMessage({ type: 'req', data })
}

const sendMessage = (msg: { type: string, data: any }) => {
  return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(msg, (response) => {
          if (chrome.runtime.lastError) {
              return reject(chrome.runtime.lastError);
          }
          resolve(response);
      });
  });
};