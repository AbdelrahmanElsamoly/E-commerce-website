// intialize variables (---------______________-----------)
let userInfo = document.querySelector(".userInfo");
let Nameduser = document.querySelector(".Nameduser");
let authenLinks = document.querySelector(".authenLinks");
let logOut = document.querySelector(".logOut");
let noProductss = document.getElementById("noProductss");
let userArr = JSON.parse(localStorage.getItem("Login-user"));
let RemoveAll = document.getElementById("RemoveAll");
let productss = document.getElementById("productss");
let productcontainer;
let newArr = new Set();
let filteredArr;
let Item;
let plusBtns;
var dollar = "$";

// check if the product container have product or not (--------_________--------)
if (localStorage.getItem("user Information") != null) {
  Nameduser.innerHTML = userArr[0].name;
}
logOut.addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.removeItem("Login-user");
  window.location = "login.html";
});

// productcontainer logic(--------_________--------)
if (localStorage.getItem("product container") != null) {
  productcontainer = JSON.parse(localStorage.getItem("product container"));
  Item = { counter: 1 };
  for (let k of productcontainer) {
    Object.assign(k, Item);
  }
  localStorage.setItem("product container", JSON.stringify(productcontainer));
  productss.classList.remove("d-none");
} else {
  productcontainer = [];
  noProductss.classList.remove("d-none");
}
// to show the product which choose to us(--------_________--------)
function displayProduct() {
  let cartoona = ``;
  for (let i = 0; i < productcontainer.length; i++) {
    if (productcontainer.indexOf(i) == true) {
    }
    cartoona += `
    <div
    class="d-flex justify-content-center align-items-center w-100"
    id="shopCartItem"
  >
    <div
      class="d-flex flex-row justify-content-start align-items-center w-50 fw-bolder"
    >
      <img
        src="${productcontainer[i].image}"
        class="w-25 mx-md-4 my-2"
        alt=""
        srcset=""
      />
      <div class="d-flex flex-column align-items-center justify-content-center w-75 fw-bold">
      <p class="product-title" style="font-weight:bold">${productcontainer[
        i
      ].title.substr(0, 20)}</p>
        <button class="btn my-2 deletebtn" id="deleted" onclick="removeItem(${i})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
   <div class="w-25 h-100 my-auto">
   <div
   class="d-flex flex-row fw-bold justify-content-around w-50 align-items-center align-baseline"
 >
 
 <button class="btn plus deletebtn">
 <i class="fa-solid fa-plus"></i>
 </button> 
 <p class="counter mx-2 my-0 fa-1x fw-bolder">${productcontainer[i].counter}</p>
 <button class="btn minus deletebtn">
 <i class="fa-solid fa-minus"></i>
 </button>  
 </div>
 </div>
   <div class="w-25 d-flex justify-content-center align-items-center fw-bold"> <p class='fw-bold'>${
     productcontainer[i].price
   }$</p></div>
  </div>
      `;
  }

  document.getElementById("products").innerHTML = cartoona;
}
displayProduct();

// remove items(--------_________--------)
function removeItem(index) {
  // splice item
  productcontainer.splice(index, 1);
  localStorage.setItem("product container", JSON.stringify(productcontainer));
  displayProduct();

  // intialis the counters which memorise the counters on it
  let counters = productcontainer.map((ele) => {
    return ele.counter;
  });

  // display the whole product price after remove one item
  document.getElementById("productPrice").innerHTML = Math.round(
    productcontainer
      .map((ele, index) => {
        return ele.price * counters[index];
      })
      .reduce(function (acc, current) {
        return acc + current;
      }, 0)
  );
  document.getElementById("productTotal").innerHTML = productcontainer
    .map((ele) => {
      return ele.counter;
    })
    .reduce((acc, current) => {
      return acc + current;
    }, 0);
  AddItem();

  minusItem();
  // console.log(JSON.parse(localStorage.getItem("filtered Arr")));
}

// Remove all Items
RemoveAll.addEventListener("click", (e) => {
  e.preventDefault();
  window.localStorage.removeItem("product container");
  window.location.reload(true);
  displayProduct();
});

// AddItem(---------______________-----------)

window.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".plus").forEach((el, i) => {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      productcontainer[i].counter++;
      let counters = productcontainer.map((ele) => {
        return ele.counter;
      });
      document.querySelectorAll(".counter")[i].innerHTML =
        productcontainer[i].counter;
      if (productcontainer[i].counter === 1) {
        document.querySelectorAll(".minus").disabled = true;
        document.getElementById("productTotal").innerHTML = productcontainer
          .map((ele) => {
            return ele.counter;
          })
          .reduce((acc, current) => {
            return acc + current;
          }, 0);
      } else if (productcontainer[i].counter > 1) {
        document.querySelectorAll(".minus")[i].disabled = false;
        document.getElementById("productTotal").innerHTML = productcontainer
          .map((ele) => {
            return ele.counter;
          })
          .reduce((acc, current) => {
            return acc + current;
          }, 0);
        document.getElementById("productPrice").innerHTML = Math.round(
          productcontainer
            .map((ele, index) => {
              return ele.price * counters[index];
            })
            .reduce((acc, current) => {
              return acc + current;
            }, 0)
        );
      }
    });
  });
});

// minus Item(---------______________-----------)

window.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".minus").forEach((el, i) => {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      productcontainer[i].counter--;
      let counters = productcontainer.map((ele) => {
        return ele.counter;
      });
      document.querySelectorAll(".counter")[i].innerHTML =
        productcontainer[i].counter;
      if (productcontainer[i].counter === 1) {
        document.querySelectorAll(".minus")[i].disabled = true;
        document.getElementById("productTotal").innerHTML = productcontainer
          .map((ele) => {
            return ele.counter;
          })
          .reduce((acc, current) => {
            return Math.round(acc + current);
          }, 0);

        document.getElementById("productPrice").innerHTML = Math.round(
          productcontainer
            .map((ele) => {
              return ele.price;
            })
            .reduce((acc, current) => {
              return acc + current;
            }, 0)
        );
      } else if (productcontainer[i].counter > 1) {
        document.querySelectorAll(".minus")[i].disabled = false;
        document.getElementById("productTotal").innerHTML = productcontainer
          .map((ele) => {
            return ele.counter;
          })
          .reduce((acc, current) => {
            return acc + current;
          }, 0);
        document.getElementById("productPrice").innerHTML = Math.round(
          productcontainer
            .map((ele, index) => {
              return ele.price * counters[index];
            })
            .reduce((acc, current) => {
              return acc + current;
            }, 0)
        );
      }
    });
  });
});

// windows loads(---------______________-----------)
document.getElementById("productPrice").innerHTML = Math.round(
  productcontainer
    .map((ele) => {
      return ele.price * ele.counter;
    })
    .reduce(function (acc, current) {
      return acc + current;
    }, 0)
);

document.getElementById("productTotal").innerHTML = productcontainer
  .map((ele) => {
    return ele.counter;
  })
  .reduce((acc, current) => {
    return acc + current;
  }, 0);

// to display the minus button
window.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".minus").forEach((el, i) => {
    if (productcontainer[i].counter === 1) {
      el.disabled = true;
    }
  });
});
