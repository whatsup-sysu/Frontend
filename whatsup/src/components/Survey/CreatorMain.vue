<template>
  <div id="surveyCreator">
    <survey-creator ref='survey_creator'></survey-creator>
  </div>
</template>

<script>
import SurveyCreator from "./SurveyCreator";
import * as SurveyVue from "survey-vue";
import "bootstrap/dist/css/bootstrap.css";
var Survey = SurveyVue.Survey;
Survey.cssType = "bootstrap";

import * as widgets from "surveyjs-widgets";
import "inputmask/dist/inputmask/phone-codes/phone.js";

export default {
  name: "surveyCreatorMain",
  components: {
    SurveyCreator
  }
}
</script>

<style>
#surveyCreator {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
