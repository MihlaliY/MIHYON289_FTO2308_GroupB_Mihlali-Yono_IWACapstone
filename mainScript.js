import {BOOKS_PER_PAGE, authors, genres, books} from "./data.js"
import {html} from "./references.js"

const listButton = html.list.button
const listMessage = html.list.message
let loadedBooks = 0

listButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
const mainElement = document.querySelector(".list")
/**
 * A function that loads imported books into the DOM. Makes use of the for loop to append the books.
 * This function will be called by two functions, mainly {@link first36Books} and {@link showMoreBook} where it will
 * load more books based on their conditions
 * @param {number} startIndex - The starting index for book loading.
 * @param {number} endIndex  - The ending index for book loading.
 * @returns {void}
 */
const showBooks = (startIndex, endIndex) => {
  for (let i = startIndex; i < endIndex; i++) {
    if (i >= books.length) {
      break
    }
    const book = books[i]
    const bookItemDiv = document.createElement("div")
    bookItemDiv.setAttribute("data-list-items", "")
    bookItemDiv.classList.add("list__items")
    bookItemDiv.style.gridTemplateColumns = "1fr 2fr"
    bookItemDiv.style.backgroundColor = "rgba(var( --color-force-dark))"
    bookItemDiv.style.margin = "50px 50px 50px 10px"
    bookItemDiv.style.padding = "20px"
    bookItemDiv.style.borderRadius = "40px"

    const aboutBook = document.createElement("div")

    const imageElement = document.createElement("img")
    imageElement.src = book.image
    imageElement.alt = book.title
    imageElement.style.width = "100px"

    const titleElement = document.createElement("h2")
    titleElement.textContent = book.title

    const authorElement = document.createElement("p")
    authorElement.textContent = authors[book.author]

    bookItemDiv.appendChild(imageElement)
    aboutBook.appendChild(titleElement)
    aboutBook.appendChild(authorElement)
    bookItemDiv.appendChild(aboutBook)
    const booksBefore = document.querySelector("#booksBefore")
    mainElement.insertBefore(bookItemDiv, booksBefore)
  }
}
/**
 * Loads and displays the first set of books when the DOM loads.
 * Displays the initial set of books using the {@link showBooks} function with predefined arguments.
 * If the number of initially loaded books equals the total number of books (books.length),
 * hides the 'Show more' button.
 */
const first36Books = () => {
  showBooks(0, BOOKS_PER_PAGE)
  loadedBooks = BOOKS_PER_PAGE

  if (loadedBooks >= books.length) {
    listButton.style.display = "none"
  }
}

/**
 * A handler that fires when the show more button is clciked.
 * This function utilizes the {@link showBooks}  function to load 36 books more books after
 * the DOM has loaded with the first 36 books.
 * The user can load more books until there no more books where then the function will disable the show more button.
 * */
const showMoreBooks = () => {
  const startIndex = loadedBooks
  let endIndex = startIndex + BOOKS_PER_PAGE

  showBooks(startIndex, endIndex)
  loadedBooks = endIndex

  if (loadedBooks >= books.length) {
    listButton.style.display = "none"
  }
}

/* Preview */

/**
 * An object containing all the references to the html elements of the preview
 */
const previewItems = {
  blurImage: html.preview.listBlur,
  previewImage: html.preview.listImage,
  previewTitle: html.preview.listTitle,
  previewSubtitle: html.preview.listSubtitle,
  previewDescription: html.preview.listDescription,
}
/**
 * A handler function that fires when an book in the page is clicked. The function uses bubbling
 * detecting the click from the parent element which is the mainElement.
 * The function utilises the event.target to get the book where the click occured
 * The function then creates an array from the mainElement's children to use the indices of the
 * created array in order to match them with the imported {@link books} array.
 * Once the index of the book the event (click) happened on is retrieved preview items are loaded to the DOM
 * and a preview of that specific book is shown.
 * The function also includes the date of publication through creating a new date and getting the full year.
 * @param {Event} event The click event on the mainElement
 * @returns {void}
 */
const previewHandler = (event) => {
  const clickedListItem = event.target.closest("[data-list-items]")

  if (!clickedListItem) {
    return
  }

  const index = Array.from(mainElement.children).indexOf(clickedListItem)
  console.log(Array.from(mainElement.children).indexOf(clickedListItem))
  const book = books[index]

  previewItems.blurImage.src = book.image
  previewItems.previewImage.src = book.image
  previewItems.previewTitle.textContent = book.title

  previewItems.previewSubtitle.textContent = `${
    authors[book.author]
  }(${new Date(book.published).getFullYear()})`
  previewItems.previewDescription.textContent = book.description
  const preview = html.preview.listActive
  preview.showModal()
}

/**
 * A handler that fires when the close button is clicked to close the preview
 */
const closePreviewHandler = () => {
  const dialog = document.querySelector("[data-list-active]")
  dialog.close()
}

const closeButton = html.preview.listClose

/* Header Search */

/**
 * Handles the event triggered by clicking the search icon, loading search options for authors and genres.
 * Prevents the default behavior of the event.
 * Show the dialog at the click of the search icon
 * Loads authors and genres as search options into the DOM using 'for...in' loops.
 * Adds "All genre" as the first option followed by the loaded genres.
 * Adds "All Authors" as the first option followed by the loaded authors.
 * Closes the search dialog at the click of the close/cancel button
 * @param {Event} event - The event object generated by the search icon click.
 */
const searchHandler = (event) => {
  event.preventDefault()
  const dialog = html.search.overlay
  dialog.showModal()

  const searchGenre = html.search.genre
  searchGenre.innerHTML = ""

  // Adding "All genre" as the first option
  const allGenreOption = document.createElement("option")
  allGenreOption.value = "all"
  allGenreOption.textContent = "All genre"
  searchGenre.appendChild(allGenreOption)

  // Loading other genres as options
  for (const genreId in genres) {
    const option = document.createElement("option")
    option.value = genreId
    option.textContent = genres[genreId]
    searchGenre.appendChild(option)
  }

  const searchAuthor = html.search.author
  searchAuthor.innerHTML = ""

  // Adding "All Authors" as the first option
  const allAuthorsOption = document.createElement("option")
  allAuthorsOption.value = "all"
  allAuthorsOption.textContent = "All Authors"
  searchAuthor.appendChild(allAuthorsOption)

  // Loading other authors as options
  for (const authorId in authors) {
    const option = document.createElement("option")
    option.value = authorId
    option.textContent = authors[authorId]
    searchAuthor.appendChild(option)
  }
}
/**
 * An event handler that fires when the cancel button of the header search is clicked
 * This function closes the header search
 */
const cancelHandler = () => {
  const dialog = html.search.overlay
  dialog.close()
}
const cancelSearch = html.search.cancel
cancelSearch.addEventListener("click", cancelHandler)

/* search for matches */

/**
 * Clears the main element and displays filtered books or appropriate messages based on search results.
 * @param {Array} filteredBooks - The array of books after applying search filters.
 */

const displayFilteredBooks = (filteredBooks) => {
  mainElement.innerHTML = "" // Clear previous books
  if (filteredBooks.length === 0) {
    listMessage.classList.add("list__message_show") // Show the existing message
    listButton.style.display = "none" // Hide 'Show more' button
  } else {
    listMessage.classList.remove("list__message_show") // Hide the message if there are results
    showBooks(0, filteredBooks.length)
    loadedBooks = filteredBooks.length
    listButton.style.display =
      loadedBooks >= filteredBooks.length ? "none" : "block"
  }
}

/**
 * Handles form submission for book search.
 */
const searchFormHandler = (e) => {
  e.preventDefault()
  const searchTitle = html.search.title
  const searchGenre = html.search.genre
  const searchAuthor = html.search.author

  const titleQuery = searchTitle.value.trim().toLowerCase()
  const genreQuery = searchGenre.value
  const authorQuery = searchAuthor.value

  /**
   * Filters the list of books based on search criteria.
   * @param {Object} book - The book object to be checked for matches.
   * @returns {boolean} - Indicates if the book matches the search criteria.
   */

  const filteredBooks = books.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(titleQuery)
    const genreMatch = genreQuery === "all" || book.genres === genreQuery
    const authorMatch = authorQuery === "all" || book.author === authorQuery

    return titleMatch && genreMatch && authorMatch
  })
  console.log(filteredBooks)
  displayFilteredBooks(filteredBooks)
  cancelHandler()
}
/**
 * The search button in the the header search form
 */
const searchButton = document.querySelector(
  '[data-search-overlay] .overlay__row [form="search"]'
)

/* theme */
/**
 * The drop down menu for the themes day and night
 */
const themeSelect = html.settings.theme
/**
 * All the dialogs in the DOM
 */
const overlays = document.querySelectorAll(".overlay")
/**
 * A function that updates the theme of all the overlays/dialogs according to the themeSelected
 * This functions uses for of loops to loop through all the overlays and checking what the selected theme is
 * and then changing the backgrounds of the overlays to match the theme selected
 * This function will be called in the themeToggle to update with the theme changes
 */
const updateOverlayTheme = () => {
  for (const overlay of overlays) {
    if (themeSelect.value === "day") {
      overlay.style.background = "white"
    }
    if (themeSelect.value === "night") {
      overlay.style.background = "rgba(var(--color-light), 1)"
    }
  }
}
/**
 * All the elements(inputs) with the class .overlay__input
 */
const inputs = document.querySelectorAll(".overlay__input")
/**
 * A function that updates the theme of all the inputs according to the themeSelected
 * This functions uses for of loops to loop through all the inputs and checking what the selected theme is
 * and then changing the text color of the inputs to match the theme selected
 * This function will be called in the themeToggle to update with the theme changes
 */
const updateInputTheme = () => {
  for (const input of inputs) {
    if (themeSelect.value === "day") {
      input.style.color = "black"
    }
    if (themeSelect.value === "night") {
      input.style.color = "rgba(var(--color-dark), 1)"
    }
  }
}
/**
 * All the labels in the DOM
 */
const labels = document.querySelectorAll(".overlay__label")
/**
 * A function that updates the theme of all the labels according to the themeSelected
 * This functions uses for of loops to loop through all the labels and checking what the selected theme is
 * and then changing the text color of the labels to match the theme selected
 * This function will be called in the themeToggle to update with the theme changes
 */
const updateLabelTheme = () => {
  for (const label of labels) {
    if (themeSelect.value === "day") {
      label.style.color = "black"
    }
    if (themeSelect.value === "night") {
      label.style.color = "rgba(var(--color-dark), 0.4)"
    }
  }
}

/**
 * An object containing elements that need to be updated as the the theme selected changes
 */
const elementsChangedByTheme = {
  body: document.querySelector("body"),
  description: html.preview.listDescription,
  title: html.preview.listTitle,
  subtitle: html.preview.listSubtitle,
}

/**
 * An event handler that fires when there is a change in the selection of the theme.
 * The function has two if statements respectively that check if the theme selected is day or night
 * if the theme is day the appropriate background and text colors are implemented to the different elements
 * to match the selected theme
 * This function also calls the updateOverlayTheme(), the  updateInputTheme(), and the updateLabelTheme()
 */

const themeToggleHandler = () => {
  if (themeSelect.value === "day") {
    elementsChangedByTheme.body.style.background = `linear-gradient(
        0deg, 
        rgba(var(--color-light), 0.2), 
        rgba(var(--color-light), 0.1)), 
        rgba(var(--color-dark), 1)`

    elementsChangedByTheme.description.style.color = "black"
    elementsChangedByTheme.title.style.color = "black"
    elementsChangedByTheme.subtitle.style.color = "black"
  }

  if (themeSelect.value === "night") {
    elementsChangedByTheme.body.style.background = `linear-gradient(
      0deg,
      rgba(var(--color-dark), 0.2),
      rgba(var(--color-dark), 0.1)
    ),
    rgba(var(--color-light), 1)`

    elementsChangedByTheme.description.style.color =
      "rgba(var(--color-dark), 0.8)"
    elementsChangedByTheme.title.style.color = "rgba(var(--color-dark), 0.8)"
    elementsChangedByTheme.subtitle.style.color = "rgba(var(--color-dark), 0.8)"
  }

  updateOverlayTheme()
  updateInputTheme()
  updateLabelTheme()
}

/**
 * The save button of the theme/ setting overlay
 */
const saveButton = document.querySelector(
  "[data-settings-overlay] .overlay__row button:nth-child(2)"
)

/**
 * Handles the click event on the saveButton to save changes and close the settings dialog.
 * Invokes themeToggleHandler() to manage theme changes and closeSettingsHandler() to close the dialog.
 * @param {Event} event - The click event on the saveButton.
 */
const saveButtonHandler = (event) => {
  event.preventDefault()
  themeToggleHandler()
  closeSettingsHandler()
}

/**
 * Handles the click event on the settings icon to open the theme settings dialog.
 * Displays the settings overlay/modal to allow users to modify theme settings.
 * @param {Event} event - The click event on the settings icon.
 */
const openSettingsHandler = (event) => {
  event.preventDefault()

  const settingsOverlay = html.settings.overlay
  settingsOverlay.showModal()
}

/**
 * An eventHandler that fires when the cancel/close button of the settings dialog is clicked
 * This function closes the settings dialog at the event occurance
 */
const closeSettingsHandler = () => {
  const settingsOverlay = html.settings.overlay
  settingsOverlay.close()
}

/**
 * All the Event Listeners for the functions in this script
 */
document.addEventListener("DOMContentLoaded", first36Books)
listButton.addEventListener("click", showMoreBooks)
mainElement.addEventListener("click", previewHandler)
closeButton.addEventListener("click", closePreviewHandler)
html.header.search.addEventListener("click", searchHandler)
searchButton.addEventListener("click", searchFormHandler)
themeSelect.addEventListener("change", themeToggleHandler)
saveButton.addEventListener("click", saveButtonHandler)
html.header.settings.addEventListener("click", openSettingsHandler)
html.settings.cancel.addEventListener("click", closeSettingsHandler)
