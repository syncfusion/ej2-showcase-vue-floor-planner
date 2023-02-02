<template>
    <div>
    <ejs-dropdownbutton id="btnZoomIncrement" :items="menuItems" v-on:select="zoomChange($event)"  :content="selectedItem.scrollSettings.currentZoom"></ejs-dropdownbutton>
    </div>
</template>
<script lang="ts" > 
import {
  DiagramComponent,
  MindMap as MindMapTree,
  ZoomOptions,
} from "@syncfusion/ej2-vue-diagrams";
import {
  Diagram,
DiagramPlugin,
} from "@syncfusion/ej2-vue-diagrams";
import {
  DropDownButtonComponent,
  DropDownButtonPlugin,
  ItemModel,
} from "@syncfusion/ej2-vue-splitbuttons";
import {
  MenuEventArgs,
} from "@syncfusion/ej2-vue-splitbuttons";
import { ToolbarComponent, ToolbarPlugin } from "@syncfusion/ej2-vue-navigations";
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { SelectorViewModel } from "../app/scripts/selector";
Vue.use(DropDownButtonPlugin);
Vue.use(ToolbarPlugin);
Vue.component(ToolbarPlugin.name, ToolbarComponent);
Vue.use(DropDownListPlugin,DropDownButtonComponent);
Vue.use(DiagramPlugin);



import { Component, Vue } from "vue-property-decorator";
import App from "../App.vue"


@Component({
  provide: {
    diagram: [Diagram]
  },
})
export default class User extends Vue {
    
public diagram: DiagramComponent;
public selectedItem: SelectorViewModel = new SelectorViewModel();
mounted() {
        window.addEventListener("load", this.onWindowLoad);
    }
 public onWindowLoad() {
    let diagramObj: any = document.getElementById("diagram");
    this.diagram = diagramObj.ej2_instances[0];
    let selectedItems: any = document.getElementById("diagram");
    this.selectedItem.diagram = selectedItems.ej2_instances[0];
   
 }
public  menuItems: ItemModel[]=[
          { text: 'Zoom In' }, { text: 'Zoom Out' }, { text: 'Zoom to Fit' }, { text: 'Zoom to 50%' },
        { text: 'Zoom to 100%' }, {text: 'Zoom to 200%'}
         
      ]
 public zoomChange(args: MenuEventArgs): void {
        let diagram :Diagram= this.selectedItem.diagram || (document.getElementById("diagram") as any).ej2_instances[0];
        let zoomCurrentValue = (document.getElementById("btnZoomIncrement") as any).ej2_instances[0];
       let currentZoom: any = diagram.scrollSettings.currentZoom;
      let zoom :any= {};
      switch (args.item.text) {
          case 'Zoom In':
              diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
              zoomCurrentValue.content = ((diagram as any).scrollSettings.currentZoom * 100).toFixed() + '%';
              break;
          case 'Zoom Out':
              diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
              zoomCurrentValue.content = ((diagram as any).scrollSettings.currentZoom * 100).toFixed() + '%';
              break;
          case 'Zoom to Fit':
              diagram.fitToPage({ mode: 'Page', region: 'Content'});
              zoomCurrentValue.content = diagram.scrollSettings.currentZoom;
              break;
          case 'Zoom to 50%':
              zoom.zoomFactor = (0.5 / currentZoom) - 1;
              diagram.zoomTo(zoom);
              break;
          case 'Zoom to 100%':
              zoom.zoomFactor = (1 / currentZoom) - 1;
              diagram.zoomTo(zoom);
              break;
          case 'Zoom to 200%':
              zoom.zoomFactor = (2 / currentZoom) - 1;
              diagram.zoomTo(zoom);
              break;
      }
    
      zoomCurrentValue.content = Math.round((diagram as any).scrollSettings.currentZoom*100) + ' %';
      
}
}
      
</script>
