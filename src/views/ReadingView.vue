<template>
  <div class="reading-view">
    <div class="top-bar">
      <button @click="$router.push('/grade/' + grade)">← 返回</button>
      <span>{{ article.title }}</span>
    </div>
    <div class="content-section">
      <h3>📖 阅读原文</h3>
      <div class="article-body">{{ article.content }}</div>
    </div>
    <div class="question-section">
      <h3>✏️ 阅读练习</h3>
      <div v-for="(q, i) in article.questions" :key="i" class="question-item">
        <p class="q-text">{{ i + 1 }}. {{ q.question }}</p>
        <div class="q-options">
          <label v-for="(opt, oi) in q.options" :key="oi" class="option-label">
            <input type="radio" :name="'q' + i" :value="oi" v-model="answers[i]" />
            {{ opt }}
          </label>
        </div>
      </div>
    </div>
    <div class="action-bar">
      <button class="btn-submit" @click="goAnalysis">查看答案与解析 →</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProgressStore } from '@/stores/progress'
import grade1 from '@/data/articles-grade1.js'
import grade2 from '@/data/articles-grade2.js'
import grade3 from '@/data/articles-grade3.js'
import grade4 from '@/data/articles-grade4.js'
import grade5 from '@/data/articles-grade5.js'
import grade6 from '@/data/articles-grade6.js'

const gradeMap = { 1: grade1, 2: grade2, 3: grade3, 4: grade4, 5: grade5, 6: grade6 }
const route = useRoute()
const router = useRouter()
const store = useProgressStore()

const grade = computed(() => parseInt(route.params.grade))
const idx = computed(() => parseInt(route.params.index))
const articles = computed(() => gradeMap[grade.value] || [])
const article = computed(() => articles.value[idx.value] || { title: '', content: '', questions: [] })
const answers = ref([])

function goAnalysis() {
  store.markRead(grade.value, idx.value)
  router.push('/analysis/' + grade.value + '/' + idx.value)
}
</script>

<style scoped>
.reading-view { max-width: 700px; margin: 0 auto; padding: 30px; }
.top-bar { display: flex; align-items: center; gap: 16px; margin-bottom: 30px; }
.top-bar button { padding: 6px 16px; border: 1px solid #ddd; border-radius: 6px;
  background: white; cursor: pointer; }
.top-bar span { font-size: 16px; color: #333; font-weight: 500; }
.content-section, .question-section { background: white; border-radius: 12px;
  padding: 24px; margin-bottom: 20px; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
h3 { font-size: 16px; color: #333; margin-bottom: 16px; }
.article-body { font-size: 16px; line-height: 2; color: #444; white-space: pre-wrap; }
.question-item { margin-bottom: 24px; }
.q-text { font-size: 15px; color: #333; margin-bottom: 10px; }
.q-options { display: flex; flex-direction: column; gap: 8px; }
.option-label { font-size: 15px; color: #555; cursor: pointer; }
.option-label input { margin-right: 8px; }
.action-bar { text-align: center; }
.btn-submit { padding: 12px 40px; background: #1677ff; color: white;
  border: none; border-radius: 8px; font-size: 16px; cursor: pointer; }
.btn-submit:hover { background: #4096ff; }
</style>