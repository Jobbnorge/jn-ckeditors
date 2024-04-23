import PlaceholderCommand from "./placeholder-command";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  toWidget,
  viewToModelPositionOutsideModelElement,
} from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";

export default class PlaceholderComponentEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
      "placeholderComponent",
      new PlaceholderCommand(this.editor)
    );

    this.editor.editing.mapper.on(
      "viewToModelPosition",
      viewToModelPositionOutsideModelElement(this.editor.model, (viewElement) =>
        viewElement.hasClass("placeholder-component")
      )
    );
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register("placeholderComponent", {
      allowIn: "$root",
      isBlock: true,
      isObject: true,
      allowAttributes: ["name"],
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for("upcast").elementToElement({
      view: {
        name: "div",
        classes: ["placeholder-component"],
      },
      model: (viewElement, { writer: modelWriter }) => {
        // Extract the "name" from "{{name}}".
        const name = viewElement.getChild(0).data.slice(2, -2);

        return modelWriter.createElement("placeholderComponent", { name });
      },
    });

    conversion.for("editingDowncast").elementToElement({
      model: "placeholderComponent",
      view: (modelItem, { writer: viewWriter }) => {
        const name = modelItem.getAttribute("name");

        const placeholderView = viewWriter.createContainerElement("div", {
          class: "placeholder-component",
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
      model: "placeholderComponent",
      view: (modelItem, { writer: viewWriter }) => {
        const name = modelItem.getAttribute("name");
        const placeholderView = viewWriter.createContainerElement("div", {
          class: "placeholder-component",
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
