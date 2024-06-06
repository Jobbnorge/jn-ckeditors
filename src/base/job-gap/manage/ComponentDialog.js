import { Dialog, View, ViewCollection } from "@ckeditor/ckeditor5-ui";
import utils from "../utils";
import { ComponentListView } from "./ComponentListView";
import { ComponentInputView } from "./ComponentInputView";
import { ComponentDeleteView } from "./ComponentDeleteView";

export class ComponentDialog extends Dialog {
  constructor(editor) {
    super(editor);
  }

  async init() {
    if (this.isOn) {
      this.hide();
      this.isOn = false;
      return;
    }
    this.isOn = true;

    const components = await utils.getComponents();
    const addComponentDropdown = this.editor.plugins.get(
      "JnAddComponentDropdown"
    );

    const contentView = new View(this.editor.locale);

    const componentsListView = new ComponentListView(
      this.editor.locale,
      components
    );

    const inputView = new ComponentInputView(this.editor.locale);
    inputView.on("refreshComponentList", (_, components) => {
      componentsListView.updateComponentList(components);
      addComponentDropdown.setComponentList(components);
    });

    const componentDeleteView = new ComponentDeleteView(
      this.editor.locale,
      componentsListView
    );
    componentDeleteView.on("refreshComponentList", (_, components) => {
      componentsListView.updateComponentList(components);
      addComponentDropdown.setComponentList(components);
    });

    const viewCollection = new ViewCollection(this.editor.locale);
    viewCollection.addMany([
      inputView,
      componentsListView,
      componentDeleteView,
    ]);

    contentView.setTemplate({
      tag: "div",
      attributes: {
        style: {
          padding: "var(--ck-spacing-large)",
          whiteSpace: "initial",
          width: "100%",
          maxWidth: "500px",
        },
        tabindex: -1,
        id: "jnJobGapManageDialog",
      },
      children: viewCollection,
    });

    // Tell the plugin to display a dialog with the title, content, and one action button.
    this.show({
      title: this.editor.locale.t("Jobbanalyse - Komponenter"),
      content: contentView,
      actionButtons: [
        {
          label: this.editor.locale.t("Lukk"),
          withText: true,
          onExecute: () => this.hide(),
        },
      ],
      onHide() {
        this.isOn = false;
      },
    });
  }
}
