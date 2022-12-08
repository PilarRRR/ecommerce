const btnTheme = document.getElementById( "theme-btn" )
const body = document.body
const cartBtnOpen = document.getElementById("cart-btn")
const cartBtnClose = document.getElementById("close-cart")
const cartContainer = document.getElementById("cart-container")
const menuBtnOpen = document.getElementById ("menu-btn")
const openMenu = document.getElementById("open-menu")
const menuBtnClose = document.getElementById("close-menu")
const cartCounter = document.getElementById("cart-counter")
const cartAdd1 = document.getElementById("cart-add-1")
const cartAdd2 = document.getElementById("cart-add-2")
const cartAdd3 = document.getElementById("cart-add-3")

const darkThemeChange = () => {
/*
    if( body.classList.contains( "dark" ) ){
        body.classList.remove( "dark" )
    }else{
        body.classList.add("dark")
    }
    */

    //classList.toggle("clase")
    if( btnTheme.classList.contains("bx-sun") ){
        btnTheme.classList.replace("bx-sun", "bx-moon")
    }else{
        btnTheme.classList.replace("bx-moon", "bx-sun")
    }
    
    body.classList.toggle( "dark" )
}


btnTheme.addEventListener( "click", () => darkThemeChange())

cartBtnOpen.addEventListener( "click", () => cartContainer.classList.remove("hide") )

cartBtnClose.addEventListener( "click", () => cartContainer.classList.add("hide")  )

cartAdd1.addEventListener("click", () => addProduct(1));
cartAdd2.addEventListener("click", () => addProduct(2));
cartAdd3.addEventListener("click", () => addProduct(3));


const items = [
    {
      id: 1,
      name: 'Hoodies',
      price: 14.00,
      image: 'assets/images/featured1.png',
      category: 'hoodies',
      quantity: 10
    },
    {
      id: 2,
      name: 'Shirts',
      price: 24.00,
      image: 'assets/images/featured2.png',
      category: 'shirts',
      quantity: 15
    },
    {
      id: 3,
      name: 'Sweatshirts',
      price: 24.00,
      image: 'assets/images/featured3.png',
      category: 'sweatshirts',
      quantity: 20
    }
  ]

const cartProducts = []

cartCounter.innerText = cartProducts.length;

/**
 * @description Agrega un producto al carrito
 * @param {*} itemId Id del producto que se agregará al carrito
 */
function addProduct( itemId ){
    const productSelected = items.find(product => product.id === itemId);
    const stock = productSelected.quantity;
    const cartProductIndex = cartProducts.findIndex(product => product.id == itemId);
    // Si existe en el carrito
    if(cartProductIndex != -1) {
        // Si no ha rebasado el stock
        if(cartProducts[cartProductIndex].quantity < stock) {
            // Aumenta la cantidad del producto en el carrito
            cartProducts[cartProductIndex].quantity++;
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
}


function showProducts (){
    const content = document.getElementById( "cart-content" )

    let fragment = ""
    cartProducts.forEach( product => {
        fragment += `
        <section>
            <h2>${product.name}</h2>
            <p>Cantidad: ${product.quantity}</p>
        </section>
        `
    } )

    content.innerHTML = fragment
}

/**
 * @description Actualiza el contador de productos en el carrito
 */
function updateProductCounter() {
    // Inicializa el contador en 0
    let count = 0;
    // Si hay productos en el carrito (en la variable con los elementos del carrito)
    if(cartProducts) {
        // Itera (con reduce) por los elementos del carrito y suma las cantidades y asignar al contados
        count = cartProducts.reduce((prev, curr) => prev + curr.quantity, 0);
    }
    // Actualiza el texto del contador
    cartCounter.textContent = count;
}

//document -> documento

//window -> la ventana del navegador

const nav = document.querySelector("nav")

window.addEventListener( "scroll", () =>{
    if(scrollY >= 50){
        nav.classList.add("scroll-bg")
    }else{
        nav.classList.remove("scroll-bg")
    }
} )

menuBtnOpen.addEventListener( "click", () => openMenu.classList.remove("hide") )

menuBtnClose.addEventListener( "click", () => openMenu.classList.add("hide"))





