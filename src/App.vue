<template>
<div>
  <div style="display :none"><input type="file" id="fileupload" name="UploadFiles"/></div>
  <ejs-contextmenu id='arrangeContextMenu'  :items='dropDownDataSources.arrangeMenuItems' :animationSettings='dialogAnimationSettings' :onOpen='arrangeContextMenuOpen'
     cssClass="arrangeMenu"  :beforeClose="arrangeMenuBeforeClose" v-on:select="menuClick($event)"
    >
</ejs-contextmenu>
  <div class="diagrambuilder-container">
    <div class="header navbar">
      <div class="db-header-container">
        <div class="db-diagram-name-container">
          <span
            id="diagramName"
            style=" width: 250px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            "
            class="db-diagram-name" 
            v-on:click="renameDiagram"
            >Untitled Diagram
          </span>
          <input
            id="diagramEditable"
            type="text"
            class="db-diagram-name"
            v-on:keydown="diagramNameKeyDown"
            v-on:focusout="diagramNameChange"
          />
          <span id="diagramreport" class="db-diagram-name db-save-text"></span>
        </div>
        <div class="db-menu-container">
          <div class="db-menu-style">
            <ejs-dropdownbutton
              id="btnFileMenu"
              cssClass="db-dropdown-menu"
              :items="dropDownDataSources.fileMenuItems"
              v-on:select="menuClick($event)"
              :beforeOpen="arrangeMenuBeforeOpen"
              :beforeClose="arrangeMenuBeforeClose"
              :beforeItemRender="beforeItemRender"
              >File
            </ejs-dropdownbutton>
          </div>
          <div class="db-menu-style">
            <ejs-dropdownbutton
              id="btnEditMenu"
              cssClass="db-dropdown-menu"
              :items="dropDownDataSources.editMenuItems"
              v-on:select="menuClick($event)"
              :beforeOpen="arrangeMenuBeforeOpen"
              :beforeClose="arrangeMenuBeforeClose"
              :beforeItemRender="beforeItemRender"
              >Edit
            </ejs-dropdownbutton>
          </div>
          <div class="db-menu-style">
            <ejs-dropdownbutton
              id="btnInsertMenu"
              cssClass="db-dropdown-menu"
              :items="dropDownDataSources.insertMenuItems"
               v-on:select="menuClick1($event)"
              :beforeOpen="arrangeMenuBeforeOpen"
              :beforeClose="arrangeMenuBeforeClose"
              :beforeItemRender="beforeItemRender"
              >Insert
            </ejs-dropdownbutton>
          </div>
          <div class="db-menu-style">
            <ejs-dropdownbutton
              id="btnDesignMenu"
              cssClass="db-dropdown-menu"
              :items="dropDownDataSources.arrangeMenuItems"
              v-on:select="menuClick($event)"
              :beforeOpen="arrangeMenuBeforeOpen"
              :beforeClose="arrangeMenuBeforeClose"
              :beforeItemRender="beforeItemRender"
              target='.e-contextmenu-wrapper.arrangeMenu'
              >Design
            </ejs-dropdownbutton>
          </div>
          <div class="db-menu-style">
            <ejs-dropdownbutton
              id="btnViewMenu"
              cssClass="db-dropdown-menu"
              :items="dropDownDataSources.viewMenuItems"
               v-on:select="menuClick($event)"
               :beforeOpen="arrangeMenuBeforeOpen"
              :beforeClose="arrangeMenuBeforeClose"
              :beforeItemRender="beforeItemRender"
              
              >View
            </ejs-dropdownbutton>
          </div>
        </div>
      </div>
         <div class='db-toolbar-editor' >
          <div class='db-toolbar-container ' >
            <ejs-toolbar id="toolbarEditor"  overflowMode="Scrollable" v-on:clicked="toolbarEditorClick($event)">
              <e-items>
                <e-item
                  prefixIcon = 'sf-icon-undo tb-icons'
                  tooltipText= 'Undo'
                  cssClass = 'tb-item-start tb-item-undo' 
                ></e-item>
                <e-item
                  prefixIcon= 'sf-icon-redo tb-icons' tooltipText= 'Redo' cssClass= 'tb-item-end tb-item-redo'
                ></e-item>
                 <e-item type="Separator"> </e-item>
                <e-item
                  prefixIcon = 'sf-icon-pan' tooltipText= 'Pan Tool' cssClass='tb-item-start pan-item'
                ></e-item>
                <e-item
                  prefixIcon = 'sf-icon-pointer' tooltipText= 'Select Tool' cssClass='tb-item-middle tb-item-selected'
                ></e-item>
                <e-item
                  prefixIcon = 'sf-icon-straight_line' tooltipText = 'Straight' cssClass='tb-item-middle'
                ></e-item>
                <e-item
                  prefixIcon= 'sf-icon-text' tooltipText= 'Text Tool' cssClass='tb-item-end'
                ></e-item>
                <e-item
                 prefixIcon= 'sf-icon-group' tooltipText='Group' :visible= false align='Center' cssClass= 'tb-item-start tb-item-align-category'
                ></e-item>
                <e-item type="Separator" :visible= false align='Center'> </e-item>
                <e-item
                 prefixIcon= 'sf-icon-align_left'  tooltipText= 'Align Left' :visible= false align='Center' cssClass='tb-item-middle  tb-item-align-category'
                ></e-item>
                <e-item
                 prefixIcon= 'sf-icon-align_center' tooltipText= 'Align Center' :visible= false align='Center' cssClass='tb-item-middle  tb-item-align-category'
                ></e-item>
                <e-item
                 prefixIcon= 'sf-icon-align_right' tooltipText='Align Right' :visible= false align='Center' cssClass= 'tb-item-middle  tb-item-align-category'
                ></e-item>
                 <e-item
                 prefixIcon= 'sf-icon-align_top' tooltipText ='Align Top' :visible= false align='Center' cssClass= 'tb-item-middle  tb-item-align-category'
                ></e-item>
                <e-item
                 prefixIcon= 'sf-icon-align_middle' tooltipText= 'Align Middle' :visible= false align='Center' cssClass='tb-item-middle  tb-item-align-category'
                ></e-item>
                <e-item
                 prefixIcon= 'sf-icon-align_bottom' :visible= false align='Center' tooltipText= 'Align Bottom' cssClass='tb-item-middle  tb-item-align-category'
                ></e-item>
                <e-item
                 prefixIcon= 'sf-icon-distribute_horizontal' :visible= false align='Center' tooltipText= 'Distribute Objects Horizontally' cssClass='tb-item-middle tb-item-space-category'
                ></e-item>
                <e-item
                 prefixIcon= 'sf-icon-distribute_vertical' :visible= false align='Center' tooltipText= 'Distribute Objects Vertically' cssClass= 'tb-item-middle tb-item-space-category'
                ></e-item>
                <e-item type="Separator" :visible= false align='Center'> </e-item>
                <e-item
                 prefixIcon= 'sf-icon-bring-forward'  tooltipText=  'Bring Forward' :visible= false align='Center' cssClass= 'tb-item-start tb-item-lock-category'
                ></e-item>
                <e-item
                 prefixIcon= 'sf-icon-bring-to-front' tooltipText= 'Bring To Front' :visible= false align='Center' cssClass= 'tb-item-middle tb-item-lock-category'
                ></e-item>
                <e-item
                 prefixIcon= 'sf-icon-send-backward' tooltipText= 'Send Backward' :visible= false align='Center' cssClass= 'tb-item-middle tb-item-lock-category'
                ></e-item>
                <e-item
                prefixIcon= 'sf-icon-send-to-back' tooltipText= 'Send To Back' :visible= false align='Center' cssClass ='tb-item-end tb-item-lock-category'
                ></e-item>
                <e-item type="Separator" :visible= false align='Center'> </e-item>
                <e-item
                prefixIcon= 'sf-icon-flip-vertical' tooltipText= 'Horizontal Flip' :visible= false align='Center' cssClass= 'tb-item-end tb-item-lock-category'
                ></e-item>
                <e-item
                prefixIcon= 'sf-icon-flip-horizontal' tooltipText='Vertical Flip' :visible= false align='Center' cssClass= 'tb-item-end tb-item-lock-category'
                ></e-item>
                <e-item type="Separator" :visible= false > </e-item>
                <e-item
                prefixIcon= 'sf-icon-lock' tooltipText= 'Lock' :visible= false align='Center' cssClass= 'tb-item-start tb-item-lock-category'
                ></e-item>
                <e-item
                prefixIcon= 'sf-icon-delete' tooltipText='Delete'  :visible= false align='Center' cssClass='tb-item-end tb-item-lock-category'
                ></e-item>
                <e-item type="Separator" :visible= false > </e-item>
                <e-item
                cssClass= 'tb-item-end tb-zoom-dropdown-btn' align='Right' :template= "toolbarTemplate" 
                ></e-item>
                <e-item
                tooltipText= 'Hide property'  align='Right' :template= "hideProperty"
                ></e-item>
              </e-items>
            </ejs-toolbar>
          </div>
      </div>
    </div>
    <div class="row content">
      <div class="sidebar show-overview">
        <div class="db-palette-parent">
          <ejs-symbolpalette id="symbolpalette" ref="paletteObj" width="100%" height="100%" 
           :palettes='palettes.palettes' 
           :getSymbolInfo='palettes.getSymbolInfo' :symbolMargin='palettes.symbolMargin'
          
           :getNodeDefaults='palettes.setPaletteNodeDefaults'
           :enableSearch='palettes.enableSearch'>
          </ejs-symbolpalette>
        </div>
      </div>
      <div class="main-content" role="main">
        <div class="db-diagram-container">
          <div id="diagramContainerDiv" class="db-current-diagram-container">
            <ejs-diagram
              id="diagram"
              ref="diagram"
              :width="width"
              :height="height"
              :pageSettings="pageSettings"
              :scrollSettings="scrollSettings"
              :rulerSettings="rulerSettings"
              :nodes="nodes"
              :connectors="connectors"
              :getNodeDefaults="setNodeDefaults"
              :getConnectorDefaults="setConnectorDefaults"
              :selectionChange="this.diagramEvents.selectionChange.bind(this.diagramEvents)"
              :positionChange="this.diagramEvents.nodePositionChange.bind(this.diagramEvents)"
              :sizeChange="this.diagramEvents.nodeSizeChange.bind(this.diagramEvents)"   
              :rotateChange="this.diagramEvents.nodeRotationChange.bind(this.diagramEvents)"
              :dragEnter="this.diagramEvents.dragEnter.bind(this.diagramEvents)"
              :historyChange="this.diagramEvents.historyChange.bind(this.diagramEvents)"
              :scrollChange="this.scrollChange.bind(this)"
              :collectionChange="this.diagramEvents.collectionChange.bind(this.diagramEvents)"
            ></ejs-diagram>
          </div>
        </div>
        <div class='db-property-editor-container' style="overflow:auto;">
          <div id="generalDiagramContainer" class="db-general-diagram-prop-container">
            <div id='diagramPropertyContainer' class="db-diagram-prop-container">
              <div class="row db-prop-header-text">
                Page Settings
                  <ejs-button class="close" v-on:click.native="hideElements('hide-properties',diagram)"><i style="width: 20px;height: 20px;font-size:20px" class="sf-icon-close"></i></ejs-button>
              </div>
              <div class="db-prop-separator" style="background-color: #b5b5b5;margin-bottom: 10px;">
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-12 db-col-left">
                  <span  class="db-prop-text-style">Format</span>
                    <ejs-dropdownlist id="pageSettingsList" :dataSource="dropDownDataSources.paperList" v-on:change="diagramPropertyBinding.paperListChange($event)"
                  :fields="dropdownListFields" :value="selectedItem.pageSettings.paperSize" ></ejs-dropdownlist>
                </div>
              </div>
              <div class="row" id="pageOrientation" style="margin-top: 10px;">
              <div class="row db-prop-row">
                <div class="col-xs-6 db-col-right" >
                  <span class="db-prop-text-style">Orientation</span>
                </div>
              </div>
              <div class="col-xs-6 db-col-left">
                <ejs-button id="pagePortrait" isPrimary="true" isToggle="true" style="font-size: 10px;"
                  cssClass="e-flat e-primary"  iconCss="sf-icon-portrait"  name="pageSettings"
                  v-on:click.native='diagramPropertyBinding.pageOrientationChange($event)'>Portrait</ejs-button>
              </div>
              <div class="col-xs-6 db-col-right" >
                  <ejs-button id="pageLandscape" isPrimary="true" isToggle="true" style="font-size: 10px;"
                    cssClass="e-flat e-primary e-active" iconCss="sf-icon-landscape" name="pageSettings"
                    v-on:click.native='diagramPropertyBinding.pageOrientationChange($event)'>LandScape</ejs-button>
              </div>
              </div>
              <div class="row db-prop-row" id='pageDimension' style="display:none">
                <div class="col-xs-6 db-col-left">
                  <div class="db-text-container">
                    <div class="db-text">
                      <span>W</span>
                    </div>
                   <div class="db-text-input">
                      <ejs-numerictextbox
                        id="pageWidth"
                        min="100"
                        format="n0"
                        :value="selectedItem.pageSettings.pageWidth"
                        v-on:change="diagramPropertyBinding.pageDimensionChange($event)"
                      ></ejs-numerictextbox>
                    </div>
                  </div>
                </div>
                <div class="col-xs-6 db-col-right">
                  <div class="db-text-container">
                    <div class="db-text">
                      <span>H</span>
                    </div>
                    <div class="db-text-input">
                      <ejs-numerictextbox
                        id="pageHeight"
                        min="100"
                        format="n0"
                        :value="selectedItem.pageSettings.pageHeight"
                        v-on:change="diagramPropertyBinding.pageDimensionChange($event)"
                      ></ejs-numerictextbox>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row db-prop-row" style="margin-top: 10px;">
                <div class="col-xs-6 db-col-left">
                  <span class="db-prop-text-style">Background</span>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-6 db-col-left">
                  <div class="db-color-container">
                    <div class="db-color-input">
                      <ejs-colorpicker
                        type="color"
                        mode="Palette"
                        :showButtons="false"
                        width="100%"
                        :value="selectedItem.pageSettings.backgroundColor"
                        v-on:change="diagramPropertyBinding.pageBackgroundChange1($event)"
                      ></ejs-colorpicker>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row db-prop-row" style="margin-top: 10px;">
                <ejs-checkbox id="showPageBreaks" label="Page Breaks" :checked="selectedItem.pageSettings.pageBreaks" v-on:change="diagramPropertyBinding.pageBreaksChange($event)">
                </ejs-checkbox>
              </div>
            </div>
            <div id='nodePropertyContainer' class="db-node-prop-container" style="display:none">
              <div class="db-node-behaviour-prop" id="dimen">
                <div class="row db-prop-header-text">
                  Properties
                  <ejs-button class="close" v-on:click.native="hideElements('hide-properties',diagram)"><i style="width: 20px;height: 20px;font-size:20px" class="sf-icon-close"></i></ejs-button> 
                </div>
                <div class="db-prop-separator" style="background-color: #b5b5b5;margin-bottom: 10px;">
                </div>
              <div class="row db-prop-row">
                <div class="col-xs-6 db-col-right" >
                  <span class="db-prop-text-style">Dimensions</span>
                </div>
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-6 db-col-left" style="width: 97px;" >
                  <div class="db-text-container">
                    <div class="db-text">
                      <span>X</span>
                    </div>
                    <div class="db-text-input">
                      <ejs-numerictextbox
                        style="width: 72px;"
                        id="nodeOffsetX"
                        format="n0"
                        v-model="selectedItem.nodeProperties.offsetX"
                      ></ejs-numerictextbox>
                    </div>
                  </div>
                </div>
                <div class="col-xs-6 db-col-right" style="width: 97px;">
                  <div class="db-text-container">
                    <div class="db-text">
                      <span>Y</span>
                    </div>
                    <div class="db-text-input">
                      <ejs-numerictextbox
                        style="width: 72px;"
                        id="nodeOffsetY"
                        format="n0"
                        v-model="selectedItem.nodeProperties.offsetY"
                      ></ejs-numerictextbox>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-6 db-col-left" style="width: 97px;">
                  <div class="db-text-container">
                    <div class="db-text">
                      <span>W</span>
                    </div>
                    <div class="db-text-input">
                      <ejs-numerictextbox
                        style="width: 72px;"
                        id="nodeWidth"
                        format="n0"
                        v-model="selectedItem.nodeProperties.width"
                      ></ejs-numerictextbox>
                    </div>
                  </div>
                </div>
                <div class="col-xs-6 db-col-right" style="width: 97px;">
                  <div class="db-text-container">
                    <div class="db-text">
                      <span>H</span>
                    </div>
                    <div class="db-text-input">
                      <ejs-numerictextbox
                        style="width: 72px;"
                        id="nodeHeight"
                        min="1"
                        format="n0"
                        v-model="selectedItem.nodeProperties.height"
                      ></ejs-numerictextbox>
                    </div>
                  </div>
                </div>
                <div class="col-xs-2 db-col-left" style="width: 20px;padding-left:7px">
                  <ejs-button style="height: 26px; background-color: #ffff;" 
                    id='aspectRatioBtn' v-on:click.native="aspectClick($event)"
                    iconCss="sf-icon-unlock" isToggle="true" cssClass='e-flat'  ></ejs-button>
                </div>
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-6 db-col-left" style="width: 97px;">
                  <div class="db-text-container">
                    <div class="db-text">
                      <ejs-button style="margin: -5px 0px 0px 0px;"  iconCss ='sf-icon-rotate' id="rotateIconBtn"></ejs-button>
                    </div>
                    <div class="db-text-input">
                      <ejs-numerictextbox
                        style="width: 72px;"
                        id="nodeRotateAngle"
                        format="n0"
                        v-model="selectedItem.nodeProperties.rotateAngle"
                      ></ejs-numerictextbox>
                    </div>
                  </div>
                </div>
              </div>
                <div class="db-prop-separator" style="background-color: #b5b5b5;margin-bottom: 15px;">
                </div>
                <div class="row db-prop-row">
                  <div class="col-xs-6 db-col-left">
                    <ejs-button style="font-size: 10px; "
                    id="insertlink"
                    iconCss= 'sf-icon-insert_link' tooltipText='Insert Link' cssClass= 'e-outline' isPrimary=true v-on:click.native="toolbarInsertClick($event)"
                    >Insert link</ejs-button>
                  </div>
                  <div class="col-xs-6 db-col-left">
                    <ejs-button style="font-size: 10px;margin-left: 5px;width:110px;padding-left:3px"
                    id="insertimage" iconCss= 'sf-icon-insert_image' tooltipText='Insert Image' cssClass= 'e-outline' isPrimary=true v-on:click.native="toolbarInsertClick($event)">Insert image</ejs-button>
                  </div>
                </div>
                <div class="db-prop-separator" style="background-color: #b5b5b5;">
                </div>
              </div>
              <div id='nodeStyleProperties' class="db-node-style-prop">
                <div class="row db-background-style">
                  <div class="col-xs-6 db-col-right" style="margin-bottom: 3px;">
                    <span  class="db-prop-text-style">Background color</span>
                  </div>
                  <div class="row db-prop-row"></div>  
                    <div class="col-xs-6 db-col-left">
                      <div class="db-color-container">
                        <div class="db-color-input">
                          <ejs-colorpicker
                            id="nodeFillColor"
                            type="color"
                            mode="Palette"
                            :showButtons="false"
                            v-model="selectedItem.nodeProperties.fillColor"
                          ></ejs-colorpicker>
                        </div>
                      </div>
                    </div> 
                  </div>
                  <div class="row db-border-style">
                    <div class="row db-prop-header-text db-border-style-header">
                      Border/Line Styles
                    </div>
                    <div class="row db-prop-row">
                      <div class="col-xs-6 db-col-right" >
                        <span class="db-prop-text-style">Border Type</span>
                      </div>
                      <div class="col-xs-2 db-col-left" style="margin-left: -6px;">
                        <span class="db-prop-text-style">Color</span>
                      </div>
                      <div class="col-xs-2 db-col-center" style="margin-left: 6px;">
                        <span class="db-prop-text-style">Thickness</span>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xs-6 db-col-right" style="width: 77px;margin-right: 0px;">
                        <ejs-dropdownlist id="nodeBorderStyle" v-model="selectedItem.nodeProperties.strokeStyle" :dataSource="dropDownDataSources.borderStyles"
                          popupWidth="160px" :fields="dropdownListFields" :itemTemplate="itemTemplate" :valueTemplate="valueTemplate">
                      </ejs-dropdownlist>
                      </div>
                      <div class="col-xs-2 db-col-center" >
                        <div class="db-color-container" style="width: 60px;margin-left: 2px;">
                          <div class="db-color-input">
                           <ejs-colorpicker
                            id="nodeStrokeColor"
                            type="color"
                            mode="Palette"
                            :showButtons="false"
                            v-model="selectedItem.nodeProperties.strokeColor"
                          ></ejs-colorpicker>
                          </div>
                      </div>
                    </div>
                    <div class="col-xs-2 db-col-right" style="width: 73px;margin-left: 32px;">
                      <div class="db-text-container">
                        <div class="db-text-input" >
                          <ejs-numerictextbox
                            style="width: 68px;"
                            id="nodeStrokeWidth"
                            :step="0.5"
                            v-model="selectedItem.nodeProperties.strokeWidth"
                          ></ejs-numerictextbox>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row db-prop-row">
                    <div class="col-xs-2 db-col-right db-prop-text-style" style="margin-right: 5px;padding-top: 6px">
                      <span class="db-prop-text-style">Opacity</span>
                    </div>
                    <div class="col-xs-8 db-col-left" style="width: 120px;padding-right: 10px;margin-left: 10px;">
                      <ejs-slider
                        min="0"
                        max="100"
                        step="10"
                        type="MinRange"
                        v-model="selectedItem.nodeProperties.opacity"
                      ></ejs-slider>
                    </div>
                    <div class="col-xs-2 db-col-right" style="width: 50px;">
                      <input id="nodeOpacitySliderText"  type="text" value= '100%' readOnly="true" class="db-readonly-input" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id='connectorPropertyContainer' class="db-connector-prop-container" style="display:none">
              <div class="row db-prop-header-text">
                Connector Properties
              </div>
              <div class="db-prop-separator" style="background-color: #b5b5b5;"></div>
                <div class="row db-prop-row">
                  <div class="col-xs-6 db-col-left db-prop-text-style">
                    <span class="db-prop-text-style">Line color</span>
                  </div>
                  <div class="col-xs-4 db-col-right db-prop-text-style" style="margin-left: 18px;">
                    <span class="db-prop-text-style">Thickness</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-6 db-col-left">
                    <div class="db-color-container">
                      <div class="db-color-input">
                        <ejs-colorpicker
                          id="lineColor"
                          mode="Palette"
                          type="color"
                          :showButtons="false"
                          v-model="selectedItem.connectorProperties.lineColor"
                      ></ejs-colorpicker>
                      </div>
                    </div>
                  </div>
                <div class="col-xs-6 db-col-right">
                  <div class="db-text-container" style="width: 77px; margin-left: 20px;">
                    <div class="db-text-input">
                      <ejs-numerictextbox style="width: 74px;" :min="0.5" :step="0.5" id="lineWidth" v-model="selectedItem.connectorProperties.lineWidth"></ejs-numerictextbox>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row db-prop-row">
                <div class="col-xs-2 db-col-right db-prop-text-style" style="margin-right: 3px;padding-top: 6px">
                  <span class="db-prop-text-style">Opacity</span>
                </div>
                <div class="col-xs-8 db-col-left" style="width: 120px;padding-right:10px;margin-left: 10px;">
                  <ejs-slider
                    id="default"
                    min="0"
                    max="100"
                    step="10"
                    type="MinRange"
                    v-model="selectedItem.connectorProperties.opacity"
                  ></ejs-slider>
                </div>
                <div class="col-xs-2 db-col-left" style="width:50px">
                  <input type="text" id="connectorOpacitySliderText" value= '100%' readonly="true" class="db-readonly-input" />
                </div>
              </div> 
             </div>
              <div id='textPropertyContainer' class="db-text-prop-container" style="display:none">
                <div class="db-prop-separator" style="background-color: #b5b5b5;"></div>
                  <div class="col-xs-8 db-col-left db-prop-text-style">
                    <span class="db-prop-text-style">Text</span>
                  </div>
                  <div class="col-xs-4 db-col-left db-prop-text-style">
                    <span class="db-prop-text-style">Size</span>
                  </div>
                  <div class="row db-prop-row">
                    <div class="col-xs-8 db-col-left">
                      <ejs-dropdownlist :dataSource="dropDownDataSources.fontFamilyList" v-model="selectedItem.textProperties.fontFamily"
                                    :fields="dropdownListFields" index=0></ejs-dropdownlist>
                    </div>
                  <div class="col-xs-4 db-col-right">
                    <div class="db-text-container">
                      <div class="db-text-input">
                        <ejs-numerictextbox style="width: 73px;" id="fontSizeTextProperties" :min="1" :step="1" format="n0" v-model="selectedItem.textProperties.fontSize"></ejs-numerictextbox>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row db-prop-row">
                  <div class="col-xs-6 db-col-left" id="textPositionDiv" style="width:148px;">
                    <ejs-dropdownlist id="ddlTextPosition" index=0 :dataSource="selectedItem.textProperties.textPositionDataSource" :value="selectedItem.textProperties.textPosition"
                                    :fields="dropdownListFields" v-on:change="diagramPropertyBinding.textPositionChange($event)" ></ejs-dropdownlist>
                  </div>
                  <div class="col-xs-6 db-col-right" id="textColorDiv" style="width: 70px;margin-left:4px">
                    <div class="db-color-container">
                      <div class="db-color-input">
                        <ejs-colorpicker
                          id="textColor"
                          mode="Palette"
                          type="color"
                          :showButtons="false"
                          v-model="selectedItem.textProperties.fontColor"
                        ></ejs-colorpicker>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row db-prop-row">
                  <div class="col-xs-6 db-col-left">
                    <div>
                      <ejs-toolbar id="toolbarTextStyle" overflowMode="Scrollable"  v-on:clicked="diagramPropertyBinding.toolbarTextStyleChange($event)">
                        <e-items>
                          <e-item
                            prefixIcon="sf-icon-bold"
                            tooltipText="Bold"
                            cssClass="tb-item-start"
                          ></e-item>
                          <e-item
                            prefixIcon="sf-icon-italic"
                            tooltipText="Italic"
                            cssClass="tb-item-middle"
                          ></e-item>
                          <e-item
                            prefixIcon="sf-icon-underline"
                            tooltipText="Underline"
                            cssClass="tb-item-end"
                          ></e-item>
                        </e-items>
                      </ejs-toolbar>
                    </div>
                  </div>
                  <div class="col-xs-6 db-col-right">
                    <div>
                      <ejs-toolbar
                        id="toolbarTextSubAlignment"
                        overflowMode="Scrollable"
                        v-on:clicked="diagramPropertyBinding.toolbarTextSubAlignChange($event)"
                      >
                        <e-items>
                          <e-item
                            prefixIcon="sf-icon-align-left"
                            tooltipText="Align Text Left"
                            cssClass="tb-item-start"
                          ></e-item>
                          <e-item
                            prefixIcon="sf-icon-align-center"
                            tooltipText="Align Text Center"
                            cssClass="tb-item-middle"
                          ></e-item>
                          <e-item
                            prefixIcon="sf-icon-align-right"
                            tooltipText="Align Text Right"
                            cssClass="tb-item-end"
                          ></e-item>
                        </e-items>
                      </ejs-toolbar>
                    </div>
                  </div>
                </div>
                <div class="row db-prop-row" id='toolbarTextAlignmentDiv'>
                    <ejs-toolbar 
                    id="toolbarTextAlignment"
                    overflowMode="Scrollable"
                    v-on:clicked="diagramPropertyBinding.toolbarTextAlignChange($event)"
                  >
                    <e-items>
                      <e-item
                        prefixIcon="sf-icon-align-text-rignt"
                        tooltipText="Align Right"
                        cssClass="tb-item-start"
                      ></e-item>
                      <e-item
                        prefixIcon="sf-icon-align-text-horizontal-center"
                        tooltipText="Align Center"
                        cssClass="tb-item-middle"
                      ></e-item>
                      <e-item
                        prefixIcon="sf-icon-align-text-left"
                        tooltipText="Align Left"
                        cssClass="tb-item-middle"
                      ></e-item>
                      <e-item
                        prefixIcon="sf-icon-align-text-bottom"
                        tooltipText="Align Bottom"
                        cssClass="tb-item-middle"
                      ></e-item>
                      <e-item
                        prefixIcon="sf-icon-align-text-vertical-center"
                        tooltipText="Align Middle"
                        cssClass="tb-item-middle"
                      ></e-item>
                      <e-item
                        prefixIcon="sf-icon-align-text-top"
                        tooltipText="Align Top"
                        cssClass="tb-item-end"
                      ></e-item>
                    </e-items>
                  </ejs-toolbar>
                </div>
              <div class="row db-prop-row">
                <div class="col-xs-2 db-col-right db-prop-text-style" style="margin-right:12px;padding-top: 6px">
                  <span class="db-prop-text-style">Opacity</span>
                </div>
                <div class="col-xs-8 db-col-left" style="width: 130px;padding-right: 10px;margin-left: 5px;">
                  <ejs-slider
                    id='opacityTextSlider'
                    min="0"
                    max="100"
                    step="10"
                    type="MinRange"
                    v-model="selectedItem.textProperties.opacity" 
                  ></ejs-slider>
                </div>
                <div class="col-xs-2 db-col-right" >
                  <input id='textOpacityText' type="text" value='100%' class="db-readonly-input" readOnly="true"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ejs-dialog
      id="exportDialog"
      ref="exportDialogObj"
      width="400px"
      header="Export Diagram"
      :target="dlgTarget"
      isModal="true"
      :animationSettings="dialogAnimationSettings"
      :visible="dialogVisibility"
      showCloseIcon="true"
      :buttons="exportingButtons"
    >
        <div id="exportDialogContent">
          <div class="row">
            <div class="row">File Name</div>
            <div class="row db-dialog-child-prop-row">
              <input type="text" id="exportfileName"  value ="Untitled Diagram ">
            </div>
          </div>
          <div class="row db-dialog-prop-row">
            <div class="col-xs-6 db-col-left">
              <div class="row">Format</div>
              <div class="row db-dialog-child-prop-row">
                <ejs-dropdownlist id="exportFormat"    v-model="selectedItem.exportSettings.format" :dataSource="dropDownDataSources.fileFormats"
                            :fields="dropdownListFields">
                        </ejs-dropdownlist>
              </div>
            </div>
            <div class="col-xs-6 db-col-right">
              <div class="row">Region</div>
              <div class="row db-dialog-child-prop-row">
                 <ejs-dropdownlist id="exportRegion" v-model="selectedItem.exportSettings.region" :dataSource="dropDownDataSources.diagramRegions"
                            :fields="dropdownListFields">
                  </ejs-dropdownlist>
              </div>
            </div>
          </div>
        </div>
</ejs-dialog>
<ejs-dialog
      id="printDialog"
      ref="printDialog"
      width="335px"
      header="Print Diagram"
      :target="dlgTarget"
      isModal="true"
      :animationSettings="dialogAnimationSettings"
      :visible="dialogVisibility"
      showCloseIcon="true"
      :buttons="printingButtons"
    > 
        <div id="printDialogContent">
          <div class="row">
            <div class="row">Region</div>
            <div class="row db-dialog-child-prop-row">
              <ejs-dropdownlist :value="selectedItem.printSettings.region" :dataSource="dropDownDataSources.diagramRegions" :fields="dropdownListFields">
                    </ejs-dropdownlist>
            </div>
          </div>
          <div class="row db-dialog-prop-row">
            <div class="row">Print Settings</div>
            <div class="row db-dialog-child-prop-row">
               <ejs-dropdownlist :dataSource="dropDownDataSources.paperList" :fields="dropdownListFields" :value="selectedItem.printSettings.paperSize">
                    </ejs-dropdownlist>
            </div>
          </div>
          <div
            id="printCustomSize"
            class="row db-dialog-prop-row"
            style="display: none; height: 28px"
          >
            <div class="col-xs-6 db-col-left">
              <div class="db-text-container">
                <div class="db-text">
                  <span>W</span>
                </div>
                <div class="db-text-input">
                   <ejs-numerictextbox id="printPageWidth" min="100" step="1" format="n0" :value="selectedItem.printSettings.pageWidth"></ejs-numerictextbox>
                </div>
              </div>
            </div>
            <div class="col-xs-6 db-col-right">
              <div class="db-text-container">
                <div class="db-text">
                  <span>H</span>
                </div>
                <div class="db-text-input">
                  <ejs-numerictextbox id="printPageHeight" min="100" step="1" format="n0" :value="selectedItem.printSettings.pageHeight"></ejs-numerictextbox>
                </div>
              </div>
            </div>
          </div>
          <div
            id="printOrientation"
            class="row db-dialog-prop-row"
            style="height: 28px; padding: 5px 0px"
          >
            <div class="col-xs-3 db-prop-col-style" style="margin-right: 8px">
              <ejs-radiobutton id="printPortrait" label="Portrait" name="printSettings" :checked="selectedItem.printSettings.isPortrait">
                    </ejs-radiobutton>
            </div>
            <div class="col-xs-3 db-prop-col-style">
              <ejs-radiobutton id="printLandscape" label="Landscape" name="printSettings" :checked="selectedItem.printSettings.isLandscape">
                    </ejs-radiobutton>
            </div>
          </div>
          <div class="row db-dialog-prop-row" style="margin-top: 16px">
            <ejs-checkbox id="printMultiplePage" label="Scale to fit 1 page" :checked="selectedItem.printSettings.multiplePage"></ejs-checkbox>
          </div>
        </div>   
</ejs-dialog>
<ejs-dialog id="hyperlinkDialog" ref="hyperlinkDialog" width="400px" header="Insert Link" :target="dlgTarget" isModal="true"
    :animationSettings="dialogAnimationSettings" :visible="dialogVisibility" :buttons="hyperlinkButtons" showCloseIcon="true">
        <div id="hyperlinkDialogContent">
            <div class="row">
                <div class="row">Enter URL</div>
                <div class="row db-dialog-child-prop-row">
                    <input type="text" id="hyperlink">
                </div>
            </div>
            <div class="row db-dialog-prop-row">
                <div class="row">Link Text (Optional)</div>
                <div class="row db-dialog-child-prop-row">
                    <input type="text" id="hyperlinkText">
                </div>
            </div>
        </div>
</ejs-dialog>
<ejs-dialog id="fileUploadDialog" ref="fileUploadDialog"  width="500px" height="485px" header="Upload File" :target="dlgTarget"
    isModal="true" :animationSettings="dialogAnimationSettings" :buttons="uploadButtons" showCloseIcon="true" allowDragging="true"
    :visible="dialogVisibility">
        <div id="uploadDialogContent" class="db-upload-content firstPage">
            
                <div id="uploadInformationDiv" class="row db-dialog-prop-row" style="margin-top: 0px;">
                    
                    <div class="row">
                        <div id="dropArea">
                            <span id="dropRegion" class="droparea"> Drop files here or
                                <a href="" id="browseFile">
                                    <u>Browse</u>
                                </a>
                            </span>
                            <ejs-uploader  id="defaultfileupload" :asyncSettings="path" :success="onUploadSuccess" :failure="onUploadFailure"
                                :progress="onUploadFileSelected" :allowedExtensions="selectedItem.orgDataSettings.extensionType">
                            </ejs-uploader>
                        </div>
                    </div>
                </div>   
    
        </div>
</ejs-dialog>
</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import {
  Diagram,
  DiagramPlugin,
  UndoRedo,
  SymbolPalettePlugin,
  PortVisibility,
  PortConstraints,
  MouseEventArgs,
  ConnectorEditing,
  ComplexHierarchicalTree,
  RulerModel,
  RulerSettingsModel,
  CommandModel,
  Decorator,
  DecoratorModel,
  DecoratorShapes,
  IScrollChangeEventArgs
} from "@syncfusion/ej2-vue-diagrams";
import { formatUnit, createElement, closest, Ajax } from "@syncfusion/ej2-base";
import { Uploader, UploaderComponent } from "@syncfusion/ej2-vue-inputs";
import {
  ItemModel as ToolbarItemModel,
  OpenCloseMenuEventArgs,
  MenuEventArgs as ContextMenuEventArgs,
  ClickEventArgs,
  ToolbarComponent,
  MenuAnimationSettingsModel,
} from "@syncfusion/ej2-vue-navigations";
import {
  BeforeOpenCloseMenuEventArgs,
  MenuEventArgs,
  DropDownButtonComponent,
} from "@syncfusion/ej2-vue-splitbuttons";
import {
  DialogComponent,
  PositionDataModel,
  TooltipEventArgs,
  Position,
  Dialog
    } from "@syncfusion/ej2-vue-popups";
import {
  AnimationSettingsModel,
  TooltipComponent,
} from "@syncfusion/ej2-vue-popups";
import {
  FieldSettingsModel,
  DropDownListComponent,
} from "@syncfusion/ej2-vue-dropdowns";

import { Button, ButtonComponent } from "@syncfusion/ej2-vue-buttons";
import {
  DiagramComponent,
  NodeModel,
  ConnectorModel,
  Node,
  Connector,
  NodeConstraints,
  ShapeAnnotationModel,
  ConnectorConstraints,
  DiagramTools,
  SnapConstraints,
  AlignmentOptions,
  DiagramContextMenu,
  Snapping,
  BpmnDiagrams,
  HierarchicalTree,
  PrintAndExport,
  MindMap as MindMapTree,
  ZoomOptions,
  DataBinding,
  Overview,
  DiagramRegions,
  ConnectorBridging,
  LayoutAnimation,
  UserHandleModel,
  FileFormats,
  SymbolPalette,
  CommandManagerModel,
  Keys,
  KeyModifiers,
  SelectorConstraints,
  ICollectionChangeEventArgs,
  DiagramAction,
  SnapSettingsModel,
  PageSettingsModel,
  ScrollSettingsModel,
  SelectorModel,
  ContextMenuSettingsModel,
  IDropEventArgs,
  SymbolPaletteComponent,
} from "@syncfusion/ej2-vue-diagrams";
import {
  DropDownButtonPlugin,
  ItemModel,
} from "@syncfusion/ej2-vue-splitbuttons";
import { ToolbarPlugin } from "@syncfusion/ej2-vue-navigations";
import { DialogPlugin , TooltipPlugin} from "@syncfusion/ej2-vue-popups";
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
import {
  RadioButtonPlugin,
  CheckBoxPlugin,
  ButtonPlugin,
} from "@syncfusion/ej2-vue-buttons";
import { ContextMenuPlugin } from "@syncfusion/ej2-vue-navigations";
import { NumericTextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
import { ColorPickerPlugin, SliderPlugin } from "@syncfusion/ej2-vue-inputs";
import { ListViewPlugin } from "@syncfusion/ej2-vue-lists";
import { MultiSelectPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { UploaderPlugin } from "@syncfusion/ej2-vue-inputs";

import { OrgChartUtilityMethods, SelectorViewModel } from "./app/scripts/selector";
import { DropDownDataSources } from "./app/scripts/dropdowndatasource";
import { Palettes } from "./app/scripts/palettes";
import {
  DiagramClientSideEvents,
  DiagramPropertyBinding,
} from "./app/scripts/events";
import { PaperSize } from "./app/scripts/utilitymethods";
import toolbarVue from './components/toolbarVue.vue';
import orderVue from './components/orderVue.vue';

Vue.use(DiagramPlugin);
Vue.use(DropDownButtonPlugin);
Vue.use(ToolbarPlugin);
Vue.use(SymbolPalettePlugin);
Vue.component(ToolbarPlugin.name, ToolbarComponent);
Vue.use(DialogPlugin);
Vue.use(DropDownListPlugin);
Vue.use(RadioButtonPlugin);
Vue.use(NumericTextBoxPlugin);
Vue.use(ColorPickerPlugin);
Vue.use(CheckBoxPlugin);
Vue.use(ButtonPlugin);
Vue.use(SliderPlugin);
Vue.use(ListViewPlugin);
Vue.use(MultiSelectPlugin);
Vue.use(UploaderPlugin);
Vue.use(ContextMenuPlugin);
Vue.use(TooltipPlugin);
Vue.component(DialogPlugin.name, DialogComponent);
let interval;
interval = [
  1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
  0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
];
let gridlines = {
  lineColor: "#EEEEEE",
  lineIntervals: interval,
};

let itemVue : any = Vue.component("itemTemplate", {
  template: `<div class="db-ddl-template-style">
              <span :class=data.className></span>
            </div>`,
  data() {
    return {
      data: {}
    };
  }
});

let valueVue:any = Vue.component("valueTemplate", {
  template:  `<div class="db-ddl-template-style">
              <span :class=data.className></span>
            </div>`,

  data() {
    return {
      data: {}
    };
  }
});
@Component({
  provide: {
    diagram: [Diagram, UndoRedo, BpmnDiagrams,DiagramContextMenu, ComplexHierarchicalTree, Snapping, DataBinding,PrintAndExport, HierarchicalTree, MindMapTree, ConnectorBridging, LayoutAnimation, ConnectorEditing ],
    SymbolPalette: [BpmnDiagrams ],
  },
  
  
})
  
export default class User extends Vue {
 
  public dropdownListFields: FieldSettingsModel = {
    text: "text",
    value: "value",
  };
  public diagram: DiagramComponent;
  public toolbarEditor: ToolbarComponent;
  public printDialog: DialogComponent;
  public exportDialog: DialogComponent;
  public hyperlinkDialog: DialogComponent;
  public defaultupload: UploaderComponent;
  public ddlTextPosition: DropDownListComponent;
  public fileUploadDialog: DialogComponent;
  public dlgTarget: HTMLElement = document.body;
  public dialogPosition: PositionDataModel = { X: 100, Y: 112 };
  public dialogVisibility = false;
  public isModalDialog = false;
  public dialogAnimationSettings: AnimationSettingsModel = { effect: "None" };
  public selectedItem: SelectorViewModel = new SelectorViewModel();
  public exportingButtons: any = this.getDialogButtons("export");
  public printingButtons: any = this.getDialogButtons("print");
  public hyperlinkButtons: any = this.getDialogButtons("hyperlink");
  public uploadButtons: any = this.getUploadButtons();
  public isOpen: boolean;
  public path: Object = {
        saveUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save",
        removeUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove"
    };
  public diagramEvents: DiagramClientSideEvents = new DiagramClientSideEvents(this.selectedItem );
  public diagramPropertyBinding: DiagramPropertyBinding = new DiagramPropertyBinding(this.selectedItem);
  public dropDownDataSources: DropDownDataSources = new DropDownDataSources();
  public palettes: Palettes = new Palettes();
  public addCommonCommands : any;
  public static selectedItem: SelectorViewModel;

  mounted() {
        window.addEventListener("load", this.onWindowLoad);
    }
  public onWindowLoad() {
    let diagram: any = document.getElementById("diagram");
    this.diagram = diagram.ej2_instances[0];
    let selectedItem : SelectorViewModel;
    let selectedItemObj:any = document.getElementById("diagram");
    let  toolbarEditor : any = document.getElementById("toolbarEditor");
    this.toolbarEditor = toolbarEditor.ej2_instances[0];
    let btnZoomIncrement : any =document.getElementById("toolbarEditor");
    btnZoomIncrement = btnZoomIncrement.ej2_instances[0];
    let  exportDialogObj: any = document.getElementById("exportDialog");
    this.exportDialog = exportDialogObj.ej2_instances[0];
    let printDialog : any = document.getElementById("printDialog");
    this.printDialog = printDialog.ej2_instances[0];
    let hyperlinkDialog: any = document.getElementById("hyperlinkDialog");
    this.hyperlinkDialog = hyperlinkDialog.ej2_instances[0];
    let defaultupload: any = document.getElementById("defaultfileupload");
    this.defaultupload = defaultupload.ej2_instances[0];
    let ddlTextPosition: any = document.getElementById("ddlTextPosition");
    this.ddlTextPosition = ddlTextPosition.ej2_instances[0];
    this.generateDiagram();
    this.diagramEvents.ddlTextPosition = this.ddlTextPosition;
    document.onmouseover = this.menumouseover.bind(this);
  }
  public width = "100%";
  public height = "100%";
  public palettewidth = "100%";  
  public paletteheight = "100%";
  public symbolWidth = "50";
  public symbolHeight = "50";
  
  public rulerSettings: RulerSettingsModel={
        showRulers: true
    }
  public pageSettings: PageSettingsModel = {
    background: { color: '#FFFFFF' }, width: 816, height: 1056, multiplePage: true, margin: { left: 5, top: 5 },
    orientation: 'Landscape'
  };
  public scrollSettings: ScrollSettingsModel = {
    canAutoScroll: false, scrollLimit: 'Diagram', minZoom: 0.25, maxZoom: 30 
  };
  public nodes : NodeModel[] = [
    {
    id :'room1window',
    offsetX: 118,
    offsetY: 10,
    // Size of the node
    width: 87,
    height: 4,
    shape:{ type : 'Path', data:'M22 5.5L124 5.50001M145 9L128 9V1L145 1V9ZM1 1L18 1L18 9L1 9L1 1ZM128 8L124 8V2L128 2V8ZM18 2L22 2L22 8L18 8L18 2Z'}
  },
  {
    id :'room1window2',
    offsetX: 20,
    offsetY: 110,
    // Size of the node
    width: 59,
    height: 4,
    rotateAngle:90,
    shape:{ type : 'Path', data:'M22 5.5L124 5.50001M145 9L128 9V1L145 1V9ZM1 1L18 1L18 9L1 9L1 1ZM128 8L124 8V2L128 2V8ZM18 2L22 2L22 8L18 8L18 2Z'}
  },
  {
    id :'node2',
    offsetX: 212,
    offsetY: 181,
    // Size of the node
    width: 51,
    height: 38,
    shape:{ type : 'Path', data:'M1 71L1 79L72 79V71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71'}
  },
  {
    id :'room1Bed',
    offsetX: 71,
    offsetY: 103,
    // Size of the node
    width: 68,
    height: 87,
    rotateAngle:-90,
    shape:{ type : 'Path', data:'M1 54V2C1 1.44772 1.44772 1 2 1H44C44.5523 1 45 1.44771 45 2V54C45 54.5523 44.5523 55 44 55H2C1.44772 55 1 54.5523 1 54Z M7.57446 14.4176C8.01615 12.4296 7.72961 10.0298 7.34925 8.31942C7.20247 7.65937 7.68924 7 8.36541 7H19.6515C20.3227 7 20.8097 7.6496 20.6533 8.3023C20.4282 9.24153 20.1765 10.5125 20.1765 11.5C20.1765 12.4875 20.4282 13.7585 20.6533 14.6977C20.8097 15.3504 20.3227 16 19.6515 16H8.68924C7.9291 16 7.4096 15.1596 7.57446 14.4176Z M25.5745 14.4176C26.0161 12.4296 25.7296 10.0298 25.3493 8.31942C25.2025 7.65937 25.6892 7 26.3654 7H37.6515C38.3227 7 38.8097 7.6496 38.6533 8.3023C38.4282 9.24153 38.1765 10.5125 38.1765 11.5C38.1765 12.4875 38.4282 13.7585 38.6533 14.6977C38.8097 15.3504 38.3227 16 37.6515 16H26.6892C25.9291 16 25.4096 15.1596 25.5745 14.4176Z M45 53V27.695C41.8333 26.4298 34.1 24.6584 28.5 27.695C22.9 30.7316 16.5 25.5863 14 22.6341C10.1667 18.2057 2.2 13.0182 1 27.6951V53H45Z M1 54V2C1 1.44772 1.44772 1 2 1H44C44.5523 1 45 1.44771 45 2V54C45 54.5523 44.5523 55 44 55H2C1.44772 55 1 54.5523 1 54Z M7.57446 14.4176C8.01615 12.4296 7.72961 10.0298 7.34925 8.31942C7.20247 7.65937 7.68924 7 8.36541 7H19.6515C20.3227 7 20.8097 7.6496 20.6533 8.3023C20.4282 9.24153 20.1765 10.5125 20.1765 11.5C20.1765 12.4875 20.4282 13.7585 20.6533 14.6977C20.8097 15.3504 20.3227 16 19.6515 16H8.68924C7.9291 16 7.4096 15.1596 7.57446 14.4176Z M25.5745 14.4176C26.0161 12.4296 25.7296 10.0298 25.3493 8.31942C25.2025 7.65937 25.6892 7 26.3654 7H37.6515C38.3227 7 38.8097 7.6496 38.6533 8.3023C38.4282 9.24153 38.1765 10.5125 38.1765 11.5C38.1765 12.4875 38.4282 13.7585 38.6533 14.6977C38.8097 15.3504 38.3227 16 37.6515 16H26.6892C25.9291 16 25.4096 15.1596 25.5745 14.4176Z M25.5745 14.4176C26.0161 12.4296 25.7296 10.0298 25.3493 8.31942C25.2025 7.65937 25.6892 7 26.3654 7H37.6515C38.3227 7 38.8097 7.6496 38.6533 8.3023C38.4282 9.24153 38.1765 10.5125 38.1765 11.5C38.1765 12.4875 38.4282 13.7585 38.6533 14.6977C38.8097 15.3504 38.3227 16 37.6515 16H26.6892C25.9291 16 25.4096 15.1596 25.5745 14.4176Z'}
  },
  {
    id :'room1Table',
    offsetX: 41,
    offsetY: 166,
    // Size of the node
    width: 26,
    height: 28,
    shape:{ type : 'Path', data:'M79 1H3C1.89543 1 1 1.89543 1 3V49C1 50.1046 1.89543 51 3 51H79C80.1046 51 81 50.1046 81 49V3C81 1.89543 80.1046 1 79 1Z'}
  },
  {
    id :'room1PotTable',
    offsetX: 41,
    offsetY: 40,
    // Size of the node
    width: 30,
    height: 30,
    shape:{ type : 'Path', data:"M57 29C57 44.464 44.464 57 29 57C13.536 57 1 44.464 1 29C1 13.536 13.536 1 29 1C44.464 1 57 13.536 57 29Z"}
  },
  {
    id :'room1FlowerPot',
    offsetX: 41,
    offsetY: 40,
    // Size of the node
    width: 25,
    height: 25,
    shape:{ type : 'Path', data:'M25.9813 23.5141C27.2901 23.5993 48.6838 19.0468 41.4746 10.8333C36.916 5.63963 21.1089 23.1968 25.9813 23.5141Z M23.6253 25.9234C23.1736 27.1547 21.4942 48.9629 31.4103 44.3689C37.6806 41.464 25.3067 21.3392 23.6253 25.9234Z M25.5989 25.6003C26.3978 26.6405 43.9262 39.7237 45.3483 28.888C46.2474 22.0363 22.6249 21.7278 25.5989 25.6003Z M24.7197 20.7567C25.6675 19.8502 36.7808 1.01108 25.8549 0.76778C18.9461 0.613932 21.191 24.1316 24.7197 20.7567Z M20.8885 22.8171C19.6966 22.2698 -1.91128 18.8763 1.88665 29.1238C4.2882 35.6035 25.3258 24.8547 20.8885 22.8171Z M21.6607 25.6193C20.3938 25.9588 1.59406 37.1385 11.0585 42.6028C17.0432 46.0581 26.3771 24.3556 21.6607 25.6193Z M22.3667 20.2554C21.8975 19.0306 8.82513 1.49408 4.37366 11.475C1.55885 17.7863 24.1136 24.815 22.3667 20.2554Z M40.0382 18.2498C40.7878 20.1543 41.1995 22.2289 41.1995 24.3996C41.1995 24.5507 41.1975 24.7013 41.1935 24.8515M35.2235 11.5507C33.6921 10.2594 31.9267 9.2368 30 8.55572M39 32.7159C37.5069 35.3317 35.3311 37.5074 32.7153 39.0004M24.8419 41.1939C24.6949 41.1977 24.5474 41.1996 24.3995 41.1996C21.7821 41.1996 19.3046 40.6011 17.0963 39.5334M10.7727 34.2278C9.9752 33.1239 9.30848 31.9193 8.79533 30.6367M7.70563 22.5004C7.89672 20.8019 8.34106 19.1801 9 17.6736M13.9123 11.274C16.1576 9.47777 18.8737 8.24563 21.846 7.79239M25.9813 23.5141C27.2901 23.5993 48.6838 19.0468 41.4746 10.8333C36.916 5.63963 21.1089 23.1968 25.9813 23.5141ZM23.6253 25.9234C23.1736 27.1547 21.4942 48.9629 31.4103 44.3689C37.6806 41.464 25.3067 21.3392 23.6253 25.9234ZM25.5989 25.6003C26.3978 26.6405 43.9262 39.7237 45.3483 28.888C46.2474 22.0363 22.6249 21.7278 25.5989 25.6003ZM24.7197 20.7567C25.6675 19.8502 36.7808 1.01108 25.8549 0.76778C18.9461 0.613932 21.191 24.1316 24.7197 20.7567ZM20.8885 22.8171C19.6966 22.2698 -1.91128 18.8763 1.88665 29.1238C4.2882 35.6035 25.3258 24.8547 20.8885 22.8171ZM21.6607 25.6193C20.3938 25.9588 1.59406 37.1385 11.0585 42.6028C17.0432 46.0581 26.3771 24.3556 21.6607 25.6193ZM22.3667 20.2554C21.8975 19.0306 8.82513 1.49408 4.37366 11.475C1.55885 17.7863 24.1136 24.815 22.3667 20.2554Z'}
  },
  {
    id :'room1Bookcase',
    offsetX: 224,
    offsetY: 45,
    // Size of the node
    width: 63,
    height: 22,
    rotateAngle:-90,
    shape:{ type : 'Path', data:'M113 9V1H1V9M113 9H1M113 9V29H1V9M4 12H11V25H4V12ZM13 12H20V25H13V12ZM22 12H29V25H22V12ZM31 12H38V25H31V12ZM40 12H47V25H40V12ZM49 12H56V25H49V12ZM58 12H65V25H58V12ZM67 12H74V25H67V12ZM76 12H83V25H76V12ZM85 12H92V25H85V12ZM94 12H101V25H94V12ZM103 12H110V25H103V12Z'}
  },
  {
    id :'room1WorkTable',
    offsetX: 215,
    offsetY: 118,
    // Size of the node
    width: 43,
    height: 37,
    rotateAngle:90,
    shape:{ type : 'Path', data:"M4 5C4 4.44772 4.44772 4 5 4H83C83.5523 4 84 4.44772 84 5V53C84 53.5523 83.5523 54 83 54H5C4.44772 54 4 53.5523 4 53V5Z M4 6.5C4 6.77614 3.77462 7.00425 3.50231 6.95843C3.08607 6.88841 2.68736 6.73099 2.33329 6.49441C1.83994 6.16477 1.45543 5.69623 1.22836 5.14805C1.0013 4.59987 0.94189 3.99667 1.05765 3.41473C1.1734 2.83279 1.45912 2.29824 1.87868 1.87868C2.29824 1.45912 2.83279 1.1734 3.41473 1.05765C3.99667 0.94189 4.59987 1.0013 5.14805 1.22836C5.69623 1.45543 6.16477 1.83994 6.49441 2.33329C6.73099 2.68736 6.88841 3.08607 6.95843 3.50231C7.00424 3.77462 6.77614 4 6.5 4L4.5 4C4.22386 4 4 4.22386 4 4.5L4 6.5Z M81.5 4C81.2239 4 80.9958 3.77462 81.0416 3.50231C81.1116 3.08607 81.269 2.68736 81.5056 2.33329C81.8352 1.83994 82.3038 1.45543 82.852 1.22836C83.4001 1.0013 84.0033 0.94189 84.5853 1.05765C85.1672 1.1734 85.7018 1.45912 86.1213 1.87868C86.5409 2.29824 86.8266 2.83279 86.9424 3.41473C87.0581 3.99667 86.9987 4.59987 86.7716 5.14805C86.5446 5.69623 86.1601 6.16477 85.6667 6.49441C85.3126 6.73099 84.9139 6.88841 84.4977 6.95843C84.2254 7.00424 84 6.77614 84 6.5V4.5C84 4.22386 83.7761 4 83.5 4L81.5 4Z M6.5 54C6.77614 54 7.00425 54.2254 6.95843 54.4977C6.88841 54.9139 6.73099 55.3126 6.49441 55.6667C6.16477 56.1601 5.69623 56.5446 5.14805 56.7716C4.59987 56.9987 3.99667 57.0581 3.41473 56.9424C2.83279 56.8266 2.29824 56.5409 1.87868 56.1213C1.45912 55.7018 1.1734 55.1672 1.05765 54.5853C0.94189 54.0033 1.0013 53.4001 1.22836 52.852C1.45543 52.3038 1.83994 51.8352 2.33329 51.5056C2.68736 51.269 3.08607 51.1116 3.50231 51.0416C3.77462 50.9958 4 51.2239 4 51.5V53.5C4 53.7761 4.22386 54 4.5 54H6.5Z M84 51.5C84 51.2239 84.2254 50.9958 84.4977 51.0416C84.9139 51.1116 85.3126 51.269 85.6667 51.5056C86.1601 51.8352 86.5446 52.3038 86.7716 52.852C86.9987 53.4001 87.0581 54.0033 86.9424 54.5853C86.8266 55.1672 86.5409 55.7018 86.1213 56.1213C85.7018 56.5409 85.1672 56.8266 84.5853 56.9424C84.0033 57.0581 83.4001 56.9987 82.852 56.7716C82.3038 56.5446 81.8352 56.1601 81.5056 55.6667C81.269 55.3126 81.1116 54.9139 81.0416 54.4977C80.9958 54.2254 81.2239 54 81.5 54H83.5C83.7761 54 84 53.7761 84 53.5V51.5Z"}
  },
  {
    id :'room1Laptop',
    offsetX: 215,
    offsetY: 118,
    // Size of the node
    width: 30,
    height: 30,
    rotateAngle:90,
    shape:{ type : 'Path', data:"M1.06567 5.71554C0.619244 3.26018 2.50554 1 5.00115 1H61.0006C63.4675 1 65.3464 3.21135 64.9481 5.64595L61.7571 25.146C61.4407 27.08 59.7695 28.5 57.8096 28.5H8.54661C6.61347 28.5 4.95694 27.1175 4.61113 25.2155L1.06567 5.71554Z M3.7083 33C3.7083 30.7909 5.49916 29 7.7083 29H58.7083C60.9174 29 62.7083 30.7909 62.7083 33V55C62.7083 57.2091 60.9174 59 58.7083 59H7.7083C5.49916 59 3.7083 57.2091 3.7083 55V33Z M26.7083 50C26.7083 49.4477 27.156 49 27.7083 49H38.7083C39.2606 49 39.7083 49.4477 39.7083 50V54C39.7083 54.5523 39.2606 55 38.7083 55H27.7083C27.156 55 26.7083 54.5523 26.7083 54V50Z M8.7083 35.5C8.7083 35.2239 8.93216 35 9.2083 35H12.2083C12.4844 35 12.7083 35.2239 12.7083 35.5V36.5C12.7083 36.7761 12.4844 37 12.2083 37H9.2083C8.93216 37 8.7083 36.7761 8.7083 36.5V35.5Z M8.7083 38.5C8.7083 38.2239 8.93216 38 9.2083 38H12.2083C12.4844 38 12.7083 38.2239 12.7083 38.5V39.5C12.7083 39.7761 12.4844 40 12.2083 40H9.2083C8.93216 40 8.7083 39.7761 8.7083 39.5V38.5Z M8.7083 41.5C8.7083 41.2239 8.93216 41 9.2083 41H12.2083C12.4844 41 12.7083 41.2239 12.7083 41.5V42.5C12.7083 42.7761 12.4844 43 12.2083 43H9.2083C8.93216 43 8.7083 42.7761 8.7083 42.5V41.5Z M8.7083 44.5C8.7083 44.2239 8.93216 44 9.2083 44H12.2083C12.4844 44 12.7083 44.2239 12.7083 44.5V45.5C12.7083 45.7761 12.4844 46 12.2083 46H9.2083C8.93216 46 8.7083 45.7761 8.7083 45.5V44.5Z M13.7083 35.5C13.7083 35.2239 13.9322 35 14.2083 35H17.2083C17.4844 35 17.7083 35.2239 17.7083 35.5V36.5C17.7083 36.7761 17.4844 37 17.2083 37H14.2083C13.9322 37 13.7083 36.7761 13.7083 36.5V35.5Z M13.7083 38.5C13.7083 38.2239 13.9322 38 14.2083 38H17.2083C17.4844 38 17.7083 38.2239 17.7083 38.5V39.5C17.7083 39.7761 17.4844 40 17.2083 40H14.2083C13.9322 40 13.7083 39.7761 13.7083 39.5V38.5Z M13.7083 41.5C13.7083 41.2239 13.9322 41 14.2083 41H17.2083C17.4844 41 17.7083 41.2239 17.7083 41.5V42.5C17.7083 42.7761 17.4844 43 17.2083 43H14.2083C13.9322 43 13.7083 42.7761 13.7083 42.5V41.5Z M13.7083 44.5C13.7083 44.2239 13.9322 44 14.2083 44H17.2083C17.4844 44 17.7083 44.2239 17.7083 44.5V45.5C17.7083 45.7761 17.4844 46 17.2083 46H14.2083C13.9322 46 13.7083 45.7761 13.7083 45.5V44.5Z M18.7083 35.5C18.7083 35.2239 18.9322 35 19.2083 35H22.2083C22.4844 35 22.7083 35.2239 22.7083 35.5V36.5C22.7083 36.7761 22.4844 37 22.2083 37H19.2083C18.9322 37 18.7083 36.7761 18.7083 36.5V35.5Z M18.7083 38.5C18.7083 38.2239 18.9322 38 19.2083 38H22.2083C22.4844 38 22.7083 38.2239 22.7083 38.5V39.5C22.7083 39.7761 22.4844 40 22.2083 40H19.2083C18.9322 40 18.7083 39.7761 18.7083 39.5V38.5Z M18.7083 41.5C18.7083 41.2239 18.9322 41 19.2083 41H22.2083C22.4844 41 22.7083 41.2239 22.7083 41.5V42.5C22.7083 42.7761 22.4844 43 22.2083 43H19.2083C18.9322 43 18.7083 42.7761 18.7083 42.5V41.5Z M18.7083 44.5C18.7083 44.2239 18.9322 44 19.2083 44H22.2083C22.4844 44 22.7083 44.2239 22.7083 44.5V45.5C22.7083 45.7761 22.4844 46 22.2083 46H19.2083C18.9322 46 18.7083 45.7761 18.7083 45.5V44.5Z M23.7083 35.5C23.7083 35.2239 23.9322 35 24.2083 35H27.2083C27.4844 35 27.7083 35.2239 27.7083 35.5V36.5C27.7083 36.7761 27.4844 37 27.2083 37H24.2083C23.9322 37 23.7083 36.7761 23.7083 36.5V35.5Z M23.7083 38.5C23.7083 38.2239 23.9322 38 24.2083 38H27.2083C27.4844 38 27.7083 38.2239 27.7083 38.5V39.5C27.7083 39.7761 27.4844 40 27.2083 40H24.2083C23.9322 40 23.7083 39.7761 23.7083 39.5V38.5Z M23.7083 41.5C23.7083 41.2239 23.9322 41 24.2083 41H27.2083C27.4844 41 27.7083 41.2239 27.7083 41.5V42.5C27.7083 42.7761 27.4844 43 27.2083 43H24.2083C23.9322 43 23.7083 42.7761 23.7083 42.5V41.5Z M23.7083 44.5C23.7083 44.2239 23.9322 44 24.2083 44H42.2083C42.4844 44 42.7083 44.2239 42.7083 44.5V45.5C42.7083 45.7761 42.4844 46 42.2083 46H24.2083C23.9322 46 23.7083 45.7761 23.7083 45.5V44.5Z M28.7083 35.5C28.7083 35.2239 28.9322 35 29.2083 35H32.2083C32.4844 35 32.7083 35.2239 32.7083 35.5V36.5C32.7083 36.7761 32.4844 37 32.2083 37H29.2083C28.9322 37 28.7083 36.7761 28.7083 36.5V35.5Z M28.7083 38.5C28.7083 38.2239 28.9322 38 29.2083 38H32.2083C32.4844 38 32.7083 38.2239 32.7083 38.5V39.5C32.7083 39.7761 32.4844 40 32.2083 40H29.2083C28.9322 40 28.7083 39.7761 28.7083 39.5V38.5Z M28.7083 41.5C28.7083 41.2239 28.9322 41 29.2083 41H32.2083C32.4844 41 32.7083 41.2239 32.7083 41.5V42.5C32.7083 42.7761 32.4844 43 32.2083 43H29.2083C28.9322 43 28.7083 42.7761 28.7083 42.5V41.5Z M33.7083 35.5C33.7083 35.2239 33.9322 35 34.2083 35H37.2083C37.4844 35 37.7083 35.2239 37.7083 35.5V36.5C37.7083 36.7761 37.4844 37 37.2083 37H34.2083C33.9322 37 33.7083 36.7761 33.7083 36.5V35.5Z M33.7083 38.5C33.7083 38.2239 33.9322 38 34.2083 38H37.2083C37.4844 38 37.7083 38.2239 37.7083 38.5V39.5C37.7083 39.7761 37.4844 40 37.2083 40H34.2083C33.9322 40 33.7083 39.7761 33.7083 39.5V38.5Z M33.7083 41.5C33.7083 41.2239 33.9322 41 34.2083 41H37.2083C37.4844 41 37.7083 41.2239 37.7083 41.5V42.5C37.7083 42.7761 37.4844 43 37.2083 43H34.2083C33.9322 43 33.7083 42.7761 33.7083 42.5V41.5Z M38.7083 35.5C38.7083 35.2239 38.9322 35 39.2083 35H42.2083C42.4844 35 42.7083 35.2239 42.7083 35.5V36.5C42.7083 36.7761 42.4844 37 42.2083 37H39.2083C38.9322 37 38.7083 36.7761 38.7083 36.5V35.5Z M38.7083 38.5C38.7083 38.2239 38.9322 38 39.2083 38H42.2083C42.4844 38 42.7083 38.2239 42.7083 38.5V39.5C42.7083 39.7761 42.4844 40 42.2083 40H39.2083C38.9322 40 38.7083 39.7761 38.7083 39.5V38.5Z M38.7083 41.5C38.7083 41.2239 38.9322 41 39.2083 41H42.2083C42.4844 41 42.7083 41.2239 42.7083 41.5V42.5C42.7083 42.7761 42.4844 43 42.2083 43H39.2083C38.9322 43 38.7083 42.7761 38.7083 42.5V41.5Z M43.7083 35.5C43.7083 35.2239 43.9322 35 44.2083 35H47.2083C47.4844 35 47.7083 35.2239 47.7083 35.5V36.5C47.7083 36.7761 47.4844 37 47.2083 37H44.2083C43.9322 37 43.7083 36.7761 43.7083 36.5V35.5Z M43.7083 38.5C43.7083 38.2239 43.9322 38 44.2083 38H47.2083C47.4844 38 47.7083 38.2239 47.7083 38.5V39.5C47.7083 39.7761 47.4844 40 47.2083 40H44.2083C43.9322 40 43.7083 39.7761 43.7083 39.5V38.5Z M43.7083 41.5C43.7083 41.2239 43.9322 41 44.2083 41H47.2083C47.4844 41 47.7083 41.2239 47.7083 41.5V42.5C47.7083 42.7761 47.4844 43 47.2083 43H44.2083C43.9322 43 43.7083 42.7761 43.7083 42.5V41.5Z M43.7083 44.5C43.7083 44.2239 43.9322 44 44.2083 44H47.2083C47.4844 44 47.7083 44.2239 47.7083 44.5V45.5C47.7083 45.7761 47.4844 46 47.2083 46H44.2083C43.9322 46 43.7083 45.7761 43.7083 45.5V44.5Z M48.7083 35.5C48.7083 35.2239 48.9322 35 49.2083 35H52.2083C52.4844 35 52.7083 35.2239 52.7083 35.5V36.5C52.7083 36.7761 52.4844 37 52.2083 37H49.2083C48.9322 37 48.7083 36.7761 48.7083 36.5V35.5Z M48.7083 38.5C48.7083 38.2239 48.9322 38 49.2083 38H52.2083C52.4844 38 52.7083 38.2239 52.7083 38.5V39.5C52.7083 39.7761 52.4844 40 52.2083 40H49.2083C48.9322 40 48.7083 39.7761 48.7083 39.5V38.5Z M48.7083 41.5C48.7083 41.2239 48.9322 41 49.2083 41H52.2083C52.4844 41 52.7083 41.2239 52.7083 41.5V42.5C52.7083 42.7761 52.4844 43 52.2083 43H49.2083C48.9322 43 48.7083 42.7761 48.7083 42.5V41.5Z M48.7083 44.5C48.7083 44.2239 48.9322 44 49.2083 44H52.2083C52.4844 44 52.7083 44.2239 52.7083 44.5V45.5C52.7083 45.7761 52.4844 46 52.2083 46H49.2083C48.9322 46 48.7083 45.7761 48.7083 45.5V44.5Z M53.7083 35.5C53.7083 35.2239 53.9322 35 54.2083 35H57.2083C57.4844 35 57.7083 35.2239 57.7083 35.5V36.5C57.7083 36.7761 57.4844 37 57.2083 37H54.2083C53.9322 37 53.7083 36.7761 53.7083 36.5V35.5Z M53.7083 38.5C53.7083 38.2239 53.9322 38 54.2083 38H57.2083C57.4844 38 57.7083 38.2239 57.7083 38.5V39.5C57.7083 39.7761 57.4844 40 57.2083 40H54.2083C53.9322 40 53.7083 39.7761 53.7083 39.5V38.5Z M53.7083 41.5C53.7083 41.2239 53.9322 41 54.2083 41H57.2083C57.4844 41 57.7083 41.2239 57.7083 41.5V42.5C57.7083 42.7761 57.4844 43 57.2083 43H54.2083C53.9322 43 53.7083 42.7761 53.7083 42.5V41.5Z M53.7083 44.5C53.7083 44.2239 53.9322 44 54.2083 44H57.2083C57.4844 44 57.7083 44.2239 57.7083 44.5V45.5C57.7083 45.7761 57.4844 46 57.2083 46H54.2083C53.9322 46 53.7083 45.7761 53.7083 45.5V44.5Z"}
  },
  {
    id :'room1Chair',
    offsetX: 178,
    offsetY: 116,
    // Size of the node
    width: 28,
    height: 32,
    rotateAngle:-90,
    shape:{ type : 'Path', data:'M22 9V14M28 9.08984V14M13 54H37C41.4183 54 45 50.4183 45 46V22C45 17.5817 41.4183 14 37 14H13C8.58172 14 5 17.5817 5 22V46C5 50.4183 8.58172 54 13 54ZM3 45C1.89543 45 1 44.1046 1 43V25C1 23.8954 1.89543 23 3 23C4.10457 23 5 23.8954 5 25V43C5 44.1046 4.10457 45 3 45ZM11 5.79143C11 3.97975 12.2614 2.40196 14.0423 2.06981C22.0186 0.582241 27.6274 0.696364 35.7954 2.09976C37.6588 2.41991 39 4.05364 39 5.94429C39 8.4118 36.7616 10.2627 34.325 9.87346C27.5467 8.79067 22.4382 8.5351 15.7921 9.68406C13.3336 10.1091 11 8.28636 11 5.79143ZM47 45C45.8954 45 45 44.1046 45 43V25C45 23.8954 45.8954 23 47 23C48.1046 23 49 23.8954 49 25V43C49 44.1046 48.1046 45 47 45Z'}
  },
  {
    id :'room1Lamp',
    offsetX: 41,
    offsetY:166,
    // Size of the node
    width: 20,
    height: 20,
    shape:{ type : 'Path', data:"M17 7C11.4772 7 7 11.4772 7 17C7 22.5228 11.4772 27 17 27C22.5228 27 27 22.5228 27 17C27 11.4772 22.5228 7 17 7ZM17 7V13.5M20.2363 18.5593L25.3654 21.3093M13.7544 18.4305L8.2541 21.6805M33 17C33 25.8366 25.8366 33 17 33C8.16344 33 1 25.8366 1 17C1 8.16344 8.16344 1 17 1C25.8366 1 33 8.16344 33 17ZM25.5 17C25.5 21.6944 21.6944 25.5 17 25.5C12.3056 25.5 8.5 21.6944 8.5 17C8.5 12.3056 12.3056 8.5 17 8.5C21.6944 8.5 25.5 12.3056 25.5 17ZM21 17C21 19.2091 19.2091 21 17 21C14.7909 21 13 19.2091 13 17C13 14.7909 14.7909 13 17 13C19.2091 13 21 14.7909 21 17Z"}
  },
  {
    id :'room1ToiletDoor',
    offsetX: 169,
    offsetY: 214,
    // Size of the node
    width: 28,
    height: 30,
    rotateAngle:180,
    shape:{ type : 'Path', data:'M1 71L1 79L72 79V71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71'}
  },
  {
    id :'room1Warddrobe',
    offsetX: 119,
    offsetY: 176,
    // Size of the node
    width: 73,
    height: 35,
    rotateAngle:180,
    shape:{ type : 'Path', data:"M50.6443 54.406L76 29L80.9998 28.9502H85.9996L55.594 59.3558L50.6443 54.406Z M12 29L36.9996 54.4053L32.0498 59.3551L2 29H12Z M70.7969 44.8594C70.6017 44.6642 70.6017 44.3476 70.7969 44.1523C70.9922 43.957 71.3088 43.957 71.504 44.1523L72.9182 45.5665C73.1135 45.7618 73.1135 46.0784 72.9182 46.2736C72.723 46.4689 72.4064 46.4689 72.2111 46.2736L70.7969 44.8594Z M16.1406 44.1524C16.3358 43.9571 16.6524 43.9571 16.8477 44.1524C17.043 44.3476 17.043 44.6642 16.8477 44.8595L15.4335 46.2737C15.2382 46.469 14.9216 46.469 14.7264 46.2737C14.5311 46.0784 14.5311 45.7619 14.7264 45.5666L16.1406 44.1524Z M1 1L87 1V29H1L1 1Z"}
  },
  {
    id :'toilet1BathTub',
    offsetX: 88,
    offsetY: 263,
    // Size of the node
    width: 50,
    height: 25,
    shape:{ type : 'Path', data:"M1 9C1 4.58172 4.58172 1 9 1H84C88.4183 1 92 4.58172 92 9V40C92 44.4183 88.4183 48 84 48H9C4.58172 48 1 44.4183 1 40V9Z M12 24.5C12 14.2827 20.2827 6 30.5 6H61.5C71.7173 6 80 14.2827 80 24.5C80 34.7173 71.7173 43 61.5 43H30.5C20.2827 43 12 34.7173 12 24.5Z M11.5 26.5C11.5 26.5 12 26 12 25C12 24 11.5 23.5 11.5 23.5L22.0074 22.6917C23.3519 22.5883 24.5 23.6514 24.5 25C24.5 26.3486 23.3519 27.4117 22.0074 27.3083L11.5 26.5Z M8 21.5C9.933 21.5 11.5 23.067 11.5 25C11.5 26.933 9.933 28.5 8 28.5C6.067 28.5 4.5 26.933 4.5 25C4.5 23.067 6.067 21.5 8 21.5Z"}
  },
  {
    id :'toilet1Basin',
    offsetX: 158,
    offsetY: 263,
    // Size of the node
    width: 30,
    height: 25,
    rotateAngle:180,
    shape:{ type : 'Path', data:"M1 4C1 2.34315 2.34315 1 4 1H62C63.6569 1 65 2.34315 65 4V25C65 38.2548 54.2548 49 41 49H25C11.7452 49 1 38.2548 1 25V4Z M57 25C57 33.2843 46.2548 40 33 40C19.7452 40 9 33.2843 9 25C9 16.7157 19.7452 10 33 10C46.2548 10 57 16.7157 57 25Z M31 10C31 10 31.5 10.5 32.5 10.5C33.5 10.5 34 10 34 10L34.8083 20.5074C34.9117 21.8519 33.8486 23 32.5 23C31.1514 23 30.0883 21.8519 30.1917 20.5074L31 10Z M36 6.5C36 8.433 34.433 10 32.5 10C30.567 10 29 8.433 29 6.5C29 4.567 30.567 3 32.5 3C34.433 3 36 4.567 36 6.5Z M35 28.5C35 29.8807 33.8807 31 32.5 31C31.1193 31 30 29.8807 30 28.5C30 27.1193 31.1193 26 32.5 26C33.8807 26 35 27.1193 35 28.5Z"}
  },
  {
    id :'toilet1Faucet',
    offsetX: 43,
    offsetY: 222,
    // Size of the node
    width: 23,
    height: 36,
    rotateAngle:-90,
    shape:{ type : 'Path', data:'M46.4065 37.9425C46.4065 55.0951 36.823 69.0002 25.0011 69.0002C13.1792 69.0002 3.5957 55.0951 3.5957 37.9425C3.5957 30.1141 5.2059 23.4623 8.5 18C8.61402 18 25 18 25 18H41.2425C44.5366 23.4623 46.4065 30.1141 46.4065 37.9425Z M41.2161 43.5006C41.2161 53.9728 33.9559 62.4621 24.9999 62.4621C16.0439 62.4621 8.78369 53.9728 8.78369 43.5006C8.78369 33.0284 16.0439 24.5391 24.9999 24.5391C33.9559 24.5391 41.2161 33.0284 41.2161 43.5006Z M1 3.61538C1 2.17095 2.17095 1 3.61538 1H46.3846C47.8291 1 49 2.17095 49 3.61538V15.3846C49 16.8291 47.8291 18 46.3846 18H3.61538C2.17095 18 1 16.8291 1 15.3846V3.61538Z M26.9995 9C26.9995 10.1046 26.1041 11 24.9995 11C23.8949 11 22.9995 10.1046 22.9995 9C22.9995 7.89543 23.8949 7 24.9995 7C26.1041 7 26.9995 7.89543 26.9995 9Z M31 33C31 37.4183 28.3137 41 25 41C21.6863 41 19 37.4183 19 33C19 28.5817 21.6863 25 25 25C28.3137 25 31 28.5817 31 33Z '}
  },
  {
    id :'room2ToiletDoor',
    offsetX: 168,
    offsetY: 336,
    // Size of the node
    width: 27,
    height: 30,
   
    shape:{ type : 'Path', data:'M1 71L1 79L72 79V71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71'}
  },
  {
    id :'toilet2BathTub',
    offsetX: 85,
    offsetY: 332,
    // Size of the node
    width: 50,
    height: 25,
    shape:{ type : 'Path', data:'M1 9C1 4.58172 4.58172 1 9 1H84C88.4183 1 92 4.58172 92 9V40C92 44.4183 88.4183 48 84 48H9C4.58172 48 1 44.4183 1 40V9Z M12 11C12 8.23858 14.2386 6 17 6H75C77.7614 6 80 8.23858 80 11V38C80 40.7614 77.7614 43 75 43H17C14.2386 43 12 40.7614 12 38V11Z M11.5 26.5C11.5 26.5 12 26 12 25C12 24 11.5 23.5 11.5 23.5L22.0074 22.6917C23.3519 22.5883 24.5 23.6514 24.5 25C24.5 26.3486 23.3519 27.4117 22.0074 27.3083L11.5 26.5Z M8 21.5C9.933 21.5 11.5 23.067 11.5 25C11.5 26.933 9.933 28.5 8 28.5C6.067 28.5 4.5 26.933 4.5 25C4.5 23.067 6.067 21.5 8 21.5Z'}
  },
  {
    id :'toilet2Basin',
    offsetX: 157,
    offsetY: 298 ,
    // Size of the node
    width: 30,
    height: 25,
    shape:{ type : 'Path', data:'M1 9C1 4.58172 4.58172 1 9 1H57C61.4183 1 65 4.58172 65 9V41C65 45.4183 61.4183 49 57 49H9C4.58172 49 1 45.4183 1 41V9Z M7 13C7 10.7909 8.79086 9 11 9H55C57.2091 9 59 10.7909 59 13V37C59 39.2091 57.2091 41 55 41H11C8.79086 41 7 39.2091 7 37V13Z M35 25.5C35 26.8807 33.8807 28 32.5 28C31.1193 28 30 26.8807 30 25.5C30 24.1193 31.1193 23 32.5 23C33.8807 23 35 24.1193 35 25.5Z M31 9C31 9 31.5 9.5 32.5 9.5C33.5 9.5 34 9 34 9L34.8083 19.5074C34.9117 20.8519 33.8486 22 32.5 22C31.1514 22 30.0883 20.8519 30.1917 19.5074L31 9Z M36 5.5C36 7.433 34.433 9 32.5 9C30.567 9 29 7.433 29 5.5C29 3.567 30.567 2 32.5 2C34.433 2 36 3.567 36 5.5Z'}
  },
  {
    id :'toilet2Faucet',
    offsetX: 42,
    offsetY: 305,
    // Size of the node
    width: 23,
    height: 37,
    rotateAngle:-90,
    shape:{ type : 'Path', data:'M46.989 33.0731C46.989 53.4671 37.3818 69.9996 25.5307 69.9996C13.6795 69.9996 4.07227 53.4671 4.07227 33.0731C4.07227 19.1497 4 18 4 18C4.17549 18.0144 15.9306 18.2553 26.5002 17.9993C36.1582 17.7654 46.989 17.9999 46.989 17.9999C46.989 17.9999 46.989 21.6119 46.989 33.0731Z M41 44.5C41 54.7173 34.0604 63 25.5 63C16.9396 63 10 54.7173 10 44.5C10 34.2827 16.9396 26 25.5 26C34.0604 26 41 34.2827 41 44.5Z M1 3.61538C1 2.17095 2.17095 1 3.61538 1H46.3846C47.8291 1 49 2.17095 49 3.61538V15.3846C49 16.8291 47.8291 18 46.3846 18H3.61538C2.17095 18 1 16.8291 1 15.3846V3.61538Z M26.9995 9C26.9995 10.1046 26.1041 11 24.9995 11C23.8949 11 22.9995 10.1046 22.9995 9C22.9995 7.89543 23.8949 7 24.9995 7C26.1041 7 26.9995 7.89543 26.9995 9Z M31 34C31 38.4183 28.3137 42 25 42C21.6863 42 19 38.4183 19 34C19 29.5817 21.6863 26 25 26C28.3137 26 31 29.5817 31 34Z'}
  },
  {
    id :'room2Window',
    offsetX: 118,
    offsetY: 481,
    // Size of the node
    width: 80,
    height: 4,
    shape:{ type : 'Path', data:'M22 5.5L124 5.50001M145 9L128 9V1L145 1V9ZM1 1L18 1L18 9L1 9L1 1ZM128 8L124 8V2L128 2V8ZM18 2L22 2L22 8L18 8L18 2Z'}
  },
  {
    id :'room2Window2',
    offsetX: 20,
    offsetY: 396,
    // Size of the node
    width: 51,
    height: 4,
    rotateAngle:90,
    shape:{ type : 'Path', data:'M22 5.5L124 5.50001M145 9L128 9V1L145 1V9ZM1 1L18 1L18 9L1 9L1 1ZM128 8L124 8V2L128 2V8ZM18 2L22 2L22 8L18 8L18 2Z'}
  },
  {
    id :'room2Door',
    offsetX: 212,
    offsetY:300,
    // Size of the node
    width: 52,
    height: 38,

   rotateAngle:180,
    shape:{ type : 'Path', data:'M1 71L1 79L72 79V71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71'}
  },
  {
    id :'room2Bed',
    offsetX: 69,
    offsetY: 402,
    // Size of the node
    width: 44,
    height: 87,
    rotateAngle:-90,
    shape:{ type : 'Path', data:'M1 2C1 1.44771 1.44772 1 2 1H26C26.5523 1 27 1.44772 27 2V54C27 54.5523 26.5523 55 26 55H2C1.44772 55 1 54.5523 1 54V2Z M1 27.5941C1 27.5432 1.0038 27.4928 1.01218 27.4426C1.13134 26.7284 2.13402 21.153 4.41646 21.0198C4.47147 21.0165 4.52813 21.0118 4.58296 21.0063C7.51272 20.7131 9.98932 30.7524 14.8322 30.9965C14.9423 31.002 15.0553 30.9826 15.1593 30.946C18.0006 29.9475 18.036 28.9499 20 28.5008C22.6744 27.8892 25.3331 28.7977 26.4505 29.2665C26.794 29.4106 27 29.7509 27 30.1234V52.0177C27 52.5699 26.5523 53.0177 26 53.0177H2C1.44772 53.0177 1 52.5699 1 52.0177V27.5941Z M7.47077 8.3988C7.27248 7.71969 7.76957 7 8.47703 7H19.0951C19.901 7 20.4243 7.93945 20.1178 8.68485C19.7917 9.47806 19.5 10.4742 19.5 11.5C19.5 12.5349 19.7571 13.4842 20.0583 14.2413C20.363 15.007 19.824 16 19 16H8.47703C7.76957 16 7.27248 15.2803 7.47077 14.6012C7.73012 13.7129 8 12.539 8 11.5C8 10.461 7.73012 9.28707 7.47077 8.3988Z'}
  },
  {
    id :'room2Table',
    offsetX: 210,
    offsetY: 464,
    // Size of the node
    width: 37,
    height: 25,
    shape:{ type : 'Path', data:'M4 5C4 4.44772 4.44772 4 5 4H83C83.5523 4 84 4.44772 84 5V53C84 53.5523 83.5523 54 83 54H5C4.44772 54 4 53.5523 4 53V5Z M4 6.5C4 6.77614 3.77462 7.00425 3.50231 6.95843C3.08607 6.88841 2.68736 6.73099 2.33329 6.49441C1.83994 6.16477 1.45543 5.69623 1.22836 5.14805C1.0013 4.59987 0.94189 3.99667 1.05765 3.41473C1.1734 2.83279 1.45912 2.29824 1.87868 1.87868C2.29824 1.45912 2.83279 1.1734 3.41473 1.05765C3.99667 0.94189 4.59987 1.0013 5.14805 1.22836C5.69623 1.45543 6.16477 1.83994 6.49441 2.33329C6.73099 2.68736 6.88841 3.08607 6.95843 3.50231C7.00424 3.77462 6.77614 4 6.5 4L4.5 4C4.22386 4 4 4.22386 4 4.5L4 6.5Z M81.5 4C81.2239 4 80.9958 3.77462 81.0416 3.50231C81.1116 3.08607 81.269 2.68736 81.5056 2.33329C81.8352 1.83994 82.3038 1.45543 82.852 1.22836C83.4001 1.0013 84.0033 0.94189 84.5853 1.05765C85.1672 1.1734 85.7018 1.45912 86.1213 1.87868C86.5409 2.29824 86.8266 2.83279 86.9424 3.41473C87.0581 3.99667 86.9987 4.59987 86.7716 5.14805C86.5446 5.69623 86.1601 6.16477 85.6667 6.49441C85.3126 6.73099 84.9139 6.88841 84.4977 6.95843C84.2254 7.00424 84 6.77614 84 6.5V4.5C84 4.22386 83.7761 4 83.5 4L81.5 4Z M6.5 54C6.77614 54 7.00425 54.2254 6.95843 54.4977C6.88841 54.9139 6.73099 55.3126 6.49441 55.6667C6.16477 56.1601 5.69623 56.5446 5.14805 56.7716C4.59987 56.9987 3.99667 57.0581 3.41473 56.9424C2.83279 56.8266 2.29824 56.5409 1.87868 56.1213C1.45912 55.7018 1.1734 55.1672 1.05765 54.5853C0.94189 54.0033 1.0013 53.4001 1.22836 52.852C1.45543 52.3038 1.83994 51.8352 2.33329 51.5056C2.68736 51.269 3.08607 51.1116 3.50231 51.0416C3.77462 50.9958 4 51.2239 4 51.5V53.5C4 53.7761 4.22386 54 4.5 54H6.5Z M84 51.5C84 51.2239 84.2254 50.9958 84.4977 51.0416C84.9139 51.1116 85.3126 51.269 85.6667 51.5056C86.1601 51.8352 86.5446 52.3038 86.7716 52.852C86.9987 53.4001 87.0581 54.0033 86.9424 54.5853C86.8266 55.1672 86.5409 55.7018 86.1213 56.1213C85.7018 56.5409 85.1672 56.8266 84.5853 56.9424C84.0033 57.0581 83.4001 56.9987 82.852 56.7716C82.3038 56.5446 81.8352 56.1601 81.5056 55.6667C81.269 55.3126 81.1116 54.9139 81.0416 54.4977C80.9958 54.2254 81.2239 54 81.5 54H83.5C83.7761 54 84 53.7761 84 53.5V51.5Z'}
  },
  {
    id :'room2LampTable',
    offsetX: 38,
    offsetY: 452,
    // Size of the node
    width: 26,
    height: 28,
    shape:{ type : 'Path', data:'M79 1H3C1.89543 1 1 1.89543 1 3V49C1 50.1046 1.89543 51 3 51H79C80.1046 51 81 50.1046 81 49V3C81 1.89543 80.1046 1 79 1Z'}
  },
  {
    id :'room2Chair',
    offsetX: 210,
    offsetY: 436,
    // Size of the node
    width: 25,
    height: 25,
    shape:{ type : 'Path', data:'M7 27.5V56C7 56.5523 6.55228 57 6 57H2C1.44772 57 1 56.5523 1 56V26.5C1 12.4167 12.4167 1 26.5 1C40.5833 1 52 12.4167 52 26.5V56C52 56.5523 51.5523 57 51 57H47C46.4477 57 46 56.5523 46 56V27.5M7 27.5C7 16.7304 15.7304 8 26.5 8C37.2696 8 46 16.7304 46 27.5M7 27.5V58C7 58.5523 7.44772 59 8 59H45C45.5523 59 46 58.5523 46 58V27.5'}
  },
  {
    id :'room2Lamp',
    offsetX: 38,
    offsetY:452,
    // Size of the node
    width: 20,
    height: 20,
    shape:{ type : 'Path', data:"M17 7C11.4772 7 7 11.4772 7 17C7 22.5228 11.4772 27 17 27C22.5228 27 27 22.5228 27 17C27 11.4772 22.5228 7 17 7ZM17 7V13.5M20.2363 18.5593L25.3654 21.3093M13.7544 18.4305L8.2541 21.6805M33 17C33 25.8366 25.8366 33 17 33C8.16344 33 1 25.8366 1 17C1 8.16344 8.16344 1 17 1C25.8366 1 33 8.16344 33 17ZM25.5 17C25.5 21.6944 21.6944 25.5 17 25.5C12.3056 25.5 8.5 21.6944 8.5 17C8.5 12.3056 12.3056 8.5 17 8.5C21.6944 8.5 25.5 12.3056 25.5 17ZM21 17C21 19.2091 19.2091 21 17 21C14.7909 21 13 19.2091 13 17C13 14.7909 14.7909 13 17 13C19.2091 13 21 14.7909 21 17Z"}
  },
  {
    id :'room2Warddrobe',
    offsetX: 216,
    offsetY: 378,
    // Size of the node
    width: 73,
    height: 35,
    rotateAngle:90,
    shape:{ type : 'Path', data:"M50.6443 54.406L76 29L80.9998 28.9502H85.9996L55.594 59.3558L50.6443 54.406Z M12 29L36.9996 54.4053L32.0498 59.3551L2 29H12Z M70.7969 44.8594C70.6017 44.6642 70.6017 44.3476 70.7969 44.1523C70.9922 43.957 71.3088 43.957 71.504 44.1523L72.9182 45.5665C73.1135 45.7618 73.1135 46.0784 72.9182 46.2736C72.723 46.4689 72.4064 46.4689 72.2111 46.2736L70.7969 44.8594Z M16.1406 44.1524C16.3358 43.9571 16.6524 43.9571 16.8477 44.1524C17.043 44.3476 17.043 44.6642 16.8477 44.8595L15.4335 46.2737C15.2382 46.469 14.9216 46.469 14.7264 46.2737C14.5311 46.0784 14.5311 45.7619 14.7264 45.5666L16.1406 44.1524Z M1 1L87 1V29H1L1 1Z"}
  },
  {
    id :'mainDoor',
    offsetX: 320,
    offsetY:371,
    // Size of the node
    width: 76,
    height: 63,
    shape:{ type : 'Path', data:"M143 71V79L1 79L1 71M143 71L1 71M143 71V1H142C103.34 1 72 32.3401 72 71M143 71H72M1 71L1 1H2C40.6599 1 72 32.3401 72 71M1 71L72 71M72 78.5V71"}
  },
  {
    id :'window',
    offsetX: 490,
    offsetY:399,
    // Size of the node
    width: 100,
    height: 5,
   shape:{ type : 'Path', data:"M22 3.5L124 3.50001M22 6.5L124 6.50001M145 9L128 9V1L145 1V9ZM1 1L18 1L18 9L1 9L1 1ZM128 8L124 8V2L128 2V8ZM18 2L22 2L22 8L18 8L18 2Z"}
  },
  {
    id :'sofa',
    offsetX: 480,
    offsetY:370,
    // Size of the node
    width: 102,
    height: 36,
    rotateAngle:180,
    shape:{ type : 'Path', data:'M95 49H130C131.657 49 133 47.6569 133 46V20C133 18.3431 131.657 17 130 17H20C18.3431 17 17 18.3431 17 20V46C17 47.6569 18.3431 49 20 49H95ZM95 49V17H56V49H95ZM145 17H137C134.791 17 133 18.7909 133 21V45C133 47.2091 134.791 49 137 49H145C147.209 49 149 47.2091 149 45V21C149 18.7909 147.209 17 145 17ZM145 17H5M145 17C147.209 17 149 15.2091 149 13V5.00001C149 2.79087 147.209 1.00001 145 1.00001L5 1C2.79086 1 1 2.79086 1 5L1 13C1 15.2091 2.79086 17 5 17M5 17H13C15.2091 17 17 18.7909 17 21V45C17 47.2091 15.2091 49 13 49H5C2.79086 49 1 47.2091 1 45L1 21C1 18.7909 2.79086 17 5 17Z'}
  },
  {
    id :'doubleSofa',
    offsetX: 479,
    offsetY:298,
    // Size of the node
    width: 100,
    height: 35,
    
    shape:{ type : 'Path', data:'M55 17H20C18.3431 17 17 18.3431 17 20V46C17 47.6569 18.3431 49 20 49H55M55 17V49M55 17H91C92.6569 17 94 18.3431 94 20V46C94 47.6569 92.6569 49 91 49H55M106 17H98C95.7909 17 94 18.7909 94 21V45C94 47.2091 95.7909 49 98 49H106C108.209 49 110 47.2091 110 45V21C110 18.7909 108.209 17 106 17ZM106 17H5M106 17C108.209 17 110 15.2091 110 13V5.00001C110 2.79087 108.209 1.00001 106 1.00001L5 1C2.79086 1 1 2.79086 1 5L1 13C1 15.2091 2.79086 17 5 17M5 17H13C15.2091 17 17 18.7909 17 21V45C17 47.2091 15.2091 49 13 49H5C2.79086 49 1 47.2091 1 45L1 21C1 18.7909 2.79086 17 5 17Z'}
  },
  {
    id :'singleSofa',
    offsetX: 405,
    offsetY:333,
    // Size of the node
    width: 30,
    height: 30,
    rotateAngle:-90,
    shape:{ type : 'Path', data:"M39.3572 42.5001C33.5879 44.3644 23.3389 47.3726 11.0312 42.8982M39.3572 42.5001C38.9901 32.896 39.1315 17.3601 40.2727 11.5C38.1563 12.9176 38.0909 13 33.1818 14C28.8182 14.8889 26.0909 14.5 26.0909 14.5C26.0909 14.5 22.2727 14.5 19 14C15.7273 13.5 14.0909 13 10.2727 10.9155C10.7143 16.2832 11.7887 29.6759 11.0312 42.8982M39.3572 42.5001C39.4226 44.2122 40.7919 45.5708 42.5027 45.6646L45.163 45.8105C47.0566 45.9143 48.6622 44.438 48.7092 42.5421C48.8219 38.0026 49 29.9987 49 24.7736C49 20.1829 48.725 13.4473 48.5055 8.8007C48.3595 5.71097 46.1103 3.14326 43.0526 2.67589C38.2269 1.93827 30.8617 1 24.619 1C18.1203 1 10.557 2.69472 5.86868 3.94263C3.15069 4.66609 1.30579 7.10774 1.22538 9.91921C1.12006 13.6016 1 19.0538 1 24.7736C1 31.5601 1.16901 38.7232 1.28189 42.7504C1.33277 44.5656 2.82066 46 4.63658 46H7.70901C9.46516 46 10.9308 44.6515 11.0312 42.8982M22.2195 21.2201C22.2195 22.1507 21.4652 22.9051 20.5346 22.9051C19.604 22.9051 18.8496 22.1507 18.8496 21.2201C18.8496 20.2895 19.604 19.5352 20.5346 19.5352C21.4652 19.5352 22.2195 20.2895 22.2195 21.2201ZM22.2195 27.9594C22.2195 28.89 21.4652 29.6443 20.5346 29.6443C19.604 29.6443 18.8496 28.89 18.8496 27.9594C18.8496 27.0288 19.604 26.2744 20.5346 26.2744C21.4652 26.2744 22.2195 27.0288 22.2195 27.9594ZM22.2195 34.6986C22.2195 35.6292 21.4652 36.3836 20.5346 36.3836C19.604 36.3836 18.8496 35.6292 18.8496 34.6986C18.8496 33.7681 19.604 33.0137 20.5346 33.0137C21.4652 33.0137 22.2195 33.7681 22.2195 34.6986ZM32.3294 21.2201C32.3294 22.1507 31.575 22.9051 30.6444 22.9051C29.7139 22.9051 28.9595 22.1507 28.9595 21.2201C28.9595 20.2895 29.7139 19.5352 30.6444 19.5352C31.575 19.5352 32.3294 20.2895 32.3294 21.2201ZM32.3294 27.9594C32.3294 28.89 31.575 29.6443 30.6444 29.6443C29.7139 29.6443 28.9595 28.89 28.9595 27.9594C28.9595 27.0288 29.7139 26.2744 30.6444 26.2744C31.575 26.2744 32.3294 27.0288 32.3294 27.9594ZM32.3294 34.6986C32.3294 35.6292 31.575 36.3836 30.6444 36.3836C29.7139 36.3836 28.9595 35.6292 28.9595 34.6986C28.9595 33.7681 29.7139 33.0137 30.6444 33.0137C31.575 33.0137 32.3294 33.7681 32.3294 34.6986Z"}
  },
  {
    id :'sofaTable',
    offsetX: 480,
    offsetY:336,
    // Size of the node
    width: 33,
    height: 20,
    shape:{ type : 'Path', data:'M4 5C4 4.44772 4.44772 4 5 4H83C83.5523 4 84 4.44772 84 5V53C84 53.5523 83.5523 54 83 54H5C4.44772 54 4 53.5523 4 53V5Z M4 6.5C4 6.77614 3.77462 7.00425 3.50231 6.95843C3.08607 6.88841 2.68736 6.73099 2.33329 6.49441C1.83994 6.16477 1.45543 5.69623 1.22836 5.14805C1.0013 4.59987 0.94189 3.99667 1.05765 3.41473C1.1734 2.83279 1.45912 2.29824 1.87868 1.87868C2.29824 1.45912 2.83279 1.1734 3.41473 1.05765C3.99667 0.94189 4.59987 1.0013 5.14805 1.22836C5.69623 1.45543 6.16477 1.83994 6.49441 2.33329C6.73099 2.68736 6.88841 3.08607 6.95843 3.50231C7.00424 3.77462 6.77614 4 6.5 4L4.5 4C4.22386 4 4 4.22386 4 4.5L4 6.5Z M81.5 4C81.2239 4 80.9958 3.77462 81.0416 3.50231C81.1116 3.08607 81.269 2.68736 81.5056 2.33329C81.8352 1.83994 82.3038 1.45543 82.852 1.22836C83.4001 1.0013 84.0033 0.94189 84.5853 1.05765C85.1672 1.1734 85.7018 1.45912 86.1213 1.87868C86.5409 2.29824 86.8266 2.83279 86.9424 3.41473C87.0581 3.99667 86.9987 4.59987 86.7716 5.14805C86.5446 5.69623 86.1601 6.16477 85.6667 6.49441C85.3126 6.73099 84.9139 6.88841 84.4977 6.95843C84.2254 7.00424 84 6.77614 84 6.5V4.5C84 4.22386 83.7761 4 83.5 4L81.5 4Z M6.5 54C6.77614 54 7.00425 54.2254 6.95843 54.4977C6.88841 54.9139 6.73099 55.3126 6.49441 55.6667C6.16477 56.1601 5.69623 56.5446 5.14805 56.7716C4.59987 56.9987 3.99667 57.0581 3.41473 56.9424C2.83279 56.8266 2.29824 56.5409 1.87868 56.1213C1.45912 55.7018 1.1734 55.1672 1.05765 54.5853C0.94189 54.0033 1.0013 53.4001 1.22836 52.852C1.45543 52.3038 1.83994 51.8352 2.33329 51.5056C2.68736 51.269 3.08607 51.1116 3.50231 51.0416C3.77462 50.9958 4 51.2239 4 51.5V53.5C4 53.7761 4.22386 54 4.5 54H6.5Z M84 51.5C84 51.2239 84.2254 50.9958 84.4977 51.0416C84.9139 51.1116 85.3126 51.269 85.6667 51.5056C86.1601 51.8352 86.5446 52.3038 86.7716 52.852C86.9987 53.4001 87.0581 54.0033 86.9424 54.5853C86.8266 55.1672 86.5409 55.7018 86.1213 56.1213C85.7018 56.5409 85.1672 56.8266 84.5853 56.9424C84.0033 57.0581 83.4001 56.9987 82.852 56.7716C82.3038 56.5446 81.8352 56.1601 81.5056 55.6667C81.269 55.3126 81.1116 54.9139 81.0416 54.4977C80.9958 54.2254 81.2239 54 81.5 54H83.5C83.7761 54 84 53.7761 84 53.5V51.5Z'}
  },
  {
    id :'flatTV',
    offsetX: 573,
    offsetY:337,
    // Size of the node
    width: 68,
    height: 9,
    rotateAngle:90,
    shape:{ type : 'Path', data:'M1 14H92M1 14V19H92V14M1 14V9H92V14M37 1V6M39 1V6M41 1V6M43 1V6M45 1V6M47 1V6M49 1V6M51 1V6M53 1V6M55 1V6M23 1H70L76 6H17L23 1ZM5 6H88V9H5V6Z'}
  },
  {
    id :'plantTable',
    offsetX: 395,
    offsetY:376,
    // Size of the node
    width: 33,
    height: 27,
    shape:{ type : 'Path', data:"M57 29C57 44.464 44.464 57 29 57C13.536 57 1 44.464 1 29C1 13.536 13.536 1 29 1C44.464 1 57 13.536 57 29Z"}
  },
  {
    id :'plant',
    offsetX: 395,
    offsetY:376,
    // Size of the node
    width: 22,
    height: 20,
    shape:{ type : 'Path', data:'M25.9813 23.5141C27.2901 23.5993 48.6838 19.0468 41.4746 10.8333C36.916 5.63963 21.1089 23.1968 25.9813 23.5141Z M23.6253 25.9234C23.1736 27.1547 21.4942 48.9629 31.4103 44.3689C37.6806 41.464 25.3067 21.3392 23.6253 25.9234Z M25.5989 25.6003C26.3978 26.6405 43.9262 39.7237 45.3483 28.888C46.2474 22.0363 22.6249 21.7278 25.5989 25.6003Z M24.7197 20.7567C25.6675 19.8502 36.7808 1.01108 25.8549 0.76778C18.9461 0.613932 21.191 24.1316 24.7197 20.7567Z M20.8885 22.8171C19.6966 22.2698 -1.91128 18.8763 1.88665 29.1238C4.2882 35.6035 25.3258 24.8547 20.8885 22.8171Z M21.6607 25.6193C20.3938 25.9588 1.59406 37.1385 11.0585 42.6028C17.0432 46.0581 26.3771 24.3556 21.6607 25.6193Z M22.3667 20.2554C21.8975 19.0306 8.82513 1.49408 4.37366 11.475C1.55885 17.7863 24.1136 24.815 22.3667 20.2554Z M40.0382 18.2498C40.7878 20.1543 41.1995 22.2289 41.1995 24.3996C41.1995 24.5507 41.1975 24.7013 41.1935 24.8515M35.2235 11.5507C33.6921 10.2594 31.9267 9.2368 30 8.55572M39 32.7159C37.5069 35.3317 35.3311 37.5074 32.7153 39.0004M24.8419 41.1939C24.6949 41.1977 24.5474 41.1996 24.3995 41.1996C21.7821 41.1996 19.3046 40.6011 17.0963 39.5334M10.7727 34.2278C9.9752 33.1239 9.30848 31.9193 8.79533 30.6367M7.70563 22.5004C7.89672 20.8019 8.34106 19.1801 9 17.6736M13.9123 11.274C16.1576 9.47777 18.8737 8.24563 21.846 7.79239M25.9813 23.5141C27.2901 23.5993 48.6838 19.0468 41.4746 10.8333C36.916 5.63963 21.1089 23.1968 25.9813 23.5141ZM23.6253 25.9234C23.1736 27.1547 21.4942 48.9629 31.4103 44.3689C37.6806 41.464 25.3067 21.3392 23.6253 25.9234ZM25.5989 25.6003C26.3978 26.6405 43.9262 39.7237 45.3483 28.888C46.2474 22.0363 22.6249 21.7278 25.5989 25.6003ZM24.7197 20.7567C25.6675 19.8502 36.7808 1.01108 25.8549 0.76778C18.9461 0.613932 21.191 24.1316 24.7197 20.7567ZM20.8885 22.8171C19.6966 22.2698 -1.91128 18.8763 1.88665 29.1238C4.2882 35.6035 25.3258 24.8547 20.8885 22.8171ZM21.6607 25.6193C20.3938 25.9588 1.59406 37.1385 11.0585 42.6028C17.0432 46.0581 26.3771 24.3556 21.6607 25.6193ZM22.3667 20.2554C21.8975 19.0306 8.82513 1.49408 4.37366 11.475C1.55885 17.7863 24.1136 24.815 22.3667 20.2554Z'}
  },
  {
    id :'diningTable',
    offsetX: 370,
    offsetY:176,
    // Size of the node
    width: 100,
    height: 90,
    shape:{ type : 'Path', data:"M25.0284 6.47992C24.7452 3.54248 27.0543 1 30.0053 1H45.9947C48.9457 1 51.2548 3.54248 50.9716 6.47992L50.15 15L25.85 15L25.0284 6.47992ZM58.0284 6.47992C57.7452 3.54248 60.0543 1 63.0053 1H78.9947C81.9457 1 84.2548 3.54248 83.9716 6.47992L83.15 15L58.85 15L58.0284 6.47992Z M84.9716 73.5201C85.2548 76.4575 82.9457 79 79.9947 79H64.0053C61.0543 79 58.7452 76.4575 59.0284 73.5201L59.85 65H84.15L84.9716 73.5201Z M51.9716 73.5201C52.2548 76.4575 49.9457 79 46.9947 79H31.0053C28.0543 79 25.7452 76.4575 26.0284 73.5201L26.85 65H51.15L51.9716 73.5201Z M6.47992 53.4716C3.54249 53.7548 1 51.4457 1 48.4947L1 32.5053C1 29.5543 3.54249 27.2452 6.47992 27.5284L15 28.35V52.65L6.47992 53.4716Z M103.52 27.5284C106.458 27.2452 109 29.5543 109 32.5053V48.4947C109 51.4457 106.458 53.7548 103.52 53.4716L95 52.65V28.35L103.52 27.5284Z M91 15H19C16.7909 15 15 16.7909 15 19V61C15 63.2091 16.7909 65 19 65H91C93.2091 65 95 63.2091 95 61V19C95 16.7909 93.2091 15 91 15Z M50.15 15V15.5H50.6041L50.6477 15.048L50.15 15ZM25.85 15L25.3523 15.048L25.3959 15.5H25.85V15ZM50.9716 6.47992L50.4739 6.43192L50.9716 6.47992ZM25.0284 6.47992L24.5307 6.52791L25.0284 6.47992ZM32 1V0.5L31.5 0.5V1H32ZM45 1H45.5V0.500001L45 0.500001V1ZM36 6V5.5V6ZM32 2L32.5 2V2H32ZM41 6V6.5V6ZM45 2H45.5H45ZM83.15 15V15.5H83.6041L83.6477 15.048L83.15 15ZM58.85 15L58.3523 15.048L58.3959 15.5H58.85V15ZM83.9716 6.47992L83.4739 6.43192L83.9716 6.47992ZM58.0284 6.47992L58.5261 6.43192L58.0284 6.47992ZM65 1V0.5L64.5 0.5V1H65ZM78 1H78.5V0.500001L78 0.500001V1ZM69 6V5.5V6ZM65 2L65.5 2V2H65ZM74 6V6.5V6ZM78 2H78.5H78ZM59.85 65V64.5H59.3959L59.3523 64.952L59.85 65ZM84.15 65L84.6477 64.952L84.6041 64.5H84.15V65ZM59.0284 73.5201L59.5261 73.5681L59.0284 73.5201ZM84.9716 73.5201L84.4739 73.5681L84.9716 73.5201ZM78 79V79.5H78.5V79H78ZM65 79H64.5V79.5H65V79ZM74 74V73.5V74ZM78 78H77.5H78ZM69 74V74.5V74ZM65 78H64.5H65ZM26.85 65V64.5H26.3959L26.3523 64.952L26.85 65ZM51.15 65L51.6477 64.952L51.6041 64.5H51.15V65ZM26.0284 73.5201L26.5261 73.5681L26.0284 73.5201ZM51.9716 73.5201L51.4739 73.5681L51.9716 73.5201ZM15 28.35H15.5V27.8959L15.048 27.8523L15 28.35ZM15 52.65L15.048 53.1477L15.5 53.1041V52.65H15ZM1 32.5053H0.500002H1ZM6.47992 27.5284L6.43193 28.0261L6.47992 27.5284ZM1 48.4947H1.5H1ZM6.47992 53.4716L6.43192 52.9739L6.47992 53.4716ZM45 79V79.5H45.5V79H45ZM32 79H31.5V79.5H32V79ZM41 74V73.5V74ZM45 78H44.5H45ZM36 74V74.5V74ZM32 78H31.5H32ZM1 47H0.5L0.5 47.5H1V47ZM1 34V33.5H0.500002L0.500002 34H1ZM6 43H6.5H6ZM2 47L2 46.5H2V47ZM6 38H5.5H6ZM2 34V33.5V34ZM95 52.65H94.5V53.1041L94.952 53.1477L95 52.65ZM95 28.35L94.952 27.8523L94.5 27.8959V28.35H95ZM109 48.4947H109.5H109ZM103.52 53.4716L103.472 53.9693L103.52 53.4716ZM109 32.5053H108.5H109ZM103.52 27.5284L103.568 28.0261L103.52 27.5284ZM109 34H109.5V33.5H109V34ZM109 47V47.5H109.5V47H109ZM104 38H103.5H104ZM108 34V34.5V34ZM104 43H104.5H104ZM108 47V47.5V47ZM30.0053 1.5H45.9947V0.5H30.0053V1.5ZM50.4739 6.43192L49.6523 14.952L50.6477 15.048L51.4693 6.52791L50.4739 6.43192ZM50.15 14.5L25.85 14.5V15.5L50.15 15.5V14.5ZM26.3477 14.952L25.5261 6.43192L24.5307 6.52791L25.3523 15.048L26.3477 14.952ZM45.9947 1.5C48.6506 1.5 50.7288 3.78824 50.4739 6.43192L51.4693 6.52791C51.7808 3.29673 49.2408 0.5 45.9947 0.5V1.5ZM30.0053 0.5C26.7592 0.5 24.2192 3.29673 24.5307 6.52791L25.5261 6.43192C25.2712 3.78824 27.3494 1.5 30.0053 1.5V0.5ZM41 5.5L36 5.5V6.5L41 6.5V5.5ZM32.5 2V1H31.5V2H32.5ZM32 1.5L45 1.5V0.500001L32 0.5V1.5ZM44.5 1V2H45.5V1H44.5ZM36 5.5C34.067 5.5 32.5 3.933 32.5 2L31.5 2C31.5 4.48528 33.5147 6.5 36 6.5V5.5ZM41 6.5C43.4853 6.5 45.5 4.48528 45.5 2H44.5C44.5 3.933 42.933 5.5 41 5.5V6.5ZM63.0053 1.5H78.9947V0.5H63.0053V1.5ZM83.4739 6.43192L82.6523 14.952L83.6477 15.048L84.4693 6.52791L83.4739 6.43192ZM83.15 14.5L58.85 14.5V15.5L83.15 15.5V14.5ZM59.3477 14.952L58.5261 6.43192L57.5307 6.52791L58.3523 15.048L59.3477 14.952ZM78.9947 1.5C81.6506 1.5 83.7288 3.78824 83.4739 6.43192L84.4693 6.52791C84.7809 3.29673 82.2408 0.5 78.9947 0.5V1.5ZM63.0053 0.5C59.7592 0.5 57.2192 3.29673 57.5307 6.52791L58.5261 6.43192C58.2712 3.78824 60.3494 1.5 63.0053 1.5V0.5ZM74 5.5L69 5.5V6.5L74 6.5V5.5ZM65.5 2V1H64.5V2H65.5ZM65 1.5L78 1.5V0.500001L65 0.5V1.5ZM77.5 1V2H78.5V1H77.5ZM69 5.5C67.067 5.5 65.5 3.933 65.5 2L64.5 2C64.5 4.48528 66.5147 6.5 69 6.5V5.5ZM74 6.5C76.4853 6.5 78.5 4.48528 78.5 2H77.5C77.5 3.933 75.933 5.5 74 5.5V6.5ZM79.9947 78.5H64.0053V79.5H79.9947V78.5ZM59.5261 73.5681L60.3477 65.048L59.3523 64.952L58.5307 73.4721L59.5261 73.5681ZM59.85 65.5H84.15V64.5H59.85V65.5ZM83.6523 65.048L84.4739 73.5681L85.4693 73.4721L84.6477 64.952L83.6523 65.048ZM64.0053 78.5C61.3494 78.5 59.2712 76.2118 59.5261 73.5681L58.5307 73.4721C58.2192 76.7033 60.7592 79.5 64.0053 79.5V78.5ZM79.9947 79.5C83.2408 79.5 85.7809 76.7033 85.4693 73.4721L84.4739 73.5681C84.7288 76.2118 82.6506 78.5 79.9947 78.5V79.5ZM69 74.5H74V73.5H69V74.5ZM77.5 78V79H78.5V78H77.5ZM78 78.5H65V79.5H78V78.5ZM65.5 79V78H64.5V79H65.5ZM74 74.5C75.933 74.5 77.5 76.067 77.5 78H78.5C78.5 75.5147 76.4853 73.5 74 73.5V74.5ZM69 73.5C66.5147 73.5 64.5 75.5147 64.5 78H65.5C65.5 76.067 67.067 74.5 69 74.5V73.5ZM46.9947 78.5H31.0053V79.5H46.9947V78.5ZM26.5261 73.5681L27.3477 65.048L26.3523 64.952L25.5307 73.4721L26.5261 73.5681ZM26.85 65.5H51.15V64.5H26.85V65.5ZM50.6523 65.048L51.4739 73.5681L52.4693 73.4721L51.6477 64.952L50.6523 65.048ZM31.0053 78.5C28.3494 78.5 26.2712 76.2118 26.5261 73.5681L25.5307 73.4721C25.2192 76.7033 27.7592 79.5 31.0053 79.5V78.5ZM46.9947 79.5C50.2408 79.5 52.7808 76.7033 52.4693 73.4721L51.4739 73.5681C51.7288 76.2118 49.6506 78.5 46.9947 78.5V79.5ZM1.5 48.4947L1.5 32.5053H0.500002L0.500001 48.4947H1.5ZM6.43193 28.0261L14.952 28.8477L15.048 27.8523L6.52791 27.0307L6.43193 28.0261ZM14.5 28.35V52.65H15.5V28.35H14.5ZM14.952 52.1523L6.43192 52.9739L6.52791 53.9693L15.048 53.1477L14.952 52.1523ZM1.5 32.5053C1.5 29.8494 3.78824 27.7712 6.43193 28.0261L6.52791 27.0307C3.29674 26.7192 0.500002 29.2592 0.500002 32.5053H1.5ZM0.500001 48.4947C0.500001 51.7408 3.29673 54.2808 6.52791 53.9693L6.43192 52.9739C3.78824 53.2288 1.5 51.1506 1.5 48.4947H0.500001ZM36 74.5H41V73.5H36V74.5ZM44.5 78V79H45.5V78H44.5ZM45 78.5H32V79.5H45V78.5ZM32.5 79V78H31.5V79H32.5ZM41 74.5C42.933 74.5 44.5 76.067 44.5 78H45.5C45.5 75.5147 43.4853 73.5 41 73.5V74.5ZM36 73.5C33.5147 73.5 31.5 75.5147 31.5 78H32.5C32.5 76.067 34.067 74.5 36 74.5V73.5ZM5.5 38L5.5 43H6.5L6.5 38H5.5ZM2 46.5H1V47.5H2V46.5ZM1.5 47L1.5 34H0.500002L0.5 47H1.5ZM1 34.5H2V33.5H1V34.5ZM5.5 43C5.5 44.933 3.933 46.5 2 46.5L2 47.5C4.48528 47.5 6.5 45.4853 6.5 43H5.5ZM6.5 38C6.5 35.5147 4.48528 33.5 2 33.5L2 34.5C3.933 34.5 5.5 36.067 5.5 38H6.5ZM108.5 32.5053V48.4947H109.5V32.5053H108.5ZM103.568 52.9739L95.048 52.1523L94.952 53.1477L103.472 53.9693L103.568 52.9739ZM95.5 52.65V28.35H94.5V52.65H95.5ZM95.048 28.8477L103.568 28.0261L103.472 27.0307L94.952 27.8523L95.048 28.8477ZM108.5 48.4947C108.5 51.1506 106.212 53.2288 103.568 52.9739L103.472 53.9693C106.703 54.2808 109.5 51.7408 109.5 48.4947H108.5ZM109.5 32.5053C109.5 29.2592 106.703 26.7192 103.472 27.0307L103.568 28.0261C106.212 27.7712 108.5 29.8494 108.5 32.5053H109.5ZM104.5 43V38H103.5V43H104.5ZM108 34.5H109V33.5H108V34.5ZM108.5 34V47H109.5V34H108.5ZM109 46.5H108V47.5H109V46.5ZM104.5 38C104.5 36.067 106.067 34.5 108 34.5V33.5C105.515 33.5 103.5 35.5147 103.5 38H104.5ZM103.5 43C103.5 45.4853 105.515 47.5 108 47.5V46.5C106.067 46.5 104.5 44.933 104.5 43H103.5ZM19 15.5H91V14.5H19V15.5ZM94.5 19V61H95.5V19H94.5ZM91 64.5H19V65.5H91V64.5ZM15.5 61V19H14.5V61H15.5ZM19 64.5C17.067 64.5 15.5 62.933 15.5 61H14.5C14.5 63.4853 16.5147 65.5 19 65.5V64.5ZM94.5 61C94.5 62.933 92.933 64.5 91 64.5V65.5C93.4853 65.5 95.5 63.4853 95.5 61H94.5ZM91 15.5C92.933 15.5 94.5 17.067 94.5 19H95.5C95.5 16.5147 93.4853 14.5 91 14.5V15.5ZM19 14.5C16.5147 14.5 14.5 16.5147 14.5 19H15.5C15.5 17.067 17.067 15.5 19 15.5V14.5Z"}
  },
  {
    id :'room3Door',
    offsetX: 607,
    offsetY:298,
    // Size of the node
    width: 52,
    height: 38,
   rotateAngle:180,
    shape:{ type : 'Path', data:'M1 71L1 79L72 79V71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71'}
  },
  {
    id :'room3Window',
    offsetX: 740,
    offsetY: 480,
    // Size of the node
    width: 80,
    height: 4,
    shape:{ type : 'Path', data:'M22 5.5L124 5.50001M145 9L128 9V1L145 1V9ZM1 1L18 1L18 9L1 9L1 1ZM128 8L124 8V2L128 2V8ZM18 2L22 2L22 8L18 8L18 2Z'}
  },
  {
    id :'room3Bed',
    offsetX: 812,
    offsetY: 385,
    // Size of the node
    width: 68,
    height: 87,
    rotateAngle:90,
    shape:{ type : 'Path', data:'M1 54V2C1 1.44772 1.44772 1 2 1H44C44.5523 1 45 1.44771 45 2V54C45 54.5523 44.5523 55 44 55H2C1.44772 55 1 54.5523 1 54Z  M8 14V8C8 7.44772 8.44772 7 9 7H19C19.5523 7 20 7.44772 20 8V14C20 14.5523 19.5523 15 19 15H9C8.44772 15 8 14.5523 8 14Z M26 14V8C26 7.44772 26.4477 7 27 7H37C37.5523 7 38 7.44772 38 8V14C38 14.5523 37.5523 15 37 15H27C26.4477 15 26 14.5523 26 14Z M0.5 2V54H1.5V2H0.5ZM2 55.5H44V54.5H2V55.5ZM45.5 54V2H44.5V54H45.5ZM2 1.5H44V0.5H2V1.5ZM45.5 2C45.5 1.17157 44.8284 0.5 44 0.5V1.5C44.2761 1.5 44.5 1.72386 44.5 2H45.5ZM44 55.5C44.8284 55.5 45.5 54.8284 45.5 54H44.5C44.5 54.2761 44.2761 54.5 44 54.5V55.5ZM0.5 54C0.5 54.8284 1.17157 55.5 2 55.5V54.5C1.72386 54.5 1.5 54.2761 1.5 54H0.5ZM1.5 2C1.5 1.72386 1.72386 1.5 2 1.5V0.5C1.17157 0.5 0.5 1.17157 0.5 2H1.5ZM1 21.5H45V20.5H1V21.5ZM7.5 8V14H8.5V8H7.5ZM9 15.5H19V14.5H9V15.5ZM20.5 14V8H19.5V14H20.5ZM19 6.5H9V7.5H19V6.5ZM20.5 8C20.5 7.17157 19.8284 6.5 19 6.5V7.5C19.2761 7.5 19.5 7.72386 19.5 8H20.5ZM19 15.5C19.8284 15.5 20.5 14.8284 20.5 14H19.5C19.5 14.2761 19.2761 14.5 19 14.5V15.5ZM7.5 14C7.5 14.8284 8.17157 15.5 9 15.5V14.5C8.72386 14.5 8.5 14.2761 8.5 14H7.5ZM8.5 8C8.5 7.72386 8.72386 7.5 9 7.5V6.5C8.17157 6.5 7.5 7.17157 7.5 8H8.5ZM25.5 8V14H26.5V8H25.5ZM27 15.5H37V14.5H27V15.5ZM38.5 14V8H37.5V14H38.5ZM37 6.5H27V7.5H37V6.5ZM38.5 8C38.5 7.17157 37.8284 6.5 37 6.5V7.5C37.2761 7.5 37.5 7.72386 37.5 8H38.5ZM37 15.5C37.8284 15.5 38.5 14.8284 38.5 14H37.5C37.5 14.2761 37.2761 14.5 37 14.5V15.5ZM25.5 14C25.5 14.8284 26.1716 15.5 27 15.5V14.5C26.7239 14.5 26.5 14.2761 26.5 14H25.5ZM26.5 8C26.5 7.72386 26.7239 7.5 27 7.5V6.5C26.1716 6.5 25.5 7.17157 25.5 8H26.5Z'}
  },
  {
    id :'room3Table',
    offsetX: 842,
    offsetY: 325,
    // Size of the node
    width: 26,
    height: 28,
    shape:{ type : 'Path', data:'M79 1H3C1.89543 1 1 1.89543 1 3V49C1 50.1046 1.89543 51 3 51H79C80.1046 51 81 50.1046 81 49V3C81 1.89543 80.1046 1 79 1Z'}
  },
  {
    id :'room3PotTable',
    offsetX: 841,
    offsetY: 455,
    // Size of the node
    width: 30,
    height: 30,
    shape:{ type : 'Path', data:"M57 29C57 44.464 44.464 57 29 57C13.536 57 1 44.464 1 29C1 13.536 13.536 1 29 1C44.464 1 57 13.536 57 29Z"}
  },
  {
    id :'room3FlowerPot',
    offsetX: 841,
    offsetY: 455,
    // Size of the node
    width: 25,
    height: 25,
    shape:{ type : 'Path', data:'M25.9813 23.5141C27.2901 23.5993 48.6838 19.0468 41.4746 10.8333C36.916 5.63963 21.1089 23.1968 25.9813 23.5141Z M23.6253 25.9234C23.1736 27.1547 21.4942 48.9629 31.4103 44.3689C37.6806 41.464 25.3067 21.3392 23.6253 25.9234Z M25.5989 25.6003C26.3978 26.6405 43.9262 39.7237 45.3483 28.888C46.2474 22.0363 22.6249 21.7278 25.5989 25.6003Z M24.7197 20.7567C25.6675 19.8502 36.7808 1.01108 25.8549 0.76778C18.9461 0.613932 21.191 24.1316 24.7197 20.7567Z M20.8885 22.8171C19.6966 22.2698 -1.91128 18.8763 1.88665 29.1238C4.2882 35.6035 25.3258 24.8547 20.8885 22.8171Z M21.6607 25.6193C20.3938 25.9588 1.59406 37.1385 11.0585 42.6028C17.0432 46.0581 26.3771 24.3556 21.6607 25.6193Z M22.3667 20.2554C21.8975 19.0306 8.82513 1.49408 4.37366 11.475C1.55885 17.7863 24.1136 24.815 22.3667 20.2554Z M40.0382 18.2498C40.7878 20.1543 41.1995 22.2289 41.1995 24.3996C41.1995 24.5507 41.1975 24.7013 41.1935 24.8515M35.2235 11.5507C33.6921 10.2594 31.9267 9.2368 30 8.55572M39 32.7159C37.5069 35.3317 35.3311 37.5074 32.7153 39.0004M24.8419 41.1939C24.6949 41.1977 24.5474 41.1996 24.3995 41.1996C21.7821 41.1996 19.3046 40.6011 17.0963 39.5334M10.7727 34.2278C9.9752 33.1239 9.30848 31.9193 8.79533 30.6367M7.70563 22.5004C7.89672 20.8019 8.34106 19.1801 9 17.6736M13.9123 11.274C16.1576 9.47777 18.8737 8.24563 21.846 7.79239M25.9813 23.5141C27.2901 23.5993 48.6838 19.0468 41.4746 10.8333C36.916 5.63963 21.1089 23.1968 25.9813 23.5141ZM23.6253 25.9234C23.1736 27.1547 21.4942 48.9629 31.4103 44.3689C37.6806 41.464 25.3067 21.3392 23.6253 25.9234ZM25.5989 25.6003C26.3978 26.6405 43.9262 39.7237 45.3483 28.888C46.2474 22.0363 22.6249 21.7278 25.5989 25.6003ZM24.7197 20.7567C25.6675 19.8502 36.7808 1.01108 25.8549 0.76778C18.9461 0.613932 21.191 24.1316 24.7197 20.7567ZM20.8885 22.8171C19.6966 22.2698 -1.91128 18.8763 1.88665 29.1238C4.2882 35.6035 25.3258 24.8547 20.8885 22.8171ZM21.6607 25.6193C20.3938 25.9588 1.59406 37.1385 11.0585 42.6028C17.0432 46.0581 26.3771 24.3556 21.6607 25.6193ZM22.3667 20.2554C21.8975 19.0306 8.82513 1.49408 4.37366 11.475C1.55885 17.7863 24.1136 24.815 22.3667 20.2554Z'}
  },
  {
    id :'room3Bookcase',
    offsetX: 592,
    offsetY: 370,
    // Size of the node
    width: 63,
    height: 25,
    rotateAngle:-90,
    shape:{ type : 'Path', data:'M113 9V1H1V9M113 9H1M113 9V29H1V9M4 12H11V25H4V12ZM13 12H20V25H13V12ZM22 12H29V25H22V12ZM31 12H38V25H31V12ZM40 12H47V25H40V12ZM49 12H56V25H49V12ZM58 12H65V25H58V12ZM67 12H74V25H67V12ZM76 12H83V25H76V12ZM85 12H92V25H85V12ZM94 12H101V25H94V12ZM103 12H110V25H103V12Z'}
  },
  {
    id :'room3WorkTable',
    offsetX: 600,
    offsetY: 435,
    // Size of the node
    width: 41,
    height: 30,
    rotateAngle:90,
    shape:{ type : 'Path', data:"M4 5C4 4.44772 4.44772 4 5 4H83C83.5523 4 84 4.44772 84 5V53C84 53.5523 83.5523 54 83 54H5C4.44772 54 4 53.5523 4 53V5Z M4 6.5C4 6.77614 3.77462 7.00425 3.50231 6.95843C3.08607 6.88841 2.68736 6.73099 2.33329 6.49441C1.83994 6.16477 1.45543 5.69623 1.22836 5.14805C1.0013 4.59987 0.94189 3.99667 1.05765 3.41473C1.1734 2.83279 1.45912 2.29824 1.87868 1.87868C2.29824 1.45912 2.83279 1.1734 3.41473 1.05765C3.99667 0.94189 4.59987 1.0013 5.14805 1.22836C5.69623 1.45543 6.16477 1.83994 6.49441 2.33329C6.73099 2.68736 6.88841 3.08607 6.95843 3.50231C7.00424 3.77462 6.77614 4 6.5 4L4.5 4C4.22386 4 4 4.22386 4 4.5L4 6.5Z M81.5 4C81.2239 4 80.9958 3.77462 81.0416 3.50231C81.1116 3.08607 81.269 2.68736 81.5056 2.33329C81.8352 1.83994 82.3038 1.45543 82.852 1.22836C83.4001 1.0013 84.0033 0.94189 84.5853 1.05765C85.1672 1.1734 85.7018 1.45912 86.1213 1.87868C86.5409 2.29824 86.8266 2.83279 86.9424 3.41473C87.0581 3.99667 86.9987 4.59987 86.7716 5.14805C86.5446 5.69623 86.1601 6.16477 85.6667 6.49441C85.3126 6.73099 84.9139 6.88841 84.4977 6.95843C84.2254 7.00424 84 6.77614 84 6.5V4.5C84 4.22386 83.7761 4 83.5 4L81.5 4Z M6.5 54C6.77614 54 7.00425 54.2254 6.95843 54.4977C6.88841 54.9139 6.73099 55.3126 6.49441 55.6667C6.16477 56.1601 5.69623 56.5446 5.14805 56.7716C4.59987 56.9987 3.99667 57.0581 3.41473 56.9424C2.83279 56.8266 2.29824 56.5409 1.87868 56.1213C1.45912 55.7018 1.1734 55.1672 1.05765 54.5853C0.94189 54.0033 1.0013 53.4001 1.22836 52.852C1.45543 52.3038 1.83994 51.8352 2.33329 51.5056C2.68736 51.269 3.08607 51.1116 3.50231 51.0416C3.77462 50.9958 4 51.2239 4 51.5V53.5C4 53.7761 4.22386 54 4.5 54H6.5Z M84 51.5C84 51.2239 84.2254 50.9958 84.4977 51.0416C84.9139 51.1116 85.3126 51.269 85.6667 51.5056C86.1601 51.8352 86.5446 52.3038 86.7716 52.852C86.9987 53.4001 87.0581 54.0033 86.9424 54.5853C86.8266 55.1672 86.5409 55.7018 86.1213 56.1213C85.7018 56.5409 85.1672 56.8266 84.5853 56.9424C84.0033 57.0581 83.4001 56.9987 82.852 56.7716C82.3038 56.5446 81.8352 56.1601 81.5056 55.6667C81.269 55.3126 81.1116 54.9139 81.0416 54.4977C80.9958 54.2254 81.2239 54 81.5 54H83.5C83.7761 54 84 53.7761 84 53.5V51.5Z"}
  },
  {
    id :'room3Laptop',
    offsetX: 600,
    offsetY: 435,
    // Size of the node
    width: 30,
    height: 17,
    rotateAngle:270,
    shape:{ type : 'Path', data:"M1.06567 5.71554C0.619244 3.26018 2.50554 1 5.00115 1H61.0006C63.4675 1 65.3464 3.21135 64.9481 5.64595L61.7571 25.146C61.4407 27.08 59.7695 28.5 57.8096 28.5H8.54661C6.61347 28.5 4.95694 27.1175 4.61113 25.2155L1.06567 5.71554Z M3.7083 33C3.7083 30.7909 5.49916 29 7.7083 29H58.7083C60.9174 29 62.7083 30.7909 62.7083 33V55C62.7083 57.2091 60.9174 59 58.7083 59H7.7083C5.49916 59 3.7083 57.2091 3.7083 55V33Z M26.7083 50C26.7083 49.4477 27.156 49 27.7083 49H38.7083C39.2606 49 39.7083 49.4477 39.7083 50V54C39.7083 54.5523 39.2606 55 38.7083 55H27.7083C27.156 55 26.7083 54.5523 26.7083 54V50Z M8.7083 35.5C8.7083 35.2239 8.93216 35 9.2083 35H12.2083C12.4844 35 12.7083 35.2239 12.7083 35.5V36.5C12.7083 36.7761 12.4844 37 12.2083 37H9.2083C8.93216 37 8.7083 36.7761 8.7083 36.5V35.5Z M8.7083 38.5C8.7083 38.2239 8.93216 38 9.2083 38H12.2083C12.4844 38 12.7083 38.2239 12.7083 38.5V39.5C12.7083 39.7761 12.4844 40 12.2083 40H9.2083C8.93216 40 8.7083 39.7761 8.7083 39.5V38.5Z M8.7083 41.5C8.7083 41.2239 8.93216 41 9.2083 41H12.2083C12.4844 41 12.7083 41.2239 12.7083 41.5V42.5C12.7083 42.7761 12.4844 43 12.2083 43H9.2083C8.93216 43 8.7083 42.7761 8.7083 42.5V41.5Z M8.7083 44.5C8.7083 44.2239 8.93216 44 9.2083 44H12.2083C12.4844 44 12.7083 44.2239 12.7083 44.5V45.5C12.7083 45.7761 12.4844 46 12.2083 46H9.2083C8.93216 46 8.7083 45.7761 8.7083 45.5V44.5Z M13.7083 35.5C13.7083 35.2239 13.9322 35 14.2083 35H17.2083C17.4844 35 17.7083 35.2239 17.7083 35.5V36.5C17.7083 36.7761 17.4844 37 17.2083 37H14.2083C13.9322 37 13.7083 36.7761 13.7083 36.5V35.5Z M13.7083 38.5C13.7083 38.2239 13.9322 38 14.2083 38H17.2083C17.4844 38 17.7083 38.2239 17.7083 38.5V39.5C17.7083 39.7761 17.4844 40 17.2083 40H14.2083C13.9322 40 13.7083 39.7761 13.7083 39.5V38.5Z M13.7083 41.5C13.7083 41.2239 13.9322 41 14.2083 41H17.2083C17.4844 41 17.7083 41.2239 17.7083 41.5V42.5C17.7083 42.7761 17.4844 43 17.2083 43H14.2083C13.9322 43 13.7083 42.7761 13.7083 42.5V41.5Z M13.7083 44.5C13.7083 44.2239 13.9322 44 14.2083 44H17.2083C17.4844 44 17.7083 44.2239 17.7083 44.5V45.5C17.7083 45.7761 17.4844 46 17.2083 46H14.2083C13.9322 46 13.7083 45.7761 13.7083 45.5V44.5Z M18.7083 35.5C18.7083 35.2239 18.9322 35 19.2083 35H22.2083C22.4844 35 22.7083 35.2239 22.7083 35.5V36.5C22.7083 36.7761 22.4844 37 22.2083 37H19.2083C18.9322 37 18.7083 36.7761 18.7083 36.5V35.5Z M18.7083 38.5C18.7083 38.2239 18.9322 38 19.2083 38H22.2083C22.4844 38 22.7083 38.2239 22.7083 38.5V39.5C22.7083 39.7761 22.4844 40 22.2083 40H19.2083C18.9322 40 18.7083 39.7761 18.7083 39.5V38.5Z M18.7083 41.5C18.7083 41.2239 18.9322 41 19.2083 41H22.2083C22.4844 41 22.7083 41.2239 22.7083 41.5V42.5C22.7083 42.7761 22.4844 43 22.2083 43H19.2083C18.9322 43 18.7083 42.7761 18.7083 42.5V41.5Z M18.7083 44.5C18.7083 44.2239 18.9322 44 19.2083 44H22.2083C22.4844 44 22.7083 44.2239 22.7083 44.5V45.5C22.7083 45.7761 22.4844 46 22.2083 46H19.2083C18.9322 46 18.7083 45.7761 18.7083 45.5V44.5Z M23.7083 35.5C23.7083 35.2239 23.9322 35 24.2083 35H27.2083C27.4844 35 27.7083 35.2239 27.7083 35.5V36.5C27.7083 36.7761 27.4844 37 27.2083 37H24.2083C23.9322 37 23.7083 36.7761 23.7083 36.5V35.5Z M23.7083 38.5C23.7083 38.2239 23.9322 38 24.2083 38H27.2083C27.4844 38 27.7083 38.2239 27.7083 38.5V39.5C27.7083 39.7761 27.4844 40 27.2083 40H24.2083C23.9322 40 23.7083 39.7761 23.7083 39.5V38.5Z M23.7083 41.5C23.7083 41.2239 23.9322 41 24.2083 41H27.2083C27.4844 41 27.7083 41.2239 27.7083 41.5V42.5C27.7083 42.7761 27.4844 43 27.2083 43H24.2083C23.9322 43 23.7083 42.7761 23.7083 42.5V41.5Z M23.7083 44.5C23.7083 44.2239 23.9322 44 24.2083 44H42.2083C42.4844 44 42.7083 44.2239 42.7083 44.5V45.5C42.7083 45.7761 42.4844 46 42.2083 46H24.2083C23.9322 46 23.7083 45.7761 23.7083 45.5V44.5Z M28.7083 35.5C28.7083 35.2239 28.9322 35 29.2083 35H32.2083C32.4844 35 32.7083 35.2239 32.7083 35.5V36.5C32.7083 36.7761 32.4844 37 32.2083 37H29.2083C28.9322 37 28.7083 36.7761 28.7083 36.5V35.5Z M28.7083 38.5C28.7083 38.2239 28.9322 38 29.2083 38H32.2083C32.4844 38 32.7083 38.2239 32.7083 38.5V39.5C32.7083 39.7761 32.4844 40 32.2083 40H29.2083C28.9322 40 28.7083 39.7761 28.7083 39.5V38.5Z M28.7083 41.5C28.7083 41.2239 28.9322 41 29.2083 41H32.2083C32.4844 41 32.7083 41.2239 32.7083 41.5V42.5C32.7083 42.7761 32.4844 43 32.2083 43H29.2083C28.9322 43 28.7083 42.7761 28.7083 42.5V41.5Z M33.7083 35.5C33.7083 35.2239 33.9322 35 34.2083 35H37.2083C37.4844 35 37.7083 35.2239 37.7083 35.5V36.5C37.7083 36.7761 37.4844 37 37.2083 37H34.2083C33.9322 37 33.7083 36.7761 33.7083 36.5V35.5Z M33.7083 38.5C33.7083 38.2239 33.9322 38 34.2083 38H37.2083C37.4844 38 37.7083 38.2239 37.7083 38.5V39.5C37.7083 39.7761 37.4844 40 37.2083 40H34.2083C33.9322 40 33.7083 39.7761 33.7083 39.5V38.5Z M33.7083 41.5C33.7083 41.2239 33.9322 41 34.2083 41H37.2083C37.4844 41 37.7083 41.2239 37.7083 41.5V42.5C37.7083 42.7761 37.4844 43 37.2083 43H34.2083C33.9322 43 33.7083 42.7761 33.7083 42.5V41.5Z M38.7083 35.5C38.7083 35.2239 38.9322 35 39.2083 35H42.2083C42.4844 35 42.7083 35.2239 42.7083 35.5V36.5C42.7083 36.7761 42.4844 37 42.2083 37H39.2083C38.9322 37 38.7083 36.7761 38.7083 36.5V35.5Z M38.7083 38.5C38.7083 38.2239 38.9322 38 39.2083 38H42.2083C42.4844 38 42.7083 38.2239 42.7083 38.5V39.5C42.7083 39.7761 42.4844 40 42.2083 40H39.2083C38.9322 40 38.7083 39.7761 38.7083 39.5V38.5Z M38.7083 41.5C38.7083 41.2239 38.9322 41 39.2083 41H42.2083C42.4844 41 42.7083 41.2239 42.7083 41.5V42.5C42.7083 42.7761 42.4844 43 42.2083 43H39.2083C38.9322 43 38.7083 42.7761 38.7083 42.5V41.5Z M43.7083 35.5C43.7083 35.2239 43.9322 35 44.2083 35H47.2083C47.4844 35 47.7083 35.2239 47.7083 35.5V36.5C47.7083 36.7761 47.4844 37 47.2083 37H44.2083C43.9322 37 43.7083 36.7761 43.7083 36.5V35.5Z M43.7083 38.5C43.7083 38.2239 43.9322 38 44.2083 38H47.2083C47.4844 38 47.7083 38.2239 47.7083 38.5V39.5C47.7083 39.7761 47.4844 40 47.2083 40H44.2083C43.9322 40 43.7083 39.7761 43.7083 39.5V38.5Z M43.7083 41.5C43.7083 41.2239 43.9322 41 44.2083 41H47.2083C47.4844 41 47.7083 41.2239 47.7083 41.5V42.5C47.7083 42.7761 47.4844 43 47.2083 43H44.2083C43.9322 43 43.7083 42.7761 43.7083 42.5V41.5Z M43.7083 44.5C43.7083 44.2239 43.9322 44 44.2083 44H47.2083C47.4844 44 47.7083 44.2239 47.7083 44.5V45.5C47.7083 45.7761 47.4844 46 47.2083 46H44.2083C43.9322 46 43.7083 45.7761 43.7083 45.5V44.5Z M48.7083 35.5C48.7083 35.2239 48.9322 35 49.2083 35H52.2083C52.4844 35 52.7083 35.2239 52.7083 35.5V36.5C52.7083 36.7761 52.4844 37 52.2083 37H49.2083C48.9322 37 48.7083 36.7761 48.7083 36.5V35.5Z M48.7083 38.5C48.7083 38.2239 48.9322 38 49.2083 38H52.2083C52.4844 38 52.7083 38.2239 52.7083 38.5V39.5C52.7083 39.7761 52.4844 40 52.2083 40H49.2083C48.9322 40 48.7083 39.7761 48.7083 39.5V38.5Z M48.7083 41.5C48.7083 41.2239 48.9322 41 49.2083 41H52.2083C52.4844 41 52.7083 41.2239 52.7083 41.5V42.5C52.7083 42.7761 52.4844 43 52.2083 43H49.2083C48.9322 43 48.7083 42.7761 48.7083 42.5V41.5Z M48.7083 44.5C48.7083 44.2239 48.9322 44 49.2083 44H52.2083C52.4844 44 52.7083 44.2239 52.7083 44.5V45.5C52.7083 45.7761 52.4844 46 52.2083 46H49.2083C48.9322 46 48.7083 45.7761 48.7083 45.5V44.5Z M53.7083 35.5C53.7083 35.2239 53.9322 35 54.2083 35H57.2083C57.4844 35 57.7083 35.2239 57.7083 35.5V36.5C57.7083 36.7761 57.4844 37 57.2083 37H54.2083C53.9322 37 53.7083 36.7761 53.7083 36.5V35.5Z M53.7083 38.5C53.7083 38.2239 53.9322 38 54.2083 38H57.2083C57.4844 38 57.7083 38.2239 57.7083 38.5V39.5C57.7083 39.7761 57.4844 40 57.2083 40H54.2083C53.9322 40 53.7083 39.7761 53.7083 39.5V38.5Z M53.7083 41.5C53.7083 41.2239 53.9322 41 54.2083 41H57.2083C57.4844 41 57.7083 41.2239 57.7083 41.5V42.5C57.7083 42.7761 57.4844 43 57.2083 43H54.2083C53.9322 43 53.7083 42.7761 53.7083 42.5V41.5Z M53.7083 44.5C53.7083 44.2239 53.9322 44 54.2083 44H57.2083C57.4844 44 57.7083 44.2239 57.7083 44.5V45.5C57.7083 45.7761 57.4844 46 57.2083 46H54.2083C53.9322 46 53.7083 45.7761 53.7083 45.5V44.5Z"}
  },
  {
    id :'room3Chair',
    offsetX: 635,
    offsetY: 435,
    // Size of the node
    width: 28,
    height: 32,
    rotateAngle:90,
    shape:{ type : 'Path', data:'M22 9V14M28 9.08984V14M13 54H37C41.4183 54 45 50.4183 45 46V22C45 17.5817 41.4183 14 37 14H13C8.58172 14 5 17.5817 5 22V46C5 50.4183 8.58172 54 13 54ZM3 45C1.89543 45 1 44.1046 1 43V25C1 23.8954 1.89543 23 3 23C4.10457 23 5 23.8954 5 25V43C5 44.1046 4.10457 45 3 45ZM11 5.79143C11 3.97975 12.2614 2.40196 14.0423 2.06981C22.0186 0.582241 27.6274 0.696364 35.7954 2.09976C37.6588 2.41991 39 4.05364 39 5.94429C39 8.4118 36.7616 10.2627 34.325 9.87346C27.5467 8.79067 22.4382 8.5351 15.7921 9.68406C13.3336 10.1091 11 8.28636 11 5.79143ZM47 45C45.8954 45 45 44.1046 45 43V25C45 23.8954 45.8954 23 47 23C48.1046 23 49 23.8954 49 25V43C49 44.1046 48.1046 45 47 45Z'}
  },
  {
    id :'room3Lamp',
    offsetX: 842,
    offsetY: 325,
    // Size of the node
    width: 20,
    height: 20,
    shape:{ type : 'Path', data:"M17 7C11.4772 7 7 11.4772 7 17C7 22.5228 11.4772 27 17 27C22.5228 27 27 22.5228 27 17C27 11.4772 22.5228 7 17 7ZM17 7V13.5M20.2363 18.5593L25.3654 21.3093M13.7544 18.4305L8.2541 21.6805M33 17C33 25.8366 25.8366 33 17 33C8.16344 33 1 25.8366 1 17C1 8.16344 8.16344 1 17 1C25.8366 1 33 8.16344 33 17ZM25.5 17C25.5 21.6944 21.6944 25.5 17 25.5C12.3056 25.5 8.5 21.6944 8.5 17C8.5 12.3056 12.3056 8.5 17 8.5C21.6944 8.5 25.5 12.3056 25.5 17ZM21 17C21 19.2091 19.2091 21 17 21C14.7909 21 13 19.2091 13 17C13 14.7909 14.7909 13 17 13C19.2091 13 21 14.7909 21 17Z"}
  },
  {
    id :'room3Warddrobe',
    offsetX: 740,
    offsetY: 304,
    // Size of the node
    width: 73,
    height: 35,
    shape:{ type : 'Path', data:"M50.6443 54.406L76 29L80.9998 28.9502H85.9996L55.594 59.3558L50.6443 54.406Z M12 29L36.9996 54.4053L32.0498 59.3551L2 29H12Z M70.7969 44.8594C70.6017 44.6642 70.6017 44.3476 70.7969 44.1523C70.9922 43.957 71.3088 43.957 71.504 44.1523L72.9182 45.5665C73.1135 45.7618 73.1135 46.0784 72.9182 46.2736C72.723 46.4689 72.4064 46.4689 72.2111 46.2736L70.7969 44.8594Z M16.1406 44.1524C16.3358 43.9571 16.6524 43.9571 16.8477 44.1524C17.043 44.3476 17.043 44.6642 16.8477 44.8595L15.4335 46.2737C15.2382 46.469 14.9216 46.469 14.7264 46.2737C14.5311 46.0784 14.5311 45.7619 14.7264 45.5666L16.1406 44.1524Z M1 1L87 1V29H1L1 1Z"}
  },
  {
    id :'room3ToiletDoor',
    offsetX: 843,
    offsetY: 266,
    // Size of the node
    width: 27,
    height: 30,
   
    shape:{ type : 'Path', data:'M1 71L1 79L72 79V71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71'}
  },
  {
    id :'toilet3BathTub',
    offsetX: 780,
    offsetY: 245,
    // Size of the node
    width: 50,
    height: 25,
    rotateAngle:90,
    shape:{ type : 'Path', data:"M1 9C1 4.58172 4.58172 1 9 1H84C88.4183 1 92 4.58172 92 9V40C92 44.4183 88.4183 48 84 48H9C4.58172 48 1 44.4183 1 40V9Z M12 24.5C12 14.2827 20.2827 6 30.5 6H61.5C71.7173 6 80 14.2827 80 24.5C80 34.7173 71.7173 43 61.5 43H30.5C20.2827 43 12 34.7173 12 24.5Z M11.5 26.5C11.5 26.5 12 26 12 25C12 24 11.5 23.5 11.5 23.5L22.0074 22.6917C23.3519 22.5883 24.5 23.6514 24.5 25C24.5 26.3486 23.3519 27.4117 22.0074 27.3083L11.5 26.5Z M8 21.5C9.933 21.5 11.5 23.067 11.5 25C11.5 26.933 9.933 28.5 8 28.5C6.067 28.5 4.5 26.933 4.5 25C4.5 23.067 6.067 21.5 8 21.5Z"}
  },
  {
    id :'toilet3Basin',
    offsetX: 842,
    offsetY: 196,
    // Size of the node
    width: 30,
    height: 25,
    rotateAngle:90,
    shape:{ type : 'Path', data:"M1 4C1 2.34315 2.34315 1 4 1H62C63.6569 1 65 2.34315 65 4V25C65 38.2548 54.2548 49 41 49H25C11.7452 49 1 38.2548 1 25V4Z M57 25C57 33.2843 46.2548 40 33 40C19.7452 40 9 33.2843 9 25C9 16.7157 19.7452 10 33 10C46.2548 10 57 16.7157 57 25Z M31 10C31 10 31.5 10.5 32.5 10.5C33.5 10.5 34 10 34 10L34.8083 20.5074C34.9117 21.8519 33.8486 23 32.5 23C31.1514 23 30.0883 21.8519 30.1917 20.5074L31 10Z M36 6.5C36 8.433 34.433 10 32.5 10C30.567 10 29 8.433 29 6.5C29 4.567 30.567 3 32.5 3C34.433 3 36 4.567 36 6.5Z M35 28.5C35 29.8807 33.8807 31 32.5 31C31.1193 31 30 29.8807 30 28.5C30 27.1193 31.1193 26 32.5 26C33.8807 26 35 27.1193 35 28.5Z"}
  },
  {
    id :'toilet3Faucet',
    offsetX: 790,
    offsetY: 172,
    // Size of the node
    width: 23,
    height: 36,
    shape:{ type : 'Path', data:'M46.4065 37.9425C46.4065 55.0951 36.823 69.0002 25.0011 69.0002C13.1792 69.0002 3.5957 55.0951 3.5957 37.9425C3.5957 30.1141 5.2059 23.4623 8.5 18C8.61402 18 25 18 25 18H41.2425C44.5366 23.4623 46.4065 30.1141 46.4065 37.9425Z M41.2161 43.5006C41.2161 53.9728 33.9559 62.4621 24.9999 62.4621C16.0439 62.4621 8.78369 53.9728 8.78369 43.5006C8.78369 33.0284 16.0439 24.5391 24.9999 24.5391C33.9559 24.5391 41.2161 33.0284 41.2161 43.5006Z M1 3.61538C1 2.17095 2.17095 1 3.61538 1H46.3846C47.8291 1 49 2.17095 49 3.61538V15.3846C49 16.8291 47.8291 18 46.3846 18H3.61538C2.17095 18 1 16.8291 1 15.3846V3.61538Z M26.9995 9C26.9995 10.1046 26.1041 11 24.9995 11C23.8949 11 22.9995 10.1046 22.9995 9C22.9995 7.89543 23.8949 7 24.9995 7C26.1041 7 26.9995 7.89543 26.9995 9Z M31 33C31 37.4183 28.3137 41 25 41C21.6863 41 19 37.4183 19 33C19 28.5817 21.6863 25 25 25C28.3137 25 31 28.5817 31 33Z '}
  },
  {
    id :'gasBurner',
    offsetX:725,
    offsetY:34,
    // Size of the node
    width: 100,
    height: 32,
    shape:{ type : 'Path', data:'M101.999 1.96454C101.999 1.43184 101.567 1 101.034 1L1.96356 1.00001C1.43086 1.00001 0.999023 1.43185 0.999023 1.96455L0.999026 34.0355C0.999026 34.5682 1.43087 35 1.96357 35L101.034 35C101.567 35 101.999 34.5682 101.999 34.0355V1.96454Z M33.583 4.79803C33.583 4.26533 33.1512 3.8335 32.6185 3.8335L4.79755 3.8335C4.26485 3.8335 3.83301 4.26534 3.83301 4.79804L3.83301 31.2023C3.83301 31.735 4.26485 32.1668 4.79755 32.1668L32.6185 32.1668C33.1512 32.1668 33.583 31.735 33.583 31.2023L33.583 4.79803Z M98.749 4.96454C98.749 4.43184 98.3172 4 97.7845 4L69.9636 4C69.4309 4 68.999 4.43184 68.999 4.96454L68.999 31.3688C68.999 31.9015 69.4309 32.3333 69.9636 32.3333L97.7845 32.3333C98.3172 32.3333 98.749 31.9015 98.749 31.3688V4.96454Z M65.749 4.96454C65.749 4.43184 65.3172 4 64.7845 4L36.9636 4C36.4309 4 35.999 4.43184 35.999 4.96454L35.999 31.3688C35.999 31.9015 36.4309 32.3333 36.9636 32.3333L64.7845 32.3333C65.3172 32.3333 65.749 31.9015 65.749 31.3688V4.96454Z M26.499 18C26.499 22.6944 22.6934 26.5 17.999 26.5C13.3046 26.5 9.49902 22.6944 9.49902 18C9.49902 13.3056 13.3046 9.5 17.999 9.5C22.6934 9.5 26.499 13.3056 26.499 18Z M25.4365 18C25.4365 22.1076 22.1066 25.4375 17.999 25.4375C13.8914 25.4375 10.5615 22.1076 10.5615 18C10.5615 13.8924 13.8914 10.5625 17.999 10.5625C22.1066 10.5625 25.4365 13.8924 25.4365 18Z M25.0576 24.6826L24.682 25.0583L22.0017 22.378L22.3774 22.0024L25.0576 24.6826Z M13.9443 13.5698L13.5687 13.9455L10.8882 11.265L11.2639 10.8894L13.9443 13.5698Z M24.7861 11.0938L25.1618 11.4694L22.4815 14.1497L22.1059 13.774L24.7861 11.0938Z M13.7734 21.9844L14.1491 22.36L11.4688 25.0403L11.0932 24.6646L13.7734 21.9844Z M21.4521 18C21.4521 19.9071 19.9061 21.4531 17.999 21.4531C16.0919 21.4531 14.5459 19.9071 14.5459 18C14.5459 16.0929 16.0919 14.5469 17.999 14.5469C19.9061 14.5469 21.4521 16.0929 21.4521 18Z M91.665 18.1665C91.665 22.8609 87.8595 26.6665 83.165 26.6665C78.4706 26.6665 74.665 22.8609 74.665 18.1665C74.665 13.4721 78.4706 9.6665 83.165 9.6665C87.8595 9.6665 91.665 13.4721 91.665 18.1665Z M90.6025 18.1665C90.6025 22.2741 87.2727 25.604 83.165 25.604C79.0574 25.604 75.7275 22.2741 75.7275 18.1665C75.7275 14.0589 79.0574 10.729 83.165 10.729C87.2727 10.729 90.6025 14.0589 90.6025 18.1665Z M90.2236 24.8491L89.848 25.2248L87.1677 22.5445L87.5434 22.1689L90.2236 24.8491Z M79.1104 13.7363L78.7347 14.112L76.0542 11.4315L76.4299 11.0559L79.1104 13.7363Z M89.9521 11.2603L90.3278 11.6359L87.6475 14.3162L87.2719 13.9405L89.9521 11.2603Z M78.9404 22.1509L79.3161 22.5265L76.6358 25.2068L76.2602 24.8311L78.9404 22.1509Z M86.6182 18.1665C86.6182 20.0736 85.0721 21.6196 83.165 21.6196C81.2579 21.6196 79.7119 20.0736 79.7119 18.1665C79.7119 16.2594 81.2579 14.7134 83.165 14.7134C85.0721 14.7134 86.6182 16.2594 86.6182 18.1665Z M58.665 18.1665C58.665 22.8609 54.8595 26.6665 50.165 26.6665C45.4706 26.6665 41.665 22.8609 41.665 18.1665C41.665 13.4721 45.4706 9.6665 50.165 9.6665C54.8595 9.6665 58.665 13.4721 58.665 18.1665Z M57.6025 18.1665C57.6025 22.2741 54.2727 25.604 50.165 25.604C46.0574 25.604 42.7275 22.2741 42.7275 18.1665C42.7275 14.0589 46.0574 10.729 50.165 10.729C54.2727 10.729 57.6025 14.0589 57.6025 18.1665Z M57.2236 24.8491L56.848 25.2248L54.1677 22.5445L54.5434 22.1689L57.2236 24.8491Z M46.1104 13.7363L45.7347 14.112L43.0542 11.4315L43.4299 11.0559L46.1104 13.7363Z M56.9521 11.2603L57.3278 11.6359L54.6475 14.3162L54.2719 13.9405L56.9521 11.2603Z M45.9404 22.1509L46.3161 22.5265L43.6358 25.2068L43.2602 24.8311L45.9404 22.1509Z M53.6182 18.1665C53.6182 20.0736 52.0721 21.6196 50.165 21.6196C48.2579 21.6196 46.7119 20.0736 46.7119 18.1665C46.7119 16.2594 48.2579 14.7134 50.165 14.7134C52.0721 14.7134 53.6182 16.2594 53.6182 18.1665Z'}
  },
  {
    id :'kitchenSink',
    offsetX:542,
    offsetY:36,
    // Size of the node
    width: 76,
    height: 38,
    shape:{ type : 'Path', data:'M1 9C1 4.58172 4.58172 1 9 1H115C119.418 1 123 4.58172 123 9V41C123 45.4183 119.418 49 115 49H9C4.58172 49 1 45.4183 1 41V9Z M7 13C7 10.7909 8.79086 9 11 9H55C57.2091 9 59 10.7909 59 13V37C59 39.2091 57.2091 41 55 41H11C8.79086 41 7 39.2091 7 37V13Z M65 13C65 10.7909 66.7909 9 69 9H113C115.209 9 117 10.7909 117 13V37C117 39.2091 115.209 41 113 41H69C66.7909 41 65 39.2091 65 37V13Z M35 25.5C35 26.8807 33.8807 28 32.5 28C31.1193 28 30 26.8807 30 25.5C30 24.1193 31.1193 23 32.5 23C33.8807 23 35 24.1193 35 25.5Z M93 25.5C93 26.8807 91.8807 28 90.5 28C89.1193 28 88 26.8807 88 25.5C88 24.1193 89.1193 23 90.5 23C91.8807 23 93 24.1193 93 25.5Z M64.3638 10.4863C64.3638 10.4863 65.071 10.4863 65.7781 9.77915C66.4852 9.07204 66.4852 8.36493 66.4852 8.36493L74.4865 15.2232C75.5104 16.1009 75.5705 17.6644 74.6169 18.618C73.6633 19.5716 72.0998 19.5115 71.2221 18.4876L64.3638 10.4863Z M65.4246 4.47532C66.7915 5.84216 66.7915 8.05823 65.4246 9.42507C64.0578 10.7919 61.8417 10.7919 60.4749 9.42507C59.108 8.05823 59.108 5.84216 60.4749 4.47532C61.8417 3.10849 64.0578 3.10849 65.4246 4.47532Z'}
  },
  {
    id :'refrigerator',
    offsetX:692,
    offsetY:115,
    // Size of the node
    width: 52,
    height:59,
    shape:{ type : 'Path', data:"M1 8.58323H61V58.0356H1V8.58323Z M1 58.8332H61V63.6189C61 65.381 59.5716 66.8094 57.8095 66.8094H4.19048C2.42843 66.8094 1 65.381 1 63.6189V58.8332Z M57.0527 8.17857L4.158 8.17857L4.158 4.19047C4.158 2.42842 5.58642 1 7.34847 1L53.8623 1C55.6243 1 57.0527 2.42843 57.0527 4.19048V8.17857Z M1 8.58323V8.08323H0.5V8.58323H1ZM61 8.58323H61.5V8.08323H61V8.58323ZM61 58.0356V58.5356H61.5V58.0356H61ZM1 58.0356H0.5V58.5356H1V58.0356ZM1 58.8332V58.3332H0.5V58.8332H1ZM61 58.8332H61.5V58.3332H61V58.8332ZM6.52686 66.8094V66.3094H6.02686V66.8094H6.52686ZM16.79 66.8094H17.29V66.3094H16.79V66.8094ZM57.0527 8.17857V8.67857H57.5527V8.17857H57.0527ZM4.158 8.17857H3.658V8.67857H4.158V8.17857ZM53.8623 1V0.500004V1ZM57.0527 4.19048H56.5527H57.0527ZM4.158 4.19047H3.658H4.158ZM7.34847 1V1.5V1ZM1 9.08323H61V8.08323H1V9.08323ZM60.5 8.58323V58.0356H61.5V8.58323H60.5ZM61 57.5356H1V58.5356H61V57.5356ZM1.5 58.0356V8.58323H0.5V58.0356H1.5ZM1 59.3332H61V58.3332H1V59.3332ZM60.5 58.8332V63.6189H61.5V58.8332H60.5ZM57.8095 66.3094H4.19048V67.3094H57.8095V66.3094ZM1.5 63.6189V58.8332H0.5V63.6189H1.5ZM4.19048 66.3094C2.70457 66.3094 1.5 65.1049 1.5 63.6189H0.5C0.5 65.6571 2.15228 67.3094 4.19048 67.3094V66.3094ZM60.5 63.6189C60.5 65.1049 59.2954 66.3094 57.8095 66.3094V67.3094C59.8477 67.3094 61.5 65.6571 61.5 63.6189H60.5ZM6.52686 67.3094H16.79V66.3094H6.52686V67.3094ZM13.5995 69.4999H9.71733V70.4999H13.5995V69.4999ZM9.71733 69.4999C8.23142 69.4999 7.02686 68.2953 7.02686 66.8094H6.02686C6.02686 68.8476 7.67914 70.4999 9.71733 70.4999V69.4999ZM16.29 66.8094C16.29 68.2953 15.0854 69.4999 13.5995 69.4999V70.4999C15.6377 70.4999 17.29 68.8476 17.29 66.8094H16.29ZM57.0527 7.67857L4.158 7.67857V8.67857L57.0527 8.67857V7.67857ZM4.658 8.17857L4.658 4.19047H3.658L3.658 8.17857H4.658ZM7.34847 1.5L53.8623 1.5V0.500004L7.34847 0.5V1.5ZM56.5527 4.19048V8.17857H57.5527V4.19048H56.5527ZM53.8623 1.5C55.3482 1.5 56.5527 2.70457 56.5527 4.19048H57.5527C57.5527 2.15229 55.9005 0.500004 53.8623 0.500004V1.5ZM4.658 4.19047C4.658 2.70456 5.86256 1.5 7.34847 1.5V0.5C5.31028 0.5 3.658 2.15228 3.658 4.19047H4.658Z"}
  },
  {
    id :'waterCooler',
    offsetX:524,
    offsetY:107,
    // Size of the node
    width: 39,
    height:38,
    shape:{ type : 'Path', data:'M49 1H3C1.89543 1 1 1.89543 1 3V49C1 50.1046 1.89543 51 3 51H49C50.1046 51 51 50.1046 51 49V3C51 1.89543 50.1046 1 49 1Z M47 26C47 37.598 37.598 47 26 47C14.402 47 5 37.598 5 26C5 14.402 14.402 5 26 5C37.598 5 47 14.402 47 26Z M30 26C30 28.2091 28.2091 30 26 30C23.7909 30 22 28.2091 22 26C22 23.7909 23.7909 22 26 22C28.2091 22 30 23.7909 30 26Z M49 1H3C1.89543 1 1 1.89543 1 3V49C1 50.1046 1.89543 51 3 51H49C50.1046 51 51 50.1046 51 49V3C51 1.89543 50.1046 1 49 1Z M47 26C47 37.598 37.598 47 26 47C14.402 47 5 37.598 5 26C5 14.402 14.402 5 26 5C37.598 5 47 14.402 47 26Z M30 26C30 28.2091 28.2091 30 26 30C23.7909 30 22 28.2091 22 26C22 23.7909 23.7909 22 26 22C28.2091 22 30 23.7909 30 26Z'}
  },
  {
    id :'washBasin',
    offsetX:260,
    offsetY:176,
    // Size of the node
    width: 41,
    height:30,
    rotateAngle:-90,
    shape:{ type : 'Path', data:'M35 30.5C35 31.8807 33.8807 33 32.5 33C31.1193 33 30 31.8807 30 30.5C30 29.1193 31.1193 28 32.5 28C33.8807 28 35 29.1193 35 30.5Z M1 16C1 7.71573 7.71573 1 16 1H50C58.2843 1 65 7.71573 65 16V25C65 38.2548 54.2548 49 41 49H25C11.7452 49 1 38.2548 1 25V16Z M8 19C8 14.5817 11.5817 11 16 11H50C54.4183 11 58 14.5817 58 19V29C58 37.8366 50.8366 45 42 45H24C15.1634 45 8 37.8366 8 29V19Z M32.7433 11.0559C32.7433 11.0559 33.3556 11.4094 34.3216 11.1506C35.2875 10.8918 35.641 10.2794 35.641 10.2794L39.1413 20.2196C39.5892 21.4916 38.8594 22.8757 37.5568 23.2247C36.2542 23.5737 34.9302 22.7399 34.6821 21.4144L32.7433 11.0559Z M36.6673 6.38077C37.1676 8.24791 36.0596 10.1671 34.1925 10.6674C32.3253 11.1677 30.4062 10.0596 29.9059 8.19251C29.4056 6.32538 30.5136 4.4062 32.3807 3.9059C34.2479 3.4056 36.1671 4.51364 36.6673 6.38077Z'}
  },
  {
    id :'staircase1',
    offsetX:517,
    offsetY:427,
    // Size of the node
    width:87,
    height:25,
    shape:{ type : 'Path', data:'M1 17.4998L133 17.4998M121.177 0.869141L132.874 17.3083M121.582 34.7252L132.756 17.7252M121.5 0.999829V34.9998M109.5 0.999829V34.9998M97.5 0.999829V34.9998M85.5 0.999829V34.9998M73.5 0.999829V34.9998M61.5 0.999829V34.9998M49.5 0.999829V34.9998M37.5 0.999829V34.9998M25.5 0.999829L25.5 34.9998M13.5 0.999829L13.5 34.9998M133 0.999829V34.9998L1 34.9998L1 0.999824L133 0.999829Z'}
  },
  {
    id :'staircase2',
    offsetX:550,
    offsetY:470,
    // Size of the node
    width:61,
    height:22,
    rotateAngle:90,
    shape:{ type : 'Path', data:'M36 1V35M36 1L25 1M36 1H48M36 35H25M36 35H48M25 35L25 1M25 35H13L13 1L25 1M48 1V35M48 1H59M48 35H59M59 1V35M59 1H71M59 35H71M71 1V35M71 1H82M71 35H82M82 1V35M82 1H94M82 35H94M94 1V35M94 1H105M94 35H105M105 1V35M105 1H117V35H105M129 1V35L1 35L1 1L129 1Z'}
  },
  {
    id :'staircase3',
    offsetX:517,
    offsetY:514,
    // Size of the node
    width:87,
    height:25,
    shape:{ type : 'Path', data:'M1 17.4998L133 17.4998M121.177 0.869141L132.874 17.3083M121.582 34.7252L132.756 17.7252M121.5 0.999829V34.9998M109.5 0.999829V34.9998M97.5 0.999829V34.9998M85.5 0.999829V34.9998M73.5 0.999829V34.9998M61.5 0.999829V34.9998M49.5 0.999829V34.9998M37.5 0.999829V34.9998M25.5 0.999829L25.5 34.9998M13.5 0.999829L13.5 34.9998M133 0.999829V34.9998L1 34.9998L1 0.999824L133 0.999829Z'}
  },
  {
    id :'balconyChair1',
    offsetX:308,
    offsetY:83,
    // Size of the node
    width: 40,
    height:44,
    rotateAngle:270,
    shape:{ type : 'Path', data:'M7 27.5V56C7 56.5523 6.55228 57 6 57H2C1.44772 57 1 56.5523 1 56V26.5C1 12.4167 12.4167 1 26.5 1C40.5833 1 52 12.4167 52 26.5V56C52 56.5523 51.5523 57 51 57H47C46.4477 57 46 56.5523 46 56V27.5M7 27.5C7 16.7304 15.7304 8 26.5 8C37.2696 8 46 16.7304 46 27.5M7 27.5V58C7 58.5523 7.44772 59 8 59H45C45.5523 59 46 58.5523 46 58V27.5'}
  },
  {
    id :'balconyChair2',
    offsetX:425,
    offsetY:83,
    // Size of the node
    width:40,
    height:44,
    rotateAngle:90,
    shape:{ type : 'Path', data:'M7 27.5V56C7 56.5523 6.55228 57 6 57H2C1.44772 57 1 56.5523 1 56V26.5C1 12.4167 12.4167 1 26.5 1C40.5833 1 52 12.4167 52 26.5V56C52 56.5523 51.5523 57 51 57H47C46.4477 57 46 56.5523 46 56V27.5M7 27.5C7 16.7304 15.7304 8 26.5 8C37.2696 8 46 16.7304 46 27.5M7 27.5V58C7 58.5523 7.44772 59 8 59H45C45.5523 59 46 58.5523 46 58V27.5'}
  },
  {
    id :'stool',
    offsetX:366,
    offsetY:83,
    // Size of the node
    width: 35,
    height:35,
  
    shape:{ type : 'Path', data:"M58 31C58 46.464 45.6878 59 30.5 59C15.3122 59 3 46.464 3 31C3 15.536 15.3122 3 30.5 3C45.6878 3 58 15.536 58 31Z  M29 59V61H25V59H29Z M29 1V3H25V1L29 1Z M36 59V61H32V59H36Z M36 1V3H32V1L36 1Z M3 29H1L1 25H3L3 29Z M60 29H58V25H60V29Z M3 36H1L1 32H3L3 36Z M60 36H58V32H60V36Z"}
  },
//   
  {
    id :'balconyStool1',
    offsetX:278,
    offsetY:45,
    // Size of the node
    width: 30,
    height:30,
    shape:{ type : 'Path', data:"M57 29C57 44.464 44.464 57 29 57C13.536 57 1 44.464 1 29C1 13.536 13.536 1 29 1C44.464 1 57 13.536 57 29Z"}
  },
  {
    id :'balconyStool2',
    offsetX:462,
    offsetY:45,
    // Size of the node
    width: 30,
    height:30,
  
    shape:{ type : 'Path', data:"M57 29C57 44.464 44.464 57 29 57C13.536 57 1 44.464 1 29C1 13.536 13.536 1 29 1C44.464 1 57 13.536 57 29Z"}
  },
  {
    id :'balconyPlant1',
    offsetX:278,
    offsetY:45,
    // Size of the node
    width: 25,
    height:25,
    shape:{ type : 'Path', data:'M41.0021 14.6256C39.4786 15.0878 15.4174 23.8084 24.9086 22.7805C30.9102 22.1305 46.6742 12.9049 41.0021 14.6256Z M30.6226 40.7355C30.095 39.2334 20.3422 15.5718 21.7796 25.0097C22.6885 30.9776 32.587 46.328 30.6226 40.7355Z M40.8599 30.8341C39.4811 30.038 16.6684 18.4377 23.9067 24.6624C28.4837 28.5985 45.9932 33.7978 40.8599 30.8341Z M24.9451 2.15326C24.5331 3.69113 19.2324 28.7289 23.3715 20.1262C25.9889 14.6864 26.4792 -3.57215 24.9451 2.15326Z M2.19397 25.3449C3.78608 25.3449 29.3427 23.9847 19.9617 22.2131C14.0299 21.0929 -3.73342 25.3449 2.19397 25.3449Z M14.4307 41.966C15.2268 40.5872 26.8271 17.7744 20.6024 25.0127C16.6664 29.5898 11.467 47.0992 14.4307 41.966Z M9.34308 7.01354C10.1391 8.39235 24.0954 29.8449 20.9391 20.835C18.9434 15.1378 6.37938 1.88027 9.34308 7.01354Z M8.74609 23.1317C8.74609 19.0028 10.6305 15.3141 13.5861 12.8786M25.2568 10.2486C29.1467 11.2213 32.3568 13.9095 34.0367 17.4627M23.5 9.93362C23.0157 9.88011 22.5236 9.85264 22.0251 9.85264C19.3319 9.85264 16.826 10.6544 14.733 12.0323M34.6489 19.0003C35.0742 20.3006 35.3041 21.6893 35.3041 23.1317C35.3041 24.7546 35.013 26.3095 34.4801 27.747M33.7595 29.3531C32.4773 31.7665 30.4723 33.7373 28.0333 34.9769M26.5361 35.6249C25.1278 36.1335 23.6088 36.4107 22.0251 36.4107C20.4153 36.4107 18.8723 36.1242 17.4445 35.5995M15.8519 34.8916C12.0702 32.9023 9.36529 29.1424 8.83942 24.7143M41.0021 14.6256C39.4786 15.0878 15.4174 23.8084 24.9086 22.7805C30.9102 22.1305 46.6742 12.9049 41.0021 14.6256ZM30.6226 40.7355C30.095 39.2334 20.3422 15.5718 21.7796 25.0097C22.6885 30.9776 32.587 46.328 30.6226 40.7355ZM40.8599 30.8341C39.4811 30.038 16.6684 18.4377 23.9067 24.6624C28.4837 28.5985 45.9932 33.7978 40.8599 30.8341ZM24.9451 2.15326C24.5331 3.69113 19.2324 28.7289 23.3715 20.1262C25.9889 14.6864 26.4792 -3.57215 24.9451 2.15326ZM2.19397 25.3449C3.78608 25.3449 29.3427 23.9847 19.9617 22.2131C14.0299 21.0929 -3.73342 25.3449 2.19397 25.3449ZM14.4307 41.966C15.2268 40.5872 26.8271 17.7744 20.6024 25.0127C16.6664 29.5898 11.467 47.0992 14.4307 41.966ZM9.34308 7.01354C10.1391 8.39235 24.0954 29.8449 20.9391 20.835C18.9434 15.1378 6.37938 1.88027 9.34308 7.01354Z'}
  },
  {
    id :'balconyPlant2',
    offsetX:462,
    offsetY:45,
    // Size of the node
    width: 25,
    height:25,
    shape:{ type : 'Path', data:'M25.9813 23.5141C27.2901 23.5993 48.6838 19.0468 41.4746 10.8333C36.916 5.63963 21.1089 23.1968 25.9813 23.5141Z M23.6253 25.9234C23.1736 27.1547 21.4942 48.9629 31.4103 44.3689C37.6806 41.464 25.3067 21.3392 23.6253 25.9234Z M25.5989 25.6003C26.3978 26.6405 43.9262 39.7237 45.3483 28.888C46.2474 22.0363 22.6249 21.7278 25.5989 25.6003Z M24.7197 20.7567C25.6675 19.8502 36.7808 1.01108 25.8549 0.76778C18.9461 0.613932 21.191 24.1316 24.7197 20.7567Z M20.8885 22.8171C19.6966 22.2698 -1.91128 18.8763 1.88665 29.1238C4.2882 35.6035 25.3258 24.8547 20.8885 22.8171Z M21.6607 25.6193C20.3938 25.9588 1.59406 37.1385 11.0585 42.6028C17.0432 46.0581 26.3771 24.3556 21.6607 25.6193Z M22.3667 20.2554C21.8975 19.0306 8.82513 1.49408 4.37366 11.475C1.55885 17.7863 24.1136 24.815 22.3667 20.2554Z M40.0382 18.2498C40.7878 20.1543 41.1995 22.2289 41.1995 24.3996C41.1995 24.5507 41.1975 24.7013 41.1935 24.8515M35.2235 11.5507C33.6921 10.2594 31.9267 9.2368 30 8.55572M39 32.7159C37.5069 35.3317 35.3311 37.5074 32.7153 39.0004M24.8419 41.1939C24.6949 41.1977 24.5474 41.1996 24.3995 41.1996C21.7821 41.1996 19.3046 40.6011 17.0963 39.5334M10.7727 34.2278C9.9752 33.1239 9.30848 31.9193 8.79533 30.6367M7.70563 22.5004C7.89672 20.8019 8.34106 19.1801 9 17.6736M13.9123 11.274C16.1576 9.47777 18.8737 8.24563 21.846 7.79239M25.9813 23.5141C27.2901 23.5993 48.6838 19.0468 41.4746 10.8333C36.916 5.63963 21.1089 23.1968 25.9813 23.5141ZM23.6253 25.9234C23.1736 27.1547 21.4942 48.9629 31.4103 44.3689C37.6806 41.464 25.3067 21.3392 23.6253 25.9234ZM25.5989 25.6003C26.3978 26.6405 43.9262 39.7237 45.3483 28.888C46.2474 22.0363 22.6249 21.7278 25.5989 25.6003ZM24.7197 20.7567C25.6675 19.8502 36.7808 1.01108 25.8549 0.76778C18.9461 0.613932 21.191 24.1316 24.7197 20.7567ZM20.8885 22.8171C19.6966 22.2698 -1.91128 18.8763 1.88665 29.1238C4.2882 35.6035 25.3258 24.8547 20.8885 22.8171ZM21.6607 25.6193C20.3938 25.9588 1.59406 37.1385 11.0585 42.6028C17.0432 46.0581 26.3771 24.3556 21.6607 25.6193ZM22.3667 20.2554C21.8975 19.0306 8.82513 1.49408 4.37366 11.475C1.55885 17.7863 24.1136 24.815 22.3667 20.2554Z'}
  },
  {
    id :'commonDoor',
    offsetX: 673,
    offsetY:264,
    // Size of the node
    width: 27,
    height: 30,
   rotateAngle:90,
    shape:{ type : 'Path', data:'M1 71L1 79L72 79V71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71'}
  },
  {
    id :'toilet4BathTub',
    offsetX: 680,
    offsetY: 200,
    // Size of the node
    width: 50,
    height: 25,
    rotateAngle:90,
    shape:{ type : 'Path', data:'M1 9C1 4.58172 4.58172 1 9 1H84C88.4183 1 92 4.58172 92 9V40C92 44.4183 88.4183 48 84 48H9C4.58172 48 1 44.4183 1 40V9Z M12 8C12 6.89543 12.8954 6 14 6H61.5C71.7173 6 80 14.2827 80 24.5C80 34.7173 71.7173 43 61.5 43H14C12.8954 43 12 42.1046 12 41V8Z M11.5 26.5C11.5 26.5 12 26 12 25C12 24 11.5 23.5 11.5 23.5L22.0074 22.6917C23.3519 22.5883 24.5 23.6514 24.5 25C24.5 26.3486 23.3519 27.4117 22.0074 27.3083L11.5 26.5Z M8 21.5C9.933 21.5 11.5 23.067 11.5 25C11.5 26.933 9.933 28.5 8 28.5C6.067 28.5 4.5 26.933 4.5 25C4.5 23.067 6.067 21.5 8 21.5Z'}
  },
  {
    id :'toilet4Basin',
    offsetX: 729,
    offsetY: 262,
    // Size of the node
    width: 30,
    height: 25,
    rotateAngle:180,
    shape:{ type : 'Path', data:'M1 9C1 4.58172 4.58172 1 9 1H57C61.4183 1 65 4.58172 65 9V41C65 45.4183 61.4183 49 57 49H9C4.58172 49 1 45.4183 1 41V9Z M7 13C7 10.7909 8.79086 9 11 9H55C57.2091 9 59 10.7909 59 13V37C59 39.2091 57.2091 41 55 41H11C8.79086 41 7 39.2091 7 37V13Z M35 25.5C35 26.8807 33.8807 28 32.5 28C31.1193 28 30 26.8807 30 25.5C30 24.1193 31.1193 23 32.5 23C33.8807 23 35 24.1193 35 25.5Z M31 9C31 9 31.5 9.5 32.5 9.5C33.5 9.5 34 9 34 9L34.8083 19.5074C34.9117 20.8519 33.8486 22 32.5 22C31.1514 22 30.0883 20.8519 30.1917 19.5074L31 9Z M36 5.5C36 7.433 34.433 9 32.5 9C30.567 9 29 7.433 29 5.5C29 3.567 30.567 2 32.5 2C34.433 2 36 3.567 36 5.5Z'}
  },
  {
    id :'toilet4Faucet',
    offsetX: 729,
    offsetY: 172,
    // Size of the node
    width: 23,
    height: 37,
    shape:{ type : 'Path', data:'M46.989 33.0731C46.989 53.4671 37.3818 69.9996 25.5307 69.9996C13.6795 69.9996 4.07227 53.4671 4.07227 33.0731C4.07227 19.1497 4 18 4 18C4.17549 18.0144 15.9306 18.2553 26.5002 17.9993C36.1582 17.7654 46.989 17.9999 46.989 17.9999C46.989 17.9999 46.989 21.6119 46.989 33.0731Z M41 44.5C41 54.7173 34.0604 63 25.5 63C16.9396 63 10 54.7173 10 44.5C10 34.2827 16.9396 26 25.5 26C34.0604 26 41 34.2827 41 44.5Z M1 3.61538C1 2.17095 2.17095 1 3.61538 1H46.3846C47.8291 1 49 2.17095 49 3.61538V15.3846C49 16.8291 47.8291 18 46.3846 18H3.61538C2.17095 18 1 16.8291 1 15.3846V3.61538Z M26.9995 9C26.9995 10.1046 26.1041 11 24.9995 11C23.8949 11 22.9995 10.1046 22.9995 9C22.9995 7.89543 23.8949 7 24.9995 7C26.1041 7 26.9995 7.89543 26.9995 9Z M31 34C31 38.4183 28.3137 42 25 42C21.6863 42 19 38.4183 19 34C19 29.5817 21.6863 26 25 26C28.3137 26 31 29.5817 31 34Z'}
  },
  {
    id :'storeRoomDoor',
    offsetX: 798,
    offsetY: 122,
    // Size of the node
    width: 51,
    height: 38,
    rotateAngle:90,
    shape:{ type : 'Path', data:'M1 71L1 79L72 79V71M1 71L72 71M1 71C1 32.3401 32.3401 1 71 1H72V71'}
  },
  {
    id :'storeRoomWarddrobe',
    offsetX: 820,
    offsetY: 34,
    // Size of the node
    width: 73,
    height: 35,
    shape:{ type : 'Path', data:"M50.6443 54.406L76 29L80.9998 28.9502H85.9996L55.594 59.3558L50.6443 54.406Z M12 29L36.9996 54.4053L32.0498 59.3551L2 29H12Z M70.7969 44.8594C70.6017 44.6642 70.6017 44.3476 70.7969 44.1523C70.9922 43.957 71.3088 43.957 71.504 44.1523L72.9182 45.5665C73.1135 45.7618 73.1135 46.0784 72.9182 46.2736C72.723 46.4689 72.4064 46.4689 72.2111 46.2736L70.7969 44.8594Z M16.1406 44.1524C16.3358 43.9571 16.6524 43.9571 16.8477 44.1524C17.043 44.3476 17.043 44.6642 16.8477 44.8595L15.4335 46.2737C15.2382 46.469 14.9216 46.469 14.7264 46.2737C14.5311 46.0784 14.5311 45.7619 14.7264 45.5666L16.1406 44.1524Z M1 1L87 1V29H1L1 1Z"}
  },
  {
    id :'windowGarden',
    offsetX:370,
    offsetY:26,
    // Size of the node
    width: 253,
    height:36,
    shape:{ type : 'Path', data:"M1.5 0H0V1.5V38.5H3V3H152V38.5H155V1.5V0H153.5H1.5ZM6.5 5H5V6.5V38.5H8V8H53V38.5H56V8H100V38.5H103V8H147V38.5H150V6.5V5H148.5H103H101.5H100H56H54.5H53H6.5Z"}
  },
  {
    id :'TextNode1',
    offsetX:120,
    offsetY:40,
    // Size of the node
    width: 80,
    height:37,
   
    shape: { type: 'Text', content: 'Bedroom 12 x 12' },
    style: { fontSize: 16  }
  },
  {
    id :'TextNode2',
    offsetX:94,
    offsetY:224,
    // Size of the node
    width: 38,
    height:23,
    shape: { type: 'Text', content: ' Toilet 6 x 4' },
    style: { fontSize: 16  }
  },
  {
    id :'TextNode3',
    offsetX:91,
    offsetY:300,
    // Size of the node
    width: 38,
    height:23,
    shape: { type: 'Text', content: ' Toilet 6 x 4' },
    style: { fontSize: 16  }
  },
  {
    id :'TextNode4',
    offsetX:118,
    offsetY:452,
    // Size of the node
    width: 80,
    height:37,
    shape: { type: 'Text', content:' Bedroom 12 x 12'},
    style: { fontSize: 16  }
  },
  {
    id :'TextNode5',
    offsetX:331,
    offsetY:481,
    // Size of the node
    width: 102,
    height:37,
    shape: { type: 'Text', content: 'Porch 15 x 8' },
    style: { fontSize: 16  }
  },
  {
    id :'TextNode6',
    offsetX:602,
    offsetY:107,
    // Size of the node
    width: 80,
    height:37,
    shape: { type: 'Text', content: 'Kitchen  12 x 9' },
    style: { fontSize: 16  }
  },
  {
    id :'TextNode7',
    offsetX:820,
    offsetY:80,
    // Size of the node
    width: 50,
    height:36,
    shape: { type: 'Text', content: 'Storeroom 6 x 9' },
    style: { fontSize: 16  }
  },
  {
    id :'TextNode8',
    offsetX:725,
    offsetY:214,
    // Size of the node
    width: 38,
    height:23,
    shape: { type: 'Text', content: 'Toilet 7 x 9' },
    style: { fontSize: 16  }
  },
  {
    id :'TextNode9',
    offsetX:820,
    offsetY:232,
    // Size of the node
    width: 38,
    height:23,
    shape: { type: 'Text', content: 'Toilet 7 x 9' },
    style: { fontSize: 16  }
  },
  {
    id :'TextNode10',
    offsetX:680,
    offsetY:370,
    // Size of the node
    width: 80,
    height:37,
    shape: { type: 'Text', content: 'Bedroom 18 x 15' },
    style: { fontSize: 16  }
  },
  {
    id :'TextNode11',
    offsetX:331,
    offsetY:277,
    // Size of the node
    width: 100,
    height:47,
    shape: { type: 'Text', content:' Living Room    19 x 15 ' },
    style: { fontSize: 16  }
  },
]
public connectors :ConnectorModel[] | any=[
  {
    id: "connector1",
    style: {
    strokeWidth: 5
  },
    sourcePoint: {
        x: 20,
        y: 10
    },
    targetPoint: {
        x: 80,
        y: 10
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector2",
    style: {
    strokeWidth: 5
  },
    sourcePoint: {
        x: 160,
        y: 10
    },
    targetPoint: {
        x: 240,
        y: 10
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector3",
    style: {
    strokeWidth: 5
  },
    sourcePoint: {
        x: 20,
        y: 10
    },
    targetPoint: {
        x: 20,
        y: 80
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector4",
    style: {
    strokeWidth: 5
  },
    sourcePoint: {
        x: 240,
        y: 10
    },
    targetPoint: {
      x: 240,
      y: 200
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector5",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 20,
        y: 200
    },
    targetPoint: {
        x: 155,
        y: 200
    },
    targetDecorator: {
      shape: 'none',
    }
  },

  {
    id: "connector7",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 185,
        y: 280
    },
    targetPoint: {
        x: 185,
        y: 350
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector34",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 20,
        y: 350
    },
    targetPoint: {
        x: 155,
        y: 350
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector8",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 185,
        y: 200
    },
    targetPoint: {
        x: 185,
        y: 280
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector9",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 100,
        y: 280
    },
    targetPoint: {
        x: 185,
        y: 280
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector10",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 20,
        y: 200
    },
    targetPoint: {
        x: 20,
        y: 280
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector11",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 20,
        y: 280
    },
    targetPoint: {
        x:185,
        y: 280
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector12",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 20,
        y: 280
    },
    targetPoint: {
        x: 20,
        y: 370
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector36",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
      x: 20,
      y: 420
    },
    targetPoint: {
        x: 20,
        y: 480
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector13",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 20,
        y: 480
    },
    targetPoint: {
        x: 80,
        y: 480
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector14",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 160,
        y: 480
    },
    targetPoint: {
        x: 240,
        y: 480
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector15",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 240,
        y: 280
    },
    targetPoint: {
        x: 240,
        y: 540
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector16",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 240,
        y: 400
    },
    targetPoint: {
        x: 280,
        y: 400
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector17",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 360,
        y: 400
    },
    targetPoint: {
        x: 440,
        y: 400
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector18",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 540,
        y: 400
    },
    targetPoint: {
        x: 580,
        y: 400
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector19",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 580,
        y: 540
    },
    targetPoint: {
        x: 580,
        y: 280
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector20",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 500,
        y: 10
    },
    targetPoint: {
        x: 860,
        y: 10
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector21",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 500,
        y: 10
    },
    targetPoint: {
        x: 500,
        y: 140
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector24",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 580,
        y:480
    },
    targetPoint: {
        x: 700,
        y: 480
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector25",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 780,
        y:480
    },
    targetPoint: {
        x: 860,
        y: 480
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector26",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 860,
        y:480
    },
    targetPoint: {
        x: 860,
        y: 10
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector27",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 780,
        y:10
    },
    targetPoint: {
        x: 780,
        y: 100
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector28",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 630,
        y:280
    },
    targetPoint: {
        x: 830,
        y: 280
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector29",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 660,
        y:150
    },
    targetPoint: {
        x: 860,
        y: 150
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector30",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 760,
        y:150
    },
    targetPoint: {
        x: 760,
        y: 280
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  
  {
    id: "connector32",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 240,
        y:540
    },
    targetPoint: {
        x: 580,
        y: 540
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector35",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 20,
        y:140
    },
    targetPoint: {
        x: 20,
        y: 200
    },
    targetDecorator: {
      shape: 'none',
    }
  },
  {
    id: "connector37",
    style: {
    strokeWidth: 4
  },
    sourcePoint: {
        x: 660,
        y:150
    },
    targetPoint: {
        x: 660,
        y: 250
    },
    targetDecorator: {
      shape: 'none',
    }
  },
]
 public itemTemplate()
  {
    return {template: itemVue};
  }
  public valueTemplate()
  {
   return {template: valueVue}; 
  }
   public toolbarTemplate() {
            return {
                template: toolbarVue
            }
   };
    public hideProperty() {
            return {
                template: orderVue
            }
   };

  public setNodeDefaults(node: Node, diagram: Diagram): NodeModel {
        if (node.style) {
            if (node.style.fill === "transparent" && !node.children) {
                node.style.fill = "white";
            }
        }
        let node1: NodeModel = {
            style: { strokeWidth: 1 }
        };
        return node1;
    }
    public setConnectorDefaults(connector: Connector, diagram: Diagram): ConnectorModel {
        let connector1: ConnectorModel = {
         
            annotations: [
                { content: "", style: { fill: "transparent" } }
            ],
            style: { strokeWidth: 2 }
        };
        return connector1;
    }

  public selectedItems: SelectorModel = {
    constraints: SelectorConstraints.All & ~SelectorConstraints.ToolTip 
  };
  public renameDiagram(args: MouseEvent): void {
    document
      .getElementsByClassName("db-diagram-name-container")[0]
      .classList.add("db-edit-name");
    let element: HTMLInputElement = document.getElementById(
      "diagramEditable"
    ) as any;
    element.value = (document.getElementById("diagramName") as any).innerHTML;
    element.focus();
    element.select();
  }
  public diagramNameKeyDown(args: KeyboardEvent): void {
    if (args.which === 13) {
      (document.getElementById("diagramName") as any).innerHTML = (
        document.getElementById("diagramEditable") as any
      ).value;
      document
        .getElementsByClassName("db-diagram-name-container")[0]
        .classList.remove("db-edit-name");
    }
  }
   public scrollChange(args: IScrollChangeEventArgs): void {
        var btnZoomIncrement = (document.getElementById("btnZoomIncrement") as any).ej2_instances[0];
        if(args.panState !=='Start'){
            btnZoomIncrement.content = Math.round((this.diagram as any).scrollSettings.currentZoom * 100) + ' %';
            }
        // this.selectedItem.scrollSettings.currentZoom = (args.newValue.CurrentZoom * 100).toFixed() + "%";
    }
    public arrangeMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
        this.updateMenuStyle(args)
        if (args.event && closest(args.event.target as Element, ".e-dropdown-btn") !== null) {
            args.cancel = true;
        }
    }
    private updateMenuStyle(args: BeforeOpenCloseMenuEventArgs): void {
        for (let i: number = 0; i < args.element.children.length; i++) {
            (args.element.children[i] as HTMLElement).style.display = "block";
        }
    }

    public arrangeMenuBeforeClose(args: BeforeOpenCloseMenuEventArgs): void {
        if (args.event && closest(args.event.target as Element, ".e-dropdown-btn") !== null) {
            args.cancel = true;
        }
        if (!args.element) {
            args.cancel = true;
        }
    }

    public arrangeContextMenuOpen(args: OpenCloseMenuEventArgs): void {
        if (args.element.classList.contains("e-menu-parent")) {
            let popup: HTMLElement = document.querySelector("#btnDesignMenu-popup") as HTMLElement;
            args.element.style.left = formatUnit(parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10));
            args.element.style.top = formatUnit(parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10));
        }
    }
   
 public diagramNameChange(args: MouseEvent): void {
        (document.getElementById("diagramName") as any).innerHTML = (document.getElementById("diagramEditable") as HTMLInputElement).value;
        document.getElementsByClassName("db-diagram-name-container")[0].classList.remove("db-edit-name");
        (document.getElementById("exportfileName") as any).value =( document.getElementById('diagramName') as any).innerHTML;
    }
public beforeItemRender(args: MenuEventArgs): void {
  let shortCutText = this.getShortCutKey((args.item as any).text);
  if (shortCutText) {
      var shortCutSpan = document.createElement('span');
      var text = args.item.text;
      shortCutSpan.textContent = shortCutText;
      shortCutSpan.style.pointerEvents = 'none';
      args.element.appendChild(shortCutSpan);
      shortCutSpan.setAttribute('class', 'db-shortcut');
  }
  let status = this.enableMenuItems((args.item as any).text);
  if (status) {
      args.element.classList.add('e-disabled');
  } else {
      if (args.element.classList.contains('e-disabled')) {
          args.element.classList.remove('e-disabled');
      }
  }
}
 public getShortCutKey(menuItem: string): string  {
  let shortCutKey = navigator.platform.indexOf('Mac') > -1 ? 'Cmd' : 'Ctrl';
  switch (menuItem) {
      case 'New':
          shortCutKey = 'Shift' + '+N';
          break;
      case 'Open':
          shortCutKey = shortCutKey + '+O';
          break;
      case 'Save':
          shortCutKey = shortCutKey + '+S';
          break;
      case 'Undo':
          shortCutKey = shortCutKey + '+Z';
          break;
      case 'Redo':
          shortCutKey = shortCutKey + '+Y';
          break;
      case 'Cut':
          shortCutKey = shortCutKey + '+X';
          break;
      case 'Copy':
          shortCutKey = shortCutKey + '+C';
          break;
      case 'Paste':
          shortCutKey = shortCutKey + '+V';
          break;
      case 'Delete':
          shortCutKey = 'Delete';
          break;
      case 'Duplicate':
          shortCutKey = shortCutKey + '+D';
          break;
      case 'Select All':
          shortCutKey = shortCutKey + '+A';
          break;
      case 'Zoom In':
          shortCutKey = shortCutKey + '++';
          break;
      case 'Zoom Out':
          shortCutKey = shortCutKey + '+-';
          break;
      case 'Group':
          shortCutKey = shortCutKey + '+G';
          break;
      case 'Ungroup':
          shortCutKey = shortCutKey + '+U';
          break;
      case 'Send To Back':
          shortCutKey = shortCutKey + '+Shift+B';
          break;
      case 'Bring To Front':
          shortCutKey = shortCutKey + '+Shift+F';
          break;
      default:
          shortCutKey = '';
          break;
  }
  return shortCutKey;
}

public enableMenuItems (itemText: string ) {
  let selectedDiagram = (this.diagram as any).ej2_instances ? (this.diagram as any).ej2_instances[0] : (this.diagram as any);
  let selectedItems = selectedDiagram.selectedItems.nodes;
  selectedItems = selectedItems.concat(selectedDiagram.selectedItems.connectors);
  if (itemText) {
      var commandType = itemText.replace(/[' ']/g, '');
      if (selectedItems.length === 0) {
          switch (commandType.toLowerCase()) {
              case 'edittooltip':
                  var disable = false;
                  if (!(selectedItems.length === 1)) {
                      disable = true;
                  }
                  return disable;
              case 'cut':
                  return true;
              case 'copy':
                  return true;
              case 'delete':
                  return true;
              case 'duplicate':
                  return true;
          }
      }
      if (selectedItems.length > 1) {
          switch (commandType.toLowerCase()) {
              case 'edittooltip':
                  return true;
              
          }
      }
      if (!((this.diagram as any).commandHandler.clipboardData.pasteIndex !== undefined

        && (this.diagram as any).commandHandler.clipboardData.clipObject !==undefined) && itemText === 'Paste') {

        return true;

    }
      if (itemText === 'Undo' && (this.diagram as any).historyManager.undoStack.length === 0) {
          return true;
      }
      if (itemText === 'Redo' && (this.diagram as any).historyManager.redoStack.length === 0) {
          return true;
      }
      if(itemText === 'Insert Link' || itemText === 'Insert Image'  )
      {
        if(selectedItems.length === 0){
          return true;
        }
        else
        {
          return false;
        }
          
      }
      if(itemText === 'Insert Image')
      {
          return true;
      }
    
  }
  return false;
};
private buttonInstance: any;
    public menumouseover(args: MouseEvent): void {
        let target: any = args.target as HTMLButtonElement;
        if (target && (target.className === "e-control e-dropdown-btn e-lib e-btn db-dropdown-menu" ||
            target.className === "e-control e-dropdown-btn e-lib e-btn db-dropdown-menu e-ddb-active")) {
            if (this.buttonInstance && this.buttonInstance.id !== target.id) {
                if (this.buttonInstance.getPopUpElement().classList.contains("e-popup-open")) {
                    this.buttonInstance.toggle();
                    let buttonElement: any = document.getElementById(this.buttonInstance.element.id);
                    buttonElement.classList.remove("e-btn-hover");
                }
            }
            let button1: any = target.ej2_instances[0];
            this.buttonInstance = button1;
            if (button1.getPopUpElement().classList.contains("e-popup-close")) {
                button1.toggle();
                if (button1.element.id === "btnArrangeMenu") {
                    this.selectedItem.utilityMethods.enableArrangeMenuItems(this.selectedItem);
                }
                let buttonElement: any = document.getElementById(this.buttonInstance.element.id);
                buttonElement.classList.add("e-btn-hover");
            }
        } else {
            if (closest(target, ".e-dropdown-popup") === null && closest(target, ".e-dropdown-btn") === null) {
                if (this.buttonInstance && this.buttonInstance.getPopUpElement().classList.contains("e-popup-open")) {
                    this.buttonInstance.toggle();
                    let buttonElement: any = document.getElementById(this.buttonInstance.element.id);
                    buttonElement.classList.remove("e-btn-hover");
                }
            }
        }
    }
    public aspectClick(){
      
        var isAspect = true;
     let   aspectRatioBtn = (document.getElementById('aspectRatioBtn') as any).ej2_instances[0];
    if((document.getElementById('aspectRatioBtn') as any).classList.contains('e-active'))
    {
        (document.getElementById('aspectRatioBtn') as any).classList.remove('e-active');
        isAspect = false;
        aspectRatioBtn.iconCss =  'sf-icon-unlock'
        
    }
    else{
        (document.getElementById('aspectRatioBtn') as any).classList.remove('e-active');
        isAspect = true;
        aspectRatioBtn.iconCss = 'sf-icon-lock';
    }
        this.selectedItem.nodePropertyChange({propertyName: 'aspectRatio', propertyValue: isAspect}); 
    };


    public menuClick(args: MenuEventArgs): void {
    let buttonElement: any = document.getElementsByClassName("e-btn-hover")[0];
    if (buttonElement) {
      buttonElement.classList.remove("e-btn-hover");
    }
    let diagram:Diagram;
    let command: any = ((args.item as any).text.replace(/[" "]/g, "").toLowerCase());
  switch(command){
    case 'new':
           this.diagram.clear();
            break;
    case 'save':
            this.download(this.diagram.saveDiagram());
            break;
    case 'export':
          this.exportDialog.show();
          break;
    case 'open':
          this.openUploadBox(true, ".json");
           break;
    case 'print':
          this.printDialog.show();
          break;
    case 'undo':
            this.diagram.undo();
            break;
    case 'redo':
            this.diagram.redo();
            break;
    case 'cut':
            this.diagram.cut();
            break;
    case 'copy':
            this.diagram.copy();
            break;
    case 'paste':
            this.diagram.paste();
            break;
    case 'delete':
            this.diagram.remove();
            break;
    case 'showguides':
            (this.diagram as any).snapSettings.constraints =
              (this.diagram as any).snapSettings ^ SnapConstraints.SnapToObject;
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
            break;
    case 'showgrid':
            (this.diagram as any).snapSettings.constraints = (this.diagram as any).snapSettings.constraints ^ SnapConstraints.ShowLines;
            args.item.iconCss  = args.item.iconCss ? '' : 'sf-icon-check-tick';
            break;
    case 'snaptogrid':
            (this.diagram as any).snapSettings.constraints =
          (this.diagram as any).snapSettings.constraints ^ SnapConstraints.SnapToLines;
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
            break;
    case 'fittoscreen':
            this.diagram.fitToPage({ mode: 'Page', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 }, });
            // args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
            break;
    case 'fittowidth':
            (this.diagram as any).fitToPage({ mode: 'Width', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });
            break;
    case 'showrulers':
            (this.diagram as any).rulerSettings.showRulers = !(this.diagram as any).rulerSettings.showRulers;
            args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
            break;
    case 'pagebreak':
          args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
          if(args.item.iconCss){
            (this.diagram as any).pageSettings.showPageBreaks = true;
            this.selectedItem.pageSettings.pageBreaks = true;
          }
          else{
            (this.diagram as any).pageSettings.showPageBreaks = false;
            this.selectedItem.pageSettings.pageBreaks = false;
          }
          break;
          case 'landscape':
              (args.item as any).parentObj.items[1].iconCss = '';
              (args.item as any).iconCss = 'sf-icon-check-tick';
              (this.diagram as any).pageSettings.orientation = 'Landscape';
              (document.getElementById('pageLandscape') as any).classList.add('e-active');
              (document.getElementById('pagePortrait') as any).classList.remove('e-active');
              break;
          case 'portrait':
              (args.item as any).parentObj.items[0].iconCss = '';
              args.item.iconCss = 'sf-icon-check-tick';
              (this.diagram as any).pageSettings.orientation = 'Portrait';
              (document.getElementById('pagePortrait') as any).classList.add('e-active');
              (document.getElementById('pageLandscape') as any).classList.remove('e-active');
              break;
          case 'letter(8.5inx11in)':
          case 'legal(8.5inx14in)':
          case 'a3(297mmx420mm)':
          case 'a4(210mmx297mm)':
          case 'a5(148mmx210mm)':
          case 'a6(105mmx148mm)':
          case 'tabloid(279mmx432mm)':
              this.diagramPropertyBinding.paperListChange(args)
            // pageSettingsList.text = args.item.text;
            this.updateSelection(args.item)
            this.selectedItem.pageSettings.paperSize = (args.item as any).value;
            break;
    
  }
    (this.diagram as any).dataBind();
  }
  public menuClick1(args: ClickEventArgs): void {
     let buttonElement: any = document.getElementsByClassName("e-btn-hover")[0];
    if (buttonElement) {
      buttonElement.classList.remove("e-btn-hover");
    }
    let diagram:Diagram;
    let command: any = ((args.item as any).text.replace(/[" "]/g, "").toLowerCase());
  switch(command){
    case 'insertlink':
    case 'insertimage':
        this.toolbarInsertClick(args)
        break;
    }
  }
   public openUploadBox(isOpen: boolean, extensionType: string): void {
    let defaultUpload: any = document.getElementById("defaultfileupload");
    defaultUpload = defaultUpload.ej2_instances[0];
    defaultUpload.clearAll();
    this.selectedItem.orgDataSettings.extensionType =
      defaultUpload.allowedExtensions = extensionType;
    defaultUpload.dataBind();
    isOpen = isOpen;
    (
      document.getElementsByClassName("e-file-select-wrap")[0]
        .children[0] as HTMLButtonElement
    ).click();
  }
  public updateSelection(item:any){
        for(let i:number=0;i<item.parentObj.items.length;i++)
        {
            if(item.text === item.parentObj.items[i].text){
                item.parentObj.items[i].iconCss = 'sf-icon-check-tick';
            }
            else{
                item.parentObj.items[i].iconCss = '';
            }
        }
    };
  //save the diagram object in json data.
public download(data : any) {
  if ((window.navigator as any).msSaveBlob) {
      var blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
      (window.navigator as any).msSaveOrOpenBlob(blob, 'Diagram.json');
  }
  else {
      var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
      var a = document.createElement('a');
      a.href = dataStr;
      a.download = 'Diagram.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
  }
}
private generateDiagram(): void {
        let diagramInstance: DiagramComponent;
        let diagramObj: any = document.getElementById("diagram");
        diagramInstance = diagramObj.ej2_instances[0];
        (this.selectedItem as any).diagram =diagramInstance;
      
    }
    private canExecute(): boolean {
      return true;
    }
    public static canExecute(): boolean {
    return true;
  }
  public toolbarEditorClick(args: ClickEventArgs): void {
        let diagram :Diagram = (document.getElementById("diagram") as any).ej2_instances[0];
        let commandType:string = (args.item.tooltipText as any).replace(/[' ']/g, '').toLowerCase();
        switch (commandType) {
            case 'new':
            this.diagram.clear();
            break;
        case 'undo':
            this.diagram.undo();
            break;
        case 'redo':
            this.diagram.redo();
            break;
        case 'open':
            this.openUploadBox(true, ".json");
            break;
        case 'zoomin(ctrl++)':
            this.diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
            // zoomCurrentValue.content = (this.diagram as any).scrollSettings.currentZoom = ((this.diagram as any).scrollSettings.currentZoom * 100).toFixed() + '%';
            break;
        case 'zoomout(ctrl+-)':
           this. diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
            // zoomCurrentValue.content = (this.diagram as any).scrollSettings.currentZoom = ((this.diagram as any).scrollSettings.currentZoom * 100).toFixed() + '%';
            break;
        case 'cut':
            this.diagram.cut();
            break;
        case 'copy':
            this.diagram.copy();
            break;
        case 'paste':
            this.diagram.paste();
            break;
        case 'print':
            this.printDialog.show();
            break;
        case 'export':
            // exportDialog.show();
            break;
        case 'save':
            this.download(this.diagram.saveDiagram());
            break;
        case 'fillcolor':
          var objColor = (this.diagram as any).selectedItems.nodes[0]? 'nodeFillColor':'lineColor'
          // UtilityMethods.prototype.showColorPicker(objColor,'tb-item-stroke');
          break;
           
        case 'fontcolor':
              if ((this.diagram as any).selectedItems.nodes[0].annotations) {
                // UtilityMethods.prototype.showColorPicker('textColor', 'tb-item-stroke');
                 
              }
              break;
        case 'bringtofront':
          this.diagram.bringToFront();
            break;
        case 'sendtoback':
            this.diagram.sendToBack();
            break;
        case 'sendbackward':
            this.diagram.sendBackward();
            break;
        case 'bringforward':
            this.diagram.moveForward();
            break;
        case 'pantool':
            (this.diagram as any).tool = DiagramTools.ZoomPan;
            this.diagram.clearSelection();
            break;
        case 'selecttool':
           (this.diagram as any).drawingObject = {};
                (this.diagram as any).tool = DiagramTools.SingleSelect | DiagramTools.MultipleSelect;
                break;
            break;
        case 'group':
            this.diagram.group();
            args.item.prefixIcon = 'sf-icon-ungroup';
            args.item.tooltipText = 'UnGroup';
            break;
        case 'ungroup':
            this.diagram.unGroup();
            args.item.prefixIcon = 'sf-icon-group';
            args.item.tooltipText = 'Group';
            break;
        case 'delete':
            this.diagram.remove();
            break;
        case 'lock':
        case 'unlock':
              this.lockObject();
              break;
        case 'alignleft':
        case 'alignright':
        case 'aligntop':
        case 'alignbottom':
        case 'alignmiddle':
        case 'aligncenter':
              var alignType = commandType.replace('align', '');
              var alignType1 = alignType.charAt(0).toUpperCase() + alignType.slice(1);
              this.diagram.align(alignType1);
              break;
        case 'distributeobjectshorizontally':
              this.diagram.distribute('RightToLeft');
              break;
       case 'distributeobjectsvertically':
              this.diagram.distribute('BottomToTop');
              break;
        case 'horizontalflip':
               this.flipObjects(commandType,diagram);    
              break;
        case 'verticalflip':
               this.flipObjects(commandType,diagram);    
              break;
        case 'texttool':
              (this.diagram as any).drawingObject = { shape: { type: "Text" }, style: { strokeColor: "none", fill: "none" } };
                (this.diagram as any).tool = DiagramTools.ContinuousDraw;
                break;
              break;
        case 'straight' : 
              (this.diagram as any).drawingObject = { type: 'Straight' ,targetDecorator:{ shape: "none"}} ;
              (this.diagram as any).tool = DiagramTools.ContinuousDraw;
              break;
   }
   if (commandType === 'pantool' || commandType === 'selecttool' || commandType === 'texttool'|| commandType === 'straight') {
    if ((args.item.cssClass as any).indexOf('tb-item-selected') === -1) {
       this.removeSelectedToolbarItem();
        args.item.cssClass += ' tb-item-selected';
      }
    }
  }
  
  public removeSelectedToolbarItem(): void {
        for (let i: number = 0; i < (this.toolbarEditor as any).items.length; i++) {
            let item: any = (this.toolbarEditor as any).items[i];
            if (item.cssClass.indexOf("tb-item-selected") !== -1) {
                item.cssClass = item.cssClass.replace(" tb-item-selected", "");
            }
        }
        this.toolbarEditor.dataBind();
    }
        public flipObjects(flipType:string,diagram:Diagram){
        var selectedObjects = (diagram as any).selectedItems.nodes.concat(diagram.selectedItems.connectors);
        for(let i:number = 0;i<selectedObjects.length;i++)
        {
           selectedObjects[i].flip = flipType === 'horizontalflip'? 'Horizontal':'Vertical';
        }
        diagram.dataBind();
  
      };
    public onUploadSuccess(args: { [key: string]: Object }): void {
        // (document.getElementsByClassName("sb-content-overlay")[0] as HTMLDivElement).style.display = "none";
        if (args.operation !== "remove") {
            let file1: { [key: string]: Object } = args.file as { [key: string]: Object };
            let file: Blob = file1.rawFile as Blob;
            let fileType = file1.type.toString();
            let reader: FileReader = new FileReader();
            if (fileType.toLowerCase() === "jpg" || fileType.toLowerCase() === "png") {
                reader.readAsDataURL(file);
                reader.onloadend = this.setImage.bind(this);
            } else {
                reader.readAsText(file);
                if (fileType === "json") {
                    reader.onloadend = this.loadDiagram.bind(this);
                } 
            }
           this.isOpen = false;
        }
    }
     public loadDiagram(event: ProgressEvent): void {
        (this.diagram as any).loadDiagram(((event.target as FileReader) as any).result.toString());
    }
     public setImage(event: ProgressEvent): void {
        
        let node: NodeModel = (this.selectedItem.diagram as any).selectedItems.nodes[0];
        node.shape = { type: "Image", source: (event.target as FileReader).result as string, align: "None" };
    }
public onUploadFailure(args: { [key: string]: Object }): void {
        // (document.getElementsByClassName("sb-content-overlay")[0] as HTMLDivElement).style.display = "none";
    }

    public onUploadFileSelected(args: { [key: string]: Object }): void {
        // (document.getElementsByClassName("sb-content-overlay")[0] as HTMLDivElement).style.display = "";
    }

    public toolbarInsertClick(args: ClickEventArgs): void {
        
        let diagram: any = this.selectedItem.diagram;
        let commandType =(args.item ? args.item.text : (args as any).target.id).replace(/[' ']/g, '').toLowerCase();
   
        if ((diagram.selectedItems as any).nodes.length > 0) {
            switch (commandType.toLowerCase()) {
                case "insertlink":
                    (document.getElementById("hyperlink") as HTMLInputElement).value = "";
                    (document.getElementById("hyperlinkText") as HTMLInputElement).value = "";
                    if (diagram.selectedItems.nodes[0].annotations.length > 0) {
                        let annotation: ShapeAnnotationModel = diagram.selectedItems.nodes[0].annotations[0];
                        if ((annotation.hyperlink as any).link || annotation.content) {
                            ((document.getElementById("hyperlink") as HTMLInputElement) as any).value = (annotation.hyperlink as any).link;
                            ((document.getElementById("hyperlinkText") as HTMLInputElement) as any ).value = (annotation.hyperlink as any).content || annotation.content;
                        }
                    }
                    this.hyperlinkDialog.show();
                    break;
                case "insertimage":
                    this.openUploadBox(false, ".jpg,.png,.bmp");
                    break;
            }
        }
    }
    public getDialogButtons(dialogType: string): any {
    let buttons: any = [];
    switch (dialogType) {
      case "export":
        buttons.push({
          click: this.btnExportClick.bind(this),
          buttonModel: {
            content: "Export",
            cssClass: "e-flat e-db-primary",
            isPrimary: true,
          },
        });
        break;
      case "print":
        buttons.push({
          click: this.btnPrintClick.bind(this),
          buttonModel: {
            content: "Print",
            cssClass: "e-flat e-db-primary",
            isPrimary: true,
          },
        });
        break;
        case "hyperlink":
         buttons.push({
           click: this.btnHyperLink.bind(this),
           buttonModel: {
             content: "Apply",
             cssClass: "e-flat e-db-primary",
            isPrimary: true,
           },
         });
        break;
    }
    buttons.push({
      click: this.btnCancelClick.bind(this),
      buttonModel: {
        content: "Cancel",
        cssClass: "e-flat",
        isPrimary: true,
      },
    });
    return buttons;
  }
   public getUploadButtons(): any {
        let buttons: any = [];
        buttons.push({
            click: this.btnCancelClick.bind(this), buttonModel: { content: "Cancel", cssClass: "e-flat", isPrimary: true }
        });
        buttons.push({
            click: this.btnUploadNext.bind(this), buttonModel: { content: "Next", cssClass: "e-flat e-db-primary", isPrimary: true },
        });
        return buttons;
    }
     private btnUploadNext(args:MouseEvent): void {
        const target: any = args.target;
        const buttonInstance: any = target.ej2_instances[0];
        const uploadDialogContent: any = document.getElementById('uploadDialogContent');
        if (OrgChartUtilityMethods.isUploadSuccess) {
            if (uploadDialogContent.className === 'db-upload-content firstPage') {
                if (OrgChartUtilityMethods.fileType === 'xml') {
                    (this.fileUploadDialog as any).header = ' Define Employee Information';
                    uploadDialogContent.className = 'db-upload-content thirdPage';
                    buttonInstance.content = 'Finish';
                } else {
                  (this.fileUploadDialog as any).header = ' Define Employee - Supervisor Relationship';
                    uploadDialogContent.className = 'db-upload-content secondPage';
                }
            } else if (uploadDialogContent.className === 'db-upload-content secondPage') {
                const id: string = this.selectedItem.orgDataSettings.id;
                const parent: string = this.selectedItem.orgDataSettings.parent;
                if (id && parent) {
                    
                  
                        (this.fileUploadDialog as any).header = ' Define Employee Information';
                        uploadDialogContent.className = 'db-upload-content thirdPage';
                        buttonInstance.content = 'Finish';
                    }
                else {
                    alert('EmployeeId and SupervisorId can"t be empty');
                }

            } else {
                const nameField: string = this.selectedItem.orgDataSettings.nameField;
                if (nameField) {
                    uploadDialogContent.className = 'db-upload-content firstPage';
                    buttonInstance.content = 'Next';
                    
                    this.defaultupload.clearAll();
                } else {
                    alert('Name field can"t be empty');
                }
            }
        }
    }
  private btnExportClick(): void {
        let diagram: Diagram = this.selectedItem.diagram as Diagram ;
        diagram.exportDiagram({
            fileName: this.selectedItem.exportSettings.fileName,
            format: this.selectedItem.exportSettings.format as FileFormats,
            region: this.selectedItem.exportSettings.region as DiagramRegions,
            multiplePage :this.selectedItem.diagram.pageSettings.multiplePage
        });
        this.exportDialog.hide();
    }
    private btnPrintClick(): void {
        let pageWidth: number = this.selectedItem.printSettings.pageWidth;
        let pageHeight: number = this.selectedItem.printSettings.pageHeight;
        let paperSize: PaperSize = this.selectedItem.utilityMethods.getPaperSize(this.selectedItem.printSettings.paperSize);
        if (paperSize.pageHeight && paperSize.pageWidth) {
            pageWidth = paperSize.pageWidth;
            pageHeight = paperSize.pageHeight;
        }
        if (this.selectedItem.pageSettings.isPortrait) {
            if (pageWidth > pageHeight) {
                let temp: number = pageWidth;
                pageWidth = pageHeight;
                pageHeight = temp;
            }
        } else {
            if (pageHeight > pageWidth) {
                let temp: number = pageHeight;
                pageHeight = pageWidth;
                pageWidth = temp;
            }
        }
        let diagram: Diagram = this.selectedItem.diagram as Diagram;
        diagram.print({
            region: this.selectedItem.printSettings.region as DiagramRegions, pageHeight: pageHeight, pageWidth: pageWidth,
            multiplePage: !this.selectedItem.printSettings.multiplePage,
            pageOrientation: this.selectedItem.printSettings.isPortrait ? "Portrait" : "Landscape"
        });
        this.printDialog.hide();
    }
    private btnCancelClick(args: MouseEvent): void {
        let ss: any = (args.target as HTMLElement)as any;
        let key: any = (ss.offsetParent.id) as any;
        switch (key) {
            case "exportDialog":
                this.exportDialog.hide();
                break;
            case "printDialog":
                this.printDialog.hide();
                break;
           
            case "hyperlinkDialog":
            this.hyperlinkDialog.hide();
            break;
            
            case "fileUploadDialog":
                this.fileUploadDialog.hide();
                OrgChartUtilityMethods.isUploadSuccess = false;
                break;
            
        }
    }
    
    private btnHyperLink(): void {
        let node: Node = ((this.selectedItem as any).diagram ).selectedItems.nodes[0] as Node;
        if (node.annotations.length > 0) {
            (node.annotations[0].hyperlink as any).link = (document.getElementById("hyperlink") as HTMLInputElement).value;
            (node.annotations[0].hyperlink as any).content = (document.getElementById("hyperlinkText") as HTMLInputElement).value;
            this.applyToolTipforHyperlink(node);
            ((this.selectedItem  as any).diagram).dataBind();
        } else {
            let annotation: ShapeAnnotationModel = {
                hyperlink: {
                    content: (document.getElementById("hyperlinkText") as HTMLInputElement).value,
                    link: (document.getElementById("hyperlink") as HTMLInputElement).value
                }
            };
            (this.selectedItem.diagram as any).addLabels(node, [annotation]);
            this.applyToolTipforHyperlink(node);
           (this.selectedItem.diagram as any).dataBind();
        }
        this.hyperlinkDialog.hide();
    }
    private applyToolTipforHyperlink(node: Node): void {
        node.constraints = NodeConstraints.Default & ~NodeConstraints.InheritTooltip | NodeConstraints.Tooltip;
        node.tooltip = {
            content: (node.annotations[0].hyperlink as any).link, relativeMode: "Object",
            position: "TopCenter", showTipPointer: true,
        };
    }
    private lockObject(): void {
        this.selectedItem.isModified = true;
        let diagram: Diagram = this.selectedItem.diagram as Diagram;
        for (let i: number = 0; i < (diagram.selectedItems.nodes as any).length; i++) {
            let node: any = (diagram.selectedItems as any).nodes[i];
            if (node.constraints & NodeConstraints.Drag) {
                node.constraints = NodeConstraints.PointerEvents | NodeConstraints.Select;
            } else {
                node.constraints = NodeConstraints.Default;
            }
        }
        for (let i: number = 0; i < (diagram.selectedItems.connectors as any).length; i++) {
            let connector: any = (diagram.selectedItems as any).connectors[i];
            if (connector.constraints & ConnectorConstraints.Drag) {
                connector.constraints = ConnectorConstraints.PointerEvents | ConnectorConstraints.Select;
            } else {
                connector.constraints = ConnectorConstraints.Default;
            }
        }
        diagram.dataBind();
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
