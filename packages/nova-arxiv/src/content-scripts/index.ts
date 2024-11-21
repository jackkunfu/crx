import { createApp } from 'vue'
import App from './App.vue'

// 创建 Vue 应用并挂载到特定容器
mountApp()

export function mountApp(container?: any) {
  // 创建 Vue 应用并挂载到特定容器
  if (!container) {
    container = document.createElement('div')
    container.id = 'crx-app'
    document.body.appendChild(container)
  }
  let id = container.id
  console.log(id);
  createApp(App).mount(`#${id}`)
}

// // 创建聊天按钮
// createChatButton()

export function createChatButton() {
  const button = document.createElement('div')
  button.id = 'chat-button-container'
  document.body.appendChild(button)
}
