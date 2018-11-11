<template>


  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <router-link to="/">  <a class="navbar-brand" style="color:black; text-decoration:none">howrektareyou.com </a>  </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">


        <router-link to="/about"> <a class="nav-item nav-link ">About <span class="sr-only">(current)</span></a>
</router-link>



      <router-link to="/contribute"> <a class="nav-item nav-link" href="#">Contribute</a>  </router-link>


      </div>


      <span style="color:black" class="navbar-text ml-auto mr-auto">Bitcoin Price: $ {{  $store.state.assetSelectedPrice ?  $store.state.assetSelectedPrice["BTC"][0]  : 'fetching data'  | dec}}
      </span>
    </div>
  </nav>
</template>


<script>

export default {

  data(){

    return {

    }
  }
}


</script>



<style scoped >


</style>
