import { Plugin } from "@ckeditor/ckeditor5-core";
import { AddComponentButton } from "./AddComponentButton";

class JnJobGapApply extends Plugin {
  static get requires() {
    return [AddComponentButton];
  }
}

export { JnJobGapApply };
