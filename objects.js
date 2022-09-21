let myLibrary = [];

function showBooks() {
    console.table(myLibrary);
}

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

function addBookToLibrary() {
    // TODO: Get information from the form, create a new book, then add to myLibrary array.
    const form = document.getElementById('addBook');
    let title = form.elements['title'].value;
    let author = form.elements['author'].value;
    let pages = parseInt(form.elements['pages'].value);
    let hasRead = form.elements['read'][0].checked;
    myLibrary.push(new Book(title, author, pages, hasRead));
    showBooks();
}

const myBookOne = new Book("Harry Potter", "J.K. Rowling", 780, true);
const myBookTwo = new Book("Slaughterhouse 5", "Kurt Vonnegut", 355, false);
myLibrary.push(myBookOne);
myLibrary.push(myBookTwo);

