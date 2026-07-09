const myLibrary = [];

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

console.log(myLibrary[0]);
console.log(myLibrary[0].id);
console.log(myLibrary[1]);
console.log(myLibrary[1].id);

function updateLibraryDisplay () {
    
}