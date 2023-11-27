const urlAPI = "http://localhost:5678/api/users/login"
const formLogin = document.querySelector("form")
const buttonLogin = document.querySelector(".btn")
const errorMessage = document.querySelector(".error-login")
const fieldPassword = document.getElementById("password")


function login() {

    formLogin.addEventListener("submit", async (event) => {
        event.preventDefault()

        const formData = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        }

        const usefulCharge = JSON.stringify(formData)

        const response = await fetch(urlAPI, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: usefulCharge

        })

        const data = await response.json()

        if (data.token) {
            window.localStorage.setItem("token", data.token)
            window.location.href = "index.html"
            buttonLogin.classList.add("btn--active-darken")

        } else {
            errorMessage.innerHTML = ""
            errorMessage.innerHTML+=`Email ou mot de passe incorrect,<br/>veuillez corriger les informations saisies.`;
            errorMessage.classList.add("error-login--margin")
            fieldPassword.classList.add("e-mail__input--error-login")

        }

    })

}

login()
