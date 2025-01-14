document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.querySelector('.cart-items');
    const checkoutButton = document.getElementById('checkout');
    let cart = [];
    let dropdownVisible = false; // Track dropdown visibility state

    // Function to update cart display
    function updateCart() {
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>No items in cart.</p>';
            cartCount.textContent = 0;
            document.querySelector('.total').textContent = 'Total: $0.00';
            return;
        }

        let total = 0;
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
                <div class="cart-text">
                    <p>${item.name}</p>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <span class="remove-item" data-index="${index}">Remove</span>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price;
        });

        cartCount.textContent = cart.length;
        document.querySelector('.total').textContent = `Total: $${total.toFixed(2)}`;
    }

    // Add event listener to remove item
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const index = parseInt(e.target.getAttribute('data-index'), 10);
            cart.splice(index, 1); // Remove the item from the cart
            updateCart(); // Update the cart display

            // Ensure the dropdown remains visible after removing an item
            if (dropdownVisible) {
                cartDropdown.classList.remove('hidden');
            }
        }
    });

    // Toggle dropdown visibility when cart icon is clicked
    cartIcon.addEventListener('click', () => {
        dropdownVisible = !dropdownVisible; // Toggle dropdown visibility state
        cartDropdown.classList.toggle('hidden', !dropdownVisible);
    });

    // Add event listener to product buttons
    const productCards = document.querySelectorAll('.product-card button');
    productCards.forEach((button) => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const name = card.getAttribute('data-name');
            const price = parseFloat(card.getAttribute('data-price'));
            const image = card.querySelector('img').getAttribute('src');

            cart.push({ name, price, image });
            updateCart();

            // Ensure the dropdown stays visible if it was already open
            if (dropdownVisible) {
                cartDropdown.classList.remove('hidden');
            }
        });
    });

    // Checkout button functionality (optional)
    checkoutButton.addEventListener('click', () => {
        alert('Checkout complete! Thank you for your purchase.');
        cart = []; // Clear the cart
        updateCart();
    });
});
