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

    this.info = function() {
        return (read) ? this.title + " by " + this.author + ", " + this.pages + " pages, " + "has been read" : this.title + " by " + this.author + ", " + this.pages + " pages, " + "not read yet";
    }
}

const coolBook = new Book("waldo", "some guy", 290, false);
const badBook = new Book("waldy", "some guy", 20, true);

console.log(coolBook.info());
console.log(badBook.info());