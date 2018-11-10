<template>
  <div>

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">How Rekt are you ? </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-item nav-link active" href="#">About <span class="sr-only">(current)</span></a>
            <a class="nav-item nav-link" href="#">Contact</a>
            <a class="nav-item nav-link" href="#">Contribute</a>
          </div>

          <span class="navbar-text ml-auto mr-5">BTC: {{btcPrice | usd}}
          </span>
        </div>
      </nav>

      <div class="container mt-2">




  <div class="card text-center ">
  <p class="lead"> Ending Multicoinerism one multiconer at a time</p>

  <p class="lead"> Compare your favorite coin's performance against BTC
  </p>


</div>


<div class="dropdowns-wrapper">


<div class="dropdown drop-assets">
<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
{{assetSelected ?  assetSelected : 'Select asset'}}
</button>
<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
<ul class="asset">
<li v-on:click="assetSelected = 'ETH'">
ETH
</li>

<li v-on:click="assetSelected = 'EOS'">
EOS
</li>
<li v-on:click="assetSelected = 'LTC'">
LTC
</li>
</ul>

</div>
</div>


<div class="dropdown drop-time-frame">
<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
{{  timeframeselected ?  'Last ' + timeframeselected + ' months' : 'Select Time Frame'}}
</button>
<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
<ul class="timeframe">

<li v-on:click="timeframeselected = '1'">
  Last 30 days
</li >
<li v-on:click="timeframeselected = '3'">
  Last 3 months
</li>
<li v-on:click="timeframeselected = '6'">
  Last 6 months
</li>
</ul>
</div>
</div>

</div>


<transition name="fade" mode="out-in">

<div class="card text-center" v-show="assetSelected && timeframeselected">


<div class="card-header">
  Comparing

  <img  class="ticker" src="@/assets/images/tickers/btc.png"  />



 VS

 <transition name="fade" mode="out-in">


 <img  class="ticker" v-bind:src="displayTicker" v-bind:key="assetSelected" />

</transition>

      over the last
    {{timeframeselected}}  {{timeframeselected == 1 ? 'month' : 'months'}}


</div>
<div class="card-body">

  <div class="container">
    <div class="row">
      <div class="col">

          <p>  <img  class="ticker" src="@/assets/images/tickers/btc.png" /> </p>


          <transition name="fade" mode="out-in">

          <span v-bind:key="valueObject.btc" >{{valueObject.btc | dec}} %  </span>

        </transition>

        <transition name="fade" mode="out-in">

          <img class="arrow" v-bind:src="displayArrow('BTC')" v-bind:key="valueObject.btc"/>


        </transition >


      </div>
      <div class="col">
        <!--
          <span> REKT LEVEL </span>

          <div class="progress vertical">
  <div class="progress-bar bg-danger progress-bar-info" role="progressbar"
  aria-valuenow="90" aria-valuemin="0"
   aria-valuemax="100" v-bind:style="rektLevel">
 </div>
</div>
-->

<transition name="fade" mode="out-in">


<h3 v-bind:key="toWatchforOutcome">  {{outcomeMessage}} </h3>




</transition>
      </div>
      <div class="col">

        <p>

          <transition name="fade" mode="out-in">

           <img  class="ticker" v-bind:src="displayTicker"  v-bind:key="assetSelected"/>

         </transition>
          </p>

          <transition name="fade" mode="out-in">

      <span v-bind:key="valueObject.asset">  {{valueObject.asset | dec}} %  </span>

    </transition>


    <transition name="fade" mode="out-in">

      <img v-bind:key="valueObject.asset" class="arrow" v-bind:src="displayArrow(assetSelected?assetSelected:'ETH')"/>

    </transition>

      </div>
    </div>
  </div>

</div>
<div class="card-footer text-muted">
Still a multicoiner?  <a href="https://nakamotoinstitute.org/mempool/" target="_blank">Get help here</a>
</div>
</div>

</transition>

<div v-show="assetSelected && timeframeselected">
  <span> How was this calulated? </span>

</div>



    </div>


  </div>
</template>

<script>

import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'

export default {
  name: 'Home',

  data () {
    return {

      btcPrice:null,
      assetSelected:null,
      timeframeselected:null,
      assetSelectedPrice:{"BTC":{0:6000, 1:5000, 3:7000, 6: 15000},
                "ETH":{0:500, 1:400, 3:700, 6: 600},
              "EOS":{0:10, 1:30, 3:50, 6: 100},
            "LTC":{0:100, 1:300, 3:250, 6: 500}},
      assets: ["BTC", "ETH", "EOS", "LTC"],
      timeFrames: [0, 1, 3, 6],
      percentages:null,
      outcome: null
    }

  },


  methods:{


    displayArrow(asset){

      // handle case where it is 0
      if(this.percentages[asset][this.timeframeselected]>0  ){
        return require('../assets/images/greenup.png')


      }else{

        return require('../assets/images/redown.jpeg')

      }





    },


  },


  computed:{


    outcomeMessage(){




        if(this.outcome > 0){



          return `You would have gained  ${this.outcome} %  by holding BTC vs ${this.assetSelected} !`
        } else if (this.outcome < 0){

          return `You would have lost  ${-this.outcome} %  by holding BTC vs ${this.assetSelected}`

        } else {
          return `BTC & ${this.assetSelected} had the same performance as BTC`
        }
    },

    toWatchforOutcome(){

      // compound compouted property that allows watching when the user has entered all the info
      // so we can then calculate the outcome
      return this.assetSelected + this.timeframeselected

    },


      timeRequested(){
        return  moment().subtract(this.timeframeselected, 'months').toISOString()
      },


          displayTicker(){

              if(this.assetSelected){
                return require(`../assets/images/tickers/${this.assetSelected.toLowerCase()}.png`)

              } else {
                return ""
              }


          },


      valueObject(){


           if(this.assetSelected !== null){
             let shitcoinResult = this.percentages[this.assetSelected][this.timeframeselected]
             let btcResult = this.percentages['BTC'][this.timeframeselected]

              let result = {btc: btcResult , asset: shitcoinResult }
             return result

           } else {
             return {}
           }
      },


      rektLevel(){

         if( this.valueObject.btc > this.valueObject.asset ){

           return {width:100 + '%'};

         }else {

           return {width:0 + '%'};
         }


      },




  },

  watch:{

      toWatchforOutcome(){

        console.log('watch is called')

        // check if user has seleted asset & timeframe

          this.outcome = this.$options.filters.dec(this.percentages["BTC"][this.timeframeselected] - this.percentages[this.assetSelected][this.timeframeselected])



      }
  },




  created(){



    axios.get('https://howrektapi.herokuapp.com/',  { crossdomain: true })
      .then((res)=>{
          console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })

        var result = {}


          var pricesArr =  Object.values(this.assetSelectedPrice)

          var keyAssets = Object.keys(this.assetSelectedPrice)

            var asset;


          pricesArr.forEach((asset, index, arr)=>{

                result[keyAssets[index]] ={}


                let timeframes = Object.values(asset)

                let keyTimeframes = Object.keys(asset)
              //  console.log(timeframes)


                timeframes.forEach((timef, ind, arrIn)=>{

                    result[keyAssets[index]][keyTimeframes[ind]] = ((arrIn[0] -timef) / timef)  *100



                })
          })

            console.log({result})

            this.percentages = result


        }

  }
</script>


<style>

.asset, .timeframe{
  list-style:none;
  cursor:pointer;
}


.content{
  margin-top:50px;
}


.drop-assets{
  display:inline-block;
  margin-right:10px;

}

.drop-time-frame{
  display:inline-block;

}


.dropdowns-wrapper{
  padding-left:35%;
  padding-top:50px;
  margin-bottom:30px;

}

.arrow{

  height:45px;
  width:35px;
  margin-left:5px;

}

.ticker{
  height:50px;
  width:50px;
}

.fade-enter-active, .fade-leave-active{
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to{
  opacity: 0;
}


</style>
