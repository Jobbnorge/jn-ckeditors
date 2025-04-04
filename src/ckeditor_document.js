import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote.js";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js";
import FontBackgroundColor from "@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js";
import FontColor from "@ckeditor/ckeditor5-font/src/fontcolor.js";
import FontFamily from "@ckeditor/ckeditor5-font/src/fontfamily.js";
import FontSize from "@ckeditor/ckeditor5-font/src/fontsize.js";
import GeneralHtmlSupport from "@ckeditor/ckeditor5-html-support/src/generalhtmlsupport.js";
import Heading from "@ckeditor/ckeditor5-heading/src/heading.js";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic.js";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Image from "@ckeditor/ckeditor5-image/src/image.js";
import ImageResizeEditing from "@ckeditor/ckeditor5-image/src/imageresize/imageresizeediting";
import ImageResizeHandles from "@ckeditor/ckeditor5-image/src/imageresize/imageresizehandles";
import List from "@ckeditor/ckeditor5-list/src/list.js";
import ListProperties from "@ckeditor/ckeditor5-list/src/listproperties.js";
import { TodoList } from "@ckeditor/ckeditor5-list";
import PageBreak from "@ckeditor/ckeditor5-page-break/src/pagebreak.js";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph.js";
import Placeholder from "./base/flettekoder";
import SourceEditing from "@ckeditor/ckeditor5-source-editing/src/sourceediting";
import Table from "@ckeditor/ckeditor5-table/src/table.js";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar.js";
import { PasteFromOffice } from "@ckeditor/ckeditor5-paste-from-office";
import { Autosave } from "@ckeditor/ckeditor5-autosave";
import { FindAndReplace } from "@ckeditor/ckeditor5-find-and-replace";
import { HorizontalLine } from "@ckeditor/ckeditor5-horizontal-line";
import {
  TableProperties,
  TableCellProperties,
  TableColumnResize,
  TableCaption,
} from "@ckeditor/ckeditor5-table";
import JnClassicEditor from "./base/jn-classic-editor";
import { Link } from "@ckeditor/ckeditor5-link";

class Editor extends JnClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
  BlockQuote,
  Bold,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Italic,
  Underline,
  Image,
  ImageResizeEditing,
  ImageResizeHandles,
  Link,
  List,
  ListProperties,
  TodoList,
  PageBreak,
  Paragraph,
  Placeholder,
  SourceEditing,
  Table,
  TableToolbar,
  PasteFromOffice,
  Autosave,
  FindAndReplace,
  HorizontalLine,
  TableProperties,
  TableCellProperties,
  TableColumnResize,
  TableCaption,
];

// Editor configuration.
Editor.defaultConfig = {
  toolbar: {
    items: [
      "pageBreak",
      "undo",
      "redo",
      "|",
      "link",
      "|",
      "findAndReplace",
      "|",
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "fontFamily",
      "fontColor",
      "fontSize",
      "fontBackgroundColor",
      "|",
      "blockQuote",
      "bulletedList",
      "numberedList",
      "todoList",
      "insertTable",
      "horizontalLine",
      "|",
      "sourceEditing",
      "|",
      "placeholder",
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
