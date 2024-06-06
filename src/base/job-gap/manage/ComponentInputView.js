import {
  createLabeledInputText,
  LabeledFieldView,
} from "@ckeditor/ckeditor5-ui";
import { ButtonView, View } from "@ckeditor/ckeditor5-ui";
import utils from "../utils";

export class ComponentInputView extends View {
  constructor(locale) {
    super(locale);

    const labeledFieldView = new LabeledFieldView(
      locale,
      createLabeledInputText
    );
    labeledFieldView.set({
      label: locale.t("Komponentnavn"),
    });

    const submitButton = new ButtonView(locale);

    submitButton.set({
      label: locale.t("Lagre"),
      withText: true,
    });

    submitButton.extendTemplate({
      attributes: {
        class: "primary",
      },
    });

    submitButton.on("execute", async () => {
      const result = await fetch(`${utils.apiUrl}/jobgap/component`, {
        credentials: "include",
        method: "POST",
        body: `"${labeledFieldView.fieldView.element.value}"`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 500) throw new Error("Could not create component");

      labeledFieldView.fieldView.element.value = "";

      if (result.status === 400) {
        const error = await result.json();
        if (!!error.errors.title) {
          var msg = locale.t("Komponentnavn kunne ikke opprettes.");

          if (error.errors.title.some((i) => i === "required"))
            msg = locale.t("Komponentnavn kan ikke være tom.");
          else if (error.errors.title.some((i) => i === "duplicate"))
            msg = locale.t("Komponentnavn finnes allerede i sammlingen.");

          labeledFieldView.errorText = msg;
        }
      } else {
        const components = await result.json();
        this.fire("refreshComponentList", components);
      }
    });

    this.setTemplate({
      tag: "div",
      attributes: {
        style: { display: "flex" },
      },
      children: [labeledFieldView, submitButton],
    });
  }
}
