if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    var removeItems = Array.from(document.getElementsByClassName("remove"));
    removeItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        var buttonClicked = event.target;
        console.log(buttonClicked);
        buttonClicked.parentElement.parentElement.parentElement.remove();
        updateCartTotal();
      });
    });
  }


let addToCartButton = Array.from(document.getElementsByClassName("cart"));
let contentItems = Array.from(document.getElementsByClassName("container"));
let navBtns = Array.from(document.getElementsByClassName("nav-links"));

addToCartButton.forEach(
  (click) => click.addEventListener("click", addToCartClicked),
  (reClick) => reClick.addEventListener("click", useVariable)
);

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("product-name")[0].innerText;
  var picture = shopItem.getElementsByClassName("equipments")[0].src;
  var price = shopItem.getElementsByClassName("product-price")[0].innerText;
  console.log(price, picture, title);
  updateCartTotal();
  useVariable(price, picture, title);
}

function useVariable(price, picture, title) {
  var cartRows = document.createElement("div");
  cartRows.setAttribute("class","cart-rows");
  var cartItem = document.getElementById("cart-container");
  cartRows.innerHTML = `    <div style="width: 100%;">
                                <img src=${picture}>
                            </div>
                            <div style="diplay:flex; flex-direction: column; height: 20%;">
                                <div class="class-item cart-column" style="width: 100%;">
                                    <p class="cart-item-title">
                                        ${title}
                                    </p>
                                    <p class="cart-item-price">
                                        ${price}
                                    </p>
                                </div>
                                <div class="cart-quantity cart-column">
                                    <div style="display:flex; justify-content:space-around;">
                                        <input type="number" class="quantity-counter" value="1">
                                    </div>
                                    <button class= "remove" style="display:block;">
                                        X
                                    </button>
                                </div>
                            </div>
                        `;
  cartItem.append(cartRows);
  cartRows.getElementsByClassName('remove')[0].addEventListener('click', removeElement
  )
  cartRows.getElementsByClassName('quantity-counter')[0].addEventListener('change',
 quantityChanged)
}

function removeElement(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
}


function quantityChanged(event) {
    var input= event.target
    if (isNaN(input.value) || input.value<= 0) {
        input.value = 1
        alert('Cannot Purchase less than an item')
    }
    updateCartTotal()
}

var counter = 0;

function subtract(){
  counter = counter-1;
  document.getElementById("quantity-counter").innerHTML = counter;
}
function add(){
  counter = counter + 1;
  document.getElementById("quantity-counter").innerHTML = counter;
}


function updateCartTotal() {
  var cartItems = document.getElementsByClassName("cart-container")[0];
  console.log(cartItems);
  var cartRows = cartItems.getElementsByClassName("cart-rows");
  console.log(cartRows);
  var total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    var cartItem = cartRows[i];
    var priceElement = cartItem.getElementsByClassName("cart-item-price")[0];
    var quantityElement = document.getElementsByClassName("quantity-counter")[0];
    var price = parseFloat(priceElement.innerText.replace('N', ''))
    var delivery ="N2,000"
    var deliveryPrice = parseFloat(delivery.replace('N',''))
    var quantity = parseFloat(quantityElement.value);
    total = total + quantity * price + deliveryPrice;
  }
  document.getElementById("total").innerText = ` N${total},000`;
  console.log(price,quantity);
}

function checkout() {
    var checkout = document.getElementById('checkout-banner');
    var rent = document.getElementById('cart-container');
    var rental = document.getElementById('cart-anotherdiv');
    checkout.style.display = "flex";
    rent.style.opacity = 0.2;
    rental.style.opacity = 0.2;
}

const rentSearch = async () =>{
    const findData = await fetch("https://ayalo-auth-api.herokuapp.com/product/search")
    const useData = await findData.json();
    var Explore = document.getElementById('explore');
    useData.forEach(search =>{
        Explore.innerHTML +=
        ` <div class="carousel-cell" id='card'>
        <img src="${search.picture}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${search.name}</h5>
          <p class="card-text">${search.description}</p>
          <p class="card-text">Price:${search.price}</p>
        </div>
    </div>`  
}
    ) 
}

function profile() {
    window.location.href = "./profile-details.html" 
}



// Set button active and content active
const setActive = (btn, content) => {
  //   // add active class to button
  btn.classList.add("active");
  //   // remove active class from content if any
  content.classList.remove("blank");
  // console.log(btn,content);
};

// Set buttons and content inactive
const setInactive = (btn, content) => {
  //   remove active class from btn
  btn.classList.remove("active");
  // add inactive class to content
  content.classList.add("blank");
  // console.log(btn,content);
};

// handle dashboard routing
const handleDashboardRouting = (
  // set default arguments to the first items in the array
  activeBtn = navBtns[0],
  activeContent = contentItems[0]
) => {
  let inactiveBtnArr = navBtns.filter((btn) => btn !== activeBtn);

  let inactiveContentItemsArr = contentItems.filter(
    (item) => item !== activeContent
  );

  inactiveBtnArr.map((btn, index) => {
    return setInactive(btn, inactiveContentItemsArr[index]);
  });

  setActive(activeBtn, activeContent);
};

// on load show dashboard by default
const dashboardByDefault = document.addEventListener("DOMContentLoaded", () => {
  handleDashboardRouting();
});


// Add event listener to the buttons

const buttonClick = navBtns.map((btn, index) => {
  btn.addEventListener("click", () => {
    handleDashboardRouting(btn, contentItems[index]);
  });
  return;
});
