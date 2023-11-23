

const urlAPI = "http://localhost:5678/api/works"

const projects = document.querySelector(".gallery")

const portfolio = document.getElementById("portfolio")

const portfolioFilters = document.querySelector(".portfolio-filters")

const btnFilterAll = document.querySelector(".btn-filter-all")
const btnFilterObjects = document.querySelector(".btn-filter-objects")
const btnFilterAppartements = document.querySelector(".btn-filter-appartements")
const btnFilterHR = document.querySelector(".btn-filter-hr")


//****** GET API FILES ******//

async function getData() {
    const response = await fetch(urlAPI)
    const data = await response.json()

    // GALLERY CREATION //

    for (let i = 0; i < data.length; i++) {

        projects.innerHTML += `
        <figure>
            <img src="${data[i].imageUrl}" alt="${data[i].title}">
            <figcaption>${data[i].title}</figcaption>
        </figure>
        `
    }

}

getData()

//****** FILTERS ******//

//** ALL **//

btnFilterAll.addEventListener("click", () => {

    // CHANGE COLOR BUTTON //

    btnFilterAll.classList.add("btn--active")
    btnFilterObjects.classList.remove("btn--active")
    btnFilterAppartements.classList.remove("btn--active")
    btnFilterHR.classList.remove("btn--active")

    // CLEAR GALLERY //

    document.querySelector(".gallery").innerHTML = ""

    // GALLERY ALL //

    getData()

})

//** OBJECTS **//

btnFilterObjects.addEventListener("click", async () => {

    const response = await fetch(urlAPI)
    const data = await response.json()

    // CHANGE COLOR BUTTON //

    btnFilterAll.classList.remove("btn--active")
    btnFilterObjects.classList.add("btn--active")
    btnFilterAppartements.classList.remove("btn--active")
    btnFilterHR.classList.remove("btn--active")


    // CLEAR GALLERY //

    document.querySelector(".gallery").innerHTML = ""

    // FILTER GALLERY OBJECTS //

    let filteredObjects = data.filter((objects) => {
        return objects.categoryId === 1
    })

    // GALLERY OBJECTS CREATION //

    for (let i = 0; i < filteredObjects.length; i++) {

        projects.innerHTML += `
        <figure>
            <img src="${filteredObjects[i].imageUrl}" alt="${filteredObjects[i].title}">
            <figcaption>${filteredObjects[i].title}</figcaption>
        </figure>
        `
    }

    console.log(filteredObjects)

})

//** APPARTEMENTS **//

btnFilterAppartements.addEventListener("click", async () => {

    const response = await fetch(urlAPI)
    const data = await response.json()

    // CHANGE COLOR BUTTON //

    btnFilterAll.classList.remove("btn--active")
    btnFilterObjects.classList.remove("btn--active")
    btnFilterAppartements.classList.add("btn--active")
    btnFilterHR.classList.remove("btn--active")

    // CLEAR GALLERY //

    document.querySelector(".gallery").innerHTML = ""

    // FILTER GALLERY APPARTEMENTS //

    let filteredAppartements = data.filter((appartements) => {
        return appartements.categoryId === 2
    })

    // GALLERY APPARTEMENTS CREATION //

    for (let i = 0; i < filteredAppartements.length; i++) {

        projects.innerHTML += `
        <figure>
            <img src="${filteredAppartements[i].imageUrl}" alt="${filteredAppartements[i].title}">
            <figcaption>${filteredAppartements[i].title}</figcaption>
        </figure>
        `
    }

    console.log(filteredAppartements)

})

//** HOTELS & RESTAURANTS **//

btnFilterHR.addEventListener("click", async () => {

    const response = await fetch(urlAPI)
    const data = await response.json()

    // CHANGE COLOR BUTTON //

    btnFilterAll.classList.remove("btn--active")
    btnFilterObjects.classList.remove("btn--active")
    btnFilterAppartements.classList.remove("btn--active")
    btnFilterHR.classList.add("btn--active")

    // CLEAR GALLERY //

    document.querySelector(".gallery").innerHTML = ""

    // FILTER GALLERY APPARTEMENTS //

    let filteredHR = data.filter((hr) => {
        return hr.categoryId === 3
    })


    // GALLERY APPARTEMENTS CREATION //

    for (let i = 0; i < filteredHR.length; i++) {

        projects.innerHTML += `
        <figure>
            <img src="${filteredHR[i].imageUrl}" alt="${filteredHR[i].title}">
            <figcaption>${filteredHR[i].title}</figcaption>
        </figure>
        `
    }

})


//****** USER CONNECTION ******//

const userToken = localStorage.getItem("token")

function userConnected() {
    const bannerEdit = document.querySelector(".edit")
    const loginLogout = document.getElementById("login-logout")
    const headerAdmin = document.querySelector(".main-header")
    const projectsEdit = document.querySelector(".portfolio-projects")

    
    if (userToken !== null) {

        
        headerAdmin.classList.add("main-header--edit")
        bannerEdit.style.display = null


        loginLogout.innerHTML = "logout"
        loginLogout.href = "index.html"
        loginLogout.addEventListener("click", userDisconnected)


        projectsEdit.classList.add("portfolio-projects-edit")
        projectsEdit.innerHTML += `
            <i class="fa-regular fa-pen-to-square portfolio-projects-edit__icon"></i>
            <a href="#modal1" class="js-modal cta cta--black">modifier</a>
            `

        portfolioFilters.style.display = "none"

    }
}

userConnected();

//****** USER DECONNECTION ******//

function userDisconnected() {

    window.localStorage.clear()

    window.location.reload()

    loginLogout.removeEventListener("click", userDisconnected)

}

const modalProjects = document.querySelector(".modal__projects")

async function getEditProjects() {
    const response = await fetch(urlAPI)
    const data = await response.json()

    // GALLERY CREATION //

    for (let i = 0; i < data.length; i++) {

        const figures = document.createElement("figure")
        const img = document.createElement("img")
        img.src = data[i].imageUrl
        img.alt = data[i].title
        const btnDeleteProjects = document.createElement("div")
        btnDeleteProjects.id = data[i].id;
        btnDeleteProjects.classList.add("trash-button")
        const icons = document.createElement("i")
        icons.classList.add("fa-solid")
        icons.classList.add("fa-trash-can")
        icons.classList.add("fa-xs")
        modalProjects.appendChild(figures)
        figures.appendChild(btnDeleteProjects)
        figures.appendChild(img)
        btnDeleteProjects.appendChild(icons)

        btnDeleteProjects.addEventListener("click", (event) => {
            event.preventDefault();
            deleteProjects(data[i].id)
        })

    }

}

getEditProjects()


async function deleteProjects(id) {

    await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${userToken}`},
    })

}

