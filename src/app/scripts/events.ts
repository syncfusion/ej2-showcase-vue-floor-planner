import { SelectorViewModel } from "./selector";
import {
    IDraggingEventArgs, ISizeChangeEventArgs, IRotationEventArgs,
    ISelectionChangeEventArgs, IDragEnterEventArgs, Diagram, Node, Connector,
    ShapeAnnotationModel, TextAlign, HorizontalAlignment, VerticalAlignment, IHistoryChangeArgs, TextStyleModel,
    PathAnnotationModel, ShapeAnnotation, PathAnnotation, AnnotationAlignment, SelectorModel, ContextMenuItemModel
} from "@syncfusion/ej2-diagrams";
import { ChangeEventArgs as DropDownChangeEventArgs } from "@syncfusion/ej2-dropdowns";
import { ChangeEventArgs as NumericChangeEventArgs, ColorPickerEventArgs } from "@syncfusion/ej2-inputs";
import { ChangeEventArgs as CheckBoxChangeEventArgs  } from "@syncfusion/ej2-buttons";
import { ClickEventArgs as ToolbarClickEventArgs } from "@syncfusion/ej2-navigations";
import { DropDownListComponent } from "@syncfusion/ej2-vue-dropdowns";
import { DiagramComponent } from "@syncfusion/ej2-vue-diagrams";
import { ToolbarComponent } from "@syncfusion/ej2-vue-navigations";

export class DiagramClientSideEvents {
    private selectedItem: SelectorViewModel; 
    public diagram: DiagramComponent ;
    public toolbarEditor: ToolbarComponent | undefined;
    public ddlTextPosition: DropDownListComponent ;
    constructor(selectedItem: SelectorViewModel) {
        this.selectedItem = selectedItem;
    }

    // Handles changes in the selection of diagram items, updating toolbar and UI
    public selectionChange(args: ISelectionChangeEventArgs): void { 
        let toolbarEditor: any = (document.getElementById("toolbarEditor") as any).ej2_instances[0];
        if (this.selectedItem.preventSelectionChange || this.selectedItem.isLoading) {
            return;
        }
        if (args.state === "Changed") {
            let selectedItems: Object[] = (this.selectedItem as any).diagram.selectedItems.nodes;
            selectedItems = selectedItems.concat((this.selectedItem as any).diagram.selectedItems.connectors);
            this.selectedItem.utilityMethods.enableToolbarItems(selectedItems);
                let nodeContainer: HTMLElement | null = document.getElementById("nodePropertyContainer");
                (nodeContainer as HTMLElement).classList.remove("multiple");
                (nodeContainer as HTMLElement).classList.remove("connector");
                if (selectedItems.length > 1) {
                    this.multipleSelectionSettings(selectedItems);
                    (toolbarEditor as any).items[7].tooltipText = 'Group';
                    (toolbarEditor as any).items[7].prefixIcon = 'sf-icon-group'; 
                    for(var i =7;i<=28;i++){
                        (toolbarEditor as any).items[i].visible = true;
                    } 
                } else if (selectedItems.length === 1) {
                    this.singleSelectionSettings(selectedItems[0]);
                    for(var i=7;i<=28;i++){
                        if(i<=16)
                        {
                            (toolbarEditor as any).items[i].visible = false;
                        }
                        else{
                            (toolbarEditor as any).items[i].visible = true;
    
                        }
                    }
                    if((selectedItems as any )[0].children && (selectedItems as any)[0].children.length>0)
                              {
                                (toolbarEditor as any).items[7].tooltipText = 'UnGroup';
                                (toolbarEditor as any).items[7].prefixIcon = 'sf-icon-ungroup';
                                (toolbarEditor as any).items[7].visible = true;
                              }
                } else {
                    this.selectedItem.utilityMethods.objectTypeChange("diagram");
                    for(var i =7;i<=28;i++){
                        (toolbarEditor as any).items[i].visible = false;
                    } 
                }
        }
    }
    
    // Configures UI for multiple selected diagram items, showing appropriate panels
    private multipleSelectionSettings(selectedItems: Object[]): void {
        this.selectedItem.utilityMethods.objectTypeChange("None");
        let showConnectorPanel: boolean = false, showNodePanel: boolean = false;
        let showTextPanel: boolean = false, showConTextPanel: boolean = false;
        let nodeContainer: HTMLElement | null = document.getElementById("nodePropertyContainer");
        for (let i: number = 0; i < selectedItems.length; i++) {
            let object: Object = selectedItems[i];
            if (object instanceof Node && (!showNodePanel || !showTextPanel)) {
                showNodePanel = true;
                showTextPanel = object.annotations.length > 0 && object.annotations[0].content ? true : false;
            } else if (object instanceof Connector && (!showConnectorPanel || !showConTextPanel)) {
                showConnectorPanel = true;
                showConTextPanel = object.annotations.length > 0 && object.annotations[0].content ? true : false;
            }
        }
        let selectItem1: SelectorModel = (this.selectedItem as any).diagram.selectedItems;
        if (showNodePanel) {
            (nodeContainer as any).style.display = "";
            (nodeContainer as any).classList.add("multiple");
            if (showConnectorPanel) {
                (nodeContainer as any).classList.add("connector");
            }
            this.selectedItem.utilityMethods.bindNodeProperties((selectItem1 as any).nodes[0], this.selectedItem);
        }
        if (showConnectorPanel && !showNodePanel) {
            (document.getElementById("connectorPropertyContainer") as any).style.display = "";
            this.selectedItem.utilityMethods.bindConnectorProperties((selectItem1 as any).connectors[0], this.selectedItem);
        }
        if (showTextPanel || showConTextPanel) {
            (document.getElementById("textPropertyContainer") as any).style.display = "";
            if (showTextPanel && showConTextPanel) {
                (document.getElementById("textPositionDiv") as any).style.display = "none";
                (document.getElementById("textColorDiv") as any).className = "col-xs-6 db-col-left";
            } else {
                (document.getElementById("textPositionDiv") as any).style.display = "";
                (document.getElementById("textColorDiv") as any).className = "col-xs-6 db-col-right";
                if (showConTextPanel) {
                    (this.ddlTextPosition as any).dataSource = this.selectedItem.textProperties.getConnectorTextPositions(); 
                } else {
                    (this.ddlTextPosition as any).dataSource = this.selectedItem.textProperties.getNodeTextPositions(); 
                }
                (this.ddlTextPosition as any).dataBind();
            }
        }
    }

    // Configures toolbar for scenarios where multiple items are selected
    public multipleSelection(): void
    {
      for(let i=8;i<33;i++)
      {
          if((this.toolbarEditor as any).items[i].type !=='Separator'){
              if(i !== 32 &&  i !== 33){
                (this.toolbarEditor as any).items[i].template= '';
              }
              if(i == 32 || i == 33)
              {
                (this.toolbarEditor as any).items[i].template= '<div></div>';
              }
          }
      }
    }

     // Sets properties for a single selected diagram item, handling nodes and connectors.
    private singleSelectionSettings(selectedObject: Object): void {
        let object: Node | Connector  = undefined as unknown as Node;
        if (selectedObject instanceof Node) {
            this.selectedItem.utilityMethods.objectTypeChange("node");
            object = selectedObject as Node;
            this.selectedItem.utilityMethods.bindNodeProperties(object, this.selectedItem);
        } else if (selectedObject instanceof Connector) {
            this.selectedItem.utilityMethods.objectTypeChange("connector");
            object = selectedObject as Connector;
            this.selectedItem.utilityMethods.bindConnectorProperties(object, this.selectedItem);
        }
        if (object.shape && object.shape.type === "Text") {
            (document.getElementById("textPropertyContainer") as any).style.display = "";
            (document.getElementById("toolbarTextAlignmentDiv") as any).style.display = "none";
            (document.getElementById("textPositionDiv") as any).style.display = "none";
            (document.getElementById("textColorDiv") as any).className = "col-xs-6 db-col-left";
            this.selectedItem.utilityMethods.bindTextProperties(object.style, this.selectedItem);
        } else if (object.annotations.length > 0 && object.annotations[0].content) {
            (document.getElementById("textPropertyContainer") as any).style.display = "";
            let annotation: ShapeAnnotation | PathAnnotation;
            (document.getElementById("toolbarTextAlignmentDiv") as any).style.display = "";
            (document.getElementById("textPositionDiv") as any).style.display = "";
            (document.getElementById("textColorDiv") as any).className = "col-xs-6 db-col-right";
            this.selectedItem.utilityMethods.bindTextProperties((object as any).annotations[0].style, this.selectedItem);
            this.selectedItem.utilityMethods.updateHorVertAlign((object as any).annotations[0].horizontalAlignment, (object as any).annotations[0].verticalAlignment);
            if (object.annotations[0] instanceof ShapeAnnotation) {
                annotation = object.annotations[0] as ShapeAnnotation;
                (this.ddlTextPosition as any).dataSource = this.selectedItem.textProperties.getNodeTextPositions();
                (this.ddlTextPosition as any).value = (this.selectedItem as any).textProperties.textPosition = null;
                (this.ddlTextPosition as any).dataBind();
                (this.ddlTextPosition as any).value = this.selectedItem.textProperties.textPosition = this.selectedItem.utilityMethods.getPosition(annotation.offset);
                (this.ddlTextPosition as any).dataBind();
            } else if (object.annotations[0] instanceof PathAnnotation) {
                annotation = object.annotations[0] as PathAnnotation;
                (this.ddlTextPosition as any).dataSource = this.selectedItem.textProperties.getConnectorTextPositions();
                (this.ddlTextPosition as any).value = (this.selectedItem as any).textProperties.textPosition = null;
                (this.ddlTextPosition as any).dataBind();
                (this.ddlTextPosition as any).value = this.selectedItem.textProperties.textPosition = annotation.alignment;
                (this.ddlTextPosition as any).dataBind();
            }
        }
    }

    public created(){
        let diagram: Diagram = (document.getElementById("diagram") as any).ej2_instances[0];
        diagram.fitToPage({ mode: 'Page', region: 'Content' });
    }

    // Updates node properties when its position changes in the diagram
    public nodePositionChange(args: IDraggingEventArgs): void {
        this.selectedItem.preventPropertyChange = true;
        this.selectedItem.nodeProperties.offsetX = (Math.round((args as any).newValue.offsetX * 100) / 100);
        this.selectedItem.nodeProperties.offsetY = (Math.round((args as any).newValue.offsetY * 100) / 100);
        if (args.state === "Completed") {
            this.selectedItem.isModified = true;
            this.selectedItem.preventPropertyChange = false;
        }
    }

     // Updates node properties when its size changes in the diagram
    public nodeSizeChange(args: ISizeChangeEventArgs): void {
        this.selectedItem.preventPropertyChange = true;
        this.selectedItem.nodeProperties.width = (Math.round((args as any).newValue.width * 100) / 100);
        this.selectedItem.nodeProperties.height = (Math.round((args as any).newValue.height * 100) / 100);
        if (args.state === "Completed") {
            this.selectedItem.isModified = true;
            this.selectedItem.preventPropertyChange = false;
        }
    }

    // Updates node properties when its rotation angle changes in the diagram
    public nodeRotationChange(args: IRotationEventArgs): void {
        this.selectedItem.preventPropertyChange = true;
        this.selectedItem.nodeProperties.rotateAngle = (Math.round((args as any).newValue.rotateAngle * 100) / 100);
        this.selectedItem.preventPropertyChange = false;
        if (args.state === "Completed") {
            this.selectedItem.isModified = true;
        }
    }

    // Marks the diagram as modified when the selection changes
    public collectionChange(args: ISelectionChangeEventArgs): void {
        if (args.state === 'Changed') {
            this.selectedItem.isModified = true;
        }
    }

    // Adjusts size parameters of elements when they are dragged into the diagram
    public dragEnter(args: IDragEnterEventArgs): void { 
        if((args.element as any).id.indexOf('Doorclose')!== -1 )
        {
            (args.element as any).width = 40;
            (args.element as any).height = 42;
        }
        else if((args.element as any).id.indexOf('Doubledoorclose')!== -1 ){
            (args.element as any).width = 80;
            (args.element as any).height = 42;
        }
        else if((args.element as any).id.indexOf('CircleDiningTable')!== -1){
            (args.element as any).width = 50;
            (args.element as any).height = 50;
        }
        else if((args.element as any).id.indexOf('CircleStudyTable')!== -1  || (args.element as any).id.indexOf('CircleStudyTable1')!== -1 || (args.element as any).id.indexOf('CircleStudyTable2')!== -1 ||(args.element as any).id.indexOf('CircleStudyTable3')!== -1 )
        {
            (args.element as any).width = 40;
            (args.element as any).height =40;
        }
        else if((args.element as any).id.indexOf('RectangleDiningTable')!== -1 ){
            (args.element as any).width = 50;
            (args.element as any).height = 50;
        }
        else if((args.element as any).id.indexOf('OblongDiningTable')!== -1 || (args.element as any).id.indexOf('OvalDiningTable')!== -1)
        {
            (args.element as any).width = 90;
            (args.element as any).height = 50;
        }
        else if((args.element as any).id.indexOf('RectangularTableforTwo')!== -1 || (args.element as any).id.indexOf('CircularTableforTwo')!== -1)
        {
            (args.element as any).width = 50;
            (args.element as any).height = 60;
        }
        else if((args.element as any).id.indexOf('RectangleStudyTable')!== -1 || (args.element as any).id.indexOf('RectangleStudyTable1')!== -1 )
        {
            (args.element as any).width = 80;
            (args.element as any).height = 40;
        }
        else if((args.element as any).id.indexOf('Refrigerator')!== -1 )
        {
            (args.element as any).width = 52;
            (args.element as any).height = 60;
        }
        else if((args.element as any).id.indexOf('Stool')!== -1){
            (args.element as any).width = 23;
            (args.element as any).height = 23;
        }
        else if( (args.element as any).id.indexOf('WallCorner')!== -1  || (args.element as any).id.indexOf('WallCorner1')!== -1 ){
            (args.element as any).width = 50;
            (args.element as any).height = 50;
        }
        else if((args.element as any).id.indexOf('WaterCooler')!== -1 || (args.element as any).id.indexOf('Elevator')!== -1 )
        {
            (args.element as any).width = 40;
            (args.element as any).height = 40;
        }
        else if((args.element as any).id.indexOf('Chair1')!== -1){
            (args.element as any).width = 25;
            (args.element as any).height = 25;
        }
        else if((args.element as any).id.indexOf('Chair')!== -1 ||(args.element as any).id.indexOf('LargePlant')!== -1 )
        {
            (args.element as any).width = 28;
            (args.element as any).height =32;
        }
        else if((args.element as any).id.indexOf('Doublebed')!== -1 || (args.element as any).id.indexOf('Doublebed1')!== -1)
        {
            (args.element as any).width = 100;
            (args.element as any).height =90;
        }
        else if((args.element as any).id.indexOf('Singlebed')!== -1 || (args.element as any).id.indexOf('Singlebed1')!== -1)
        {
            (args.element as any).width = 50;
            (args.element as any).height = 90;
        }
        else if((args.element as any).id.indexOf('BookCase')!== -1 )
        {
            (args.element as any).width = 60;
            (args.element as any).height =20;
        }
        else if((args.element as any).id.indexOf('Warddrobe')!== -1 ||(args.element as any).id.indexOf('Warddrobe1')!== -1){
            (args.element as any).width = 73;
            (args.element as any).height = 35;
        }
        else if((args.element as any).id.indexOf('SmallPlant')!== -1 ||(args.element as any).id.indexOf('Lamplight')!== -1)
        {
            (args.element as any).width = 25;
            (args.element as any).height =25;
        }
        else if((args.element as any).id.indexOf('Matte')!== -1 || (args.element as any).id.indexOf('Matte1')!== -1)
        {
            (args.element as any).width = 40;
            (args.element as any).height =20;
        }
        else if((args.element as any).id.indexOf('FlatTV')!== -1 || (args.element as any).id.indexOf('FlatTV1')!== -1)
        {
            (args.element as any).width = 68;
            (args.element as any).height =10;
        }
        else if((args.element as any).id.indexOf('TV')!== -1)
        {
            (args.element as any).width = 40;
            (args.element as any).height =25;
        }
        else if((args.element as any).id.indexOf('SingleSofa')!== -1|| (args.element as any).id.indexOf('Couch')!== -1 )
        {
            (args.element as any).width = 45;
            (args.element as any).height = 40;
        }
        else if((args.element as any).id.indexOf('Sofa')!== -1 || (args.element as any).id.indexOf('DoubleSofa')!== -1 ||(args.element as any).id.indexOf('Lounge')!== -1)
        {
            (args.element as any).width = 100;
            (args.element as any).height =35;
        }
        else if((args.element as any).id.indexOf('WindowGarden')!== -1 )
        {
            (args.element as any).width = 80;
            (args.element as any).height = 18;
        }
        else if((args.element as any).id.indexOf('SmallGasRange')!== -1){
            (args.element as any).width = 70;
            (args.element as any).height = 32;
        }
        else if((args.element as any).id.indexOf('LargeGasRange')!== -1 || (args.element as any).id.indexOf('LargeGasRange1')!== -1){
            (args.element as any).width = 100;
            (args.element as any).height = 32;
        }
        else if( (args.element as any).id.indexOf('Window')!== -1||(args.element as any).id.indexOf('window1')!== -1 )
        {
            (args.element as any).width = 50;
            (args.element as any).height =6;
        }
        
        else if((args.element as any).id.indexOf('Piano')!== -1)
        {
            (args.element as any).width = 68;
            (args.element as any).height = 71;
        }
        else if((args.element as any).id.indexOf('Staircase')!== -1 || (args.element as any).id.indexOf('Staircase1')!== -1 ||(args.element as any).id.indexOf('Staircase2')!== -1){
            (args.element as any).width = 150;
            (args.element as any).height = 50;
        }
        else if( (args.element as any).id.indexOf('Printer')!== -1 ||(args.element as any).id.indexOf('Laptop')!== -1 )
        {
            (args.element as any).width = 30;
            (args.element as any).height =30;
        }
        else if( (args.element as any).id.indexOf('Room')!== -1 || (args.element as any).id.indexOf('TRoom')!== -1 ||(args.element as any).id.indexOf('LRoom')!== -1  || (args.element as any).id.indexOf('TWall')!== -1 )
        {
            (args.element as any).width = 100;
            (args.element as any).height =100;
        }
        else if((args.element as any).id.indexOf('DoubleSink')!== -1 || (args.element as any).id.indexOf('DoubleSink1')!== -1|| (args.element as any).id.indexOf('DoubleSink2')!== -1|| (args.element as any).id.indexOf('DoubleSink4')!== -1  ){
            (args.element as any).width = 76;
            (args.element as any).height =38;
        } 
        else if( (args.element as any).id.indexOf('Toilet1')!== -1 || (args.element as any).id.indexOf('Toilet2')!== -1 )
        {
            (args.element as any).width = 23;
            (args.element as any).height =36;
        }
        else if((args.element as any).id.indexOf('CornerShower')!== -1  ||(args.element as any).id.indexOf('Shower')!== -1 ){
            (args.element as any).width = 50;
            (args.element as any).height = 50;
        }
        else if((args.element as any).id.indexOf('WashBasin1')!== -1 || (args.element as any).id.indexOf('WashBasin2')!== -1 || (args.element as any).id.indexOf('WashBasin3')!== -1 || (args.element as any).id.indexOf('WashBasin5')!== -1 || (args.element as any).id.indexOf('WashBasin6')!== -1){
            (args.element as any).width = 35;
            (args.element as any).height = 30;
        }
        else if( (args.element as any).id.indexOf('BathTub')!== -1 ||(args.element as any).id.indexOf('BathTub1')!== -1 ||(args.element as any).id.indexOf('BathTub2')!== -1  || (args.element as any).id.indexOf('BathTub3')!== -1  )
        {
            (args.element as any).width = 55;
            (args.element as any).height =30;
        }
        else
        {
            (args.element as any).width = 50;
            (args.element as any).height =50;
        }
        
    }

    // Updates toolbar state based on the availability of undo and redo actions
    public historyChange(args: IHistoryChangeArgs): void {
        let diagram: Diagram = (this.selectedItem as any).diagram;
        let toolbarContainer: HTMLDivElement = document.getElementsByClassName("db-toolbar-container")[0] as HTMLDivElement;
        toolbarContainer.classList.remove("db-undo");
        toolbarContainer.classList.remove("db-redo");
        if ((diagram as any).historyManager.undoStack.length > 0) {
            toolbarContainer.classList.add("db-undo");
        }
        if ((diagram as any).historyManager.redoStack.length > 0) {
            toolbarContainer.classList.add("db-redo");
        }
    }
}

export class DiagramPropertyBinding {
    public diagram:DiagramComponent;
    private selectedItem: SelectorViewModel;
    public ddlTextPosition: DropDownListComponent;
    constructor(selectedItem: SelectorViewModel, ) {
        this.selectedItem = selectedItem;
    }

    // Updates page break settings and icons in response to checkbox changes
    public pageBreaksChange(args: CheckBoxChangeEventArgs): void {
        let items = ((document.getElementById("btnViewMenu") as any).ej2_instances[0]).items;
        if (args.event) {
            (this.selectedItem as any).pageSettings.pageBreaks = args.checked;
            this.selectedItem.diagram.pageSettings.showPageBreaks = args.checked;
            if(args.checked === true){
                items[5].iconCss = 'sf-icon-check-tick';
            }
            else
            {
            items[5].iconCss = '';    
            }
        }
    }

    // Adjusts diagram page settings based on selected paper size
    public paperListChange(args:any){
        let diagram =this.selectedItem.diagram;
        (document.getElementById('pageDimension') as any).style.display ='none';
    (document.getElementById('pageOrientation') as any).style.display ='';
    var value = args.value || args.item.value;
    var paperSize =  this.selectedItem.utilityMethods.getPaperSize(value);
    var pageWidth = paperSize.pageWidth;
    var pageHeight = paperSize.pageHeight;
    if (pageWidth && pageHeight) {
        if (diagram.pageSettings.orientation === 'Portrait') {
            if (pageWidth > pageHeight) {
                var temp = pageWidth;
                pageWidth = pageHeight;
                pageHeight = temp;
            }
        }
        else {
            if (pageHeight > pageWidth) {
                var temp = pageHeight;
                pageHeight = pageWidth;
                pageWidth = temp;
            }
        }
        diagram.pageSettings.width = pageWidth;
        diagram.pageSettings.height = pageHeight;
        this.selectedItem.pageSettings.pageWidth = pageWidth;
        this.selectedItem.pageSettings.pageHeight = pageHeight;
      }
    else{
      (document.getElementById('pageOrientation') as any).style.display = 'none';
      (document.getElementById('pageDimension') as any).style.display = '';
      diagram.pageSettings.width = 1460;
      diagram.pageSettings.height = 600;
    }
        let arrangeContextMenu = (document.getElementById('arrangeContextMenu') as any).ej2_instances[0];
        this.updatePaperSelection(arrangeContextMenu.items[1],value);
        diagram.dataBind();
    };

    // Updates the selection icon in the menu for paper sizes
    public updatePaperSelection(items:ContextMenuItemModel,value:any){
        for(let i:number=0;i<(items as any).items.length;i++)
        {
         if(value === ((items as any).items[i] as any).value){
            (items as any).items[i].iconCss = 'sf-icon-check-tick';
         }
         else{
            (items as any).items[i].iconCss = '';
         }
        }
    }

    // Modifies the page dimensions based on user input values
    public pageDimensionChange(args: NumericChangeEventArgs): void {
        if (args.event) {
            let pageWidth: number = Number(this.selectedItem.pageSettings.pageWidth);
            let pageHeight: number = Number(this.selectedItem.pageSettings.pageHeight);
            let target: HTMLInputElement = args.event.target as HTMLInputElement;
            if (target.tagName.toLowerCase() === "span") {
                target = (target as any).parentElement.children[0] as HTMLInputElement;
            }
            let diagram: Diagram = this.selectedItem.diagram as Diagram;
            if (target.id === "pageWidth") {
                pageWidth = Number(target.value);
            } else {
                pageHeight = Number(target.value);
            }
            if (pageWidth && pageHeight) {
                if (pageWidth > pageHeight) {
                    this.selectedItem.pageSettings.isPortrait = false;
                    this.selectedItem.pageSettings.isLandscape = true;
                    diagram.pageSettings.orientation = "Landscape";
                } else {
                    this.selectedItem.pageSettings.isPortrait = true;
                    this.selectedItem.pageSettings.isLandscape = false;
                    diagram.pageSettings.orientation = "Portrait";
                }
                this.selectedItem.pageSettings.pageWidth = diagram.pageSettings.width = pageWidth;
                this.selectedItem.pageSettings.pageHeight = diagram.pageSettings.height = pageHeight;
                diagram.dataBind();
            }
        }
    }

    // Changes page orientation between portrait and landscape
    public pageOrientationChange(args: any): void {
        if (args.target) {
            var target = args.target;
            let arrangeContextMenu = (document.getElementById('arrangeContextMenu') as any).ej2_instances[0];
            let diagram = this.selectedItem.diagram;
            var items = arrangeContextMenu.items;
            var option = target.id ? target.id : (args.currentTarget.ej2_instances[0].iconCss === 'sf-icon-portrait'? 'pagePortrait':'pageLandscape');  
            switch (option) {
                case 'pagePortrait':
                    diagram.pageSettings.orientation = 'Portrait';
                    items[0].items[0].iconCss = '';
                    items[0].items[1].iconCss = 'sf-icon-check-tick';
                    (document.getElementById('pageLandscape') as any).classList.remove('e-active');
                    break;
                case 'pageLandscape':
                    diagram.pageSettings.orientation = 'Landscape';
                    items[0].items[0].iconCss = 'sf-icon-check-tick';
                    items[0].items[1].iconCss = '';
                    (document.getElementById('pagePortrait') as any).classList.remove('e-active');
                    break;
            }
            diagram.dataBind();
        }
    };

    // Changes the background color of the diagram page
    public pageBackgroundChange1(args: ColorPickerEventArgs): void {
        if (args.currentValue) {
           let diagram: Diagram = this.selectedItem.diagram as Diagram;
            diagram.pageSettings.background = {
                color: args.currentValue.rgba
            };
            diagram.dataBind();
        }
    }

    // Updates text position properties based on dropdown selection
    public textPositionChange(args: DropDownChangeEventArgs): void {
        if (args.value !== null) {
            this.textPropertyChange("textPosition", args.value);
        }
    }

    // Handles changes in text style (bold, italic) from toolbar interactions
    public toolbarTextStyleChange(args: ToolbarClickEventArgs): void {
        this.textPropertyChange((args as any).item.tooltipText, false);
    }

    // Updates text sub-alignment properties from toolbar settings
    public toolbarTextSubAlignChange(args: ToolbarClickEventArgs): void {
        let propertyName: string = (args as any).item.tooltipText.replace(/[" "]/g, "");
        this.textPropertyChange(propertyName, propertyName);
    }

    // Sets text alignment properties from toolbar settings
    public toolbarTextAlignChange(args: ToolbarClickEventArgs): void {
        let propertyName: string = (args as any).item.tooltipText.replace("Align ", "");
        this.textPropertyChange(propertyName, propertyName);
    }

    // Applies specified text properties to the selected diagram annotations
    public textPropertyChange(propertyName: string, propertyValue: Object): void {
            if (!this.selectedItem.preventPropertyChange) {
            let diagram: Diagram = this.selectedItem.diagram as Diagram;
            let selectedObjects: Object[] = diagram.selectedItems.nodes as Object[];
            selectedObjects = selectedObjects.concat((diagram as any).selectedItems.connectors);
            propertyName = propertyName.toLowerCase();
            if (selectedObjects.length > 0) {
                for (let i: number = 0; i < selectedObjects.length; i++) {
                    let node: Object = selectedObjects[i];
                    if (node instanceof Node || node instanceof Connector) {
                        if (node.annotations.length > 0) {
                            for (let j: number = 0; j < node.annotations.length; j++) {
                                let annotation: ShapeAnnotationModel | PathAnnotationModel = null as unknown as ShapeAnnotationModel;
                                if (node.annotations[j] instanceof ShapeAnnotation) {
                                    annotation = node.annotations[j] as ShapeAnnotationModel;
                                    if (propertyName === "textposition") {
                                        this.selectedItem.textProperties.textPosition = propertyValue.toString();
                                        annotation.offset = this.selectedItem.utilityMethods.getOffset(propertyValue as string);
                                    }
                                } else if (node.annotations[j] instanceof PathAnnotation) {
                                    annotation = node.annotations[j] as PathAnnotationModel;
                                    if (propertyName === "textposition") {
                                        this.selectedItem.textProperties.textPosition = propertyValue.toString();
                                        annotation.alignment = this.selectedItem.textProperties.textPosition as AnnotationAlignment;
                                    }
                                }
                                if (propertyName === "left" || propertyName === "right" || propertyName === "center") {
                                    annotation.horizontalAlignment = propertyValue as HorizontalAlignment;
                                    this.selectedItem.utilityMethods.updateHorVertAlign(annotation.horizontalAlignment, (annotation as any).verticalAlignment);
                                } else if (propertyName === "top" || propertyName === "bottom") {
                                    annotation.verticalAlignment = propertyValue as VerticalAlignment;
                                    this.selectedItem.utilityMethods.updateHorVertAlign((annotation as any).horizontalAlignment, annotation.verticalAlignment);
                                } else if (propertyName === "middle") {
                                    annotation.verticalAlignment = "Center";
                                    this.selectedItem.utilityMethods.updateHorVertAlign((annotation as any).horizontalAlignment, annotation.verticalAlignment);
                                } else {
                                    this.updateTextProperties(propertyName, propertyValue, (annotation as any).style);
                                }
                            }
                        } else if (node.shape && node.shape.type === "Text") {
                            this.updateTextProperties(propertyName, propertyValue, node.style);
                        }
                    }
                }
                diagram.dataBind();
                this.selectedItem.isModified = true;
            }
        }
     }
    
    // Modifies text properties like bold, italic, and alignment for an annotation
    public updateTextProperties(propertyName: string, propertyValue: Object, annotation: TextStyleModel): void {
        switch (propertyName) {
            case "bold":
                annotation.bold = !annotation.bold;
                this.updateToolbarState("toolbarTextStyle", annotation.bold, 0);
                break;
            case "italic":
                annotation.italic = !annotation.italic;
                this.updateToolbarState("toolbarTextStyle", annotation.italic, 1);
                break;
            case "underline":
                this.selectedItem.textProperties.textDecoration = !this.selectedItem.textProperties.textDecoration;
                annotation.textDecoration = annotation.textDecoration === "None" || !annotation.textDecoration ? "Underline" : "None";
                this.updateToolbarState("toolbarTextStyle", this.selectedItem.textProperties.textDecoration, 2);
                break;
            case "aligntextleft":
            case "aligntextright":
            case "aligntextcenter":
                annotation.textAlign = propertyValue.toString().replace("AlignText", "") as TextAlign;
                this.selectedItem.utilityMethods.updateTextAlign(annotation.textAlign);
                break;
        }
    }

    // Updates the visual state of toolbar items based on text property changes
    private updateToolbarState(toolbarName: string, isSelected: boolean, index: number) {
        let toolbarTextStyle: any = document.getElementById(toolbarName);
        if (toolbarTextStyle) {
            toolbarTextStyle = toolbarTextStyle.ej2_instances[0];
        }
        if (toolbarTextStyle) {
            let cssClass: string = toolbarTextStyle.items[index].cssClass;
            toolbarTextStyle.items[index].cssClass = isSelected ? cssClass + " tb-item-selected" : cssClass.replace(" tb-item-selected", "");
            toolbarTextStyle.dataBind();
        }
    }
}
