// TODO: Agregar estilo sólido a navbar, basado en posición de ventana (scroll)
// TODO: Agregar media queries
// TODO: Mostrar detalles de producto dinámicamente
// TODO: Documenta cart product items handler
// FIXME: Mostrar datos del carrito dinámicamente
// FIXME: Corregir estilos de texto de tema oscuro
// FIXME: Mantener la proporción de la sudadera del landing

const btnTheme = document.getElementById('theme-btn');
const body = document.body;
const cartBtnOpen = document.getElementById('cart-btn');
const cartBtnClose = document.getElementById('close-cart');
const cartContainer = document.getElementById('cart-container');
const menuBtnOpen = document.getElementById('menu-btn');
const openMenu = document.getElementById('open-menu');
const menuBtnClose = document.getElementById('close-menu');
const cartCounter = document.getElementById('cart-counter');
const cartAdd1 = document.getElementById('cart-add-1');
const cartAdd2 = document.getElementById('cart-add-2');
const cartAdd3 = document.getElementById('cart-add-3');
const cartAdd0 = document.getElementById('cart-add-0');
const discoverBtn = document.getElementById('discover-btn');
const totalItems = document.getElementById('totalItemsQuantity');
const totalAmount = document.getElementById('totalItemsAmount');
const cartItemsMinus = [];
const cartItemsPlus = [];

const darkThemeChange = () => {
	/*
    if( body.classList.contains( "dark" ) ){
        body.classList.remove( "dark" )
    }else{
        body.classList.add("dark")
    }
    */

	//classList.toggle("clase")
	if (btnTheme.classList.contains('bx-sun')) {
		btnTheme.classList.replace('bx-sun', 'bx-moon');
	} else {
		btnTheme.classList.replace('bx-moon', 'bx-sun');
	}

	body.classList.toggle('dark');
};

const cartProductsContainer = document.getElementById('cart');

// Click handler for entire DIV container
cartProductsContainer.addEventListener('click', function (e) {
	// But only alert for elements that have an alert-button class
	if (e.target.id.includes('cartItemPlus')) {
		const productId = Number(e.target.id[e.target.id.length - 1]);
		editCartProduct(productId);
	} else if (e.target.id.includes('cartItemMinus')) {
		const productId = Number(e.target.id[e.target.id.length - 1]);
		editCartProduct(productId, 'less');
	} else if (e.target.id.includes('cartItemRemove')) {
		const productId = Number(e.target.id[e.target.id.length - 1]);
		const cartProductIndex = cartProducts.findIndex(
			(cartProduct) => cartProduct.id === productId
		);
		cartProducts.splice(cartProductIndex, 1);
		// Actualiza la vista de productos en el carrito
		showProducts();
		// Actualiza el contador de productos en el carrito
		updateProductCounter();
		// Actualiza el total
		updateTotalAmount();
	}
});

btnTheme.addEventListener('click', () => darkThemeChange());

cartBtnOpen.addEventListener('click', () =>
	cartContainer.classList.remove('hide')
);

cartBtnClose.addEventListener('click', () =>
	cartContainer.classList.add('hide')
);

cartAdd1.addEventListener('click', () => editCartProduct(1));
cartAdd2.addEventListener('click', () => editCartProduct(2));
cartAdd3.addEventListener('click', () => editCartProduct(3));
cartAdd0.addEventListener('click', () => editCartProduct(2));
discoverBtn.addEventListener('click', () => window.scrollTo(0, 800));

const items = [
	{
		id: 1,
		name: 'Hoodies',
		price: 14.0,
		image: 'assets/images/featured1.png',
		category: 'hoodies',
		quantity: 10,
	},
	{
		id: 2,
		name: 'Shirts',
		price: 24.0,
		image: 'assets/images/featured2.png',
		category: 'shirts',
		quantity: 15,
	},
	{
		id: 3,
		name: 'Sweatshirts',
		price: 24.0,
		image: 'assets/images/featured3.png',
		category: 'sweatshirts',
		quantity: 20,
	},
];

const cartProducts = [];

cartCounter.innerText = cartProducts.length;

/**
 * @description Agrega un producto al carrito
 * @param {*} itemId Id del producto que se agregará al carrito
 */
function editCartProduct(itemId, operation = 'add') {
	const productSelected = items.find((product) => product.id === itemId);
	const stock = productSelected.quantity;
	const cartProductIndex = cartProducts.findIndex(
		(product) => product.id == itemId
	);
	// Si existe en el carrito
	if (cartProductIndex != -1) {
		if (operation === 'add') {
			// Si no ha rebasado el stock
			if (cartProducts[cartProductIndex].quantity < stock) {
				// Aumenta la cantidad del producto en el carrito
				cartProducts[cartProductIndex].quantity++;
			}
		} else {
			// Si es mayor que 0
			if (cartProducts[cartProductIndex].quantity > 1) {
				cartProducts[cartProductIndex].quantity--;
			} else {
				cartProducts.splice(cartProductIndex, 1);
			}
		}
	} else {
		// Crea una copia del producto seleccionado cambiando la cantidad (a 1)
		const newCartProduct = {...productSelected, quantity: 1};
		// Agrega el producto al carrito
		cartProducts.push(newCartProduct);
	}
	// Actualiza la vista de productos en el carrito
	showProducts();
	// Actualiza el contador de productos en el carrito
	updateProductCounter();
	// Actualiza el total
	updateTotalAmount();
}

function showProducts() {
	const content = document.getElementById('cart-content');

	let fragment = '';
	if (cartProducts.length > 0) {
		cartProducts.forEach((product) => {
			fragment += `
            <section class="cart-list-products">
                <img src="${product.image}" class="cart-product-image" >
                <div class="cart-product-text">
                    <h2>${product.name}</h2>
                    <p>Stock: 17 | <span class="cart-product-text-important">$${product.price.toFixed(
						2
					)}</span></p>
                    <p class="cart-product-text-important">Subtotal: ${(
						product.quantity * product.price
					).toFixed(2)}</p>
                    <div class="cart-product-actions">
                        <div class="cart-product-quantity">
                            <button class="cart-product-btn" id="cartItemMinus${
								product.id
							}">-</button>
                            <p>${product.quantity} Units</p>
                            <button class="cart-product-btn" id="cartItemPlus${
								product.id
							}">+</button>
                        </div>
                        <p id="cartItemRemove${product.id}">Quitar</p>
                    </div>
                </div>
            </section>
            `;
		});
	} else {
		fragment += `
            <img src="./assets/images/empty-cart.png" alt="empty cart image">
            <p class="aside-subtitle">Your cart is empty</p>
            <p class="aside-text">You can add items to your cart by clicking on the + button on the product page.</p>
        `;
	}
	content.innerHTML = fragment;
}

/**
 * @description Actualiza el contador de productos en el carrito
 */
function updateProductCounter() {
	// Inicializa el contador en 0
	let count = 0;
	// Si hay productos en el carrito (en la variable con los elementos del carrito)
	if (cartProducts) {
		// Itera (con reduce) por los elementos del carrito y suma las cantidades y asignar al contados
		count = cartProducts.reduce((prev, curr) => prev + curr.quantity, 0);
	}
	// Actualiza el texto del contador
	cartCounter.textContent = count;
	totalItems.textContent = count;
}

/**
 * @description Actualiza el total de costo del carrito
 */
function updateTotalAmount() {
	// Calcula el total del carrito iterando sobre el carrito y multiplicando el precio de cada producto por la cantidad
	const total = cartProducts.reduce(
		(prev, curr) => prev + curr.price * curr.quantity,
		0
	);
	// Actualiza el texto del total
	totalAmount.textContent = total.toFixed(2);
}

//document -> documento

//window -> la ventana del navegador

const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
	if (scrollY >= 50) {
		nav.classList.add('scroll-bg');
	} else {
		nav.classList.remove('scroll-bg');
	}
});

menuBtnOpen.addEventListener('click', () => openMenu.classList.remove('hide'));

menuBtnClose.addEventListener('click', () => openMenu.classList.add('hide'));
