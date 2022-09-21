let myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}
Book.prototype.info = function() {
    let read = this.hasRead ? " have read." : " not read yet.";
    return this.title + " by " + this.author + ", " + this.pages + " pages," + read;
}

Book.prototype.toggleRead = function() {
    this.hasRead = !this.hasRead;
}

function displayBooks() {
    // Remove Books div so things don't get displayed twice
    const booksDiv = document.querySelector('.books');
    const body = document.querySelector('body');
    const form = document.querySelector('form');
    body.removeChild(booksDiv);

    
    myLibrary.forEach(function (book, index) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        // Create the divs for each property of the Book
        const bkTitle = document.createElement('div');
        const bkAuthor = document.createElement('div');
        const bkPages = document.createElement('div');
        const bkRead = document.createElement('div');
        
        // Add classes to divs and add the appropriate content
        bkTitle.classList.add('bk-title');
        bkTitle.textContent = book.title;
        bkAuthor.classList.add('bk-author');
        bkAuthor.textContent = book.author;
        bkPages.classList.add('bk-pages');
        bkPages.textContent = book.pages;
        const readOrNot = book.hasRead ? "Read" : "Not Read";
        bkRead.classList.add('bk-read');
        bkRead.textContent = "Read status: " + readOrNot;

        cardDiv.appendChild(bkTitle);
        cardDiv.appendChild(bkAuthor);
        cardDiv.appendChild(bkPages);
        cardDiv.appendChild(bkRead);
        booksDiv.appendChild(cardDiv);
        body.insertBefore(booksDiv, form);
    });
}

function addBookToLibrary() {
    // TODO: Get information from the form, create a new book, then add to myLibrary array.
    const form = document.getElementById('addBook');
    let title = form.elements['title'].value;
    let author = form.elements['author'].value;
    let pages = parseInt(form.elements['pages'].value);
    let hasRead = form.elements['read'][0].checked;
    myLibrary.push(new Book(title, author, pages, hasRead));
    displayBooks();
}

const myBookOne = new Book("Harry Potter", "J.K. Rowling", 780, true);
const myBookTwo = new Book("Slaughterhouse 5", "Kurt Vonnegut", 355, false);
myLibrary.push(myBookOne);
myLibrary.push(myBookTwo);
displayBooks();

