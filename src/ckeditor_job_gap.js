import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js";
import GeneralHtmlSupport from "@ckeditor/ckeditor5-html-support/src/generalhtmlsupport.js";
import Heading from "@ckeditor/ckeditor5-heading/src/heading.js";
import List from "@ckeditor/ckeditor5-list/src/list.js";
import ListProperties from "@ckeditor/ckeditor5-list/src/listproperties.js";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph.js";
import { PasteFromOffice } from "@ckeditor/ckeditor5-paste-from-office";
import JnClassicEditor from "./base/jn-classic-editor";
import { Link } from "@ckeditor/ckeditor5-link";
import { JnJobGap } from "./base/job-gap/manage";
import { JnJobGapApply } from "./base/job-gap/apply";
import Table from "@ckeditor/ckeditor5-table/src/table.js";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar.js";
import {
  TableProperties,
  TableCellProperties,
  TableColumnResize,
  TableCaption,
} from "@ckeditor/ckeditor5-table";
import { TodoList } from "@ckeditor/ckeditor5-list";

class Editor extends JnClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
  Bold,
  Essentials,
  GeneralHtmlSupport,
  Heading,
  Image,
  JnJobGap,
  JnJobGapApply,
  Link,
  List,
  ListProperties,
  Paragraph,
  PasteFromOffice,
  Table,
  TableCellProperties,
  TableColumnResize,
  TableCaption,
  TableProperties,
  TableToolbar,
  TodoList
];

// Editor configuration.
Editor.defaultConfig = {
  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "link",
      "|",
      "heading",
      "|",
      "bold",
      "|",
      "bulletedList",
      "numberedList",
      "todoList",
      "insertTable",
      "|",
      "JnJobGapAddComponentButton",
      "JnJobGapManageComponentsButton",
    ],
  },
  table: {
    contentToolbar: [
      "toggleTableCaption",
      "|",
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "|",
      "tableProperties",
      "tableCellProperties",
    ],
  },
  link: {
    defaultProtocol: "https://",
    decorators: {
      openInNewTab: {
        mode: "manual",
        label: "Open in a new tab",
        attributes: {
          target: "_blank",
          rel: "noreferrer",
        },
      },
    },
  },
};

export default Editor;
