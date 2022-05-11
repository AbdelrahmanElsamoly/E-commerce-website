let userInfo = document.querySelector(".userInfo");
let Nameduser = document.querySelector(".Nameduser");
let authenLinks = document.querySelector(".authenLinks");
let logOut = document.querySelector(".logOut");
let userArr = JSON.parse(localStorage.getItem("Login-user"));
let filtered = document.getElementById("filtered");
let high = document.getElementById("high");
let low = document.getElementById("low");
let heart;
let btns;
let chopingCart;
let counter = 0;
let productContainer = [];
let addBtns;
if (localStorage.getItem("Login-user") != null) {
  authenLinks.classList.replace("d-flex", "d-none");
  userInfo.classList.replace("d-none", "d-flex");
  Nameduser.innerHTML = userArr[0].name;
}

logOut.addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.removeItem("Login-user");
  window.location = "login.html";
});
var productArr = [];
async function proArr() {
  let myHttp = await fetch("https://fakestoreapi.com/products");
  response = await myHttp.json();
  productArr = response;
  productPlay();
}
document.addEventListener("readystatechange", () => {
  proArr();
});

async function proArrl() {
  let myHttp = await fetch("https://fakestoreapi.com/products");
  response = await myHttp.json();
  productArr = response;
  await bubbleLtoH();
  await productPlay();
}

// from low to high------{
async function bubbleLtoH() {
  for (let i = 0; i < productArr.length; i++) {
    for (let j = 0; j < productArr.length - i - 1; j++) {
      if (productArr[j].price > productArr[j + 1].price) {
        let temp = productArr[j];
        productArr[j] = productArr[j + 1];
        productArr[j + 1] = temp;
      }
    }
  }
  return productArr;
}
low.addEventListener("click", function () {
  proArrl();
});

async function proArrh() {
  let myHttp = await fetch("https://fakestoreapi.com/products");
  response = await myHttp.json();
  productArr = response;
  await bubbleHtoL();
  await productPlay();
}
async function bubbleHtoL() {
  for (let i = 0; i < productArr.length; i++) {
    for (let j = 0; j < productArr.length - i - 1; j++) {
      if (productArr[j + 1].price > productArr[j].price) {
        let temp = productArr[j + 1];
        productArr[j + 1] = productArr[j];
        productArr[j] = temp;
      }
    }
  }
  return productArr;
}
high.addEventListener("click", function () {
  proArrh();
});

async function productPlay() {
  let cartoona = ``;
  for (let i = 0; i < productArr.length; i++) {
    cartoona += `
    <div class="col-md-3 col-6 productCart my-5 d-flex flex-column align-items-center justify-content-center">
    <img src="${
      productArr[i].image
    }" class="m-0" style="height:40%;z-index:-1;" alt="" srcset="">
    <p>${productArr[i].price}$</p>
    <div class="w-100 text-center" >
    <p class="fw-bold">${productArr[i].title.substring(0, 15)}</p>
    <p  style="color:gray;">${productArr[i].description.substring(0, 60)}</p>
    <p class="mb-1">Rate: ${productArr[i].rating.rate}</p>
    <div class="w-100 d-flex justify-content-evenly align-items-center">
    <button id="btnn" class="btn addBtn productBtn my-2">Buy Now</i></button>
    </div>
    </div>
    </div>
    `;
  }
  document.getElementById("products").innerHTML = cartoona;
  heart = document.querySelectorAll(".heart");
  btns = document.querySelectorAll(".productBtn");
  chopingCart = document.querySelector(".chopingCart");

  for (let h = 0; h < heart.length; h++) {
    heart[h].addEventListener("click", function (e) {
      e.target.classList.replace("fa-regular", "fa-solid");
      e.target.style.color = "red";
    });
  }
  for (let b = 0; b < btns.length; b++) {
    let cartoona;
    btns[b].addEventListener("click", function (e) {
      btns[b].disabled = true;
      if (localStorage.getItem("Login-user") != null) {
        cartoona = `<li class="d-flex flex-column justify-content-between align-items-center">
        <a class="dropdown-item" href="">
        <img src="${productArr[b].image}" class="w-25" alt="" srcset="">
        ${productArr[b].title.substring(0, 12)}</a>
        <div>${productArr[b].price}$</div>
        </li>`;
        productContainer.push(productArr[b]);
        localStorage.setItem(
          "product container",
          JSON.stringify(productContainer)
        );
        counter++;
        document.getElementById("counter").innerHTML = counter;
        document.getElementById("productmenu").innerHTML += cartoona;
      } else {
        window.location = "login.html";
      }
    });
  }
}
