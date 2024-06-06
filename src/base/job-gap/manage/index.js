import { Plugin } from "@ckeditor/ckeditor5-core";
import { add } from "@ckeditor/ckeditor5-utils/src/translation-service";
import { ToolbarButton } from "./ToolbarButton";
import { ComponentDialog } from "./ComponentDialog";

// add localization https://ckeditor.com/docs/ckeditor5/latest/framework/deep-dive/ui/localization.html#introduction
add("en", {
  "Rediger komponenter for jobbanalyse": "Manage components",
  "Jobbanalyse - Komponenter": "Jobanalysis - components",
  Lagre: "Save",
  Komponentnavn: "Name of the component",
  Komponentbibliotek: "Component library",
  "Slett valgt(e)": "Delete selected",
  "Merk! Sletting av komponenter vil ikke oppdatere/endre maler eller dokumenter der komponenten er i bruk.":
    "Component deletion will not affect any existing templates or documents.",
  Lukk: "Close",
});

// Create a plugin that brings a button that toggles the visibility of a dialog window.
class JnJobGap extends Plugin {
  init() {
    // Add a button to the component factory so it is available for the editor.
    this.editor.ui.componentFactory.add(
      "JnJobGapManageComponentsButton",
      (locale) => {
        const buttonView = new ToolbarButton(locale);
        const dialog = new ComponentDialog(this.editor);

        buttonView.on("execute", dialog.init.bind(dialog));

        return buttonView;
      }
    );
  }
}

export { JnJobGap };
