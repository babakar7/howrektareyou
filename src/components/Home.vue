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



<div class="card text-center" v-show="assetSelected && timeframeselected">
<div class="card-header">
  Comparing BTC vs {{assetSelected}} over the last {{timeframeselected}}  {{timeframeselected == 1 ? 'month' : 'months'}}
</div>
<div class="card-body">

  <div class="container">
    <div class="row">
      <div class="col">
          <span> BTC </span>
          <p>{{valueObject.btc | dec}} %</p>
      </div>
      <div class="col">
          <span> REKT LEVEL </span>

          <div class="progress vertical">
  <div class="progress-bar bg-danger progress-bar-info" role="progressbar"
  aria-valuenow="90" aria-valuemin="0"
   aria-valuemax="100" v-bind:style="rektLevel">
 </div>
</div>
      </div>
      <div class="col">
        <span> {{assetSelected}} </span>

      <p>  {{valueObject.asset | dec}} %  </p>

      </div>
    </div>
  </div>

</div>
<div class="card-footer text-muted">
Still a multicoiner?  <a href="https://nakamotoinstitute.org/mempool/" target="_blank">Get help here</a>
</div>
</div>

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
      assetSelectedPrice:{"BTC":{0:6000, 1:7000, 3:7000, 6: 15000},
                "ETH":{0:500, 1:400, 3:700, 6: 600},
              "EOS":{0:10, 1:30, 3:50, 6: 100},
            "LTC":{0:100, 1:300, 3:250, 6: 500}},
      assets: ["BTC", "ETH", "EOS", "LTC"],
      timeFrames: [0, 1, 3, 6],
      percentages:null
    }

  },

  computed:{

      timeRequested(){
        return  moment().subtract(this.timeframeselected, 'months').toISOString()
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




  created(){



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




/*
    let apiKey = "748CCD92-12DC-4CAA-92FB-20D0B1BC050E"

    let endpoint = "https://rest.coinapi.io/"

    this.assets.forEach((asset, index, arr)=>{

      this.assetSelectedPrice[asset] = {}


      this.timeFrames.forEach((timeFrame, indexInn, arrInn)=>{

        let timeFrameRequested = moment().subtract(timeFrame, 'months').toISOString()



        axios({
              url: `${endpoint}v1/exchangerate/${asset}/USD?time=${timeFrameRequested}`,
                        method:'get',
                        headers : {
                            "X-CoinAPI-Key" : apiKey
                        }
                    })
                    .then((response) => {



                        this.assetSelectedPrice[asset][timeFrame] = response.data.rate




                        })
                    .catch(function(error) {
                        console.log(error)
                    });



      })

    })   */




              /*   for (asset in this.assetSelectedPrice){

                   result[asset] = {}

                     for (timeframe in asset){

                        result[asset][timeframe]  =   ((asset[0] - asset[timeframe]) / asset[timeframe])  *100

                        console.log('INNER LOOP')
                     }
                 }

                  console.log(result)*/


/*
        */

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


</style>
