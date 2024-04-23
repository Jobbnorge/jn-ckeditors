import PlaceholderCommand from "./placeholder-command";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  toWidget,
  viewToModelPositionOutsideModelElement,
} from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";

export default class PlaceholderEditing extends Plugin {
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
        // Extract the "name" from "{{name}}".
        const name = viewElement.getChild(0).data.slice(2, -2);

        return modelWriter.createElement("placeholder", { name });
      },
    });

    conversion.for("editingDowncast").elementToElement({
      model: "placeholder",
      view: (modelItem, { writer: viewWriter }) => {
        const name = modelItem.getAttribute("name");
        const placeholderView = viewWriter.createContainerElement("span", {
          class: "placeholder",
        });

        viewWriter.insert(
          viewWriter.createPositionAt(placeholderView, 0),
          viewWriter.createText("{{" + name + "}}")
        );

        // Enable widget handling on a placeholder element inside the editing view.
        return toWidget(placeholderView, viewWriter);
      },
    });

    conversion.for("dataDowncast").elementToElement({
      model: "placeholder",
      view: (modelItem, { writer: viewWriter }) => {
        const name = modelItem.getAttribute("name");
        const placeholderView = viewWriter.createContainerElement("span", {
          class: "placeholder",
        });

        viewWriter.insert(
          viewWriter.createPositionAt(placeholderView, 0),
          viewWriter.createText("{{" + name + "}}")
        );

        return placeholderView;
      },
    });
  }
}
