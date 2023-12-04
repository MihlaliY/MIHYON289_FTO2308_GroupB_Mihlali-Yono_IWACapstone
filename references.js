export const html = {
  header: {
    search: document.querySelector("[data-header-search]"),
    settings: document.querySelector("[data-header-settings]"),
  },
  list: {
    items: document.querySelector("[data-list-items]"),
    message: document.querySelector(".list__message"),
    button: document.querySelector("[data-list-button]"),
  },
  preview: {
    listActive: document.querySelector("[data-list-active]"),
    listBlur: document.querySelector("[data-list-blur]"),
    listImage: document.querySelector("[data-list-image]"),
    listTitle: document.querySelector("[data-list-title]"),
    listSubtitle: document.querySelector("[data-list-subtitle]"),
    listDescription: document.querySelector("[data-list-description]"),
    listClose: document.querySelector("[data-list-close]"),
  },

  search: {
    overlay: document.querySelector("[ data-search-overlay]"),
    form: document.querySelector("[ data-search-form]"),
    title: document.querySelector("[ data-search-title]"),
    genre: document.querySelector("[data-search-genres]"),
    author: document.querySelector("[ data-search-authors]"),
    cancel: document.querySelector("[data-search-cancel] "),
  },

  settings: {
    overlay: document.querySelector("[ data-settings-overlay]"),
    form: document.querySelector("[ data-settings-form]"),
    theme: document.querySelector("[  data-settings-theme ]"),
    cancel: document.querySelector("[ data-settings-cancel]"),
  },
}
