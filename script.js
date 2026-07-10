const myLibrary = [];
const bookshelf = document.querySelector("#books");
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
    myLibrary.push(new Book(title, author, pages, read))
}

addBookToLibrary("waldo", "some guy", 290, false);
addBookToLibrary("waldy", "some guy", 20, true);
addBookToLibrary("Of Mice and Men", "some guy", 400, false);

updateLibraryDisplay();

function updateLibraryDisplay () {
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
        book.style.height = Math.floor(Math.random() * (100 - 60) + 55) + "%";
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
    console.log('Element hovered via delegation:', event.target.getAttribute('data-id'));

    currentId = event.target.getAttribute('data-id');
    text = myLibrary.find(({id}) => id === event.target.getAttribute('data-id')).info();
    console.log(text);

    infoText.textContent = text;
  }
});