<template>
  <div class="analysis-view">
    <div class="top-bar">
      <button @click="$router.push('/grade/' + grade)">← 返回篇目</button>
      <span>{{ article.title }}</span>
    </div>
    <div class="analysis-section">
      <h3>📝 答案与解析</h3>
      <div v-for="(q, i) in article.questions" :key="i" class="qa-item">
        <p class="q-text">{{ i + 1 }}. {{ q.question }}</p>
        <p class="q-answer">✅ 正确答案：{{ q.options[q.answer] }}</p>
        <p class="q-analysis">💡 {{ q.analysis }}</p>
      </div>
    </div>
    <div class="fanxie-section">
      <h3>✍️ 写作仿写</h3>
      <div class="fanxie-title">{{ article.fanxie.title }}</div>
      <div class="fanxie-model">
        <div class="model-label">📋 参考范文</div>
        <div class="model-text">{{ article.fanxie.model }}</div>
      </div>
      <div class="fanxie-points">
        <div class="points-label">📌 写作要点</div>
        <ul>
          <li v-for="p in article.fanxie.points" :key="p">{{ p }}</li>
        </ul>
      </div>
    </div>
    <div class="action-bar">
      <button @click="$router.push('/grade/' + grade)">← 继续阅读</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import grade1 from '@/data/articles-grade1.js'
import grade2 from '@/data/articles-grade2.js'
import grade3 from '@/data/articles-grade3.js'
import grade4 from '@/data/articles-grade4.js'
import grade5 from '@/data/articles-grade5.js'
import grade6 from '@/data/articles-grade6.js'

const gradeMap = { 1: grade1, 2: grade2, 3: grade3, 4: grade4, 5: grade5, 6: grade6 }
const route = useRoute()
const grade = computed(() => parseInt(route.params.grade))
const idx = computed(() => parseInt(route.params.index))
const articles = computed(() => gradeMap[grade.value] || [])
const article = computed(() => articles.value[idx.value] || { title: '', questions: [], fanxie: {} })
</script>

<style scoped>
.analysis-view { max-width: 700px; margin: 0 auto; padding: 30px; }
.top-bar { display: flex; align-items: center; gap: 16px; margin-bottom: 30px; }
.top-bar button { padding: 6px 16px; border: 1px solid #ddd; border-radius: 6px;
  background: white; cursor: pointer; }
.top-bar span { font-size: 16px; color: #333; font-weight: 500; }
.analysis-section, .fanxie-section { background: white; border-radius: 12px;
  padding: 24px; margin-bottom: 20px; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
h3 { font-size: 16px; color: #333; margin-bottom: 20px; }
.qa-item { margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #f0f0f0; }
.qa-item:last-child { border-bottom: none; }
.q-text { font-size: 15px; color: #333; font-weight: 500; margin-bottom: 8px; }
.q-answer { font-size: 14px; color: #52c41a; margin-bottom: 6px; }
.q-analysis { font-size: 14px; color: #666; line-height: 1.7; }
.fanxie-title { font-size: 18px; color: #333; font-weight: bold; margin-bottom: 16px; }
.fanxie-model { background: #f9f9f9; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
.model-label { font-size: 13px; color: #999; margin-bottom: 8px; }
.model-text { font-size: 14px; color: #444; line-height: 1.8; white-space: pre-wrap; }
.fanxie-points { background: #f0f7ff; border-radius: 8px; padding: 16px; }
.points-label { font-size: 13px; color: #1677ff; margin-bottom: 8px; }
.fanxie-points ul { padding-left: 20px; }
.fanxie-points li { font-size: 14px; color: #333; line-height: 1.8; }
.action-bar { text-align: center; }
.action-bar button { padding: 10px 24px; border: 1px solid #ddd; border-radius: 8px;
  background: white; cursor: pointer; }
</style>