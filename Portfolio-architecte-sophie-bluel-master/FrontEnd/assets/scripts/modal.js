const modalProjects = document.querySelector(".modal__projects")

let modal = null

//****** MODAL ******//

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


async function getModalProjects() {
    const response = await fetch(urlAPI)
    const data = await response.json()

    // GALLERY CREATION //

    for (let i = 0; i < data.length; i++) {

        modalProjects.innerHTML += `
        <figure>
            <div>
            <i class="fa-solid fa-trash-can fa-xs"></i>
            </div>
            <img src="${data[i].imageUrl}" alt="${data[i].title}">
        </figure>
        `
    }
    
}

getModalProjects()

