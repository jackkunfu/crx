console.log('this is content script');
import { getList } from './api'
import { load } from '@fingerprintjs/fingerprintjs'

// 创建并添加聊天按钮
function createChatButton() {
  const button = document.createElement('button');
  button.innerHTML = 'Chat with Paper';
  button.id = 'nova-arxiv-chat-btn';
  
  // 设置按钮样式
  Object.assign(button.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '12px 24px',
    backgroundColor: '#1a7f37',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    zIndex: '9999',
    transition: 'all 0.3s ease'
  });

  // 添加悬停效果
  button.addEventListener('mouseover', () => {
    button.style.backgroundColor = '#2ea043';
    button.style.transform = 'translateY(-2px)';
  });

  button.addEventListener('mouseout', () => {
    button.style.backgroundColor = '#1a7f37';
    button.style.transform = 'translateY(0)';
  });

  // 点击事件处理
  button.addEventListener('click', () => {
    handleChatButtonClick();
  });

  document.body.appendChild(button);
}

// 获取页面内容
function getPageContent() {
  // 获取论文标题
  const title = document.querySelector('h1.title')?.textContent?.replace('Title:', '').trim() || '';
  
  // 获取论文摘要
  const abstract = document.querySelector('.abstract')?.textContent?.replace('Abstract:', '').trim() || '';
  
  // 获取作者信息
  const authors = document.querySelector('.authors')?.textContent?.replace('Authors:', '').trim() || '';
  
  // 获取论文ID
  const arxivId = window.location.pathname.split('/').pop() || '';

  return {
    title,
    abstract,
    authors,
    arxivId,
    url: window.location.href,
    timestamp: new Date().toISOString()
  };
}

// 处理按钮点击事件
async function handleChatButtonClick() {
  try {
    // 显示加载状态
    const button = document.getElementById('nova-arxiv-chat-btn');
    if (button) {
      button.innerHTML = 'Processing...';
      button.style.backgroundColor = '#666';
    }

    // 获取页面内容
    const pageContent = getPageContent();

    // 发送消息给 background script
    const response = await getList(pageContent);

    console.log(response);
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to add paper');
    }

    console.log('Data sent successfully:', response.data);

    // 恢复按钮状态
    if (button) {
      button.innerHTML = 'Chat with Paper';
      button.style.backgroundColor = '#1a7f37';
    }

  } catch (error) {
    console.error('Error sending data:', error);
    
    // 显示错误状态
    const button = document.getElementById('nova-arxiv-chat-btn');
    if (button) {
      button.innerHTML = 'Error! Try again';
      button.style.backgroundColor = '#dc3545';
      
      // 3秒后重置按钮状态
      setTimeout(() => {
        button.innerHTML = 'Chat with Paper';
        button.style.backgroundColor = '#1a7f37';
      }, 3000);
    }
  }
}

// 检查是否在 arXiv 页面
function isArxivPage() {
  return window.location.hostname.includes('arxiv.org');
}

// 创建聊天容器
function createChatContainer() {
  const container = document.createElement('div');
  container.id = 'nova-chat-container';
  document.body.appendChild(container);
  return container;
}

// 浏览器指纹 fingerprint
let _visitorId = ''
export const fp$$ = async function () {
  if (_visitorId) return await Promise.resolve(_visitorId)
  const instance = await load()
  const { visitorId } = await instance.get()
  _visitorId = visitorId
  return visitorId
}

// 主函数
async function init() {
  // if (isArxivPage()) {
    createChatButton();
    
    // 创建聊天容器
    const container = createChatContainer();
    
    // 动态导入并挂载 Vue 应用
    try {
      const { mountChat } = await import('../chat/src/main');
      mountChat(container);
    } catch (error) {
      console.error('Failed to load chat component:', error);
    }

    chrome.runtime.sendMessage({ type: 'fingerprint', data: await fp$$() })
  // }
}

// 启动
init();