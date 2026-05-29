import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import GradeView from '@/views/GradeView.vue'
import ReadingView from '@/views/ReadingView.vue'
import AnalysisView from '@/views/AnalysisView.vue'
import StatsView from '@/views/StatsView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/grade/:grade', component: GradeView },
  { path: '/read/:grade/:index', component: ReadingView },
  { path: '/analysis/:grade/:index', component: AnalysisView },
  { path: '/stats', component: StatsView }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router