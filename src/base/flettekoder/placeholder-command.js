import Command from "@ckeditor/ckeditor5-core/src/command";

export default class PlaceholderCommand extends Command {
  execute({ value }) {
    const editor = this.editor;
    const selection = editor.model.document.selection;
    value = value == "date" ? new Date().getDate() : value;
    editor.model.change((writer) => {
      /**
       * Creates a <placeholder> or <placeholderComponent> elment
       * (depending on whether the placeholder is a component or not)
       * with the "name" attribute (and all the selection attributes)...
       */
      const placeholder = writer.createElement(
        value.startsWith("Component.") ? "placeholderComponent" : "placeholder",
        {
          ...Object.fromEntries(selection.getAttributes()),
          name: value,
        }
      );
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
