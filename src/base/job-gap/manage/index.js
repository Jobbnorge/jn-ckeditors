import { Plugin } from "@ckeditor/ckeditor5-core";
import { add } from "@ckeditor/ckeditor5-utils/src/translation-service";
import { ToolbarButton } from "./ToolbarButton";
import { ComponentDialog } from "./ComponentDialog";

// add localization https://ckeditor.com/docs/ckeditor5/latest/framework/deep-dive/ui/localization.html#introduction
add("en", {
  "Rediger komponenter for jobbanalyse": ["Manage components"],
});

// Create a plugin that brings a button that toggles the visibility of a dialog window.
class JnJobGap extends Plugin {
  init() {
    // Add a button to the component factory so it is available for the editor.
    this.editor.ui.componentFactory.add("JnJobGapManageComponentsButton", (locale) => {
      const buttonView = new ToolbarButton(locale);
      const dialog = new ComponentDialog(this.editor);

      buttonView.on("execute", dialog.init.bind(dialog));

      return buttonView;
    });
  }
}

export { JnJobGap };
