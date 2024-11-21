import { ResultEnum, ContentTypeEnum } from './httpEnum'
// import chrome from 'chrome-promise'

const baseURL = import.meta.env.VITE_APP_API_URL as string | undefined
const source = import.meta.env.VITE_REQUEST_SOURCE as string | undefined
type Param = {
  method: string
  url: string
  headers?: any
  data?: any
}
export default async ({ method, url, headers = {}, data = {} }: Param) => {
  const config = {
    method: method,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
      source,
      ...(headers || {}),
    },
  }
  if (method?.toUpperCase() == 'POST') {
    Object.defineProperty(config, 'body', {
      value: JSON.stringify(data),
    })
  }

  let offset: string | number = -new Date().getTimezoneOffset() / 60
  if (offset >= 0) offset = '+' + offset
  config.headers['TimeZone'] = `GMT${offset}`

  // if (method === 'POST') {
  //   if (headers['Content-Type'] === ContentTypeEnum.JSON) {
  //     config.body = JSON.stringify(params)
  //   }
  // }

  const fingerprintData = await chrome.storage.local.get('fingerprint')
  config.headers['FingerPrint'] = fingerprintData.fingerprint

  const userData = await chrome.storage.local.get('user')
  config.headers['AuthToken'] = userData?.user?.token || ''

  const requestUrl = url.indexOf('http') > -1 ? url : `${baseURL}${url}`

  // let requestUrl = url.indexOf('http') > -1 ? url : `${baseURL}${url}`
  // if (method?.toUpperCase() == 'GET' && Object.keys(data || []).length) {
  //   requestUrl += `?${new URLSearchParams(data).toString()}`
  // }

  return new Promise((resolve, reject) => {
    fetch(requestUrl, config)
      .then((response) => response.json())
      .then((res) => {
        if (!res) {
          reject(res)
          return
        }

        if (res.code === ResultEnum.SUCCESS) {
          resolve(res)
          return
        }

        reject(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
