import { View, ViewCollection } from "@ckeditor/ckeditor5-ui";

export class ComponentListView extends View {
  constructor(locale, components) {
    super(locale);

    this.viewCollection = new ViewCollection(locale);

    this.legendView = new View(locale);
    this.legendView.setTemplate({
      tag: "legend",
      children: [locale.t("Komponentbibliotek")],
    });

    this.viewCollection.add(this.legendView);
    this.generateComponentList(components);

    this.setTemplate({
      tag: "fieldset",
      children: this.viewCollection,
    });
  }

  generateComponentList(components) {
    components.forEach((c) => {
      const view = new View();
      view.setTemplate({
        tag: "div",
        children: [
          {
            tag: "input",
            attributes: {
              type: "checkbox",
              value: c.id,
              id: `component_${c.id}`,
              name: `component_${c.id}`,
            },
          },
          {
            tag: "label",
            attributes: {
              for: `component_${c.id}`,
              style: {
                marginLeft: "6px",
              },
            },
            children: [c.title],
          },
        ],
      });
      this.viewCollection.add(view);
    });
  }

  updateComponentList(components) {
    this.viewCollection.clear();
    this.viewCollection.add(this.legendView);
    this.generateComponentList(components);
  }
}
