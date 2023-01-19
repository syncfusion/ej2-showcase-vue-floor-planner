/**
 *  Home page handler
 */

import {
    NodeModel, NodeConstraints, PointModel, ConnectorModel, LinearGradient,
    Diagram, ConnectorConstraints, Node, TextStyle, TextStyleModel, SelectorConstraints, TextAlign, HorizontalAlignment, VerticalAlignment, Connector, ShapeAnnotationModel
} from '@syncfusion/ej2-diagrams';
import { SelectorViewModel } from './selector';
import { Dialog, DialogComponent } from '@syncfusion/ej2-vue-popups';
import { Ajax } from '@syncfusion/ej2-base';
import { Toolbar, ContextMenu, MenuItemModel, ToolbarComponent } from '@syncfusion/ej2-vue-navigations';

export class PaperSize {
    public pageWidth: number = 0;
    public pageHeight: number = 0;
}

export class UtilityMethods {

    
    public tempDialog: DialogComponent | undefined;
    public toolbarEditor: ToolbarComponent | undefined;

    public bindNodeProperties(node: NodeModel, selectedItem: SelectorViewModel): void {
        selectedItem.preventPropertyChange = true;
        selectedItem.nodeProperties.offsetX = (Math.round((node as any).offsetX * 100) / 100);
        selectedItem.nodeProperties.offsetY = (Math.round((node as any).offsetY * 100) / 100);
        selectedItem.nodeProperties.width = node.width ? (Math.round(node.width * 100) / 100) : (Math.round((node as any).minWidth * 100) / 100);
        selectedItem.nodeProperties.height = node.height ? (Math.round(node.height * 100) / 100) : (Math.round((node as any).minHeight * 100) / 100);
        (selectedItem as any).nodeProperties.rotateAngle = node.rotateAngle;
        selectedItem.nodeProperties.strokeColor = this.getHexColor((node as any).style.strokeColor);
        selectedItem.nodeProperties.strokeStyle = (node as any).style.strokeDashArray ? (node as any).style.strokeDashArray : 'None';
        selectedItem.nodeProperties.strokeWidth  = (node as any).style.strokeWidth;
        
        selectedItem.nodeProperties.fillColor = this.getHexColor((node as any).style.fill);
        selectedItem.nodeProperties.opacity = (node as any).style.opacity * 100;
        selectedItem.nodeProperties.opacityText = selectedItem.nodeProperties.opacity + '%';
        selectedItem.nodeProperties.aspectRatio = (node as any).constraints & NodeConstraints.AspectRatio ? true : false;
        selectedItem.nodeProperties.gradient = (node as any).style.gradient.type !== 'None' ? true : false;
        selectedItem.preventPropertyChange = false;   
    }

    public bindMindMapProperties(node: NodeModel, selectedItem: SelectorViewModel): void {
        selectedItem.preventPropertyChange = true;
        selectedItem.mindmapSettings.stroke = (node as any).style.strokeColor;
        selectedItem.mindmapSettings.strokeStyle = (node as any).style.strokeDashArray ? (node as any).style.strokeDashArray : 'None';
        selectedItem.mindmapSettings.strokeWidth = (node as any).style.strokeWidth;
        selectedItem.mindmapSettings.fill = (node as any).style.fill;
        selectedItem.mindmapSettings.opacity = ((node as any).style.opacity || 1) * 100;
        selectedItem.mindmapSettings.opacityText = (selectedItem.mindmapSettings.opacity || '100') + '%';
        if ((node as any).annotations.length > 0) {
            let annotation: TextStyle = (node as any).annotations[0].style as TextStyle;
            selectedItem.mindmapSettings.fontFamily = annotation.fontFamily;
            selectedItem.mindmapSettings.fontColor = annotation.color;
            selectedItem.mindmapSettings.fontSize = annotation.fontSize;
            selectedItem.mindmapSettings.textOpacity = (annotation.opacity || 1) * 100;
            selectedItem.mindmapSettings.textOpacityText = (selectedItem.mindmapSettings.textOpacity || '100') + '%';
        }
        selectedItem.preventPropertyChange = false;
    }

    public bindTextProperties(text: TextStyleModel, selectedItem: SelectorViewModel): void {
        selectedItem.preventPropertyChange = true;
        selectedItem.textProperties.fontColor = this.getHexColor((text as any).color);
        (selectedItem as any).textProperties.fontFamily = text.fontFamily;
        (selectedItem as any).textProperties.fontSize = text.fontSize;
        selectedItem.textProperties.opacity = (text as any).opacity * 100;
        selectedItem.textProperties.opacityText = selectedItem.textProperties.opacity + '%';
        let toolbarTextStyle: any = document.getElementById('toolbarTextStyle');
        if (toolbarTextStyle) {
            toolbarTextStyle = toolbarTextStyle.ej2_instances[0];
        }
        if (toolbarTextStyle) {
            toolbarTextStyle.items[0].cssClass = text.bold ? 'tb-item-start tb-item-selected' : 'tb-item-start';
            toolbarTextStyle.items[1].cssClass = text.italic ? 'tb-item-middle tb-item-selected' : 'tb-item-middle';
            toolbarTextStyle.items[2].cssClass = text.textDecoration === 'Underline' ? 'tb-item-end tb-item-selected' : 'tb-item-end';
        }
        this.updateTextAlign((text as any).textAlign);
        selectedItem.preventPropertyChange = false;
    }

    public updateTextAlign(textAlign: TextAlign): void {
        let toolbarTextSubAlignment: any = document.getElementById('toolbarTextSubAlignment');
        if (toolbarTextSubAlignment) {
            toolbarTextSubAlignment = toolbarTextSubAlignment.ej2_instances[0];
        }
        if (toolbarTextSubAlignment) {
            for (let i: number = 0; i < toolbarTextSubAlignment.items.length; i++) {
                toolbarTextSubAlignment.items[i].cssClass = toolbarTextSubAlignment.items[i].cssClass.replace(' tb-item-selected', '');
            }
            let index: number = textAlign === 'Left' ? 0 : (textAlign === 'Center' ? 1 : 2)
            toolbarTextSubAlignment.items[index].cssClass = toolbarTextSubAlignment.items[index].cssClass + ' tb-item-selected';
        }
    }

    public updateHorVertAlign(horizontalAlignment: HorizontalAlignment, verticalAlignment: VerticalAlignment): void {
        let toolbarHorVerAlignment: any = document.getElementById('toolbarTextAlignment');
        if (toolbarHorVerAlignment) {
            toolbarHorVerAlignment = toolbarHorVerAlignment.ej2_instances[0];
        }
        if (toolbarHorVerAlignment) {
            for (let i: number = 0; i < toolbarHorVerAlignment.items.length; i++) {
                toolbarHorVerAlignment.items[i].cssClass = toolbarHorVerAlignment.items[i].cssClass.replace(' tb-item-selected', '');
            }
            let index: number = horizontalAlignment === 'Right' ? 0 : (horizontalAlignment === 'Center' ? 1 : 2);
            toolbarHorVerAlignment.items[index].cssClass = toolbarHorVerAlignment.items[index].cssClass + ' tb-item-selected';
            index = verticalAlignment === 'Bottom' ? 3 : (verticalAlignment === 'Center' ? 4 : 5);
            toolbarHorVerAlignment.items[index].cssClass = toolbarHorVerAlignment.items[index].cssClass + ' tb-item-selected';
        }
    }

    public bindConnectorProperties(connector: ConnectorModel, selectedItem: SelectorViewModel): void {
        selectedItem.preventPropertyChange = true;
        selectedItem.connectorProperties.lineColor = this.getHexColor((connector as any).style.strokeColor);
        selectedItem.connectorProperties.lineStyle = (connector as any).style.strokeDashArray ? (connector as any).style.strokeDashArray : 'None';
        (selectedItem as any).connectorProperties.lineType = connector.type;
        selectedItem.connectorProperties.lineWidth = (connector as any).style.strokeWidth;
        selectedItem.connectorProperties.sourceType = (connector as any).sourceDecorator.shape;
        selectedItem.connectorProperties.targetType = (connector as any).targetDecorator.shape;
        selectedItem.connectorProperties.opacity = (connector as any).style.opacity * 100;
        selectedItem.connectorProperties.opacityText = selectedItem.connectorProperties.opacity + '%';
        selectedItem.preventPropertyChange = false;   
    }

    public getHexColor(colorStr: string): string {
        let a: HTMLDivElement = document.createElement('div');
        a.style.color = colorStr;
        let colors: number[] = (window.getComputedStyle(document.body.appendChild(a)) as any).color.match(/\d+/g).map(
            (a: string): number => {
                return parseInt(a, 10);
            }
        );
        document.body.removeChild(a);
        return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : '';
    }

    public getOffset(position: string): PointModel {
        switch (position.toLowerCase()) {
            case 'topleft':
                return { x: 0, y: 0 };
            case 'topcenter':
                return { x: 0.5, y: 0 };
            case 'topright':
                return { x: 1, y: 0 };
            case 'middleleft':
                return { x: 0, y: 0.5 };
            default:
                return { x: 0.5, y: 0.5 };
            case 'middleright':
                return { x: 1, y: 0.5 };
            case 'bottomleft':
                return { x: 0, y: 1 };
            case 'bottomcenter':
                return { x: 0.5, y: 1 };
            case 'bottomright':
                return { x: 1, y: 1 };
        }
    }

    public getPosition(offset: PointModel): string {
        if (offset.x === 0 && offset.y === 0) {
            return 'TopLeft';
        } else if (offset.x === 0.5 && offset.y === 0) {
            return 'TopCenter';
        } else if (offset.x === 1 && offset.y === 0) {
            return 'TopRight';
        } else if (offset.x === 0 && offset.y === 0.5) {
            return 'MiddleLeft';
        } else if (offset.x === 1 && offset.y === 0.5) {
            return 'MiddleRight';
        } else if (offset.x === 0 && offset.y === 1) {
            return 'BottomLeft';
        } else if (offset.x === 0.5 && offset.y === 1) {
            return 'BottomCenter';
        } else if (offset.x === 1 && offset.y === 1) {
            return 'BottomRight';
        } else {
            return 'Center';
        }
    }

    public objectTypeChange(objectType: string): void {
        (document.getElementById('diagramPropertyContainer') as any).style.display = 'none';
        (document.getElementById('nodePropertyContainer') as any).style.display = 'none';
        (document.getElementById('textPropertyContainer') as any).style.display = 'none';
        (document.getElementById('connectorPropertyContainer') as any).style.display = 'none';
        switch (objectType) {
            case 'diagram':
                (document.getElementById('diagramPropertyContainer') as any).style.display = '';
                break;
            case 'node':
                (document.getElementById('nodePropertyContainer') as any).style.display = '';
                break;
            case 'connector':
                (document.getElementById('connectorPropertyContainer') as any).style.display = '';
                break;
        }
    }

    public enableToolbarItems(selectedItems: Object[]): void {
        let toolbarContainer: HTMLDivElement = document.getElementsByClassName('db-toolbar-container')[0] as HTMLDivElement;
        let toolbarClassName: string = 'db-toolbar-container';
        if (toolbarContainer.classList.contains('db-undo')) {
            toolbarClassName += ' db-undo';
        }
        if (toolbarContainer.classList.contains('db-redo')) {
            toolbarClassName += ' db-redo';
        }
        toolbarContainer.className = toolbarClassName;
        if (selectedItems.length === 1) {
            toolbarContainer.className = toolbarContainer.className + ' db-select';
            if (selectedItems[0] instanceof Node) {
                if ((selectedItems[0] as Node).children) {
                    if ((selectedItems[0] as Node).children.length > 2) {
                        toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-multiple db-node db-group';
                    } else {
                        toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-node db-group' ;
                    }
                } else {
                    toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
                }
            }
        } else if (selectedItems.length === 2) {
            toolbarContainer.className = toolbarContainer.className + ' db-select db-double';
        } else if (selectedItems.length > 2) {
            toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-multiple';
        }
        if (selectedItems.length > 1) {
            let isNodeExist: boolean = false;
            for (let i: number = 0; i < selectedItems.length; i++) {
                if (selectedItems[i] instanceof Node) {
                    toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
                    break;
                }
            }
        }
    }

   
    public enableArrangeMenuItems(selectedItem: SelectorViewModel): void {
        let contextInstance: any = document.getElementById('arrangeContextMenu');
        let contextMenu: ContextMenu = contextInstance.ej2_instances[0] as any;
        
        let selectedItems: Object[] | undefined = (selectedItem.diagram as any).selectedItems.nodes;
        selectedItems = (selectedItems as any).concat((selectedItem.diagram as any).selectedItems.connectors);
        for (let i: number = 0; i < contextMenu.items.length; i++) {
            contextMenu.enableItems([(contextMenu.items[i] as any).text], false);
        }
    }

    public fillColorCode: string[] = ['#C4F2E8', '#F7E0B3', '#E5FEE4', '#E9D4F1', '#D4EFED', '#DEE2FF'];

    public borderColorCode: string[] = ['#8BC1B7', '#E2C180', '#ACCBAA', '#D1AFDF', '#90C8C2', '#BBBFD6'];

    public getPaperSize(paperName: string): PaperSize {
        let paperSize: PaperSize = new PaperSize();
        switch (paperName) {
            case 'Letter':
                paperSize.pageWidth = 816;
                paperSize.pageHeight = 1056;
                break;
            case 'Legal':
                paperSize.pageWidth = 816;
                paperSize.pageHeight = 1344;
                break;
            case 'Tabloid':
                paperSize.pageWidth = 1056;
                paperSize.pageHeight = 1632;
                break;
            case 'A3':
                paperSize.pageWidth = 1122;
                paperSize.pageHeight = 1587;
                break;
            case 'A4':
                paperSize.pageWidth = 793;
                paperSize.pageHeight = 1122;
                break;
            case 'A5':
                paperSize.pageWidth = 559;
                paperSize.pageHeight = 793;
                break;
            case 'A6':
                paperSize.pageWidth = 396;
                paperSize.pageHeight = 559;
                break;
        }
        return paperSize;
    }

}