import {BOOKS_PER_PAGE, authors, genres, books} from "./data.js"
import {html} from "./references.js"

const listButton = html.list.button

let loadedBooks = 0

listButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
const mainElement = document.querySelector(".list")

/*show book*/
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
    bookItemDiv.style.padding = "35px"
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
    mainElement.insertBefore(bookItemDiv, listButton)
  }
}

/* Show the first 36 books when the page loads */
document.addEventListener("DOMContentLoaded", () => {
  showBooks(0, BOOKS_PER_PAGE)
  loadedBooks = BOOKS_PER_PAGE

  if (loadedBooks >= books.length) {
    listButton.style.display = "none"
  }
})

/**
 * Function to show more books when "Show more" button is clicked */
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
const previewHandler = (event) => {
  const clickedListItem = event.target.closest("[data-list-items]")

  if (!clickedListItem) {
    return
  }

  const index = Array.from(mainElement.children).indexOf(clickedListItem)
  const book = books[index]

  const blurImage = html.preview.listBlur
  const previewImage = html.preview.listImage
  const previewTitle = html.preview.listTitle
  const previewSubtitle = html.preview.listSubtitle
  const previewDescription = html.preview.listDescription

  blurImage.src = book.image
  previewImage.src = book.image
  previewTitle.textContent = book.title
  previewSubtitle.textContent = `By ${authors[book.author]}`
  previewDescription.textContent = book.description

  const preview = html.preview.listActive
  preview.showModal()
}

mainElement.addEventListener("click", previewHandler)

/* Close preview */
const closePreview = () => {
  const dialog = document.querySelector("[data-list-active]")
  dialog.close()
}

const closeButton = document.querySelector("[data-list-close]")
closeButton.addEventListener("click", closePreview)

/* Header Search */
const searchHandler = (event) => {
  event.preventDefault()
  const dialog = html.search.overlay
  dialog.showModal()

  const searchGenre = html.search.genre
  searchGenre.innerHTML = ""

  for (const genreId in genres) {
    const option = document.createElement("option")
    option.value = genreId
    option.textContent = genres[genreId]
    searchGenre.appendChild(option)
  }

  const searchAuthor = html.search.author
  searchAuthor.innerHTML = ""

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

/* search for matches */

const searchButton = document.querySelector(
  '[data-search-overlay] .overlay__row [form="search"]'
)

const searchForm = html.header.search

const searchFormHandler = () => {
  const searchTitle = html.search.title
  const searchGenre = html.search.genre
  const searchAuthor = html.search.author

  const titleQuery = searchTitle.value.trim().toLowerCase()
  const genreQuery = searchGenre.value
  const authorQuery = searchAuthor.value

  const filteredBooks = booksList.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(titleQuery)
    const genreMatch = genreQuery === "" || book.genre === genreQuery
    const authorMatch = authorQuery === "" || book.author === authorQuery

    return titleMatch, genreMatch, authorMatch
  })
}

searchButton.addEventListener("click", searchFormHandler)

/* theme */
const themesToggle = (event) => {
  event.preventDefault()
  const settingsOverlay = html.settings.overlay
  settingsOverlay.showModal()
}

const settings = html.header.settings
settings.addEventListener("click", themesToggle)

const themeCancel = html.settings.cancel
themeCancel.addEventListener("click", () => {
  const settingsOverlay = html.settings.overlay
  settingsOverlay.close()
})
