import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  toWidget,
  viewToModelPositionOutsideModelElement,
} from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";
import Command from "@ckeditor/ckeditor5-core/src/command";

import {
  addListToDropdown,
  createDropdown,
} from "@ckeditor/ckeditor5-ui/src/dropdown/utils";
import Collection from "@ckeditor/ckeditor5-utils/src/collection";
import Model from "@ckeditor/ckeditor5-ui/src/model";

export default class Placeholder extends Plugin {
  static get requires() {
    return [PlaceholderEditing, PlaceholderUI];
  }
}

class PlaceholderCommand extends Command {
  execute({ value }) {
    const editor = this.editor;
    const selection = editor.model.document.selection;
    value = value == "date" ? new Date().getDate() : value;
    editor.model.change((writer) => {
      // Create a <placeholder> elment with the "name" attribute (and all the selection attributes)...
      const placeholder = writer.createElement("placeholder", {
        ...Object.fromEntries(selection.getAttributes()),
        name: value,
      });
      // ... and insert it into the document.
      editor.model.insertContent(placeholder);

      // Put the selection on the inserted element.
      writer.setSelection(placeholder, "on");
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;

    const isAllowed = model.schema.checkChild(
      selection.focus.parent,
      "placeholder"
    );

    this.isEnabled = isAllowed;
  }
}

class PlaceholderUI extends Plugin {
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

        return dropdownView;
      });
    }
  }
}

class PlaceholderEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
      "placeholder",
      new PlaceholderCommand(this.editor)
    );

    this.editor.editing.mapper.on(
      "viewToModelPosition",
      viewToModelPositionOutsideModelElement(this.editor.model, (viewElement) =>
        viewElement.hasClass("placeholder")
      )
    );
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register("placeholder", {
      allowWhere: "$text",
      isInline: true,
      isObject: true,
      allowAttributesOf: "$text",
      allowAttributes: ["name"],
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for("upcast").elementToElement({
      view: {
        name: "span",
        classes: ["placeholder"],
      },
      model: (viewElement, { writer: modelWriter }) => {
        // Extract the "name" from "{name}".
        const name = viewElement.getChild(0).data.slice(1, -1);

        return modelWriter.createElement("placeholder", { name });
      },
    });

    conversion.for("editingDowncast").elementToElement({
      model: "placeholder",
      view: (modelItem, { writer: viewWriter }) => {
        const widgetElement = createPlaceholderView(modelItem, viewWriter);

        // Enable widget handling on a placeholder element inside the editing view.
        return toWidget(widgetElement, viewWriter);
      },
    });

    conversion.for("dataDowncast").elementToElement({
      model: "placeholder",
      view: (modelItem, { writer: viewWriter }) =>
        createPlaceholderView(modelItem, viewWriter),
    });

    // Helper method for both downcast converters.
    function createPlaceholderView(modelItem, viewWriter) {
      const name = modelItem.getAttribute("name");

      const placeholderView = viewWriter.createContainerElement(
        "span",
        {
          class: "placeholder",
        },
        {
          isAllowedInsideAttributeElement: true,
        }
      );
      const innerText = viewWriter.createText("{{" + name + "}}");
      viewWriter.insert(
        viewWriter.createPositionAt(placeholderView, 0),
        innerText
      );

      return placeholderView;
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
