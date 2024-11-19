import { createApp } from 'vue'
import App from './App.vue'

// // 创建聊天按钮
// createChatButton()

// 创建 Vue 应用并挂载到特定容器
const container = document.createElement('div')
container.id = 'crx-app'
document.body.appendChild(container)
createApp(App).mount('#crx-app')


export function createChatButton() {
  const button = document.createElement('div')
  button.id = 'chat-button-container'
  document.body.appendChild(button)
}