const myLibrary = [];
const bookshelf = document.querySelector("#books");
const infoContent = document.querySelector("#info-contents");
const infoText = document.querySelector("#info-text");

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    if (typeof title !== "string" || typeof author !== "string" || typeof pages !== "number" || typeof read !== "boolean") {
        throw Error("Wrong value type for one of the properties");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.info = function() {
        return (this.read) ? `${this.title} by ${this.author}, ${this.pages} pages, has been read` : `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
}

function addBookToLibrary (title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function changeReadStatus (Book) {
    Book.read ? Book.read = false : Book.read = true;
    updateInfoDisplay(Book);
}

function removeBook (Book) {
    myLibrary.splice(myLibrary.indexOf(Book), 1);
    infoText.textContent = "";
    infoContent.querySelectorAll('button').forEach(button => button.remove());
    updateLibraryDisplay();
}

addBookToLibrary("waldo", "some guy", 290, false);
addBookToLibrary("waldy", "some guy", 20, true);
addBookToLibrary("Of Mice and Men", "some guy", 400, false);

updateLibraryDisplay();

function updateLibraryDisplay () {
    bookshelf.replaceChildren();
    let bookWidth = 0;
    for (Book of myLibrary) {
        const book = document.createElement("div");
        const bookTitle = document.createElement("p");

        if (Book.pages / 100 < 1.5) {
            bookWidth = 1.5;
        } else if (Book.pages / 100 > 7) {
            bookWidth = 7;
        } else {
            bookWidth = Book.pages / 100;
        }
        

        book.setAttribute("class", "book");
        book.style.minWidth = `${bookWidth}%`;
        book.setAttribute("data-id", `${Book.id}`);

        bookTitle.textContent = Book.title;

        book.appendChild(bookTitle);
        bookshelf.appendChild(book);
    }
}

let currentId = 0;
let text = "";

document.querySelector('#books').addEventListener('mouseover', (event) => {
    if (event.target.matches('.book') && currentId != event.target.getAttribute('data-id')) {
        currentId = event.target.getAttribute('data-id');
        updateInfoDisplay(myLibrary.find(({id}) => id === event.target.getAttribute('data-id')));
    }
});

function updateInfoDisplay (Book) {
    infoContent.querySelectorAll('button').forEach(button => button.remove());
    text = Book.info();
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

infoContent.addEventListener('click', (event) => {
    let target = event.target;

    switch(target.id) {
        case 'change-read':
            console.log('change read item was clicked');
            changeReadStatus(myLibrary.find(({id}) => id === event.target.getAttribute('data-id')));
            break;
        case 'remove':
            console.log('remove item was clicked');
            removeBook(myLibrary.find(({id}) => id === event.target.getAttribute('data-id')));
            break;
    }
});