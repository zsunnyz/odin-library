/* Library Objects */
let currLibrary = [];

function Book() {
    this.title = document.getElementById("title").value;
    this.author = document.getElementById("author").value;
    this.pages = document.getElementById("total-pages").value;
    this.pagesRead = document.getElementById("pages-read").value;
    
    this.isRead = () => (this.pages == this.pagesRead);
}

function addBookToLibrary() {
    
}

/* add book button elements */
const addBtn = document.getElementById("new-book");
const plusSVG = document.getElementById("plus");

/* modal elements */
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");

const modalSubmit = document.getElementById("modal-submit");

function toggleBookAdd() {
    document.querySelector(".modal-content > h2").value = "Add New Book";
    modal.classList.toggle("noshow");
}

function toggleBookEdit() {
    document.querySelector(".modal-content > h2").value = "Edit Book";
    modal.classList.toggle("noshow");
}

addBtn.addEventListener("click", () => {
    plusSVG.classList.toggle("plus-close");
    toggleBookAdd();
})

modalSubmit.addEventListener("click", () => {

})