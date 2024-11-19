<template>
  <ChatButton @close="closeChat" />
  <ChatWindow v-if="showChat" @close="closeChat" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChatWindow from './components/ChatWindow.vue'
import ChatButton from './components/ChatButton.vue'
// import { useChatStore } from './stores/chat'

const showChat = ref(false)
// const chatStore = useChatStore()

// 监听自定义事件
window.addEventListener('toggleChat', () => {
  showChat.value = !showChat.value
})

const closeChat = () => {
  showChat.value = false
}
</script>
