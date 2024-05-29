import {
  addListToDropdown,
  createDropdown,
} from "@ckeditor/ckeditor5-ui/src/dropdown/utils";
import Collection from "@ckeditor/ckeditor5-utils/src/collection";
import Model from "@ckeditor/ckeditor5-ui/src/model";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

export class AddComponentButton extends Plugin {
  init() {
    const editor = this.editor;

    editor.on("myCustomEventFoo", () => console.info("my custom event foo"));
    const t = editor.t;
    const placeholderNames = [
      {
        id: 137,
        title: "Andre krav",
      },
      {
        id: 139,
        title: "Ansvarsområder",
      },
      {
        id: 200,
        title: "Arbeidsoppgaver",
      },
      {
        id: 19,
        title: "Kvalifikasjoner",
      },
      {
        id: 173,
        title: "l&#xF8;nnsvariabel",
      },
      {
        id: 125,
        title: "Overskrift",
      },
      {
        id: 138,
        title: "Personlige egenskaper",
      },
      {
        id: 20,
        title: "Stillingsbeskrivelse",
      },
      {
        id: 126,
        title: "Stillingstittel",
      },
      {
        id: 277,
        title: "Testing",
      },
      {
        id: 1,
        title: "Utdanning",
      },
      {
        id: 140,
        title: "Vi tilbyr",
      },
    ];

    if (placeholderNames) {
      editor.ui.componentFactory.add("JnJobGapAddComponentButton", (locale) => {
        const dropdownView = createDropdown(locale);

        // Populate the list in the dropdown with items.
        addListToDropdown(
          dropdownView,
          getDropdownItemsDefinitions(placeholderNames)
        );

        dropdownView.buttonView.set({
          label: t("Komponenter"),
          tooltip: true,
          withText: true,
        });

        // dropdownView.setTemplate({
        //   attributes: {
        //     id: "jnJobGapComponentDropdown"
        //   }
        // })

        this.listenTo(dropdownView, "execute", (evt) => {
          console.info("item clicked", evt);
          // editor.execute("placeholder", {
          //   value: evt.source.commandParam,
          // });
          // editor.editing.view.focus();
        });

        // dropdownView.class = "flettekoder";

        return dropdownView;
      });
    }
  }
}

function getDropdownItemsDefinitions(components) {
  const itemDefinitions = new Collection();
  // for (const obj of JSON.parse(placeholderNames)) {
  for (const obj of components) {
    const definition = {
      type: "button",
      model: new Model({
        commandParam: obj.id,
        label: obj.title,
        withText: true,
      }),
    };
    // Add the item definition to the collection.
    itemDefinitions.add(definition);
  }
  return itemDefinitions;
}
