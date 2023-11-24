export const searchHandler = (event) => {
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
