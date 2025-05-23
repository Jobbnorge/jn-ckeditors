import ClassicEditorUI from '@ckeditor/ckeditor5-editor-classic/src/classiceditorui.js';
import ClassicEditorUIView from '@ckeditor/ckeditor5-editor-classic/src/classiceditoruiview.js';
import { Editor, attachToForm } from 'ckeditor5/src/core.js';
import ElementApiMixin from './elementapimixin.js';
import { getDataFromElement, CKEditorError } from 'ckeditor5/src/utils.js';
import { EditorWatchdog } from 'ckeditor5/src/watchdog.js';
import { isElement as _isElement } from 'lodash-es';

class JnClassicEditor extends ElementApiMixin(Editor) {
    /**
     * Creates an instance of the classic editor.
     *
     * **Note:** do not use the constructor to create editor instances. Use the static
     * {@link module:editor-classic/classiceditor~ClassicEditor.create `ClassicEditor.create()`} method instead.
     *
     * @param sourceElementOrData The DOM element that will be the source for the created editor
     * or the editor's initial data. For more information see
     * {@link module:editor-classic/classiceditor~ClassicEditor.create `ClassicEditor.create()`}.
     * @param config The editor configuration.
     */
    constructor(sourceElementOrData, config = {}) {
        // If both `config.initialData` is set and initial data is passed as the constructor parameter, then throw.
        if (!isElement(sourceElementOrData) && config.initialData !== undefined) {
            // Documented in core/editor/editorconfig.jsdoc.
            // eslint-disable-next-line ckeditor5-rules/ckeditor-error-message
            throw new CKEditorError('editor-create-initial-data', null);
        }
        super(config);
        if (this.config.get('initialData') === undefined) {
            this.config.set('initialData', getInitialData(sourceElementOrData));
        }
        if (isElement(sourceElementOrData)) {
            this.sourceElement = sourceElementOrData;
        }
        this.model.document.createRoot();
        const shouldToolbarGroupWhenFull = !this.config.get('toolbar.shouldNotGroupWhenFull');
        const view = new ClassicEditorUIView(this.locale, this.editing.view, {
            shouldToolbarGroupWhenFull
        });
        this.ui = new ClassicEditorUI(this, view);
        attachToForm(this);
    }
    /**
     * Destroys the editor instance, releasing all resources used by it.
     *
     * Updates the original editor element with the data if the
     * {@link module:core/editor/editorconfig~EditorConfig#updateSourceElementOnDestroy `updateSourceElementOnDestroy`}
     * configuration option is set to `true`.
     */
    destroy() {
        if (this.sourceElement) {
            this.updateSourceElement();
        }
        this.ui.destroy();
        return super.destroy();
    }
    /**
     * Creates a new classic editor instance.
     *
     * There are three ways how the editor can be initialized.
     *
     * # Replacing a DOM element (and loading data from it)
     *
     * You can initialize the editor using an existing DOM element:
     *
     * ```ts
     * ClassicEditor
     * 	.create( document.querySelector( '#editor' ) )
     * 	.then( editor => {
     * 		console.log( 'Editor was initialized', editor );
     * 	} )
     * 	.catch( err => {
     * 		console.error( err.stack );
     * 	} );
     * ```
     *
     * The element's content will be used as the editor data and the element will be replaced by the editor UI.
     *
     * # Creating a detached editor
     *
     * Alternatively, you can initialize the editor by passing the initial data directly as a string.
     * In this case, the editor will render an element that must be inserted into the DOM:
     *
     * ```ts
     * ClassicEditor
     * 	.create( '<p>Hello world!</p>' )
     * 	.then( editor => {
     * 		console.log( 'Editor was initialized', editor );
     *
     * 		// Initial data was provided so the editor UI element needs to be added manually to the DOM.
     * 		document.body.appendChild( editor.ui.element );
     * 	} )
     * 	.catch( err => {
     * 		console.error( err.stack );
     * 	} );
     * ```
     *
     * This lets you dynamically append the editor to your web page whenever it is convenient for you. You may use this method if your
     * web page content is generated on the client side and the DOM structure is not ready at the moment when you initialize the editor.
     *
     * # Replacing a DOM element (and data provided in `config.initialData`)
     *
     * You can also mix these two ways by providing a DOM element to be used and passing the initial data through the configuration:
     *
     * ```ts
     * ClassicEditor
     * 	.create( document.querySelector( '#editor' ), {
     * 		initialData: '<h2>Initial data</h2><p>Foo bar.</p>'
     * 	} )
     * 	.then( editor => {
     * 		console.log( 'Editor was initialized', editor );
     * 	} )
     * 	.catch( err => {
     * 		console.error( err.stack );
     * 	} );
     * ```
     *
     * This method can be used to initialize the editor on an existing element with the specified content in case if your integration
     * makes it difficult to set the content of the source element.
     *
     * Note that an error will be thrown if you pass the initial data both as the first parameter and also in the configuration.
     *
     * # Configuring the editor
     *
     * See the {@link module:core/editor/editorconfig~EditorConfig editor configuration documentation} to learn more about
     * customizing plugins, toolbar and more.
     *
     * # Using the editor from source
     *
     * The code samples listed in the previous sections of this documentation assume that you are using an
     * {@glink installation/getting-started/predefined-builds editor build} (for example – `@ckeditor/ckeditor5-build-classic`).
     *
     * If you want to use the classic editor from source (`@ckeditor/ckeditor5-editor-classic/src/classiceditor`),
     * you need to define the list of
     * {@link module:core/editor/editorconfig~EditorConfig#plugins plugins to be initialized} and
     * {@link module:core/editor/editorconfig~EditorConfig#toolbar toolbar items}. Read more about using the editor from
     * source in the {@glink installation/advanced/alternative-setups/integrating-from-source-webpack dedicated guide}.
     *
     * @param sourceElementOrData The DOM element that will be the source for the created editor
     * or the editor's initial data.
     *
     * If a DOM element is passed, its content will be automatically loaded to the editor upon initialization
     * and the {@link module:editor-classic/classiceditorui~ClassicEditorUI#element editor element} will replace the passed element
     * in the DOM (the original one will be hidden and the editor will be injected next to it).
     *
     * If the {@link module:core/editor/editorconfig~EditorConfig#updateSourceElementOnDestroy updateSourceElementOnDestroy}
     * option is set to `true`, the editor data will be set back to the original element once the editor is destroyed and when a form,
     * in which this element is contained, is submitted (if the original element is a `<textarea>`). This ensures seamless integration
     * with native web forms.
     *
     * If the initial data is passed, a detached editor will be created. In this case you need to insert it into the DOM manually.
     * It is available under the {@link module:editor-classic/classiceditorui~ClassicEditorUI#element `editor.ui.element`} property.
     *
     * @param config The editor configuration.
     * @returns A promise resolved once the editor is ready. The promise resolves with the created editor instance.
     */
    static create(sourceElementOrData, config = {}) {
        return new Promise(resolve => {
            const editor = new this(sourceElementOrData, config);
            resolve(editor.initPlugins()
                .then(() => editor.ui.init(isElement(sourceElementOrData) ? sourceElementOrData : null))
                .then(() => editor.data.init(editor.config.get('initialData')))
                .then(() => editor.fire('ready'))
                .then(() => editor));
        });
    }
}
/**
 * The {@link module:watchdog/editorwatchdog~EditorWatchdog} class.
 *
 * Exposed as static editor field for easier access in editor builds.
 */
JnClassicEditor.EditorWatchdog = EditorWatchdog;

export default JnClassicEditor;

function getInitialData(sourceElementOrData) {
    return isElement(sourceElementOrData) ? getDataFromElement(sourceElementOrData) : sourceElementOrData;
}
function isElement(value) {
    return _isElement(value);
}
