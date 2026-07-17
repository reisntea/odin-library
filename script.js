const myLibrary = [];
const bookshelf = document.querySelector("#books");

const infoContent = document.querySelector("#info-contents");
const infoText = document.querySelector("#info-text");

const submitButton = document.querySelector("#submit-button");
const bookDialog = document.querySelector("#book-dialog");
const bookForm = document.querySelector("#add-book");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }

    info() {
        return (this.read) ? `${this.title} by ${this.author}, ${this.pages} pages, has been read` : `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
    }

    changeReadStatus() {
        this.read ? this.read = false : this.read = true;
        updateInfoDisplay(this);
    }

    removeBook() {
        myLibrary.splice(myLibrary.indexOf(this), 1);
        infoText.textContent = "";
        infoContent.querySelectorAll('button').forEach(button => button.remove());
        updateLibraryDisplay();
    }
}

function addBookToLibrary (title, author, pages, read) {
    console.log(typeof Book);
    myLibrary.push(new Book(title, author, pages, read));
}

function updateLibraryDisplay () {
    bookshelf.replaceChildren();
    let bookWidth = 0;
    for (const book of myLibrary) {
        const bookBox = document.createElement("div");
        const bookTitle = document.createElement("p");

        if (book.pages / 100 < 1.5) {
            bookWidth = 1.5;
        } else if (book.pages / 100 > 7) {
            bookWidth = 7;
        } else {
            bookWidth = book.pages / 100;
        }
        

        bookBox.setAttribute("class", "book");
        bookBox.style.minWidth = `${bookWidth}%`;
        bookBox.setAttribute("data-id", `${book.id}`);

        bookTitle.textContent = book.title;

        bookBox.appendChild(bookTitle);
        bookshelf.appendChild(bookBox);
    }
}

function updateInfoDisplay (Book) {
    infoContent.querySelectorAll('button').forEach(button => button.remove());
    const text = Book.info();
    const readButton = document.createElement("button");
    const removeButton = document.createElement("button");

    readButton.setAttribute("id", "change-read");
    readButton.setAttribute("data-id", `${Book.id}`);
    removeButton.setAttribute("id", "remove");
    removeButton.setAttribute("data-id", `${Book.id}`);

    infoText.textContent = text;
    readButton.textContent = "Change Read Status";
    removeButton.textContent = "Remove";

    infoContent.appendChild(readButton);
    infoContent.appendChild(removeButton);
}

let currentId = 0;

document.querySelector('#books').addEventListener('mouseover', (event) => {
    if (event.target.matches('.book') && currentId != event.target.getAttribute('data-id')) {
        currentId = event.target.getAttribute('data-id');
        updateInfoDisplay(myLibrary.find(({id}) => id === event.target.getAttribute('data-id')));
    }
});

infoContent.addEventListener('click', (event) => {
    let target = event.target;

    switch(target.id) {
        case 'change-read':
            console.log('change read item was clicked');
            myLibrary.find(({id}) => id === event.target.getAttribute('data-id')).changeReadStatus();
            break;
        case 'remove':
            console.log('remove item was clicked');
            myLibrary.find(({id}) => id === event.target.getAttribute('data-id')).removeBook();
            break;
    }
});

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (bookForm.checkValidity()) {
        bookDialog.close();

        const titleValue = titleInput.value;
        const authorValue = authorInput.value;
        const pagesValue = Number(pagesInput.value);
        const readValue = readInput.checked;

        bookForm.reset();
        
        addBookToLibrary(titleValue, authorValue, pagesValue, readValue);
        updateLibraryDisplay();
    }
});

addBookToLibrary("I Spy", "Jean Marzollo", 40, true);
addBookToLibrary("The Name Of This Book Is Secret", "Pseudonymous Bosch", 400, true);
addBookToLibrary("Of Mice and Men", "John Steinbeck", 144, false);
addBookToLibrary("Brave New World", "Aldous Huxley", 326, true);
addBookToLibrary("The Crucible", "Arthur Miller", 61, true);
addBookToLibrary("Do Androids Dream Of Electric Sheep?", "Philip K. Dick", 258, false)

updateLibraryDisplay();
