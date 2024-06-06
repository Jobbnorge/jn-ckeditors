import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  Widget,
  toWidget,
  toWidgetEditable,
  viewToModelPositionOutsideModelElement,
} from "@ckeditor/ckeditor5-widget";

export default class JnApplyComponentEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.editing.mapper.on(
      "viewToModelPosition",
      viewToModelPositionOutsideModelElement(this.editor.model, (viewElement) =>
        viewElement.hasClass("gaplabel")
      )
    );
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register("gapcontainer", {
      inheritAllFrom: "$blockObject",
      allowAttributes: ["name"],
    });

    schema.register("gaplabel", {
      isLimit: true,
      allowIn: "gapcontainer",
      allowAttributes: ["name"],
    });

    schema.register("gapcontent", {
      isLimit: true,
      allowIn: "gapcontainer",
      allowContentOf: "$root",
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    // gapcontainer conversion
    conversion.for("dataDowncast").elementToElement({
      model: "gapcontainer",
      view: (modelElement, { writer: viewWriter }) => {
        const componentName = modelElement.getAttribute("name");

        const div = viewWriter.createContainerElement("div", {
          class: "gapcontainer",
          jobgaptitle: componentName,
          jobgaptype: "Annonse",
        });

        return div;
      },
    });

    conversion.for("editingDowncast").elementToElement({
      model: "gapcontainer",
      view: (modelElement, { writer: viewWriter }) => {
        const componentName = modelElement.getAttribute("name");

        const div = viewWriter.createContainerElement("div", {
          class: "gapcontainer",
          jobgaptitle: componentName,
          jobgaptype: "Annonse",
        });

        return toWidget(div, viewWriter, { label: "gapcontainer" });
      },
    });

    // gaplabel conversion
    conversion.for("downcast").elementToElement({
      model: "gaplabel",
      view: (modelElement, { writer: viewWriter }) => {
        const componentName = modelElement.getAttribute("name");

        const div = viewWriter.createContainerElement("div", {
          class: "gaplabel",
        });

        viewWriter.insert(
          viewWriter.createPositionAt(div, 0),
          viewWriter.createText(componentName)
        );

        return div;
      },
    });

    // gapcontent conversion
    conversion.for("dataDowncast").elementToElement({
      model: "gapcontent",
      view: {
        name: "div",
        classes: "gapcontent",
      },
    });

    conversion.for("editingDowncast").elementToElement({
      model: "gapcontent",
      view: (_, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement("div", {
          class: "gapcontent",
        });
        return toWidgetEditable(div, viewWriter);
      },
    });

    // upcast converters
    conversion
      .for("upcast")
      .elementToElement({
        view: {
          name: "div",
          classes: "gapcontainer",
        },
        model: (element, { writer: modelWriter }) => {
          const name = element.getAttribute("jobgaptitle");

          return modelWriter.createElement("gapcontainer", { name });
        },
      })
      .elementToElement({
        view: {
          name: "div",
          classes: "gaplabel",
        },
        model: (element, { writer: modelWriter }) => {
          const name = element.getChild(0).data;

          return modelWriter.createElement("gaplabel", { name });
        },
      })
      .elementToElement({
        model: "gapcontent",
        view: {
          name: "div",
          classes: "gapcontent",
        },
      });
  }
}
