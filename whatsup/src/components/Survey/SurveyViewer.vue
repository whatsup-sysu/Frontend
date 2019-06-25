<template>
  <div id="surveyViewer">
    <survey :survey="survey"></survey>
  </div>
</template>

<script>
import * as SurveyVue from "survey-vue";
import "bootstrap/dist/css/bootstrap.css";
var Survey = SurveyVue.Survey;
Survey.cssType = "bootstrap";

import * as widgets from "surveyjs-widgets";
import "inputmask/dist/inputmask/phone-codes/phone.js";

export default {
  name: "survey-viewer",
  props:['writable','initPage', 'taskId','answer'],
  components: {
    Survey
  },
  beforeCreate() {
      this.surveyData = this.$route.params.surveyData
  },
  data(){
    var _this = this;
    SurveyVue.StylesManager.applyTheme("bootstrapmaterial");
    this.model = new SurveyVue.Model(JSON.parse(this.surveyData));

    if(this.writable){
      this.model.mode = "";
    }
    else{
      this.model.mode = "display";
    }
    this.model.onComplete.add(function(survey){
      var requestForm = {did:_this.taskId, answer:JSON.stringify(survey.data)};
      _this.$http.post('/api/survey/data', requestForm).then(function(response){
          _this.initPage()
          console.log(response)
        }, function(response){
          console.log(response)
        });
    });
    return {
      survey: this.model
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
