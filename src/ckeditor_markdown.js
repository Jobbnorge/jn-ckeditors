import JnClassicEditor from "./base/jn-classic-editor";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js";
import Heading from "@ckeditor/ckeditor5-heading/src/heading.js";
import List from "@ckeditor/ckeditor5-list/src/list.js";
import ListProperties from "@ckeditor/ckeditor5-list/src/listproperties.js";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph.js";
import { Link } from "@ckeditor/ckeditor5-link";
import { Markdown } from "@ckeditor/ckeditor5-markdown-gfm";
import SourceEditing from "@ckeditor/ckeditor5-source-editing/src/sourceediting";

class Editor extends JnClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
    Bold,
    Essentials,
    Heading,
    Link,
    List,
    ListProperties,
    Paragraph,
    Markdown,
    SourceEditing
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
        "sourceEditing"
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