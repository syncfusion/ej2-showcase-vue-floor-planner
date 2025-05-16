import { ItemModel } from "@syncfusion/ej2-splitbuttons";
import { MenuItemModel } from "@syncfusion/ej2-navigations";
export class DropDownDataSources {
  public fileMenuItems: ItemModel[] = this.getFileMenuItems();
  public editMenuItems: ItemModel[] = this.getEditMenuItems();
  public viewMenuItems: ItemModel[] = this.getViewMenuItems();
  public arrangeMenuItems: MenuItemModel[] = this.getArrangeMenuItems();
  public insertMenuItems: ItemModel[] = this.getInsertMenuItems();
  
  // Returns the list of file menu items with corresponding icons
  public getFileMenuItems(): ItemModel[] {
    const menuItems: ItemModel[] = [
      { text : 'New', iconCss:'sf-icon-new'},
      { text : 'Open', iconCss:'sf-icon-open'},
      { text : 'Save', iconCss:'sf-icon-save'},
      { text : 'Export', iconCss:'sf-icon-export'},
      { text : 'Print' ,iconCss:'sf-icon-print'},
    ];
    return menuItems;
  }

  // Returns the list of edit menu items with corresponding icons
  public getEditMenuItems(): ItemModel[] {
    const menuItems: ItemModel[] = [{ text : 'Undo', iconCss:'sf-icon-undo'},
    { text : 'Redo', iconCss:'sf-icon-redo'},
    { separator: true },
    { text : 'Copy', iconCss:'sf-icon-copy'},
    { text : 'Cut', iconCss:'sf-icon-cut'},
    { text : 'Paste', iconCss:'sf-icon-paste'},
    { separator: true },
    { text: 'Delete', iconCss: 'sf-icon-delete'}
];
    return menuItems;
  }

  // Returns the list of view menu items such as rulers, grids, and fit options
  public getViewMenuItems(): ItemModel[] {
    const menuItems: ItemModel[] = [
      { text: 'Show Rulers', iconCss: 'sf-icon-check-tick' },
            { text: 'Show Grid', iconCss: 'sf-icon-check-tick' },
            { separator: true },
            { text: 'Snap To Grid' },
            { text: 'Show Guides', iconCss: 'sf-icon-check-tick' },
            { text: 'Page Break'},{ separator: true },
            { text: 'Fit To Screen' }, { separator: true },
    ];
    return menuItems;
  }

  // Returns the list of insert menu items for image and link insertion
  public getInsertMenuItems(): ItemModel[] {
    const menuItems: ItemModel[] = [
      { text: 'Insert Image' ,iconCss:'sf-icon-insert_image '},
      { text: 'Insert Link',iconCss: 'sf-icon-insert_link '},
    ];
    return menuItems;
  }

  // Returns the list of arrange menu items including orientation and page size options
  public getArrangeMenuItems(): MenuItemModel[] {
    const menuItems1: any[] = [
      
      { text: 'Orientation',
      items:[
        { text : 'Landscape',iconCss: 'sf-icon-check-tick'},
        {text : 'Portrait'}
      ]},
      { text: 'Page Size' , items:[
        { text: 'Letter (8.5 in x 11 in)', value: 'Letter',iconCss:'sf-icon-check-tick' }, { text: 'Legal (8.5 in x 14 in)', value: 'Legal' },
            { text: 'Tabloid (279 mm x 432 mm)', value: 'Tabloid' }, { text: 'A3 (297 mm x 420 mm)', value: 'A3' },
            { text: 'A4 (210 mm x 297 mm)', value: 'A4' }, { text: 'A5 (148 mm x 210 mm)', value: 'A5' },
            { text: 'A6 (105 mm x 148 mm)', value: 'A6' },
]},
      
    ];
    return menuItems1;
  }

  // Array defining different file export formats with their values
  public fileFormats: { [key: string]: any }[] = [
    { text: "JPG", value: "JPG" },
    { text: "PNG", value: "PNG" },
    { text: "SVG", value: "SVG" },
  ];

  // Array defining different diagram export regions
  public diagramRegions: { [key: string]: any }[] = [
    { text: "Content", value: "Content" },
    { text: "PageSettings", value: "PageSettings" },
  ];
  
  // Array defining border styles with specific patterns and class names
  public borderStyles: { [key: string]: any }[] = [
    {
      text: "None",
      value: "None",
      className: "ddl-svg-style ddl_linestyle_none",
    },
    {
      text: "1,2",
      value: "1,2",
      className: "ddl-svg-style ddl_linestyle_one_two",
    },
    {
      text: "3,3",
      value: "3,3",
      className: "ddl-svg-style ddl_linestyle_three_three",
    },
    {
      text: "5,3",
      value: "5,3",
      className: "ddl-svg-style ddl_linestyle_five_three",
    },
    {
      text: "4,4,1",
      value: "4,4,1",
      className: "ddl-svg-style ddl_linestyle_four_four_one",
    },
  ];

  // Array listing font families available for text styling
  public fontFamilyList: { [key: string]: any }[] = [
    { text: "Arial", value: "Arial" },
    { text: "Aharoni", value: "Aharoni" },
    { text: "Bell MT", value: "Bell MT" },
    { text: "Fantasy", value: "Fantasy" },
    { text: "Times New Roman", value: "Times New Roman" },
    { text: "Segoe UI", value: "Segoe UI" },
    { text: "Verdana", value: "Verdana" },
  ];

  // Array defining various zoom levels and options for fitting the screen
  public zoomMenuItems: ItemModel[] = [
    { text: "400%" },
    { text: "300%" },
    { text: "200%" },
    { text: "150%" },
    { text: "100%" },
    { text: "75%" },
    { text: "50%" },
    { text: "25%" },
    { separator: true },
    { text: "Fit To Screen" },
  ];

  // Array listing different paper sizes and a custom option for diagram pages
  public paperList: { [key: string]: any }[] = [
    { text: "Letter (8.5 in x 11 in)", value: "Letter" },
    { text: "Legal (8.5 in x 14 in)", value: "Legal" },
    { text: "Tabloid (279 mm x 432 mm)", value: "Tabloid" },
    { text: "A3 (297 mm x 420 mm)", value: "A3" },
    { text: "A4 (210 mm x 297 mm)", value: "A4" },
    { text: "A5 (148 mm x 210 mm)", value: "A5" },
    { text: "A6 (105 mm x 148 mm)", value: "A6" },
    { text: "Custom", value: "Custom" },
  ];
  
}
