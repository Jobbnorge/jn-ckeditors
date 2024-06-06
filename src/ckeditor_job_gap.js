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

class Editor extends JnClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
  Bold,
  Essentials,
  GeneralHtmlSupport,
  Heading,
  Image,
  Link,
  List,
  ListProperties,
  Paragraph,
  PasteFromOffice,
  JnJobGap,
  JnJobGapApply
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
      "|",
      "JnJobGapAddComponentButton",
      "JnJobGapManageComponentsButton",
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
