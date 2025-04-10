let cart = JSON.parse(localStorage.getItem('cart')) || [];

function showAddToCartAnimation() {
    let animationElement = document.querySelector('.add-to-cart-animation');
    if (!animationElement) {
        animationElement = document.createElement('div');
        animationElement.classList.add('add-to-cart-animation');
        animationElement.textContent = 'Product toegevoegd aan winkelwagen!';
        document.body.appendChild(animationElement);
    }

    animationElement.classList.add('show');
    setTimeout(() => {
        animationElement.classList.remove('show');
    }, 1500); // Animation lasts for 1.5 seconds
}

function addToCart(productId, price, name, image, quantity = 1) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += parseInt(quantity, 10);
    } else {
        cart.push({ id: productId, price: price, name: name, image: image, quantity: parseInt(quantity, 10) });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    showAddToCartAnimation(); // Trigger animation
}

function updateCart() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function viewCart() {
    const cartDetailsElement = document.getElementById('cart-details');
    if (!cartDetailsElement) return;

    cartDetailsElement.innerHTML = ''; // Clear previous content
    let totalPrice = 0;

    cart.forEach((item, index) => {
        item.price = 25; // Ensure all prices in the cart are set to €25

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const productImage = document.createElement('img');
        productImage.src = item.image;
        productImage.alt = item.name;

        const productDetails = document.createElement('div');
        productDetails.classList.add('cart-item-details');
        productDetails.innerHTML = `
            <h3>${item.name}</h3>
            <p>Prijs: €${item.price}</p>
            <p>Aantal: ${item.quantity || 1}</p>
        `;

        const controls = document.createElement('div');
        controls.classList.add('cart-item-controls');
        controls.innerHTML = `
            <button onclick="increaseQuantity(${index})">+</button>
            <button onclick="decreaseQuantity(${index})">-</button>
            <button onclick="removeItem(${index})">Verwijderen</button>
        `;

        cartItem.appendChild(productImage);
        cartItem.appendChild(productDetails);
        cartItem.appendChild(controls);
        cartDetailsElement.appendChild(cartItem);

        totalPrice += item.price * (item.quantity || 1);
    });

    const totalElement = document.createElement('p');
    totalElement.style.fontWeight = 'bold';
    totalElement.style.textAlign = 'right';
    totalElement.textContent = `Totaal: €${totalPrice}`;
    cartDetailsElement.appendChild(totalElement);
}

function increaseQuantity(index) {
    cart[index].quantity = (cart[index].quantity || 1) + 1; // Increment quantity
    localStorage.setItem('cart', JSON.stringify(cart));
    viewCart();
    updateCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1; // Decrement quantity but ensure it stays above 1
    } else {
        cart.splice(index, 1); // Remove item if quantity is 1
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    viewCart();
    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1); // Remove item from cart
    localStorage.setItem('cart', JSON.stringify(cart));
    viewCart();
    updateCart();
}

// Call updateCart on page load to update the cart count
document.addEventListener('DOMContentLoaded', () => {
    updateCart();

    if (document.getElementById('cart-details')) {
        viewCart();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Direct navigation for "Bekijk" links
    const productLinks = document.querySelectorAll(".product-link");
    productLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (href) {
                window.location.href = href; // Navigate directly to the product page
            }
        });
    });

    const cartCountElement = document.getElementById("cart-count");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    let cartCount = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            cartCount++;
            cartCountElement.textContent = cartCount;
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Update cart count on page load
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Add event listeners to navigation links
    const navLinks = document.querySelectorAll('.nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const target = link.getAttribute('href');
            if (target && !target.startsWith('#')) {
                window.location.href = target; // Navigate to the target page
            }
        });
    });

    // Ensure cart count updates dynamically when items are added
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
            }
        });
    });
});

function validateInput(input, isValid) {
    if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
    }
}

function validatePersonalDetails() {
    const voornaam = document.getElementById('voornaam');
    const achternaam = document.getElementById('achternaam');
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isVoornaamValid = voornaam.value.trim() !== '';
    const isAchternaamValid = achternaam.value.trim() !== '';
    const isEmailValid = emailRegex.test(email.value);

    validateInput(voornaam, isVoornaamValid);
    validateInput(achternaam, isAchternaamValid);
    validateInput(email, isEmailValid);

    if (isVoornaamValid && isAchternaamValid && isEmailValid) {
        alert('Persoonlijke gegevens zijn correct.');
    } else {
        alert('Controleer uw persoonlijke gegevens.');
    }
}

function autoFillAddress() {
    const postcodeInput = document.getElementById('postcode');
    const straatInput = document.getElementById('straat');
    const stadInput = document.getElementById('stad');
    const postcode = postcodeInput.value.trim();

    // Example logic for auto-filling address based on postcode
    const postcodeAddressMap = {
        '1011': { straat: 'Damrak', stad: 'Amsterdam' },
        '2000': { straat: 'Groenplaats', stad: 'Antwerpen' },
        '3000': { straat: 'Bondgenotenlaan', stad: 'Leuven' },
        '4000': { straat: 'Place Saint-Lambert', stad: 'Luik' },
        '5000': { straat: 'Rue de Fer', stad: 'Namen' }
        // Add more postcodes and addresses for the Netherlands
    };

    if (postcodeAddressMap[postcode]) {
        straatInput.value = postcodeAddressMap[postcode].straat;
        stadInput.value = postcodeAddressMap[postcode].stad;
        validateInput(postcodeInput, true);
        validateInput(straatInput, true);
        validateInput(stadInput, true);
    } else {
        straatInput.value = '';
        stadInput.value = '';
        validateInput(postcodeInput, false);
        validateInput(straatInput, false);
        validateInput(stadInput, false);
    }
}

function validateAddressDetails() {
    const postcode = document.getElementById('postcode');
    const straat = document.getElementById('straat');
    const stad = document.getElementById('stad');

    const isPostcodeValid = postcode.value.trim() !== '';
    const isStraatValid = straat.value.trim() !== '';
    const isStadValid = stad.value.trim() !== '';

    validateInput(postcode, isPostcodeValid);
    validateInput(straat, isStraatValid);
    validateInput(stad, isStadValid);

    if (isPostcodeValid && isStraatValid && isStadValid) {
        alert('Adresgegevens zijn correct.');
    } else {
        alert('Controleer uw adresgegevens.');
    }
}

function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('open');
}
