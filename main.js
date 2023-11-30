// Cart Open Close
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// Open Cart
cartIcon.onclick = () => {
    cart.classList.add("active");
}
// Close Cart 
closeCart.onclick = () => {
    cart.classList.remove("active");
}

// Making Add to Cart
// Cart Working JS
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

// Making Function
function ready(){
    // Remove Item From Cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i< removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    // Quantitiy Change
    var quantitiyInputs = document.getElementsByClassName('cart-quantitiy');
    for (var i = 0; i< quantitiyInputs.length; i++){
        var input = quantitiyInputs[i];
        input.addEventListener('change', quantitiyChanged);
    }
    // Add to Cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i< addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
}

// Remove Cart Item
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}
// Quantitiy Change
function quantitiyChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal()
}


// Add Cart Function
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title").innerText;
    var price = shopProducts.getElementsByClassName("price").innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("You have already added this item to cart");
            return;
        }
    }
    var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="details-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input 
        type="number" 
        name="" id="" 
        value="1" 
        class="cart-quantitiy"
        />
    </div>
    <!-- Remove Item -->
    <i class="bx bx-trash-alt cart-remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0]
    .addEventListener('click', removeCartItem );
    cartShopBox.getElementsByClassName('cart-quantitiy')[0]
    .addEventListener('change', quantitiyChanged);

}



// Update Total
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0]; 
        var quantityElement = cartBox.getElementsByClassName('cart-quantitiy')[0]; 
        var price = parseFloat(priceElement.innerText.replace("₱", " "))
        var quantity = quantityElement.value;
        total += price * quantity;
    }
    // If price contain some cents
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = "₱" + total;
}