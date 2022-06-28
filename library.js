/* add book button elements */
const addBtn = document.getElementById("new-book");
const plusSVG = document.getElementById("plus");

const contentContainer = document.getElementById("content-container");
const contentTemplate = document.getElementById("card-template");
/* modal elements */
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");

// input validation
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const totalPagesInput = document.getElementById("total-pages");
const pagesReadInput = document.getElementById("pages-read");
const modalInputs = document.querySelectorAll(".modal-content > input");

const modalCompleted = document.getElementById("completed");
const modalSubmit = document.getElementById("modal-submit");

let isNumber = num => {return /^\d+$/.test(num);}

/* Library Objects */
let currLibrary = [];

function Book(id, title, author, pages, pagesRead, read) {
    this._id = id;
    this._title = title;
    this._author = author;
    this._pages = pages;
    this._pagesRead = pagesRead;
    this._read = read;
}

Object.defineProperty(Book.prototype, 'id', {
    get: function() {
        return this._id;
    },
    set: function(value) {
        this._id = value;
    }
});
Object.defineProperty(Book.prototype, 'title', {
    get: function() {
        return this._title;
    },
    set: function(title) {
        this.title = title;
        document.querySelector(`#card-${this.id} .title`).textContent = title;
    }
})
Object.defineProperty(Book.prototype, 'author', {
    get: function() {
        return this._author;
    },
    set: function(author) {
        this.author = author;
        document.querySelector(`#card-${this.id} .author`).textContent = author;
    }
})
Object.defineProperty(Book.prototype, 'pages', {
    get: function(){
        return this._pages;
    },
    set: function(pages){
        this.pages = pages;
        document.querySelector(`#card-${this.id} .total-pages`).textContent = pages;
        document.querySelector(`#card-${this.id} input`).max = pages;

        if (this.read){
            this.setPagesRead(pages);
        }
    }
})
Object.defineProperty(Book.prototype, 'pagesRead', {
    get: function(){
        return this._pages;
    },
    set: function(pagesRead){
        this._pagesRead = pagesRead;
        document.querySelector(`#card-${this.id} .pages-read`).textContent = pagesRead;
        document.querySelector(`#card-${this.id} input`).value = pagesRead;
    }
})
Object.defineProperty(Book.prototype, 'read', {
    get: function() {
        return this._read;
    },
    set: function(isRead) {
        if (isRead) {
            document.querySelector(`#card-${this.id} .card-buttons`).firstElementChild.classList.remove("button-incomplete");
            document.querySelector(`#card-${this.id} .card-buttons`).firstElementChild.textContent = "read";
            document.querySelector(`#card-${this.id} input`).disabled = true;
        }
        else {
            console.log(this.id);
            console.log(document.querySelector(`#card-${this.id} .card-buttons`).firstElementChild);
            document.querySelector(`#card-${this.id} .card-buttons`).firstElementChild.classList.add("button-incomplete");
            document.querySelector(`#card-${this.id} .card-buttons`).firstElementChild.textContent = "incomplete";
            document.querySelector(`#card-${this.id} input`).disabled = false;
        }
        this._read = isRead;
    }
});

function addBookToLibrary() {
    let newId = 0;
    if (currLibrary.length > 0) {
        newId = currLibrary[currLibrary.length - 1].id + 1;
    }
    currLibrary.push(new Book(newId, titleInput.value, authorInput.value, totalPagesInput.value, pagesReadInput.value, (totalPagesInput.value == pagesReadInput.value)));
    addCardToPage(newId);
}

function getBookById(bookId) {
    for (let book of currLibrary){
        if (book.id == bookId) {
            return book;
        }
    }

    console.log(`No book with ID ${bookId} found!`);
    return NaN;
}

function addCardToPage(bookId){

    let newBook = getBookById(bookId);
    let newCard = contentTemplate.content.cloneNode(true);

    newCard.querySelector(".card").id = `card-${newBook.id}`;
    newCard.querySelector("input").id = `input-${newBook.id}`;
    newCard.querySelectorAll("button").forEach(button => {
        button.setAttribute("data-id", newBook.id);
    })

    newCard.querySelector(".title").textContent = newBook.title;
    newCard.querySelector(".author").textContent = newBook.author;
    newCard.querySelector(".total-pages").textContent = newBook.pages;
    newCard.querySelector(".pages-read").textContent = newBook.pagesRead;
    
    newCard.querySelector("input").value = newBook.pagesRead;
    newCard.querySelector("input").max = newBook.pages;

    if (newBook.read) {
        newCard.querySelector(".card").classList.add("read");
    }
    else {
        newCard.querySelector(".card").classList.add("unfinished");
    }
        
    contentContainer.appendChild(newCard);
}

function resetModal() {
    modalInputs.forEach(modalInput => {
        modalInput.value = "";
        modalInput.classList.add("unfilled");
    })
    modalSubmit.classList.add("inactive");
}

let allInputsValid = {} // object containing all the input id as keys and if they are valid or not

modalInputs.forEach(modalInput => {
    allInputsValid[modalInput.id] = false;
});

function areInputsValid() {
    isValid = true;
    Object.values(allInputsValid).forEach(value => {
        if(!value){
            isValid = false;
        }
    })
    return isValid;
};

function changeOnInputsValid() {
    if (areInputsValid()){
        modalSubmit.classList.remove("inactive");
    }
    else {
        modalSubmit.classList.add("inactive");
    }
}

// Looping through all the modal inputs to make them not invalid on startup
modalInputs.forEach(modalInput => {
    modalInput.addEventListener("keyup", e => {
        if (e.target.value.length > 0) {
            e.target.classList.remove("unfilled");
        }
    })
});

/* input event listeners*/
titleInput.addEventListener("keydown", () => {
    if (titleInput.value.length >= 1){
        allInputsValid["title"] = true;
    }
    else {
        allInputsValid["title"] = false;
    }
    changeOnInputsValid();
});
authorInput.addEventListener("keydown", () => {
    if (authorInput.value.length >= 1){
        allInputsValid["author"] = true;
    }
    else {
        allInputsValid["author"] = false;
    }
    changeOnInputsValid();
});

// change the value of pages read based on total-pages if book is finished
["keyup", "keydown"].forEach(e => {
    totalPagesInput.addEventListener(e , () => {
        if (pagesReadInput.readOnly) {
            pagesReadInput.value = totalPagesInput.value;
        }
        
        pageTotalSmall = document.getElementById("page-total-small-e");
        pageTotalAlpha = document.getElementById("page-total-alpha-e");
        
        if (!isNumber(totalPagesInput.value) && totalPagesInput.value != ""){
            console.log("here");
            pageTotalSmall.classList.add("noshow");
            pageTotalAlpha.classList.remove("noshow");
            allInputsValid["total-pages"] = false;
        }
        else if (totalPagesInput.value <= '0') {
            pageTotalAlpha.classList.add("noshow");
            pageTotalSmall.classList.remove("noshow");
            allInputsValid["total-pages"] = false;
        }
        else {
            pageTotalAlpha.classList.add("noshow");
            pageTotalSmall.classList.add("noshow");
            allInputsValid["total-pages"] = true;
        }
        checkPagesReadValid()
    })
});

// check pages-read validity
["keyup", "keydown"].forEach (e => {
    pagesReadInput.addEventListener(e, () => {
        checkPagesReadValid()
    })
})

function checkPagesReadValid(){
    if (parseInt(pagesReadInput.value) > parseInt(totalPagesInput.value)) {
        pagesReadInput.setCustomValidity("Pages read must be smaller or equal to total number of pages");
        document.getElementById("pages-read-e").classList.remove("noshow");
        allInputsValid["pages-read"] = false;
    }
    else {
        pagesReadInput.setCustomValidity("");
        document.getElementById("pages-read-e").classList.add("noshow");
        allInputsValid["pages-read"] = true;
    }
    changeOnInputsValid();
}

// event listener for the book finished checkbox in the modal event
let currInputPage = 0;
modalCompleted.addEventListener("click", () => {
    if (modalCompleted.checked) {

        currInputPage = pagesReadInput.value;
        pagesReadInput.value = totalPagesInput.value;
        pagesReadInput.readOnly = true;
        allInputsValid["pages-read"] = true;
    }
    else {
        pagesReadInput.readOnly = false;
        pagesReadInput.value = currInputPage;
    }
});

modalSubmit.addEventListener("click", () => {
    if (document.querySelector(".modal-content > h2").value == "Add New Book" && areInputsValid()) {
        addBookToLibrary();
        resetModal();
    }
})

function isModalOpen(){
    return modal.classList("noshow");
}

// Open modal button functions 
addBtn.addEventListener("click", () => {
    currInputPage = 0;
    plusSVG.classList.toggle("plus-close");
    toggleBookAdd();
})

function toggleBookAdd() {
    document.querySelector(".modal-content > h2").value = "Add New Book";
    modal.classList.toggle("noshow");
}

function toggleBookEdit() {
    document.querySelector(".modal-content > h2").value = "Edit Book";
    modal.classList.toggle("noshow");
}

