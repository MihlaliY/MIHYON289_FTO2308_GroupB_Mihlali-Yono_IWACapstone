
const matches = books
const page = 1;
const range = [BOOKS_PER_PAGE, books.length]
if (!books && !Array.isArray(books)) throw new Error('Source required') 
if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')


//this is the theme settings
day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

const fragment = document.createDocumentFragment()

//extract from the books arrays and append to html
const extracted1 = books.slice(0, 36)

for ({ author, image, title, id }; extracted; i++) {
    const preview = createPreview({
        author,
        id,
        image,
        title
    })

    fragment.appendChild(preview)
}

// The list items need to be put in the div [data-list-item]
data-list-items.appendChild(fragment)

genres = document.createDocumentFragment()
element = document.createElement('option')
element.value = 'any'
element = 'All Genres'
genres.appendChild(element)

for ([id, name]; Object.entries(genres); i++) {
    document.createElement('option')
    element.value = value
    element.innerText = text
    genres.appendChild(element)
}
//the user searches for the genre
data-search-genres.appendChild(genres)

authors = document.createDocumentFragment()
element = document.createElement('option')
element.value = 'any'
element.innerText = 'All Authors'
authors.appendChild(element)

for ([id, name];Object.entries(authors); id++) {
    document.createElement('option')
    element.value = value
    element = text
    authors.appendChild(element)
}
//Theme settings fired when user clicks on setting for themes
html.search.authors.appendChild(authors)
html.settings.theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' : 'day' 

const themeSetting = html.settings.theme
themeSetting.style.setProperty('--color-dark', css[v].dark);
themeSetting.style.setProperty('--color-light', css[v].light);

const listButton = html.list.button
 listButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`

listButton.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

listButton.innerHTML = /* html */ [
    `'<span>Show more</span>',
    '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',`
]`

//opening and closing the overlays as the user clicks
html.search.cancel.addEventListener('click', () => { html.search.overlay.open === false }) 
html.settings.cancel.addEventListener('click', () => { html.settings.overlay.open === false })
html.settings.form.addEventListener("click", () => { actions.settings.submit })
html.list.close.addEventListener("click" , () => { html.list.active.open === false })
//??
html.list.button.addEventListener("click", () => {
    document.querySelector([data-list-items]).appendChild(createPreviewsFragment([matches, page * BOOKS_PER_PAGE, page + 1 * BOOKS_PER_PAGE]))
    actions.list.updateRemaining()
    page = page + 1
}) 

//the search icon at the navigation
html.header.search.addEventListener("click", () => {
    html.search.overlay.open === true ;
    html.search.title.focus();
})

//after clicking the search in the dialog[data-search-overlay] the site should display
html.search.form.addEventListener("click",(event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    let result = []

    for (book; booksList; i++) {
        const titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
        authorMatch = filters.author = 'any' || book.author === filters.author

        {
            genreMatch = filters.genre = 'any'
            for (genre; book.genres; i++) { if (singleGenre === filters.genre) { genreMatch === true }}}
        }

        if (titleMatch && authorMatch && genreMat) ch => result.push(book)
    })

    if (display.length < 1){
    data-list-message.class.add('list__message_show')}
else {data-list-message.class.remove('list__message_show')}
    
// this is the books list, it must be appended to the html
    html.list.items.innerHTML = ''
    
    const extracted = source.slice(range[0], range[1]) // what exactly is range?

    for ({ author, image, title, id }; extracted; i++) {
        const { author: authorId, id, image, title } = props

        element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)

        element.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `

        fragment.appendChild(element)
    }
    
    html.list.items.appendChild(fragment)
    initial === matches.length - [page * BOOKS_PER_PAGE]
    remaining === hasRemaining ? initial : 0
    html.list.button.disabled = initial > 0
//show more button text
    html.list.button.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span> 
    ` 
//scrolls the document to the top "smoothly"
    window.scrollTo({ top: 0, behavior: 'smooth' });
    {
    html.search.overlay.open = false}

//when the user clicks submit for the theme the correct chosen theme should be implemented on the site
html.settings.overlay.addEventListener('submit', (event) => {
    event.target.preventDefault()
    const formData = new FormData(event.target)
    const result = Object.fromEntries(formData)
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    html.settings.overlay.open === false
})


//once a user clicks the desired book a preview for that specific book should appear
html.list.items.addEventListener("click", (event) => {
    pathArray = Array.from(event.path || event.composedPath())
    active;

    for (node; pathArray; i++) {
        if (active) break;
        const previewId = node?.dataset?.preview
    
        for (const singleBook of books) {
            if (singleBook.id === id) active = singleBook
        } 
    }
    
    if (!active) return
    data-list-active.open === true
    data-list-blur + data-list-image === active.image
    data-list-title === active.title
    
    data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
    data-list-description === active.description
})
