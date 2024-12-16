const prices = {
    paracetamol: 5.00,
    aspirin: 4.50,
    ibuprofen: 6.00,
    diclofenac: 7.00,
    codeine: 8.00,
    tramadol: 9.50,
    amoxicillin: 10.00,
    ciprofloxacin: 12.00,
    azithromycin: 15.00,
    doxycycline: 14.00,
    cephalexin: 13.50,
    metronidazole: 11.00,
    fluoxetine: 20.00,
    sertraline: 19.50,
    citalopram: 18.00,
    amitriptyline: 17.50,
    mirtazapine: 21.00,
    venlafaxine: 22.00,
    loratadine: 5.50,
    cetirizine: 6.00,
    fexofenadine: 7.00,
    diphenhydramine: 8.00,
    lisinopril: 10.00,
    amlodipine: 11.00,
    metoprolol: 12.50,
    losartan: 13.00,
    hydrochlorothiazide: 14.00,
    clonidine: 15.00
};


const cart = [];


function addItemToCart(itemId, quantity) {
    quantity = Number(quantity);
    if (quantity > 0) {
        const existingItem = cart.find(item => item.id === itemId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ id: itemId, quantity, price: prices[itemId] });
        }
        updateCartTable();
    }
}


function updateCartTable() {
    const cartTableBody = document.querySelector("#cartTable tbody");
    cartTableBody.innerHTML = ""; 
    let totalPrice = 0;

    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.quantity}</td>
            <td>$${(item.quantity * item.price).toFixed(2)}</td>
        `;
        cartTableBody.appendChild(row);
        totalPrice += item.quantity * item.price;
    });

    document.getElementById("totalPrice").textContent = `$${totalPrice.toFixed(2)}`;
}
function clearCart(){
    const cartTableBody = document.querySelector("#cartTable tbody");
    cartTableBody.innerHTML = "";

}


function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(cart));
    alert("Favorites saved successfully!");
}


function applyFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites) {
        cart.length = 0; 
        favorites.forEach(item => cart.push(item));
        updateCartTable();
    } else {
        alert("No favorites found.");
    }
}


function goToCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    document.location.href="D:/apiit/web/assingment 2/Assignment final/Assignment final/paymentpage.html"

    /*const checkoutWindow = window.open("paymentpage.html", "_blank");
    checkoutWindow.onload = () => {
        checkoutWindow.document.body.innerHTML = generateCheckoutHTML();
    };*/
}

/*/ Generate checkout HTML
function generateCheckoutHTML() {
    let orderDetails = "<h2>Your Order</h2><ul>";
    let total = 0;
    cart.forEach(item => {
        orderDetails += `<li>${item.id} - ${item.quantity} pcs - $${(item.quantity * item.price).toFixed(2)}</li>`;
        total += item.quantity * item.price;
    });
    orderDetails += `</ul><h3>Total: $${total.toFixed(2)}</h3>`;

    return `
        ${orderDetails}
        <h2>Enter Personal Details</h2>
        <form id="checkoutForm">
            <label>Name: <input type="text" id="name" required></label><br>
            <label>Address: <input type="text" id="address" required></label><br>
            <label>Payment Info: <input type="text" id="payment" required></label><br>
            <button type="button" onclick="completePurchase()">Pay</button>
        </form>
        <script>
            function completePurchase() {
                const name = document.getElementById("name").value;
                const address = document.getElementById("address").value;
                const payment = document.getElementById("payment").value;

                if (name && address && payment) {
                    alert("Thank you for your purchase, ${name}! Your order will be delivered on " + new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString() + ".");
                    window.close();
                } else {
                    alert("Please fill out all fields.");
                }
            }
        </script>
    `;
}*/


window.onload = () => {
    document.getElementById("buyNow").addEventListener("click", goToCheckout);
    document.getElementById("saveFavorites").addEventListener("click", saveFavorites);
    document.getElementById("applyFavorites").addEventListener("click", applyFavorites);


//   document.querySelectorAll("#categories input[type='number']").forEach(input => {
  //      input.addEventListener("change", () => {
    //        const itemId = input.id;
      //      const quantity = parseInt(input.value, 10) || 0;
        //    addItemToCart(itemId, quantity);
        //});
   // });
}; 
