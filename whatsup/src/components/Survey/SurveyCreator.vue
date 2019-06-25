<template>
  <div id="surveyCreatorContainer"></div>
</template>

<script>
import * as SurveyCreator from "survey-creator";
import "survey-creator/survey-creator.css";

import * as SurveyKo from "survey-knockout";
import * as widgets from "surveyjs-widgets";

import "inputmask/dist/inputmask/phone-codes/phone.js";

widgets.icheck(SurveyKo);
widgets.select2(SurveyKo);
widgets.inputmask(SurveyKo);
widgets.jquerybarrating(SurveyKo);
widgets.jqueryuidatepicker(SurveyKo);
widgets.nouislider(SurveyKo);
widgets.select2tagbox(SurveyKo);
widgets.signaturepad(SurveyKo);
widgets.sortablejs(SurveyKo);
widgets.ckeditor(SurveyKo);
widgets.autocomplete(SurveyKo);
widgets.bootstrapslider(SurveyKo);

export default {
  name: "survey-creator",
  data() {
    return {
      content:''
    };
  },
  methods: {

  },
  mounted() {

    let options = {
      // show the embeded survey tab. It is hidden by default
      showEmbededSurveyTab : false,
      // hide the test survey tab. It is shown by default
      showTestSurveyTab : true,
      // hide the JSON text editor tab. It is shown by default
      showJSONEditorTab : true,
      // show the "Options" button menu. It is hidden by default
      showOptions: true
    };
    SurveyCreator.StylesManager.applyTheme("bootstrap");
    this.surveyCreator = new SurveyCreator.SurveyCreator(
      "surveyCreatorContainer",
      options
    );

    let getText = function(){
        return this.text;
    };

    let sendSurvey = function(parent) {
      return function(){
        parent.content = JSON.stringify(getText.call(parent.surveyCreator))
      };
    };

    this.surveyCreator.saveSurveyFunc = sendSurvey(this);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#surveyCreatorContainer{
  text-align: left;
}
</style>
