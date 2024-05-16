import {
  createLabeledInputText,
  LabeledFieldView,
} from "@ckeditor/ckeditor5-ui";
import { ButtonView, View } from "@ckeditor/ckeditor5-ui";
import { apiUrl } from "./utils";

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
        style: {
          marginLeft: "1rem",
        },
      },
    });

    submitButton.on("execute", async () => {
      const result = await fetch(`${apiUrl}/jobgap/component`, {
        credentials: "include",
        method: "POST",
        body: `"${labeledFieldView.fieldView.element.value}"`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status !== 200) throw new Error("Could not create component");

      const components = await result.json();

      this.fire("refreshComponentList", components);
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
