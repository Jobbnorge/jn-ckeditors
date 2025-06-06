import { ButtonView, View } from "@ckeditor/ckeditor5-ui";
import utils from "../utils";

export class ComponentDeleteView extends View {
  constructor(locale, componentListView) {
    super(locale);

    const deleteButton = new ButtonView(locale);

    deleteButton.set({
      label: locale.t("Slett valgt(e)"),
      withText: true,
    });

    deleteButton.extendTemplate({
      attributes: {
        class: "red",
      },
    });

    deleteButton.on("execute", async () => {
      const checkboxes = Array.from(
        componentListView.element.querySelectorAll("input[type=checkbox]")
      );
      const componentIds = checkboxes
        .filter((c) => c.checked)
        .map((c) => c.value);

      const result = await fetch(`${utils.apiUrl}/jobgap/component`, {
        credentials: "include",
        method: "DELETE",
        body: JSON.stringify(componentIds),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status !== 200) throw new Error("Could not create component");

      const components = await result.json();

      this.fire("refreshComponentList", components);
    });

    const infoText = document.createElement("p");
    infoText.innerHTML = locale.t(
      "Merk! Sletting av komponenter vil ikke oppdatere/endre maler eller dokumenter der komponenten er i bruk."
    );

    this.setTemplate({
      tag: "div",
      children: [deleteButton, infoText],
    });
  }
}
