<template>
  <div id="app" >

<Header> </Header>


<transition name="route-tr" mode="out-in">
    <router-view/>

  </transition>



  </div>
</template>

<script>

import Home from '@/components/Home'
import About from '@/components/About'
import Header from '@/components/Header'
import Contribute from '@/components/Contribute'


export default {
  name: 'App',
  components:{
    Home,
    About,
    Header,
    Contribute
  }
}
</script>

<style scoped>

.route-tr-enter-active, .route-tr-leave-active{

  transition: opacity 0.5s ease-in-out;
}

.route-tr-enter, .route-leave-to{
  opacity:0;

}

</style>
