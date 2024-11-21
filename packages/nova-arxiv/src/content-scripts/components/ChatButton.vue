<template>
  <button class="chat-btn" @click="toggleChat">
    <span class="chat-icon">💬</span>
  </button>
</template>

<script setup lang="ts">
import { login } from '../api'

const toggleChat = () => {
  if (!chrome.storage.local.get('token')) return login({})
  window.dispatchEvent(new CustomEvent('toggleChat'))
}
</script>

<style scoped>
.chat-btn {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #1890ff;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 9999;
}

.chat-icon {
  font-size: 24px;
}
</style>
