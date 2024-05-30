import { Plugin } from "@ckeditor/ckeditor5-core";
import { JnAddComponentDropdown } from "./JnAddComponentDropdown";

class JnJobGapApply extends Plugin {
  static get requires() {
    return [JnAddComponentDropdown];
  }
}

export { JnJobGapApply };
