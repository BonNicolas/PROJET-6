

let modal = null

//****** MODALS ******//

//*** Open ***//

const openModal = function(e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    target.style.display = null
    target.removeAttribute("aria-hidden")
    target.setAttribute("aria-modal", "true")
    modal = target 
    modal.addEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
    modal.querySelector(".js-btn-modal-add").addEventListener("click", modalAddPhotos)
    modal.querySelector(".js-modal-return").addEventListener("click", modalReturn)
    

}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)
})


//*** Close ***//

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
    modal.querySelector(".js-btn-modal-add").removeEventListener("click", modalAddPhotos)
    modal.querySelector(".js-modal-return").addEventListener("click", modalReturn)
    
    

    const hideModal = function () {
        modal.style.display = "none"
        modal.removeEventListener("animationend", hideModal )
        modal = null
    }

    modal.addEventListener("animationend", hideModal)
       
}

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc")
    closeModal(e)
    
})

//*** Zone propagation ***//

const stopPropagation = function (e) {
    e.stopPropagation()
}

//*** Modal 2 ***//

const sectionAddPhoto = document.querySelector(".section-add-photo")

const modal2Email = document.querySelector(".e-mail-modal2")

const modalLine = document.querySelector(".modal__line")

const modalArrowReturn = document.querySelector(".js-modal-return")

const modalTitle = document.querySelector(".modal__title")

const btnModalAddPhoto = document.querySelector(".js-btn-modal-add")
const btnModalValidation = document.querySelector(".js-btn-modal-validation")

const btnAddPhoto = document.querySelector(".btn--add-photo")



function modalAddPhotos () {

    modalProjects.style.display = "none"

    sectionAddPhoto.style.display = null

    modal2Email.style.display = null

    modalArrowReturn.style.display = null

    modalTitle.innerHTML="Ajout photo"

    modalLine.classList.add("modal__line--edit")

    btnModalAddPhoto.style.display = "none"
    btnModalValidation.style.display = null

}

function modalReturn () {

    modalProjects.style.display = null

    sectionAddPhoto.style.display = "none"

    modal2Email.style.display = "none"

    modalArrowReturn.style.display = "none"

    modalTitle.innerHTML="Galerie photo"

    modalLine.classList.remove("modal__line--edit")

    btnModalAddPhoto.style.display = null
    btnModalValidation.style.display = "none"

}

