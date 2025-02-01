import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import NextView from "./views/NextView.vue";
import GitHubView from "./views/GitHubView.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/next',
    name: 'Next',
    component: NextView
  },
  {
    path: '/github',
    name: 'GitHub',
    component: GitHubView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router