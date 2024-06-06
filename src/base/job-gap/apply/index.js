import { Plugin } from "@ckeditor/ckeditor5-core";
import { JnAddComponentDropdown } from "./JnAddComponentDropdown";
import JnApplyComponentCommand from "./JnApplyComponentCommand";
import JnApplyComponentEditing from "./JnApplyComponentEditing";
import { add } from "@ckeditor/ckeditor5-utils/src/translation-service";

add("en", {
  "Legg til komponent": "Add component",
});

class JnJobGapApply extends Plugin {
  static get requires() {
    return [JnAddComponentDropdown, JnApplyComponentEditing];
  }

  init() {
    this.editor.commands.add(
      "jnApplyComponent",
      new JnApplyComponentCommand(this.editor)
    );
  }
}

export { JnJobGapApply };
