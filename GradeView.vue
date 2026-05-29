<template>
  <div class="grade-view">
    <div class="top-bar">
      <button @click="$router.push('/')">← 返回</button>
      <h2>{{ grade }}年级 · 阅读篇目</h2>
      <span class="count">已读 {{ readCount }}/{{ total }} 篇</span>
    </div>
    <div class="article-list">
      <div
        v-for="(article, i) in articles"
        :key="i"
        class="article-item"
        :class="{ read: isRead(grade, i) }"
        @click="$router.push('/read/' + grade + '/' + i)"
      >
        <div class="article-info">
          <span class="article-title">{{ article.title }}</span>
          <span class="article-unit">{{ article.unit }}</span>
        </div>
        <div class="article-status">
          <span v-if="isRead(grade, i)" class="badge-done">✓ 已读</span>
          <span v-else class="badge-new">未读</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProgressStore } from '@/stores/progress'
import grade1 from '@/data/articles-grade1.js'
import grade2 from '@/data/articles-grade2.js'
import grade3 from '@/data/articles-grade3.js'
import grade4 from '@/data/articles-grade4.js'
import grade5 from '@/data/articles-grade5.js'
import grade6 from '@/data/articles-grade6.js'

const gradeMap = { 1: grade1, 2: grade2, 3: grade3, 4: grade4, 5: grade5, 6: grade6 }
const route = useRoute()
const store = useProgressStore()

const grade = computed(() => parseInt(route.params.grade))
const articles = computed(() => gradeMap[grade.value] || [])
const total = computed(() => articles.value.length)
const readCount = computed(() => store.getReadCount(grade.value))
const isRead = store.isRead
</script>

<style scoped>
.grade-view { max-width: 700px; margin: 0 auto; padding: 30px; }
.top-bar { display: flex; align-items: center; gap: 16px; margin-bottom: 30px; }
.top-bar button { padding: 6px 16px; border: 1px solid #ddd; border-radius: 6px;
  background: white; cursor: pointer; }
.top-bar h2 { flex: 1; font-size: 20px; color: #333; }
.count { color: #999; font-size: 14px; }
.article-list { display: flex; flex-direction: column; gap: 12px; }
.article-item { display: flex; align-items: center; padding: 16px 20px;
  background: white; border-radius: 10px; cursor: pointer;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05); transition: transform 0.15s; }
.article-item:hover { transform: translateX(4px); }
.article-item.read { opacity: 0.7; }
.article-info { flex: 1; }
.article-title { font-size: 16px; color: #333; font-weight: 500; display: block; }
.article-unit { font-size: 13px; color: #999; }
.badge-done { font-size: 13px; color: #52c41a; }
.badge-new { font-size: 13px; color: #1677ff; }
</style>