/** Inspired by https://ckeditor.com/docs/ckeditor5/latest/framework/deep-dive/clipboard.html#paste-as-plain-text-plugin-example */

import plainTextToHtml from "@ckeditor/ckeditor5-clipboard/src/utils/plaintexttohtml";
import { EventInfo } from "@ckeditor/ckeditor5-utils";
import { Plugin } from "ckeditor5/src/core.js";

export default class JnPasteText extends Plugin {
  static get pluginName() {
    return "JnPasteText";
  }

  init() {
    const editor = this.editor;
    const clipboardPipeline = editor.plugins.get("ClipboardPipeline");

    editor.editing.view.document.on(
      "clipboardInput",
      (evt, { dataTransfer, targetRanges, method }) => {
        let _data = dataTransfer.getData("text/plain");

        _data = plainTextToHtml(_data);
        _data = _data
          .replace(
            /<\/?(?!a)(?!p)(?!br)(?!ul)(?!li)(?!b)(?!strong)\b[^>]*>\s*/gi,
            ""
          ) // Replace all whitespaces outside HTML-elements, and also tags (and their content) that are not in whitelist (first part of regex).
          .replace(/<\!--.*?-->/g, ""); // Replace all Html comments

        const eventInfo = new EventInfo(this, "inputTransformation");
        let content = editor.data.htmlProcessor.toView(_data);

        clipboardPipeline.fire(eventInfo, {
          content,
          dataTransfer,
          targetRanges,
          method,
        });

        evt.stop();
      }
    );
  }
}
