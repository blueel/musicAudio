import Vue from 'vue'
import VueRouter from 'vue-router'
import discovery from '../components/discovery.vue'
import list from '../components/list.vue'
import songs from '../components/songs.vue'
import mvs from '../components/mvs.vue'
import result from '../components/result.vue'
import playlist from '../components/playlist.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/discovery'
  },
  {
    path: '/discovery',
    component: discovery
  },
  {
    path: '/list',
    component: list
  },
  {
    path: '/songs',
    component: songs
  },
  {
    path: '/mvs',
    component: mvs
  },
  {
    path: '/result',
    component: result
  },
  {
    path: '/playlist',
    component: playlist
  }
]

const router = new VueRouter({
  routes
})

export default router
