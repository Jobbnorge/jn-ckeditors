import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote.js";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js";
import FontColor from "@ckeditor/ckeditor5-font/src/fontcolor.js";
import FontFamily from "@ckeditor/ckeditor5-font/src/fontfamily.js";
import FontSize from "@ckeditor/ckeditor5-font/src/fontsize.js";
import GeneralHtmlSupport from "@ckeditor/ckeditor5-html-support/src/generalhtmlsupport.js";
import Heading from "@ckeditor/ckeditor5-heading/src/heading.js";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic.js";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Image from "@ckeditor/ckeditor5-image/src/image.js";
import ImageInsertViaUrl from "@ckeditor/ckeditor5-image/src/imageinsertviaurl";
import ImageResizeEditing from "@ckeditor/ckeditor5-image/src/imageresize/imageresizeediting";
import ImageResizeHandles from "@ckeditor/ckeditor5-image/src/imageresize/imageresizehandles";
import List from "@ckeditor/ckeditor5-list/src/list.js";
import ListProperties from "@ckeditor/ckeditor5-list/src/listproperties.js";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph.js";
import Placeholder from "./base/flettekoder";
import SourceEditing from "@ckeditor/ckeditor5-source-editing/src/sourceediting";
import { PasteFromOffice } from "@ckeditor/ckeditor5-paste-from-office";
import { Autosave } from "@ckeditor/ckeditor5-autosave";
import { FindAndReplace } from "@ckeditor/ckeditor5-find-and-replace";
import { HorizontalLine } from "@ckeditor/ckeditor5-horizontal-line";
import { Link } from "@ckeditor/ckeditor5-link";
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import JnPasteAsPlainTextPlugin from "./customPlugins/jn-paste-as-plain-text";

class Editor extends ClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
  BlockQuote,
  Bold,
  Essentials,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Italic,
  Underline,
  Image,
  ImageInsertViaUrl,
  ImageResizeEditing,
  ImageResizeHandles,
  Link,
  List,
  ListProperties,
  Paragraph,
  Placeholder,
  SourceEditing,
  PasteFromOffice,
  Autosave,
  FindAndReplace,
  HorizontalLine,
  Indent,
  JnPasteAsPlainTextPlugin
];

// Editor configuration.
Editor.defaultConfig = {
  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "pasteAsPlainText",
      "|",
      "link",
      "insertImage",
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
      "|",
      "bulletedList",
      "numberedList",
      "indent",
      "outdent",
      "horizontalLine",
      "|",
      "sourceEditing",
      "|",
      "placeholder",
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

Editor.Inspector = CKEditorInspector;

export default Editor;
