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

        // Find the closest .item parent which wraps all content
        const product = button.closest('.item');

        if (!product) {
            console.error("Error: '.item' container not found for clicked button.");
            return;
        }

        // Find product details inside .down-content within the .item container
        const itemNameElement = product.querySelector('.down-content h4');
        const itemPriceElement = product.querySelector('.down-content span');

        if (!itemNameElement || !itemPriceElement) {
            console.error("Error: Product details not found.");
            return;
        }

        const itemName = itemNameElement.textContent;
        const itemPrice = itemPriceElement.textContent.replace('$', '');

        // Add the product to cart only once
        addToCart(itemName, itemPrice);

        // Trigger animation to cart
        animateToCart(button);
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

function addToCart(itemName, itemPrice) {
    console.log("Adding item to cart:", itemName, itemPrice);
    cart.push({ name: itemName, price: parseFloat(itemPrice) });

    updateCartDisplay();
    updateCartCount();
}

function updateCartDisplay() {
    console.log("Cart items:", cart);
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        let li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsList.appendChild(li);
        total += item.price;
    });

    cartTotalPrice.textContent = `$${total.toFixed(2)}`;
}


// Toggle cart dropdown visibility when clicking on the cart icon
cartIcon.addEventListener('click', function (event) {
    event.stopPropagation();  // Prevent click from bubbling to document
    cartDropdown.classList.toggle('visible');  // Show/hide the dropdown
});

// Close the dropdown when clicking outside
document.addEventListener('click', function (event) {
    if (!cartIcon.contains(event.target) && !cartDropdown.contains(event.target)) {
        cartDropdown.classList.remove('visible');  // Hide dropdown
    }
});

// Prevent clicks inside the dropdown from closing it
cartDropdown.addEventListener('click', function (event) {
    event.stopPropagation();  // Stop the event from propagating further
});