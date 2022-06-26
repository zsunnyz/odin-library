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
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const totalPagesInput = document.getElementById("total-pages");
const pagesReadInput = document.getElementById("pages-read");
const modalInputs = document.querySelectorAll(".modal-content > input");

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
    console.log(areInputsValid());
    if (areInputsValid()){
        modalSubmit.classList.remove("inactive");
    }
    else {
        modalSubmit.classList.add("inactive");
    }
}
/* input event listener events */

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

// event listener for the book finished button in the modal event
let currInputPage = 0;
const modalCompleted = document.getElementById("completed");
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