<template>
  <div>
     <ejs-dropdownList
        dataSource="dropDownDataSources.borderStyles" :itemTemplate="itemTemplate"
      ></ejs-dropdownList>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { DropDownDataSources } from "../app/scripts/dropdowndatasource";
Vue.use(DropDownListPlugin);

let itemVue = Vue.component("itemTemplate", {
  template: `<span><span class='db-ddl-template-style'>{{data.className}}</span></span>`,
  data() {
    return {
      data: {},
    };
  },
});

export default class User extends Vue {
      public dropDownDataSources: DropDownDataSources = new DropDownDataSources();
  
      
      public itemTemplate (){
        return {
          template: itemVue,
        };
      }
};
</script>
