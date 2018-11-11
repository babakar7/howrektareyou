import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Contribute from '@/components/Contribute'

Vue.use(Router)

export default new Router({

  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {

      path:'/about',
      name:'About',
      component: About
    },

    {

      path:'/contribute',
      name:'Contribute',
      component: Contribute
    }
  ]
})
