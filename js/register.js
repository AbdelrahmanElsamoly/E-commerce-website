let userName = document.getElementById("userName");
let userrEmail = document.getElementById("Email");
let userrPassWord = document.getElementById("passWord");
let registerBtn = document.getElementById("registerBtn");
let alertDanger = document.querySelector(".alert-danger");
let userInformation;
let userArr = [];
if (localStorage.getItem("user Information") != null) {
  userInformation = JSON.parse(localStorage.getItem("user Information"));
} else {
  userInformation = [];
}
console.log(userInformation);
registerBtn.addEventListener("click", function () {
  if (
    userrEmail.value == "" ||
    userName.value == "" ||
    userrPassWord.value == ""
  ) {
    alertDanger.classList.remove("d-none");
    return false;
  } else {
    addUser();
  }
});
function addUser() {
  let user = {
    name: userName.value.trim(),
    email: userrEmail.value,
    passWord: userrPassWord.value,
  };
  userInformation.push(user);
  localStorage.setItem("user Information", JSON.stringify(userInformation));
  setTimeout(() => {
    window.location = "login.html";
  }, 1500);
}
