// import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";
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

import PageBreak from "@ckeditor/ckeditor5-page-break/src/pagebreak.js";
import SpecialCharacters from "@ckeditor/ckeditor5-special-characters/src/specialcharacters";
import SpecialCharactersEssentials from "@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials";
import JnPasteAsPlainTextPlugin from "./customPlugins/jn-paste-as-plain-text";

import JnClassicEditor from "./base/jn-classic-editor";

class AutoReplyEditor extends JnClassicEditor {}
class IngressEditor extends JnClassicEditor {}

const shared = {
    plugins: [
        Bold,
        Essentials,
        GeneralHtmlSupport,
        Heading,
        Image,
        ImageInsertViaUrl,
        ImageResizeEditing,
        ImageResizeHandles,
        Link,
        List,
        ListProperties,
        Paragraph,
        SourceEditing,
        PasteFromOffice,
        Autosave,
        FindAndReplace,
        HorizontalLine,
        Indent,
    ],
    config_Link: {
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
    }
}

// Plugins to include in the build.
AutoReplyEditor.builtinPlugins = [
  ...shared.plugins,
  BlockQuote,
  FontColor,
  FontFamily,
  FontSize,
  Placeholder,
  Underline,
  Italic,
];

IngressEditor.builtinPlugins = [
    ...shared.plugins,
    PageBreak,
    SpecialCharacters,
    SpecialCharactersEssentials,
    JnPasteAsPlainTextPlugin
]

// Editor configuration.
AutoReplyEditor.defaultConfig = {
  toolbar: {
    items: [
      "undo",
      "redo",
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
  link: shared.config_Link
};

IngressEditor.defaultConfig = {
    toolbar: {
      items: [
        "pageBreak",
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
        "|",
        "bulletedList",
        "numberedList",
        "indent",
        "outdent",
        "horizontalLine",
        "specialCharacters",
        "|",
        "sourceEditing",
      ],
    },
    link: shared.config_Link
  };

AutoReplyEditor.Inspector = CKEditorInspector;
IngressEditor.Inspector = CKEditorInspector;

export { AutoReplyEditor, IngressEditor };
