import {
  addListToDropdown,
  createDropdown,
} from "@ckeditor/ckeditor5-ui/src/dropdown/utils";
import Collection from "@ckeditor/ckeditor5-utils/src/collection";
import Model from "@ckeditor/ckeditor5-ui/src/model";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

export default class PlaceholderUI extends Plugin {
  init() {
    const editor = this.editor;
    const t = editor.t;
    const placeholderNames = editor.config.get("jnvariables");
    if (placeholderNames) {
      editor.ui.componentFactory.add("placeholder", (locale) => {
        const dropdownView = createDropdown(locale);

        // Populate the list in the dropdown with items.
        addListToDropdown(
          dropdownView,
          getDropdownItemsDefinitions(placeholderNames)
        );

        dropdownView.buttonView.set({
          label: t("Flettekoder"),
          tooltip: true,
          withText: true,
        });

        this.listenTo(dropdownView, "execute", (evt) => {
          editor.execute("placeholder", {
            value: evt.source.commandParam,
          });
          editor.editing.view.focus();
        });

        dropdownView.class = "flettekoder";

        return dropdownView;
      });
    }
  }
}

function getDropdownItemsDefinitions(placeholderNames) {
  const itemDefinitions = new Collection();
  for (const obj of JSON.parse(placeholderNames)) {
    const definition = {
      type: "button",
      model: new Model({
        commandParam: obj.code,
        label: obj.name,
        withText: true,
      }),
    };
    // Add the item definition to the collection.
    itemDefinitions.add(definition);
  }
  return itemDefinitions;
}
