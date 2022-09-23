let myLibrary = [];
let currentID = 2 // Already have two hardcoded books

function Book(title, author, pages, hasRead, id=null) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.id = id;
}
Book.prototype.info = function() {
    let read = this.hasRead ? " have read." : " not read yet.";
    return this.title + " by " + this.author + ", " + this.pages + " pages," + read;
}

Book.prototype.toggleRead = function() {
    this.hasRead = !this.hasRead;
}

function getIndex(idValue) {
    const idSplit = idValue.split('-');
    const bookID = parseInt(idSplit[1]);
    return bookID;
}

function clickToggleButton() {
    const idValue = this.parentNode.parentNode.id;
    const bookID = getIndex(idValue);
    myLibrary[bookID].toggleRead();
    displayBooks();
}

function removeBookCards() {
    let element = document.querySelector(".books");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function removeBook() {
    const idValue = this.parentNode.parentNode.id;
    const bookID = getIndex(idValue);
    myLibrary.splice(bookID, 1);
    displayBooks();
}

function showForm() {
    const bookForm = document.getElementById('addBook');
    bookForm.classList.remove("hidden");
}

function hideForm() {
    const bookForm = document.getElementById('addBook');
    bookForm.classList.add("hidden");
}

function displayBooks() {
    removeBookCards(); // Clear all the cards so that the data can be refreshed
    const booksDiv = document.querySelector('.books');
    const body = document.querySelector('body');
    const form = document.querySelector('form');

    myLibrary.forEach(function (book, index) {
        const word = "id-" + index; // Needed to associate a selector with the index of a book (can't start with a number)
        const newCard = document.querySelector("#" + word);
        if (newCard === null) {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.setAttribute('id', word);

        // Create the divs for each property of the Book
            const bkTitle = document.createElement('div');
            const bkAuthor = document.createElement('div');
            const bkPages = document.createElement('div');
            const bkRead = document.createElement('div');
            const bkButtons = document.createElement('div');

            const bkTitleInfo = document.createElement('div');
            const bkAuthorInfo = document.createElement('div');
            const bkPagesInfo = document.createElement('div');
            const bkReadInfo = document.createElement('div');
            const readButton = document.createElement('button');
            readButton.addEventListener('click', clickToggleButton);

            const bkTitleLbl = document.createElement('div');
            const bkAuthorLbl = document.createElement('div');
            const bkPagesLbl = document.createElement('div');
            const bkReadLbl = document.createElement('div');
            const removeButton = document.createElement('button');
            removeButton.addEventListener('click', removeBook);

            bkTitleLbl.classList.add('bk-label');
            bkAuthorLbl.classList.add('bk-label');
            bkPagesLbl.classList.add('bk-label');
            bkReadLbl.classList.add('bk-label');

            bkTitle.classList.add('bk-card');
            bkAuthor.classList.add('bk-card');
            bkPages.classList.add('bk-card');
            bkRead.classList.add('bk-card');
            bkButtons.classList.add('bk-card');

            bkAuthorLbl.textContent = "Author: ";
            bkPagesLbl.textContent = "Total Pages: ";
            bkTitleLbl.textContent = "Title: ";
            bkReadLbl.textContent = "Read status: ";
            readButton.textContent = "Toggle Read";
            removeButton.textContent = "Remove Book";
            
            // Add classes to divs and add the appropriate content
            bkTitleInfo.classList.add('bk-title-info');
            bkTitleInfo.textContent = book.title;
            bkAuthorInfo.classList.add('bk-author-info');
            bkAuthorInfo.textContent = book.author;
            bkPagesInfo.classList.add('bk-pages-info');
            bkPagesInfo.textContent = book.pages;
            const readOrNot = book.hasRead ? "Read" : "Not Read";
            bkReadInfo.classList.add('bk-read-info');
            bkReadInfo.textContent = readOrNot;

            bkTitle.appendChild(bkTitleLbl);
            bkTitle.appendChild(bkTitleInfo);
            bkAuthor.appendChild(bkAuthorLbl);
            bkAuthor.appendChild(bkAuthorInfo);
            bkPages.appendChild(bkPagesLbl);
            bkPages.appendChild(bkPagesInfo);
            bkRead.appendChild(bkReadLbl);
            bkRead.appendChild(bkReadInfo);
            bkButtons.appendChild(readButton);
            bkButtons.appendChild(removeButton);

            cardDiv.appendChild(bkTitle)
            cardDiv.appendChild(bkAuthor)
            cardDiv.appendChild(bkPages)
            cardDiv.appendChild(bkRead)
            cardDiv.appendChild(bkButtons);

            booksDiv.appendChild(cardDiv);
            //body.insertBefore(booksDiv, form);
        }
    });
}

function addBookToLibrary() {
    hideForm();
    const form = document.getElementById('addBook');
    let title = form.elements['title'].value;
    let author = form.elements['author'].value;
    let pages = parseInt(form.elements['pages'].value);
    let hasRead = form.elements['read'][0].checked;
    myLibrary.push(new Book(title, author, pages, hasRead, currentID));
    displayBooks();
    currentID++;
}

const newBookBtn = document.querySelector('.new-book');
newBookBtn.addEventListener('click', showForm);
const myBookOne = new Book("Harry Potter", "J.K. Rowling", 780, true, 0);
const myBookTwo = new Book("Slaughterhouse 5", "Kurt Vonnegut", 355, false, 1);
myLibrary.push(myBookOne);
myLibrary.push(myBookTwo);
displayBooks();

