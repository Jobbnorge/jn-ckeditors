import Command from "@ckeditor/ckeditor5-core/src/command";

export default class JnApplyComponentCommand extends Command {
  execute(componentName) {
    const editor = this.editor;

    editor.model.change((writer) => {
      const gapContainer = writer.createElement("gapcontainer", {
        name: componentName,
      });

      const gapLabel = writer.createElement("gaplabel", {
        name: componentName,
      });
      const gapContent = writer.createElement("gapcontent");
      const paragraph = writer.createElement("paragraph");

      writer.append(gapLabel, gapContainer);
      writer.append(gapContent, gapContainer);
      writer.append(paragraph, gapContent);

      editor.model.insertContent(gapContainer);

      // Put the selection on the inserted element.
      writer.setSelection(gapContainer, "on");
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      "gapcontainer"
    );

    this.isEnabled = allowedIn !== null;
  }
}
