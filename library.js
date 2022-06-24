let isNumber = num => {return /^\d+$/.test(num);}

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

// input validation
allInputsValid = {} // object containing all the input id as keys and if they are valid or not

function areInputsValid() {
    Object.values(allInputsValid).forEach(value => {
        if(!value){
            return false;
        }
    })
    return true;
}

const modalInputs = document.querySelectorAll(".modal-content > input");
modalInputs.forEach(modalInput => {
    allInputsValid[modalInput.id] = false;
});

/* input event listener events */
// change the value of pages read based on total-pages if book is finished
["keyup", "keydown"].forEach(e => {
    document.getElementById("total-pages").addEventListener(e , () => {
        if (document.getElementById("pages-read").readOnly) {
            document.getElementById("pages-read").value = document.getElementById("total-pages").value;
        }

        pageTotalSmall = document.getElementById("page-total-small-e");
        pageTotalAlpha = document.getElementById("page-total-alpha-e");

        if (!isNumber(document.getElementById("total-pages").value) && document.getElementById("total-pages").value != ""){
            console.log("here");
            pageTotalSmall.classList.add("noshow");
            pageTotalAlpha.classList.remove("noshow");
        }
        else if (document.getElementById("total-pages").value <= '0') {
            pageTotalAlpha.classList.add("noshow");
            pageTotalSmall.classList.remove("noshow");
        }
        else {
            pageTotalAlpha.classList.add("noshow");
            pageTotalSmall.classList.add("noshow");
            allInputsValid["total-pages"] = true;
        }
    })
});

// event listener for the book finished button in the modal event
let currInputPage = 0;
const modalCompleted = document.getElementById("completed");
modalCompleted.addEventListener("click", () => {
    if (modalCompleted.checked) {
        pagesReadInput = document.getElementById("pages-read");

        currInputPage = pagesReadInput.value;
        pagesReadInput.value = document.getElementById("total-pages").value;
        pagesReadInput.readOnly = true;
    }
    else {
        pagesReadInput.readOnly = false;
        pagesReadInput.value = currInputPage;
    }
});

const modalSubmit = document.getElementById("modal-submit");
// Looping through all the modal inputs to make them not invalid on startup
modalInputs.forEach(modalInput => {
    modalInput.addEventListener("keyup", e => {
        if (e.target.value.length > 0) {
            e.target.classList.remove("unfilled");
        }
    })
});

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


modalSubmit.addEventListener("click", () => {

})