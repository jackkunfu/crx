// // 直接调用 request 会把请求暴漏在页面 Network 里
// import request from 'crx_request';

import chromePromise from 'chrome-promise'

export function getList(data: any) {
  return handleReq({
    url: '/login',
    method: 'POST',
    data
  });
}


// 在插件后台运行请求 不暴漏在前台请求 在插件服务服务工作进程中查看
async function handleReq(data: any) {
  return await chromePromise.runtime.sendMessage({ type: 'req', data })
}