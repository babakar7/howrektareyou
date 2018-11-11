<template>
  <div >

  <div class="container mt-2 main-bk" v-bind:class="[{blurclass : donationModal}]">



<div id="header-img" >


  <div class="card text-center ">
  <p class="lead"> Ending Multicoinerism one multiconer at a time</p>

  <p class="lead"> Compare your favorite coin's performance against BTC
  </p>

</div>

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
{{  timeframeselected ?  'Last ' + timeframeselected +
  (timeframeselected == 1 ? '  month' : ' months') : 'Select Time Frame'}}
</button>
<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
<ul class="timeframe">

<li v-on:click="timeframeselected = '1'">
  Last 1 month
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


 <img  class="ticker"  v-bind:src="displayTicker" v-bind:key="assetSelected" />

</transition>

      over the last
    {{timeframeselected}}  {{timeframeselected == 1 ? 'month' : 'months'}}


</div>
<div class="card-body">

  <div class="container">
    <div class="row">

  <!--    <div class="col  transition-background" v-bind:class="{btcresult : valueObject.btc > valueObject.asset}">-->

      <div class="col transition-background" >

          <p>  <img  class="ticker"   id="btc-ticker" src="@/assets/images/tickers/btc.png" /> </p>


          <transition name="fade" mode="out-in">

          <span v-bind:key="valueObject.btc" >{{valueObject.btc | dec}} %  </span>

        </transition>

        <transition name="fade" mode="out-in">

          <img class="arrow" v-bind:src="displayArrow('BTC')" v-bind:key="valueObject.btc"/>


        </transition >


      </div>
      <div class="col">

<transition name="fade" mode="out-in">


<h3 v-bind:key="toWatchforOutcome" id="outcomeMessage" v-html="outcomeMessage"
    v-bind:class="{posoutcome : valueObject.btc > valueObject.asset,
                    negoutcome: valueObject.btc < valueObject.asset }">  </h3>


</transition>

<p style="font-size:18px"> by hodling BTC </p>


<transition name="fade" mode="out-in">

<span v-bind:key="timeframeselected"> over the last {{timeframeselected}}  {{timeframeselected == 1 ? 'month' : 'months'}} </span>

</transition>

      </div>
      <div class="col transition-background " >

        <p>

          <transition name="fade" mode="out-in">

           <img  class="ticker" v-bind:src="displayTicker" id="asset-ticker"  v-bind:key="assetSelected"/>

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

<p>Want to see more coins & features? Consider donating.  </p>
<button class="btn btn-primary">  <span v-on:click="donationModal = !donationModal" style="cursor:pointer"> Donate </span> </button>



</div>

    </div>


<transition name="fade" mode="out-in">

    <div id="donation-modal" v-show="donationModal">

    <p class="text-center">

<button class="btn btn-success">  <a  id="donation-text" href="https://greenaddress.it/en/pay/GA3s4DMRQ5HM9VJbgeVZxqftjMqEEZ/" target="_blank" >
Go to permanent donation URL</a>  </button>


<p class="text-center">
  Or scan the QR code below directly from your wallet
</p>

    </p>
    <div class="text-center" id="qrcode">
      <img src="@/assets/images/frame.png" />

    </div>


    <button v-on:click="donationModal = false" class="btn btn-light text-center closeButton"> Close </button>


  </div>

</transition>





  </div>
</template>

<script>

import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
import {TweenMax} from "gsap/TweenMax";



export default {
  name: 'Home',

  data () {
    return {

      btcPrice:null,
      assetSelected:null,
      timeframeselected:null,
      assetSelectedPrice:{},
      assets: ["BTC", "ETH", "EOS", "LTC"],
      timeFrames: [0, 1, 3, 6],
      percentages:null,
      outcome: null,
      donationModal: false,
      backImg: "'../assets/images/btcwallpaper'"

    }

  },


  methods:{

    displayArrow(asset){

      // handle case where it is 0
      if(this.percentages[asset][this.timeframeselected]>0  ){
        return require('../assets/images/greenup.png')


      }else if (this.percentages[asset][this.timeframeselected] < 0){

        return require('../assets/images/redown.png')

      } else {

        return ''
      }

    },


  },


  computed:{



    outcomeMessage(){

        if(this.outcome > 0){

          return ` ${this.outcome} %  gain  <br />  `

        } else if (this.outcome < 0){

          return `${-this.outcome} % loss <br /> `

        } else if (this.outcome == 0 ) {
          return `BTC & ${this.assetSelected}  <br /> had the same performance as BTC`
        } else {
          return ``
        }
    },

    toWatchforOutcome(){

      // compound compouted property that allows watching when the user has entered all the info
      // so we can then calculate the outcome
      return this.assetSelected + ' ' + this.timeframeselected

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

        var ticker = this.valueObject.btc - this.valueObject.asset > 0 ? document.querySelector('#btc-ticker') : document.querySelector('#asset-ticker')

        this.outcome = this.$options.filters.dec(this.percentages["BTC"][this.timeframeselected] - this.percentages[this.assetSelected][this.timeframeselected])

      }
  },

  created(){

    axios.get('https://howrektapi.herokuapp.com/',  { crossdomain: true })
      .then((res)=>{

          this.assetSelectedPrice = res.data

          this.$store.commit('setAssetPrices', res.data)

          var result = {}

            var pricesArr =  Object.values(this.assetSelectedPrice)

            var keyAssets = Object.keys(this.assetSelectedPrice)

              var asset;


            pricesArr.forEach((asset, index, arr)=>{

                  result[keyAssets[index]] ={}


                  let timeframes = Object.values(asset)

                  let keyTimeframes = Object.keys(asset)

                  timeframes.forEach((timef, ind, arrIn)=>{

                      result[keyAssets[index]][keyTimeframes[ind]] = ((arrIn[0] -timef) / timef)  *100

                  })
            })

              console.log({result})

              this.percentages = result
      })
      .catch((err)=>{
        console.log(err)
      })

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

.transition-background{
  padding: 20px 0px 20px 0px;
  transition: background-color 2s;
}

.btcresult{
  background-color:#87D37C;
}

.assetresult{
  background-color:#87D37C;
}

.card-body{
  padding:0px;
}

#outcomeMessage{
  margin-top: 5%;
}

.posoutcome{
  color:green;
}
.negoutcome{
  color:red;
}

#donation-modal{
  position:absolute;
  width:80%;
  z-index:2;
  top:15%;
  margin-left:10%;
  margin-right:10%;
  background-color: #CDC8C7;
  padding: 20px 0px;
}

.main-bk{
  transition: all 0.5s ease-out;
}

.blurclass{
  opacity:0.4;
  filter: blur(2px);
}

.closeButton{
  margin-left:40%;
  width:200px;
}

#donation-text{
  color:black;
  text-decoration:none;
}

#header-img{
  background-image:url('https://i.postimg.cc/13CSDSWW/btcwallpaper.jpg');
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
}

.ticker{
  margin: 0 10px 0 10px;
}

#qrcode{
  margin-bottom:20px;
}

</style>
