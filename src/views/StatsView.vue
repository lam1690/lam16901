<template>
  <div class="stats-view">
    <div class="top-bar">
      <button @click="$router.push('/')">← 返回首页</button>
      <h2>📊 学习进度</h2>
    </div>
    <div class="summary-card">
      <div class="total-num">{{ totalCount }}</div>
      <div class="total-label">总阅读篇数</div>
    </div>
    <div class="grade-progress-list">
      <div v-for="g in [1,2,3,4,5,6]" :key="g" class="grade-row">
        <span class="grade-label">{{ g }}年级</span>
        <div class="progress-bar-wrap">
          <div class="progress-bar" :style="{ width: getPct(g) + '%' }"></div>
        </div>
        <span class="grade-count">{{ store.getReadCount(g) }}/{{ gradeCount(g) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProgressStore } from '@/stores/progress'

const store = useProgressStore()
const router = useRouter()

const totalCount = computed(() => store.totalReadCount)

function getPct(grade) {
  const total = gradeCount(grade)
  if (total === 0) return 0
  return Math.round((store.getReadCount(grade) / total) * 100)
}

function gradeCount(g) {
  return 25 // 每年级预计25篇，可动态取值
}
</script>

<style scoped>
.stats-view { max-width: 600px; margin: 0 auto; padding: 30px; }
.top-bar { display: flex; align-items: center; gap: 16px; margin-bottom: 30px; }
.top-bar button { padding: 6px 16px; border: 1px solid #ddd; border-radius: 6px;
  background: white; cursor: pointer; }
.top-bar h2 { font-size: 20px; color: #333; }
.summary-card { background: white; border-radius: 12px; padding: 30px;
  text-align: center; margin-bottom: 20px; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
.total-num { font-size: 48px; font-weight: bold; color: #1677ff; }
.total-label { font-size: 14px; color: #999; margin-top: 8px; }
.grade-progress-list { background: white; border-radius: 12px; padding: 20px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
.grade-row { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.grade-label { width: 60px; font-size: 15px; color: #333; }
.progress-bar-wrap { flex: 1; height: 10px; background: #f0f0f0; border-radius: 5px; overflow: hidden; }
.progress-bar { height: 100%; background: #1677ff; border-radius: 5px; transition: width 0.3s; }
.grade-count { width: 60px; font-size: 13px; color: #999; text-align: right; }
</style>