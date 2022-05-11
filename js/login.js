let userEmail = document.getElementById("Email1");
let userPassWord = document.getElementById("passWord1");
let alertOne = document.querySelector(".alertone");
let alertTwo = document.querySelector(".alertwo");
let btnLogIn = document.getElementById("btnLogIn");
let userArr;
let UserInfo = [];
let userObject = {};
let userName;
window.addEventListener("input", function () {
  if (userEmail.value == "" || userPassWord.value == "") {
    btnLogIn.disabled = true;
  } else if (userEmail.value !== "" && userPassWord.value !== "") {
    btnLogIn.disabled = false;
  }
});
function authen() {
  userObject = {
    email: userEmail.value,
    passWord: userPassWord.value,
  };
  UserInfo.push(userObject);
  localStorage.setItem("Login-user", JSON.stringify(UserInfo));
  console.log(localStorage.getItem("Login-user"));
}
if (localStorage.getItem("user Information") != null) {
  userArr = JSON.parse(localStorage.getItem("user Information"));
} else {
  userArr = [];
}
console.log(userArr);

btnLogIn.addEventListener("click", function (e) {
  authen();
  for (let j = 0; j < UserInfo.length; j++) {
    for (let i = 0; i < userArr.length; i++) {
      if (
        UserInfo[j].email == userArr[i].email &&
        UserInfo[j].passWord == userArr[i].passWord
      ) {
        userName = { name: userArr[i].name };
        for (let k of UserInfo) {
          Object.assign(k, userName);
        }
        localStorage.setItem("Login-user", JSON.stringify(UserInfo));
        setTimeout(() => (window.location = "index.html"), 1500);
      } else if (
        UserInfo[j].email !== userArr[i].email ||
        UserInfo[j].passWord !== userArr[i].passWord
      ) {
        alertOne.classList.add("d-none");
        alertTwo.classList.remove("d-none");
        console.log("ahmed");
      }
    }
  }
});
