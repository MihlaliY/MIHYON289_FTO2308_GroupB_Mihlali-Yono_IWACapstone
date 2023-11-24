import {html} from "./references.js"
import {books, BOOKS_PER_PAGE, authors, genres} from "./data.js"

const listButton = html.list.button
BOOKS_PER_PAGE
let loadedBooks = 0

listButton.textContent = listButton.innerText = `Show more (${
  books.length - BOOKS_PER_PAGE
})`
/* Show Books*/

const mainElement = document.querySelector(".list")
const showBooks = (startIndex, endIndex) => {
  const booksContainer = document.createElement("div")
  for (let i = startIndex; i < endIndex; i++) {
    if (i >= books.length) {
      break
    }
    const book = books[i]
    const bookItemDiv = document.createElement("div")
    bookItemDiv.setAttribute("data-list-items", "")
    bookItemDiv.classList.add("list__items")

    const imageElement = document.createElement("img")
    imageElement.src = book.image
    imageElement.alt = book.title
    const aboutBook = document.createElement("div")

    const titleElement = document.createElement("h2")
    titleElement.textContent = book.title

    const authorElement = document.createElement("p")
    authorElement.textContent = authors[book.author]

    bookItemDiv.appendChild(imageElement)
    aboutBook.appendChild(titleElement)
    aboutBook.appendChild(authorElement)
    bookItemDiv.appendChild(aboutBook)
    booksContainer.appendChild(bookItemDiv)
  }
  mainElement.prepend(booksContainer)
}

// to show the first 36 books when page loads
document.addEventListener("DOMContentLoaded", () => {
  showBooks(loadedBooks, loadedBooks + BOOKS_PER_PAGE)
  loadedBooks = loadedBooks + BOOKS_PER_PAGE

  if (loadedBooks >= books.length) {
    listButton.style.display = "none"
  }
})
/* Show More books */
const showMoreBooks = () => {
  const startIndex = loadedBooks
  let endIndex = startIndex + BOOKS_PER_PAGE

  showBooks(startIndex, endIndex)
  loadedBooks = endIndex

  if (loadedBooks >= books.length) {
    listButton.style.display = "none"
  }
}

listButton.addEventListener("click", showMoreBooks)

/* Preview */
const overlayDialog = html.list.active
/**
 * This function will fire when the user clicks on any of the book choices displaying to the
 * user the preview about the respective book
 */

const previewHandler = (event) => {
  const overlayBlurImage = html.list.blur
  const overlayImage = html.list.image
  const overlayTitle = html.list.title
  const overlaySubtitle = html.list.subtitle
  const overlayDescription = html.list.description
}

const bookList = document.querySelector("[data-list-items]")

bookList.addEventListener("click", previewHandler)

// const mainElement = document.querySelector("main.list")
// mainElement.addEventListener("click", previewHandler)

const closeButton = document.querySelector("[data-list-close]")
closeButton.addEventListener("click", () => {
  overlayDialog.close()
})

/* Search */

const searchHandler = (event) => {
  event.preventDefault()
  const dialog = html.search.overlay
  dialog.showModal()
  const searchGenre = html.search.genres

  searchGenre.innerHTML = " "

  for (const genreId in genres) {
    const option = document.createElement("option")
    option.value = genreId
    option.textContent = genres[genreId]
    searchGenre.appendChild(option)
  }

  const searchAuthor = html.search.authors
  searchAuthor.innerHTML = " "

  for (const authorId in authors) {
    const option = document.createElement("option")
    option.value = authorId
    option.textContent = authors[authorId]
    searchAuthor.appendChild(option)
  }
}

const cancelSearch = html.search.cancel
cancelSearch.addEventListener("click", () => {
  const dialog = html.search.overlay
  dialog.close()
})

html.header.search.addEventListener("click", searchHandler)

const dialogSearch = document.querySelector(".overlay__button_primary")

/* overlaySearch */
const overlayRow = document.querySelector(".overlay__row")
const searchButton = overlayRow.querySelector('[type="submit"][form="search"]')

// const searchButtonHandler = (event) => {}

// searchButton.addEventListener("click", searchButtonHandler)

/* Theme settings  */
const selectTheme = html.settings.theme
const root = document.documentElement
const dayColors = {
  blue: "0, 150, 255",
  forceDark: "10, 10, 20",
  forceLight: "255, 255, 255",
}

const nightColors = {
  blue: "0, 150, 255",
  forceDark: "255, 255, 255",
  forceLight: "10, 10, 20",
}

const themesToggle = (event) => {
  event.preventDefault()
  const settingsOverlay = html.settings.overlay
  settingsOverlay.showModal()
}

const settings = html.header.settings
settings.addEventListener("click", themesToggle)

const themeColor = (theme) => {
  const colors = theme === "day" ? dayColors : nightColors

  root.style.setProperty("--color-blue", colors.blue)
  root.style.setProperty("--color-force-dark", colors.forceDark)
  root.style.setProperty("--color-force-light", colors.forceLight)
}

settings.addEventListener("change", themeColor)

const closeSettings = html.settings.cancel
closeSettings.addEventListener("click", () => {
  html.settings.overlay.close()
})
