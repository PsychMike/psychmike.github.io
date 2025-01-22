// Favoriting
document.addEventListener("DOMContentLoaded", function() {
    const starButtons = document.querySelectorAll('.product-star');

    starButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            const starIcon = this.querySelector('i');

            // Toggle active state and color
            starIcon.classList.toggle('active');
            starIcon.style.color = starIcon.classList.contains('active') ? 'gold' : 'gray';
        });
    });

    // Image enlargement functionality
    const imageLinks = document.querySelectorAll('.enlarge-image');
    const overlay = document.getElementById('image-overlay');
    const enlargedImg = document.getElementById('enlarged-img');
    const closeBtn = document.querySelector('.close-btn');

    imageLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const imageSrc = link.getAttribute('data-image');
            enlargedImg.src = imageSrc;
            overlay.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.style.display = 'none';
        }
    });
});

const cartButtons = document.querySelectorAll('.add-to-cart');
const cartIcon = document.getElementById('cart-icon');

cartButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();

        const productImage = button.closest('.thumb').querySelector('img');
        if (!productImage) return;

        let flyingImage = productImage.cloneNode(true);
        flyingImage.classList.add('flying-image');
        document.body.appendChild(flyingImage);

        let rect = productImage.getBoundingClientRect();
        flyingImage.style.left = `${rect.left}px`;
        flyingImage.style.top = `${rect.top}px`;

        let cartRect = cartIcon.getBoundingClientRect();
        setTimeout(() => {
            flyingImage.style.left = `${cartRect.left + window.scrollX}px`;
            flyingImage.style.top = `${cartRect.top + window.scrollY}px`;
            flyingImage.style.width = '50px';
            flyingImage.style.opacity = '0.3';
        }, 100);
        
        button.disabled = true;
        setTimeout(() => { button.disabled = false; }, 100);

        setTimeout(() => {
            flyingImage.remove();
            updateCartCount();
        }, 1000);
    });
});

function updateCartCount() {
    let cartCount = document.getElementById('cart-count');
    if (!cartCount) {
        cartCount = document.createElement('span');
        cartCount.id = 'cart-count';
        cartCount.textContent = '1';
        cartIcon.appendChild(cartCount);
    } else {
        cartCount.textContent = parseInt(cartCount.textContent) + 1;
    }

    cartIcon.classList.add('bounce');
    setTimeout(() => cartIcon.classList.remove('bounce'), 500);
}

// Cart dropdown functionality
const cartDropdown = document.getElementById('cart-dropdown');
const cartItemsList = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');

let cart = [];

function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: parseFloat(itemPrice) });
    updateCartDisplay();
}

function updateCartDisplay() {
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

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const product = this.closest('.down-content');
        const itemName = product.querySelector('h4').textContent;
        const itemPrice = product.querySelector('span').textContent.replace('$', '');
        addToCart(itemName, itemPrice);
    });
});

cartIcon.addEventListener('click', function () {
    cartDropdown.classList.toggle('visible');
});

document.addEventListener('click', function (event) {
    if (!cartIcon.contains(event.target) && !cartDropdown.contains(event.target)) {
        cartDropdown.classList.remove('visible');
    }
});
