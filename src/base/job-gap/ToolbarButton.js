import { ButtonView } from "@ckeditor/ckeditor5-ui";

export class ToolbarButton extends ButtonView {
  constructor(locale, dialog) {
    super(locale);

    this.dialog = dialog;
    this.set({
      label: locale.t("Rediger komponenter for jobbanalyse"),
      tooltip: true,
      withText: true,
    });

    this.on("execute", dialog.init.bind(dialog));
  }
}
