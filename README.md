# Jobbnorge CkEditor

## Semantic release
A NPM package is build whenever commits are pushed into `main` branch containing one of the keywords bellow. Configuration of semantic-release can be found under release section in `package.json`. Read more about configuring semantic release in the offical documentation:
- [Configure trigger keywords](https://github.com/semantic-release/commit-analyzer?tab=readme-ov-file#configuration)
- [Main documentation](https://semantic-release.gitbook.io/semantic-release/)

```
fix: (patch)
feat: (minor)
pref: (major)
```

## Main (Branch)
- Provides the Classic Editor as a NPM package
- Does NOT HTML encode editor data
- The NPM package contains two editor configurations:
  - main: used inside VueApp managecandidate-single > candidate documents
  - job-gap: used inside VueApp jobgap-analysis

## Pick your build for Jobadmin
This package supports mulitple builds that can be found in `dist`. Those custom builds are supposed to be used in Jobbadmin.Apps. They are following the format `[entry_file_name].js`, e.g. ckeditor_document.js. Configuration of the builds can be found in webpack.config.js.

### Ckeditor Document Templates
- Classic Editor
- Implements a custom HTML encoder. How the encoder is applied: In WebForms everything resides in a `<form>` tag. Ckeditor has a mechanism that destroys the editor on *form submit* and applies the editor content to the source element, which is the orignal element the editor was initialized upon. This action (`setData`) is intercepted by our custom code and the editor content HTML encoded.

### Ckeditor Advertisement Templates
- Inline Editor
- Implements custom 'Paste' behaviour
  - Remove HTML comments
  - Remove certain html tags that are not white listed

### Ckeditor JobGap Templates
- Classic Editor
- Implements a custom HTML encoder. **Note:** the HTML encoder is not in use, since JobGap Template is interacting with JobbadminApi in the background instead of WebForms. See the explanation of how the HTML encoder is triggered in the [Ckeditor Document Templates](#ckeditor-document-templates) section.

## Internationalization i18n
The editors support both norwegian and english, where norwegian (Bokmål) is the default language. The build script generates a localization file (`dist/translations/en.js`) which has to be included on the page where the editor is used. Custom plugins have to provide localization to be picked up by the build script.
```js
import { add } from "@ckeditor/ckeditor5-utils/src/translation-service";
add("en", {
  "Rediger komponenter for jobbanalyse": "Manage components",
});
```
Source: \src\base\job-gap\manage\index.js