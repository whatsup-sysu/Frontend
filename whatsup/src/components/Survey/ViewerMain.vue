<template>

  <div id="surveyCreator">
    <!-- <survey-viewer :surveyData="surveyData" ></survey-viewer> -->
  </div>
</template>

<script>
import SurveyViewer from "./SurveyViewer";
import * as SurveyVue from "survey-vue";
import "bootstrap/dist/css/bootstrap.css";
var Survey = SurveyVue.Survey;
Survey.cssType = "bootstrap";

import * as widgets from "surveyjs-widgets";
import "inputmask/dist/inputmask/phone-codes/phone.js";

export default {
  name: "surveyViewerMain",
  components: {
    SurveyViewer
  },
  data(){
    this.$http.get('/api/test/showSurvey').then(function(response){
        this.$router.push({  
            path: '/Survey',   
            name: 'Survey',  
            params: {   
                data: response.data["survey"]
            }  
        });
    }, function(response){
      this.$router.push({  
            path: '/Survey',   
            name: 'Survey',  
            params: {   
                data: "{}"
            }  
        });
    });
    return {

    };
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>