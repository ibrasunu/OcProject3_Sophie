

const loginForm = document.querySelector("form");
const email = document.getElementById("email");
const userPassword = document.getElementById("userPassword");


loginForm.addEventListener("submit", (event) => {
event.preventDefault();


const user = {
    email: email.value,
    password : userPassword.value,
};

try{
fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      // envoi user en JSON
      body: JSON.stringify(user)
    })
        .then((response) => response.json())
        .then((user) => {
            
            localStorage.setItem("token", user.token);
            window.location.href = "index.html";
        })
    }catch(error){
        console.log(error);
    }
});
























                  