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

## Pick your build
This package supports mulitple builds that can be found in `dist`. Those custom builds are supposed to be used in Jobbadmin.Apps. They are following the format `[entry_file_name]_v[package.json.version.number].js`, e.g. ckeditor_document_v2.0.0.js. Configuration of the builds can be found in webpack.config.js.