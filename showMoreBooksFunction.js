/* SHOW BOOKS AT LOAD */
export const showBooks = (startIndex, endIndex) => {
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
/* SHOW MORE BOOKS WHEN SHOWMORE BUTTON IS CLICKED */
export const showMoreBooks = () => {
  const startIndex = loadedBooks
  let endIndex = startIndex + BOOKS_PER_PAGE

  showBooks(startIndex, endIndex)
  loadedBooks = endIndex

  if (loadedBooks >= books.length) {
    listButton.style.display = "none"
  }
}
