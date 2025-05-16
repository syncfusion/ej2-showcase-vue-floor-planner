/**
 * Selector Handler
 */
import {
    Diagram, NodeModel, Node, NodeConstraints,
    ConnectorModel, Connector, Segments, DecoratorShapes, TextStyleModel
} from "@syncfusion/ej2-diagrams";
import { UtilityMethods } from "./utilitymethods";
import { isNullOrUndefined } from "@syncfusion/ej2-base";
import { ToolbarComponent } from "@syncfusion/ej2-vue-navigations";

export class NodeProperties {
    private m_offsetX: number = 0;
    public get offsetX(): number {
    return this.m_offsetX;
  }

   
  public set offsetX(offsetX: number) {
  if (this.m_offsetX !== offsetX) {
    this.m_offsetX = offsetX;
    this.triggerPropertyChange("offsetX", offsetX);
    }
  }

  private m_offsetY = 0;
  public get offsetY(): number {
    return this.m_offsetY;
  }

  public set offsetY(offsetY: number) {
    if (this.m_offsetY !== offsetY) {
      this.m_offsetY = offsetY;
      this.triggerPropertyChange("offsetY", offsetY);
    }
  }

  private m_width = 0;
  public get width(): number {
    return this.m_width;
    }

  public set width(width: number) {
    if (this.m_width !== width) {
      this.m_width = width || 3;
      this.triggerPropertyChange("width", width);
    }
  }

  private m_height = 0;
  public get height(): number {
    return this.m_height;
    }

  public set height(height: number) {
    if (this.m_height !== height) {
      this.m_height = height || 3;
      this.triggerPropertyChange("height", height);
    }
  }

  private m_rotateAngle = 0;
  public get rotateAngle(): number {
    return this.m_rotateAngle;
  }

  public set rotateAngle(rotateAngle: number) {
    if (this.m_rotateAngle !== rotateAngle) {
      this.m_rotateAngle = rotateAngle;
      this.triggerPropertyChange("rotateAngle", rotateAngle);
    }
  }

  private m_fillColor = "#ffffff";
  public get fillColor(): string {
    return this.m_fillColor;
  }

  public set fillColor(fillColor: string) {
    if (this.m_fillColor !== fillColor) {
      this.m_fillColor = fillColor;
      this.triggerPropertyChange("fillColor", fillColor);
    }
  }

  private m_strokeColor = "#000000";
  public get strokeColor(): string {
    return this.m_strokeColor;
  }

  public set strokeColor(strokeColor: string) {
    if (this.m_strokeColor !== strokeColor) {
      this.m_strokeColor = strokeColor;
      this.triggerPropertyChange("strokeColor", strokeColor);
    }
  }

  private m_strokeStyle = "None";
  public get strokeStyle(): string {
    return this.m_strokeStyle;
  }

  public set strokeStyle(strokeStyle: string) {
    if (this.m_strokeStyle !== strokeStyle) {
      this.m_strokeStyle = strokeStyle;
      this.triggerPropertyChange("strokeStyle", strokeStyle);
    }
  }

  private m_strokeWidth = 0;
  public get strokeWidth(): number {
    return this.m_strokeWidth;
  }

  public set strokeWidth(strokeWidth: number) {
    if (this.m_strokeWidth !== strokeWidth) {
      this.m_strokeWidth = strokeWidth;
      this.triggerPropertyChange("strokeWidth", strokeWidth);
    }
  }

  private m_opacity  = 0;
  public get opacity(): number {
    return this.m_opacity;
  }

  public set opacity(opacity: number) {
    if (this.m_opacity !== opacity) {
      this.m_opacity = opacity;
      this.triggerPropertyChange("opacity", opacity);
    }
  }

  public opacityText = "0%";

  public tooltip = "";

  private m_aspectRatio = false;
  public get aspectRatio(): boolean {
    return this.m_aspectRatio;
  }

  public set aspectRatio(aspectRatio: boolean) {
    if (this.m_aspectRatio !== aspectRatio) {
      this.m_aspectRatio = aspectRatio;
      this.triggerPropertyChange("aspectRatio", aspectRatio);
    }
  }

  private m_gradient = false;
  public get gradient(): boolean {
    return this.m_gradient;
  }

  public set gradient(gradient: boolean) {
    if (this.m_gradient !== gradient) {
      this.m_gradient = gradient;
        let gradientElement: HTMLElement | null = document.getElementById("gradientStyle");
        if (gradient) {
          (gradientElement as HTMLElement).className = "row db-prop-row db-gradient-style-show";
        } else {
          (gradientElement as HTMLElement).className = "row db-prop-row db-gradient-style-hide";
        }
        this.triggerPropertyChange("gradient", gradient);
    }
  }

  private m_gradientDirection = "BottomToTop";
  public get gradientDirection(): string {
    return this.m_gradientDirection;
  }

  public set gradientDirection(gradientDirection: string) {
    if (this.m_gradientDirection !== gradientDirection) {
      this.m_gradientDirection = gradientDirection;
      this.triggerPropertyChange("gradient", true);
    }
  }

  private m_gradientColor = "#ffffff";
  public get gradientColor(): string {
    return this.m_gradientColor;
  }

  public set gradientColor(gradientColor: string) {
    if (this.m_gradientColor !== gradientColor) {
      this.m_gradientColor = gradientColor;
      this.triggerPropertyChange("gradient", true);
    }
  }

  public propertyChange: Function | undefined;

  // Triggers a property change
  public triggerPropertyChange(propertyName: string, propertyValue: Object): void {
    if (!isNullOrUndefined(this.propertyChange as any)) {
      (this.propertyChange as any).call(this, { propertyName: propertyName, propertyValue: propertyValue });
    }
  }

  // Applies gradient to a node
  public getGradient(node: Node): void {
    let gradientValue: { [key: string]: number } =
      this.getGradientDirectionValue(this.gradientDirection);
    node.style.gradient = {
      type: "Linear",
      x1: gradientValue.x1, x2: gradientValue.x2, y1: gradientValue.y1, y2: gradientValue.y2,
      stops: [
        { color: node.style.fill, offset: 0 },
        { color: this.getColor(this.gradientColor), offset: 1 }
    ]
    };
  }

  // Gets gradient direction values
  public getGradientDirectionValue(direction: string): { [key: string]: number } {
    let gradientValue: { [key: string]: number } = {};
    let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
      if (direction === "LeftToRight") {
        x1 = 100;
    } else if (direction === "BottomToTop") {
        y2 = 100;
    } else if (direction === "RightToLeft") {
        x2 = 100;
    } else {
        y1 = 100;
        }
    gradientValue = { x1: x1, y1: y1, x2: x2, y2: y2 };
    return gradientValue;
  }

  // Gets formatted color value
  private getColor(colorName: string): string {
    if ((window.navigator as any).msSaveBlob && colorName.length === 9) {
      return colorName.substring(0, 7);
    }
    return colorName;
  }
}

export class ConnectorProperties {
  private m_lineColor = "#ffffff";
  public get lineColor(): string {
    return this.m_lineColor;
  }

  public set lineColor(lineColor: string) {
    if (this.m_lineColor !== lineColor) {
      this.m_lineColor = lineColor;
      this.triggerPropertyChange("lineColor", lineColor);
    }
  }

  private m_lineWidth: number | undefined;
  public get lineWidth(): number {
    return this.m_lineWidth as number;
  }

  public set lineWidth(lineWidth: number) {
    if (this.m_lineWidth !== lineWidth) {
      this.m_lineWidth = lineWidth;
      this.triggerPropertyChange("lineWidth", lineWidth);
    }
  }

  private m_lineStyle: string | undefined;
  public get lineStyle(): string {
    return this.m_lineStyle as string;
  }

  public set lineStyle(lineStyle: string) {
    if (this.m_lineStyle !== lineStyle) {
      this.m_lineStyle = lineStyle;
      this.triggerPropertyChange("lineStyle", lineStyle);
    }
  }

  private m_lineType: string | undefined;
  public get lineType(): string {
    return this.m_lineType as string;
  }

  public set lineType(lineType: string) {
    if (this.m_lineType !== lineType) {
      this.m_lineType = lineType;
      this.triggerPropertyChange("lineType", lineType);
    }
  }

  private m_sourceType: string | undefined;
  public get sourceType(): string {
    return this.m_sourceType as string;
  }

  public set sourceType(sourceType: string) {
    if (this.m_sourceType !== sourceType) {
      this.m_sourceType = sourceType;
      this.triggerPropertyChange("sourceType", sourceType);
    }
  }

  private m_targetType: string | undefined;
  public get targetType(): string {
    return this.m_targetType as string;
  }

  public set targetType(targetType: string) {
  if (this.m_targetType !== targetType) {
    this.m_targetType = targetType;
    this.triggerPropertyChange("targetType", targetType);
    }
  }

  private m_sourceSize: number | undefined;
  public get sourceSize(): number {
    return this.m_sourceSize as number;
  }

  public set sourceSize(sourceSize: number) {
    if (this.m_sourceSize !== sourceSize) {
      this.m_sourceSize = sourceSize;
      this.triggerPropertyChange("sourceSize", sourceSize);
    }
  }

  private m_targetSize: number | undefined;
  public get targetSize(): number {
    return this.m_targetSize as number;
  }

  public set targetSize(targetSize: number) {
  if (this.m_targetSize !== targetSize) {
    this.m_targetSize = targetSize;
    this.triggerPropertyChange("targetSize", targetSize);
    }
  }

  private m_opacity: number | undefined;
  public get opacity(): number {
    return this.m_opacity as number;
  }

  public set opacity(opacity: number) {
    if (this.m_opacity !== opacity) {
      this.m_opacity = opacity;
      this.triggerPropertyChange("opacity", opacity);
    }
  }

  public opacityText: string | undefined;

  public propertyChange: Function | undefined;

  // Triggers a property change
  public triggerPropertyChange(propertyName: string, propertyValue: Object): void {
    if (!isNullOrUndefined(this.propertyChange as any)) {
      (this.propertyChange as any).call(this, { propertyName: propertyName, propertyValue: propertyValue });
    }
  }
}

export class TextProperties {
  private m_textPosition = "";
    public get textPosition(): string {
        return this.m_textPosition;
    }

  public set textPosition(textPosition: string) {
    if (this.m_textPosition !== textPosition) {
      this.m_textPosition = textPosition;
      this.triggerPropertyChange("textPosition", textPosition);
    }
  }

  private m_fontFamily = "Arial";
  public get fontFamily(): string {
    return this.m_fontFamily;
  }

  public set fontFamily(fontFamily: string) {
    if (this.m_fontFamily !== fontFamily) {
      this.m_fontFamily = fontFamily;
      this.triggerPropertyChange("fontFamily", fontFamily);
    }
  }

  private m_fontSize: number | undefined;
  public get fontSize(): number {
        return this.m_fontSize as number;
    }

  public set fontSize(fontSize: number) {
    if (this.m_fontSize !== fontSize) {
      this.m_fontSize = fontSize;
      this.triggerPropertyChange("fontSize", fontSize);
    }
  }

  private m_fontColor = "#ffffff";
  public get fontColor(): string {
    return this.m_fontColor;
  }

  public set fontColor(fontColor: string) {
    if (this.m_fontColor !== fontColor) {
      this.m_fontColor = fontColor;
      this.triggerPropertyChange("fontColor", fontColor);
    }
  }

  private m_opacity: number | undefined;
  public get opacity(): number {
    return this.m_opacity as number;
  }

  public set opacity(opacity: number) {
    if (this.m_opacity !== opacity) {
      this.m_opacity = opacity;
      this.triggerPropertyChange("opacity", opacity);
    }
  }

  public opacityText: string | undefined;

  public textDecoration: boolean | undefined;

  public bold: boolean | undefined;

  public italic: boolean | undefined;

  public textAlign: string | undefined;

  public horizontalAlign: string | undefined;

  public verticalAlign: string | undefined;

  public textPositionDataSource: { [key: string]: Object }[] = this.getNodeTextPositions();

  public getNodeTextPositions(): { [key: string]: Object }[] {
    return [
      { text: "TopLeft", value: "TopLeft" },
      { text: "TopCenter", value: "TopCenter" },
      { text: "TopRight", value: "TopRight" },
      { text: "MiddleLeft", value: "MiddleLeft" },
      { text: "Center", value: "Center" },
      { text: "MiddleRight", value: "MiddleRight" },
      { text: "BottomLeft", value: "BottomLeft" },
      { text: "BottomCenter", value: "BottomCenter" },
      { text: "BottomRight", value: "BottomRight" },
    ];
  }

  public getConnectorTextPositions(): { [key: string]: Object }[] {
    return [
      { text: "Before", value: "Before" },
      { text: "Center", value: "Center" },
      { text: "After", value: "After" },
    ];
  }

  public propertyChange: Function | undefined;

  // Triggers a property change.
  public triggerPropertyChange(propertyName: string, propertyValue: Object): void {
    if (!isNullOrUndefined(this.propertyChange as any)) {
      (this.propertyChange as any).call(this, { propertyName: propertyName, propertyValue: propertyValue });
    }
  }
}

export class ExportSettings {
  private m_fileName = "Diagram";
  public get fileName(): string {
    return this.m_fileName;
  }

  public set fileName(fileName: string) {
    this.m_fileName = fileName;
  }

  private m_format = "JPG";
  public get format(): string {
    return this.m_format;
  }

  public set format(format: string) {
  this.m_format = format;
  }

  private m_region = "PageSettings";
  public get region(): string {
    return this.m_region;
  }

  public set region(region: string) {
  this.m_region = region;
  }
}

export class PrintSettings {
  private m_region = "PageSettings";
  public get region(): string {
    return this.m_region;
  }

  public set region(region: string) {
    this.m_region = region;
  }

  private m_pageWidth = 0;
  public get pageWidth(): number {
    return this.m_pageWidth;
  }

  public set pageWidth(pageWidth: number) {
    this.m_pageWidth = pageWidth;
  }

  private m_pageHeight = 0;
  public get pageHeight(): number {
    return this.m_pageHeight;
  }

  public set pageHeight(pageHeight: number) {
    this.m_pageHeight = pageHeight;
  }

  private m_isPortrait = true;
  public get isPortrait(): boolean {
    return this.m_isPortrait;
  }

  public set isPortrait(isPortrait: boolean) {
    this.m_isPortrait = isPortrait;
  }

  private m_isLandscape = false;
  public get isLandscape(): boolean {
    return this.m_isLandscape;
  }

  public set isLandscape(isLandscape: boolean) {
    this.m_isLandscape = isLandscape;
  }

  private m_multiplePage = true;
  public get multiplePage(): boolean {
    return this.m_multiplePage;
  }

  public set multiplePage(multiplePage: boolean) {
    this.m_multiplePage = multiplePage;
  }

  private m_paperSize = "Letter";
  public get paperSize(): string {
    return this.m_paperSize;
  }

  public set paperSize(paperSize: string) {
    this.m_paperSize = paperSize;
    (document.getElementById("printCustomSize") as any).style.display = "none";
    (document.getElementById("printOrientation") as any).style.display = "none";
    if (paperSize === "Custom") {
      (document.getElementById("printCustomSize") as any).style.display = "";
    } else {
      (document.getElementById("printOrientation") as any).style.display = "";
    }
  }
}

export class PageSettings {
    public pageWidth = 1056;
    public pageHeight = 816;
    public showPageBreaks: boolean | undefined;
    public backgroundColor = "#ffffff";
    public isPortrait = false;
    public isLandscape = true;
    public paperSize = "Letter";
    public pageBreaks = false;
}

export class ScrollSettings {
  public currentZoom = "82%";
}

export class SelectorViewModel {
  
  public diagram:Diagram;
  public toolbarEditor:ToolbarComponent;
  public currentDiagramName = "";
  public preventPropertyChange = false;
  public diagramType: string ;
  public isModified = false;
  public preventSelectionChange = false;
  public pasteData: Object[] = [];
  public isLoading = false;
  public isTemplateLoad = false;
  public nodeProperties: NodeProperties = new NodeProperties();
  public textProperties: TextProperties = new TextProperties();
  public connectorProperties: ConnectorProperties = new ConnectorProperties();
  public exportSettings: ExportSettings = new ExportSettings();
  public printSettings: PrintSettings = new PrintSettings();
  public pageSettings: PageSettings = new PageSettings();
  public utilityMethods: UtilityMethods = new UtilityMethods();
  public scrollSettings: ScrollSettings = new ScrollSettings();


  public randomIdGenerator() {
    return Math.random().toString(36).replace(/[^a-z]+/g, "").substr(2, 10);
  }

  public getAbsolutePath() {
    return window.location.pathname;
  }

  constructor() {
    this.nodeProperties.propertyChange = this.nodePropertyChange.bind(this);
    this.connectorProperties.propertyChange = this.connectorPropertyChange.bind(this);
    this.textProperties.propertyChange = this.textPropertyChange.bind(this);
  }

  // Handles node property changes.
  public nodePropertyChange(args: { [key: string]: Object }): void {
    if (!this.preventPropertyChange) {
      let diagram: Diagram = this.diagram as Diagram;
      if (diagram) {
        if ((diagram as any).selectedItems.nodes.length > 0) {
          let selectedNodes: NodeModel[] = (this.diagram as any).selectedItems.nodes;
          for (let i: number = 0; i < (selectedNodes as any).length; i++) {
            let node: Node = selectedNodes[i] as Node;
            let propertyName1: string = args.propertyName.toString().toLowerCase();
            switch (propertyName1) {
              case "offsetx":
                node.offsetX = this.nodeProperties.offsetX;
                break;
              case "offsety":
                node.offsetY = this.nodeProperties.offsetY;
                break;
              case "width":
                node.width = this.nodeProperties.width;
                break;
              case "height":
                node.height = this.nodeProperties.height;
                break;
              case "rotateangle":
                node.rotateAngle = this.nodeProperties.rotateAngle;
                break;
              case "aspectratio":
                node.constraints = node.constraints ^ NodeConstraints.AspectRatio;
                break;
            }
            if (!node.children) {
              this.applyNodeStyle(propertyName1, node);
            } else {
                for (let j: number = 0; j < node.children.length; j++) {
                this.applyNodeStyle(propertyName1, diagram.getObject(node.children[j]) as Node);
                }
              }
            }
            this.isModified = true;
        }
                if (diagram.connectors.length > 0) {
                    let selectedNodes: ConnectorModel[] | undefined = diagram.selectedItems.connectors;
                    for (let i: number = 0; i < (selectedNodes as any).length; i++) {
                        switch (args.propertyName.toString().toLowerCase()) {
                            case "strokecolor":
                                this.connectorProperties.lineColor = this.getColor(this.nodeProperties.strokeColor);
                                break;
                            case "strokewidth":
                                this.connectorProperties.lineWidth = this.nodeProperties.strokeWidth;
                                break;
                            case "strokestyle":
                                this.connectorProperties.lineStyle = this.nodeProperties.strokeStyle;
                                break;
                            case "opacity":
                                this.connectorProperties.opacity = this.nodeProperties.opacity;
                                break;
                        }
                    }
                    this.isModified = true;
                }
                diagram.dataBind();
            }
        }
    }

    // Applies node style changes
    private applyNodeStyle(propertyName: string, node: Node): void {
        let addInfo: any = node.addInfo || {};
        switch (propertyName) {
            case "fillcolor":
                node.style.fill = this.getColor(this.nodeProperties.fillColor);
                if (this.nodeProperties.gradient) {
                    this.nodeProperties.getGradient(node);
                }
                break;
            case "strokecolor":
                node.style.strokeColor = this.getColor(this.nodeProperties.strokeColor);
                break;
            case "strokewidth":
              node.style.strokeWidth =this.nodeProperties.strokeWidth;
                break;
            case "strokestyle":
                node.style.strokeDashArray = this.nodeProperties.strokeStyle;
                break;
            case "opacity":
                node.style.opacity = this.nodeProperties.opacity / 100;
                this.nodeProperties.opacityText = this.nodeProperties.opacity + "%";
                break;
            case "gradient":
                if (!this.nodeProperties.gradient) {
                    (node as any).style.gradient.type = "None";
                } else {
                    this.nodeProperties.getGradient(node);
                }
                break;
        }
    }

    // Handles connector property changes
    public connectorPropertyChange(args: { [key: string]: Object }): void {
        if (!this.preventPropertyChange) {
            let diagram: Diagram | undefined = this.diagram;
            if (diagram && (diagram as any).selectedItems.connectors.length > 0) {
                let selectedNodes: ConnectorModel[] | undefined = diagram.selectedItems.connectors;
                for (let i: number = 0; i < (selectedNodes as any).length; i++) {
                    let connector: Connector = (selectedNodes as any)[i] as Connector;
                    switch (args.propertyName.toString().toLowerCase()) {
                        case "linecolor":
                            connector.style.strokeColor = this.getColor(this.connectorProperties.lineColor);
                            connector.sourceDecorator.style = { fill: connector.style.strokeColor, strokeColor: connector.style.strokeColor };
                            connector.targetDecorator.style = { fill: connector.style.strokeColor, strokeColor: connector.style.strokeColor };
                            break;
                        case "linewidth":
                            connector.style.strokeWidth = (document.getElementById("lineWidth") as any).ej2_instances[0].value;
                            if (connector.sourceDecorator.style) {
                                connector.sourceDecorator.style.strokeWidth = connector.style.strokeWidth;
                            } else {
                                connector.sourceDecorator.style = { strokeWidth: connector.style.strokeWidth };
                            }
                            if (connector.targetDecorator.style) {
                                connector.targetDecorator.style.strokeWidth = connector.style.strokeWidth;
                            } else {
                                connector.targetDecorator.style = { strokeWidth: connector.style.strokeWidth };
                            }
                            break;
                        case "linestyle":
                            connector.style.strokeDashArray = this.connectorProperties.lineStyle;
                            break;
                        case "linetype":
                            connector.type = this.connectorProperties.lineType as Segments;
                            break;
                        case "sourcetype":
                            connector.sourceDecorator.shape = this.connectorProperties.sourceType as DecoratorShapes;
                            break;
                        case "targettype":
                            connector.targetDecorator.shape = this.connectorProperties.targetType as DecoratorShapes;
                            break;
                        case "sourcesize":
                            connector.sourceDecorator.width = connector.sourceDecorator.height = this.connectorProperties.sourceSize;
                            break;
                        case "targetsize":
                            connector.targetDecorator.width = connector.targetDecorator.height = this.connectorProperties.targetSize;
                            break;
                        case "opacity":
                            connector.style.opacity = this.connectorProperties.opacity / 100;
                            (connector as any).targetDecorator.style.opacity = connector.style.opacity;
                            (connector as any).sourceDecorator.style.opacity = connector.style.opacity;
                            this.connectorProperties.opacityText = this.connectorProperties.opacity + "%";
                            break;
                        
                    }
                }
                diagram.dataBind();
                this.isModified = true;
            }
        }
    }
  
  // Handles text property changes
  public textPropertyChange(args: { [key: string]: Object }): void {
    if (!this.preventPropertyChange) {
      let diagram: Diagram | undefined = this.diagram;
    if (diagram) {
      let selectedObjects: Object[] | undefined = diagram.selectedItems.nodes;
      selectedObjects = (selectedObjects as any).concat(diagram.selectedItems.connectors);
      let propertyName: string = args.propertyName.toString().toLowerCase();
    if ((selectedObjects as any).length > 0) {
      for (let i: number = 0; i < (selectedObjects as any).length; i++) {
      let node: Object = (selectedObjects as any)[i];
        if (node instanceof Node || node instanceof Connector) {
          if (node.annotations.length > 0) {
            for (let j: number = 0; j < node.annotations.length; j++) {
              let annotation: TextStyleModel | undefined = node.annotations[j].style;
              this.updateTextProperties(propertyName, annotation as any);
            }
        } else if (node.shape && node.shape.type === "Text") {
          this.updateTextProperties(propertyName, node.style);
      }
    }
  }
  diagram.dataBind();
  this.isModified = true;
      }
    }
  }
}

  // Updates text properties
  public updateTextProperties(propertyName: string, annotation: TextStyleModel): void {
    switch (propertyName) {
      case "fontfamily":
        annotation.fontFamily = this.textProperties.fontFamily;
        break;
      case "fontsize":
        annotation.fontSize = this.textProperties.fontSize;
        break;
      case "fontcolor":
        annotation.color = this.getColor(this.textProperties.fontColor);
        break;
      case "opacity":
        annotation.opacity = this.textProperties.opacity / 100;
        this.textProperties.opacityText = this.textProperties.opacity + "%";
        break;
    }
  }

  // Gets color value
  public getColor(colorName: string): string {
    if ((window.navigator as any).msSaveBlob && colorName.length === 9) {
      return colorName.substring(0, 7);
    }
    return colorName;
  }
}