import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/views/Home';
import Leaderboard from '@/components/views/Leaderboard';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/leaderboard/',
      name: 'Leaderboard',
      component: Leaderboard,
    },
  ],
});
