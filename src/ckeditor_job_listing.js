import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js";
import GeneralHtmlSupport from "@ckeditor/ckeditor5-html-support/src/generalhtmlsupport.js";
import List from "@ckeditor/ckeditor5-list/src/list.js";
import PageBreak from "@ckeditor/ckeditor5-page-break/src/pagebreak.js";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph.js";
import { InlineEditor as InlineEditorBase } from "@ckeditor/ckeditor5-editor-inline";
import { Clipboard } from "@ckeditor/ckeditor5-clipboard";
import JnPasteText from "./base/jn-paste-text-plugin";
import { Indent } from "@ckeditor/ckeditor5-indent";
import { PasteFromOffice } from "@ckeditor/ckeditor5-paste-from-office";
import { Link } from "@ckeditor/ckeditor5-link";

class InlineEditor extends InlineEditorBase {}

InlineEditor.builtinPlugins = [
  Bold,
  Essentials,
  GeneralHtmlSupport,
  Image,
  List,
  PageBreak,
  Paragraph,
  JnPasteText,
  Clipboard,
  Indent,
  PasteFromOffice,
  Link,
];

InlineEditor.defaultConfig = {
  toolbar: {
    items: [
      "bold",
      "|",
      "bulletedList",
      "indent",
      "outdent",
      "|",
      "link",
      "|",
      "undo",
      "redo",
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

export default InlineEditor;
