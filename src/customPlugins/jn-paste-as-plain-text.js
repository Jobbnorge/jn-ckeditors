import plainTextToHtml from "@ckeditor/ckeditor5-clipboard/src/utils/plaintexttohtml";
import { EventInfo } from "@ckeditor/ckeditor5-utils";
import { Plugin } from "ckeditor5/src/core.js";
import { ButtonView } from '@ckeditor/ckeditor5-ui';

const pasteIcon = `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20px" height="20px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#333" stroke="none" style="color: #333333;">
<path d="M1840 4867 c-39 -12 -140 -107 -140 -131 0 -14 -46 -16 -426 -16 -306 0 -438 -3 -468 -12 -55 -16 -138 -99 -154 -154 -18 -60 -18 -4088 0 -4148 16 -55 99 -138 154 -154 30 -9 198 -12 633 -12 l592 0 24 25 c33 32 33 78 0 110 l-24 25 -591 0 -591 0 -24 25 -25 24 0 2031 0 2031 25 24 24 25 416 0 415 0 0 -56 c0 -31 5 -75 12 -98 16 -55 99 -138 154 -154 30 -9 164 -12 476 -12 501 0 499 0 571 80 49 55 67 103 67 184 l0 56 415 0 416 0 24 -25 25 -24 0 -431 0 -431 25 -24 c32 -33 78 -33 110 0 l25 24 0 432 c0 310 -3 443 -12 473 -16 55 -99 138 -154 154 -30 9 -162 12 -468 12 -380 0 -426 2 -426 16 0 27 -101 119 -146 132 -55 16 -902 15 -954 -1z m935 -172 c24 -23 25 -31 25 -135 0 -104 -1 -112 -25 -135 l-24 -25 -431 0 -431 0 -24 25 c-24 23 -25 31 -25 135 0 104 1 112 25 135 l24 25 431 0 431 0 24 -25z" stroke-width="5"/>
<path d="M2400 3427 c-49 -16 -133 -102 -148 -153 -17 -60 -17 -2808 0 -2868 16 -55 99 -138 154 -154 59 -17 1849 -17 1908 0 26 8 60 31 91 63 32 31 55 65 63 91 17 59 17 2808 0 2866 -6 22 -31 62 -55 88 -76 85 -12 80 -1057 79 -641 -1 -932 -4 -956 -12z m1895 -172 l25 -24 0 -1391 0 -1391 -25 -24 -24 -25 -911 0 -911 0 -24 25 -25 24 0 1391 0 1391 25 24 24 25 911 0 911 0 24 -25z" stroke-width="5"/>
<path d="M2745 2535 c-22 -21 -25 -33 -25 -95 0 -62 3 -74 25 -95 15 -16 36 -25 55 -25 33 0 80 38 80 65 0 11 11 15 40 15 l40 0 0 -295 0 -296 25 -24 c15 -16 36 -25 55 -25 19 0 40 9 55 25 l25 24 0 296 0 295 40 0 c29 0 40 -4 40 -15 0 -9 11 -27 25 -40 32 -33 78 -33 110 0 22 21 25 33 25 95 0 62 -3 74 -25 95 l-24 25 -271 0 -271 0 -24 -25z" stroke-width="5"/>
<path d="M3545 2535 c-16 -15 -25 -36 -25 -55 0 -19 9 -40 25 -55 24 -25 26 -25 215 -25 189 0 191 0 215 25 16 15 25 36 25 55 0 19 -9 40 -25 55 -24 25 -26 25 -215 25 -189 0 -191 0 -215 -25z" stroke-width="5"/>
<path d="M3545 2215 c-16 -15 -25 -36 -25 -55 0 -19 9 -40 25 -55 24 -25 26 -25 215 -25 189 0 191 0 215 25 16 15 25 36 25 55 0 19 -9 40 -25 55 -24 25 -26 25 -215 25 -189 0 -191 0 -215 -25z" stroke-width="5"/>
<path d="M3545 1895 c-16 -15 -25 -36 -25 -55 0 -19 9 -40 25 -55 24 -25 26 -25 215 -25 189 0 191 0 215 25 16 15 25 36 25 55 0 19 -9 40 -25 55 -24 25 -26 25 -215 25 -189 0 -191 0 -215 -25z" stroke-width="5"/>
<path d="M2745 1575 c-16 -15 -25 -36 -25 -55 0 -19 9 -40 25 -55 l24 -25 591 0 591 0 24 25 c16 15 25 36 25 55 0 19 -9 40 -25 55 l-24 25 -591 0 -591 0 -24 -25z" stroke-width="5"/>
<path d="M2745 1255 c-16 -15 -25 -36 -25 -55 0 -19 9 -40 25 -55 l24 -25 591 0 591 0 24 25 c16 15 25 36 25 55 0 19 -9 40 -25 55 l-24 25 -591 0 -591 0 -24 -25z" stroke-width="5"/>
</g>
</svg>`;

export default class JnPasteAsPlainTextPlugin extends Plugin {
    static get pluginName() {
      return "JnPasteAsPlainTextPlugin";
    }
  
    init() {
      const editor = this.editor;
      const clipboardPipeline = editor.plugins.get("ClipboardPipeline");
      let isPlainTextMode = false;
  
      // Add the toggle button to the toolbar
      editor.ui.componentFactory.add("pasteAsPlainText", locale => {
        const button = new ButtonView(locale);
  
        button.set({
          label: "Paste as Plain Text (Ctrl+Shift+V)",
          icon: pasteIcon,
          tooltip: true,
        });
  
        // Button click handler to toggle mode
        button.on("execute", () => {
          isPlainTextMode = !isPlainTextMode;

          const cssClass = "ck-toolbar__button-active";
          if (isPlainTextMode) button.element.classList.add(cssClass);
          else button.element.classList.remove(cssClass);
        });
  
        return button;
      });
  
      // Intercept clipboard input event to handle paste operation
      editor.editing.view.document.on("clipboardInput", (evt, { dataTransfer, targetRanges, method }) => {
        let _data;
  
        if (isPlainTextMode) {
          // If in plain text mode, get only plain text
          _data = dataTransfer.getData("text/plain");
          // _data = plainTextToHtml(_data); // Convert plain text to HTML (or directly use as required)
          // Convert any {{}} placeholders into the corresponding placeholder elements
          _data = this._processPlaceholderText(_data);
          _data = plainTextToHtml(_data); // Convert plain text to HTML
        } else {
          // Otherwise, try to get HTML (formatted text)
          _data = dataTransfer.getData("text/html");
  
          if (!_data) {
            _data = plainTextToHtml(dataTransfer.getData("text/plain"));
          }
        }
  
        // Do some custom sanitizing
        _data = _data
          .replace(
            /<\/?(?!a)(?!p)(?!br)(?!ul)(?!li)(?!b)(?!strong)\b[^>]*>\s*/gi,
            "" // Replace all whitespaces outside HTML-elements, and also tags that are not in the whitelist.
          )
          .replace(/<\!--.*?-->/g, ""); // Replace all HTML comments
  
        const eventInfo = new EventInfo(this, "inputTransformation");
        let content = editor.data.htmlProcessor.toView(_data);
  
        clipboardPipeline.fire(eventInfo, {
          content,
          dataTransfer,
          targetRanges,
          method,
        });
  
        evt.stop();
      });
    }

    // Helper function to process plain text and wrap {{text}} in placeholders
    _processPlaceholderText(text) {
      // Regex to match {{text}} pattern
      const regex = /{{(.*?)}}/g;
      return text.replace(regex, (match, name) => {
        return `<span class="placeholder" data-name="${name}">${match}</span>`;
      });
    }
}
