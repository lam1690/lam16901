import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProgressStore = defineStore('progress', () => {
  // 读取 localStorage
  const saved = localStorage.getItem('reading_progress')
  // 格式: { "1": [0, 1, 2], "2": [5], ... } 表示年级1已读篇目索引
  const readMap = ref(saved ? JSON.parse(saved) : {})

  function markRead(grade, index) {
    if (!readMap.value[grade]) {
      readMap.value[grade] = []
    }
    if (!readMap.value[grade].includes(index)) {
      readMap.value[grade].push(index)
    }
    localStorage.setItem('reading_progress', JSON.stringify(readMap.value))
  }

  function isRead(grade, index) {
    return (readMap.value[grade] || []).includes(index)
  }

  function getReadCount(grade) {
    return (readMap.value[grade] || []).length
  }

  const totalReadCount = computed(() => {
    return Object.values(readMap.value).reduce((sum, arr) => sum + arr.length, 0)
  })

  return { readMap, markRead, isRead, getReadCount, totalReadCount }
})