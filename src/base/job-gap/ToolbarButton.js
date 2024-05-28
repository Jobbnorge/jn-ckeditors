import { ButtonView } from "@ckeditor/ckeditor5-ui";

export class ToolbarButton extends ButtonView {
  constructor(locale) {
    super(locale);

    this.set({
      label: locale.t("Rediger komponenter for jobbanalyse"),
      tooltip: true,
      withText: true,
    });
  }
}
