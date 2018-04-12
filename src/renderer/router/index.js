import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: require('@/views/Home').default,
    // },
    {
      path: '/',
      name: 'editor',
      component: require('@/views/Editor').default,
    },
    {
      path: '/export',
      name: 'export',
      component: require('@/views/Export').default,
    },
    {
      path: '/share',
      name: 'share',
      component: require('@/views/Share').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
