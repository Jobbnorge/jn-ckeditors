import {
  addListToDropdown,
  createDropdown,
} from "@ckeditor/ckeditor5-ui/src/dropdown/utils";
import Collection from "@ckeditor/ckeditor5-utils/src/collection";
import Model from "@ckeditor/ckeditor5-ui/src/model";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import utils from "../utils";

export class JnAddComponentDropdown extends Plugin {
  static get pluginName() {
    return "JnAddComponentDropdown";
  }

  componentList = [];

  setComponentList(componentList) {
    this.componentList = componentList;
  }

  async init() {
    const editor = this.editor;
    const t = editor.t;

    this.componentList = await utils.getComponents();

    if (this.componentList) {
      editor.ui.componentFactory.add("JnJobGapAddComponentButton", (locale) => {
        const dropdownView = createDropdown(locale);

        dropdownView.on("change:isOpen", (_evt, _name, value) => {
          if (!value) return;

          dropdownView.panelView.children.clear();

          // Populate the list in the dropdown with items.
          addListToDropdown(
            dropdownView,
            getDropdownItemsDefinitions(this.componentList)
          );
        });

        dropdownView.buttonView.set({
          label: t("Legg til komponent"),
          tooltip: true,
          withText: true,
        });

        dropdownView.on("execute", (evt) => {
          editor.execute("jnApplyComponent", evt.source.commandParam);
          editor.editing.view.focus();
        });

        return dropdownView;
      });
    }
  }
}

function getDropdownItemsDefinitions(components) {
  const itemDefinitions = new Collection();
  for (const obj of components) {
    const definition = {
      type: "button",
      model: new Model({
        commandParam: obj.title,
        label: obj.title,
        withText: true,
      }),
    };
    // Add the item definition to the collection.
    itemDefinitions.add(definition);
  }
  return itemDefinitions;
}
