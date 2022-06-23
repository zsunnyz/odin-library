/* add book button elements */
const addBtn = document.getElementById("new-book");
const plusSVG = document.getElementById("plus");

/* modal elements */
const modal = document.querySelector(".modal");
const modalEdit = document.getElementById("modal-edit");
const modalAdd = document.getElementById("modal-add");

addBtn.addEventListener("click", () => {
    plusSVG.classList.toggle("plus-close");
    modal.classList.toggle("noshow");
    modalEdit.classList.add("noshow");
    modalAdd.classList.remove("noshow");
})