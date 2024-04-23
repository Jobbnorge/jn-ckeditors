import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import PlaceholderEditing from "./placeholder-editing";
import PlaceholderComponentEditing from "./placeholder-component-editing";
import PlaceholderUI from "./placeholder-ui";

/**
 * We want to display Components.[component-name].* as block elements in the editor view.
 * Therefor we end up with two different EditingPlugins, one for inline placeholders - PlaceholderEditing - and 
 * one for block style placeholders - PlaceholderComponentEditing.
 * 
 * The PlaceholderCommand is aware of this differntiation adding <placeholder> and <placeholderComponent> respectively.
 * 
 * When persisting the data to a database two css classes are added to wrapper elements around the placeholders. Either
 * "placeholder" or "placeholder-component". Those are used to derive the correct CkEditor Model when loading the data
 * into an editor.
 */

export default class Placeholder extends Plugin {
  static get requires() {
    return [PlaceholderEditing, PlaceholderComponentEditing, PlaceholderUI];
  }
}