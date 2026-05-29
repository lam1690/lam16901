<template>
  <div class="home">
    <header class="header">
      <h1>📖 小学语文阅读</h1>
      <p class="subtitle">阅读 · 理解 · 仿写</p>
    </header>
    <div class="grade-grid">
      <div
        v-for="g in [1,2,3,4,5,6]"
        :key="g"
        class="grade-card"
        @click="$router.push('/grade/' + g)"
      >
        <div class="grade-num">{{ g }}年级</div>
        <div class="grade-progress">
          已读 {{ getReadCount(g) }} 篇
        </div>
      </div>
    </div>
    <div class="stats-btn">
      <button @click="$router.push('/stats')">📊 查看总体进度</button>
    </div>
  </div>
</template>

<script setup>
import { useProgressStore } from '@/stores/progress'
import { useRouter } from 'vue-router'

const store = useProgressStore()
const getReadCount = store.getReadCount
const router = useRouter()
</script>

<style scoped>
.home { padding: 40px; max-width: 800px; margin: 0 auto; }
.header { text-align: center; margin-bottom: 40px; }
.header h1 { font-size: 32px; color: #333; }
.subtitle { color: #999; font-size: 16px; margin-top: 8px; }
.grade-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.grade-card { background: white; border-radius: 12px; padding: 30px; text-align: center;
  cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.06); transition: transform 0.2s; }
.grade-card:hover { transform: translateY(-4px); box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
.grade-num { font-size: 24px; font-weight: bold; color: #333; }
.grade-progress { color: #999; font-size: 14px; margin-top: 8px; }
.stats-btn { text-align: center; margin-top: 30px; }
.stats-btn button { padding: 10px 24px; border: 1px solid #ddd; border-radius: 8px;
  background: white; cursor: pointer; font-size: 14px; }
</style>