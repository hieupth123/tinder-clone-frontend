import { createRouter, createWebHistory } from 'vue-router'
import Liked from '@/views/Liked'
import Discover from '@/views/Discover'
import Matches from '@/views/Matches'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
          path: '/liked',
          name: 'Liked',
          component: Liked
        }, {
          path: '/',
          name: 'Discover',
          component: Discover
        }, {
          path: '/matches',
          name: 'Matches',
          component: Matches
        }
      ],
})

export default router