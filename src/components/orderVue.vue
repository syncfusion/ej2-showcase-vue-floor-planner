<template>
    <div>
    <ejs-button  id="hideProperty" v-on:click.native="hideElements()" iconCss="sf-icon-properties" isPrimary="true"></ejs-button>
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
   public hideElements(): void {
        var diagramContainer = document.getElementsByClassName('diagrambuilder-container')[0];
        if (diagramContainer.classList.contains('hide-properties')) {
                diagramContainer.classList.remove('hide-properties');
                (document.getElementById('hideProperty') as HTMLButtonElement).style.backgroundColor = '';
                 (document.getElementById('hideProperty') as any).ej2_instances[0].isPrimary = true;
        }
        else {
            diagramContainer.classList.add('hide-properties');
            (document.getElementById('hideProperty') as any).style.backgroundColor = '#e3e3e3';
           (document.getElementById('hideProperty') as any).ej2_instances[0].isPrimary = false;
        }
        if (this.diagram) {
            this.diagram.updateViewPort();
        }
    };
      
}
      
</script>
