
    let cart = [];
    let total = 0;

    // Function to add items to the cart
    function addToCart(item, price) {
        // Check if the item is already in the cart
        const existingItem = cart.find(cartItem => cartItem.item === item);
        if (existingItem) {
            existingItem.quantity += 1;
            total += price;
        } else {
            cart.push({ item, price, quantity: 1 });
            total += price;
        }
        updateCart();
    }

    // Function to remove an item from the cart
    function removeFromCart(index) {
        const removedItem = cart.splice(index, 1)[0];
        total -= removedItem.price * removedItem.quantity;
        updateCart();
    }

    // Function to update the cart display
    function updateCart() {
        const cartList = document.getElementById('cart-list');
        cartList.innerHTML = '';
        if (cart.length === 0) {
            cartList.innerHTML = '<li>Your cart is empty!</li>';
        } else {
            cart.forEach((item, index) => {
                const li = document.createElement('li');
                li.textContent = `${item.item} - ₹${item.price} x ${item.quantity}`;
                
                // Add a remove button for each item
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.onclick = () => removeFromCart(index);
                
                li.appendChild(removeButton);
                cartList.appendChild(li);
            });
        }
        document.getElementById('total-price').textContent = `Total: ₹${total}`;
    }

    // Function to proceed to payment
    function proceedToPayment() {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items to the cart before proceeding.');
            return;
        }
        document.getElementById('payment').style.display = 'block';
        document.getElementById('payment-total').textContent = `₹${total}`;
    }

    // Function to handle payment submission
    function handlePayment(event) {
        event.preventDefault();
        const upiInput = document.getElementById('upi');
        const upiValue = upiInput.value.trim();
        
        // Simple UPI validation
        const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
        if (!upiRegex.test(upiValue)) {
            alert('Please enter a valid UPI ID.');
            return;
        }

        // Simulate payment success
        alert('Payment Successful!');
        
        // Clear the cart after payment
        cart = [];
        total = 0;
        updateCart();
        
        // Hide payment section
        document.getElementById('payment').style.display = 'none';
    }

    // Attach the payment handler to the form submission
    const paymentForm = document.querySelector('form');
    if (paymentForm) {
        paymentForm.onsubmit = handlePayment;
    }

