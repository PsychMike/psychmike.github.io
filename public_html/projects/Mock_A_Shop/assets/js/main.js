// Wait for the DOM to fully load before executing scripts
document.addEventListener("DOMContentLoaded", function() {
    // Select all elements with the 'product-star' class (for favoriting functionality)
    const starButtons = document.querySelectorAll('.product-star');

    // Add click event listener to each star button
    starButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            const starIcon = this.querySelector('i'); // Get the star icon within the button

            // Toggle 'active' class on the star icon and change its color accordingly
            starIcon.classList.toggle('active');
            starIcon.style.color = starIcon.classList.contains('active') ? 'gold' : 'gray';
        });
    });

// Image enlargement functionality
const imageLinks = document.querySelectorAll('.enlarge-image'); // Select all 'Enlarge' buttons
const overlay = document.getElementById('image-overlay'); // Overlay element
const enlargedImg = document.getElementById('enlarged-img'); // Image to display in overlay
const closeBtn = document.querySelector('.close-btn'); // Close button for overlay

// Add click event to each enlarge button
imageLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        // Find the closest product's image source dynamically
        const productImage = this.closest('.thumb').querySelector('img');

        if (productImage) {
            enlargedImg.src = productImage.src;  // Set the clicked product's image
            overlay.style.display = 'flex';  // Show the overlay with the image
        }
    });
});

// Close the enlarged image when clicking the close button
closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// Close the overlay when clicking outside of the image
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.style.display = 'none';
    }
});

});

// Cart functionality

// Select cart-related elements from the DOM
const cartButtons = document.querySelectorAll('.add-to-cart');  // All 'Add to Cart' buttons
const cartIcon = document.getElementById('cart-icon');          // Shopping cart icon
const cartDropdown = document.getElementById('cart-dropdown');  // Cart dropdown container
const cartItemsList = document.getElementById('cart-items');    // List to display cart items
const cartTotalPrice = document.getElementById('cart-total-price');  // Element to show total price

// Array to store cart items
let cart = [];

// Handle cart button clicks with animation and cart update
cartButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();  // Prevent default action

        // Find the product image within the clicked item's container
        const productImage = button.closest('.thumb').querySelector('img');
        if (!productImage) return; // Exit if image not found

        // Clone the product image to animate it to the cart
        let flyingImage = productImage.cloneNode(true);
        flyingImage.classList.add('flying-image');  // Add class for styling animation
        document.body.appendChild(flyingImage);  // Append cloned image to the body

        // Get the current position of the product image
        let rect = productImage.getBoundingClientRect();
        flyingImage.style.left = `${rect.left}px`;
        flyingImage.style.top = `${rect.top}px`;

        // Animate the cloned image to the cart icon
        let cartRect = cartIcon.getBoundingClientRect();
        setTimeout(() => {
            flyingImage.style.left = `${cartRect.left + window.scrollX}px`;
            flyingImage.style.top = `${cartRect.top + window.scrollY}px`;
            flyingImage.style.width = '50px';
            flyingImage.style.opacity = '0.3';
        }, 100);

        // Disable the button temporarily to prevent spam clicking
        button.disabled = true;
        setTimeout(() => { button.disabled = false; }, 100);

        // Remove the flying image after animation completes
        setTimeout(() => {
            flyingImage.remove();
            updateCartCount();  // Update the cart counter
        }, 1000);

        // Get product details (name & price) and add to the cart
        const product = button.closest('.down-content');
        const itemName = product.querySelector('h4').textContent;
        const itemPrice = product.querySelector('span').textContent.replace('$', '');
        addToCart(itemName, itemPrice);
    });
});

// Function to update cart count indicator
function updateCartCount() {
    let cartCount = document.getElementById('cart-count');
    if (!cartCount) {
        cartCount = document.createElement('span');
        cartCount.id = 'cart-count';
        cartCount.textContent = '1';
        cartIcon.appendChild(cartCount);  // Add counter to the cart icon
    } else {
        cartCount.textContent = parseInt(cartCount.textContent) + 1;
    }

    // Add bounce animation to the cart icon when updated
    cartIcon.classList.add('bounce');
    setTimeout(() => cartIcon.classList.remove('bounce'), 500);
}

// Function to add items to cart array and update display
function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: parseFloat(itemPrice) });  // Add new item to cart
    updateCartDisplay();  // Refresh cart UI
}

// Function to update cart dropdown UI
function updateCartDisplay() {
    cartItemsList.innerHTML = '';  // Clear existing cart items
    let total = 0;

    // Loop through cart array and add each item to the dropdown
    cart.forEach(item => {
        let li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;  // Format price to 2 decimal places
        cartItemsList.appendChild(li);
        total += item.price;
    });

    cartTotalPrice.textContent = `$${total.toFixed(2)}`;  // Update the total price
}

// Toggle cart dropdown visibility on cart icon click
cartIcon.addEventListener('click', function (event) {
    event.stopPropagation();  // Prevent click from bubbling to document
    cartDropdown.classList.toggle('visible');  // Show/hide the dropdown
});

// Close cart dropdown when clicking outside
document.addEventListener('click', function (event) {
    if (!cartIcon.contains(event.target) && !cartDropdown.contains(event.target)) {
        cartDropdown.classList.remove('visible');  // Hide dropdown
    }
});

// Prevent clicks inside the dropdown from closing it
cartDropdown.addEventListener('click', function (event) {
    event.stopPropagation();  // Stop the event from propagating further
});
