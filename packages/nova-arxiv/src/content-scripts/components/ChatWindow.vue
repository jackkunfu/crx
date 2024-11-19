<template>
  <div class="chat-window">
    <div class="chat-header">
      <h3>聊天窗口</h3>
      <button class="close-btn" @click="$emit('close')">×</button>
    </div>
    <div class="chat-body">
      <!-- 聊天内容 -->
    </div>
    <div class="chat-footer">
      <input 
        v-model="message" 
        @keyup.enter="sendMessage"
        placeholder="输入消息..."
      >
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')

const sendMessage = () => {
  if (!message.value.trim()) return
  // 处理发送消息逻辑
  message.value = ''
}

defineEmits(['close'])
</script>

<style scoped>
.chat-window {
  position: fixed;
  right: 20px;
  bottom: 80px;
  width: 300px;
  height: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  z-index: 9999;
}

.chat-header {
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
}

.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.chat-footer {
  padding: 10px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
}

.chat-footer input {
  flex: 1;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.chat-footer button {
  padding: 5px 15px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
