'use strict';
const menuIcon = document.getElementById("navbar-toggler");
const cartBtn = document.querySelector(".cart-btn");

const thumbnails = document.querySelectorAll(".pic");
const heroImg = document.querySelector(".product-hero");

const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".previous");

const btnPlus = document.querySelector("#btn-plus");
const btnMinus = document.querySelector("#btn-minus");
const counter = document.querySelector(".counter");

const btnAddToCart = document.querySelector(".atc");
const cartCount = document.querySelector(".cart-count");
const productsInCart = document.querySelector(".cart-content");

const msgEmpty = document.querySelector(".message-empty");
const checkoutBtn = document.querySelector(".checkout");

const overlay = document.querySelector(".overlay");
const lightBox = document.querySelector(".lightbox");

// Event Listeners
menuIcon.addEventListener("click", toggleMenu);
cartBtn.addEventListener("click", toggleCart);

btnPlus.addEventListener("click", counterPlus);
btnMinus.addEventListener("click", counterMinus);

nextBtn.addEventListener("click", nextImg);
previousBtn.addEventListener("click", previousImg);

thumbnails.forEach(img => {
    img.addEventListener("click", showImg);
});

btnAddToCart.addEventListener("click", addToCart);

heroImg.addEventListener("click", showLightBox);

let lightBoxGallery, lightBoxHero;

// numerical variables
let counterValue = 0;
let cartContent = 0;
let price = 250.0;
let discount = 0.5;

// to open or close mobile menu
function toggleMenu(){
    const menu = document.querySelector(".menu");
    
    // when the menu button is clicked, open the menu if it is closed
    if (menu.classList.contains("hide")){
        // menu slides in
        menu.classList.remove("hide");
        menuIcon.firstChild.src = "images/icon-close.svg";
    } else {
        // close the menu if it is already opened when the 
        // menu button is clicked
        menu.classList.add("hide");
        menuIcon.firstChild.src = "images/icon-menu.svg";
    }
}

function toggleCart(){
    const cart = document.querySelector(".cart");

    // when the cart button is clicked, show the cart if it is 
    // hidden; else hide it
    cart.classList.toggle("hide");
}

function counterPlus(){
    setCounter(1);
}

function counterMinus(){
    setCounter(-1);
}

function setCounter(value){
    if (counterValue + value >
         0){
        counterValue += value;
        counter.innerText = counterValue;
    }
}

function showImg(event){
    // clear active state of all images
    thumbnails.forEach(img => {
        img.classList.remove("active");
    });
    // set active state for the selected thumbnail
    event.target.parentElement.classList.add("active");

    // update hero image
    heroImg.src = event.target.src.replace("-thumbnail", "");
    heroImg.alt = event.target.alt.replace("-thumbnail", "");
}

function nextImg(){
    let currentIndex = getCurrentIndex(heroImg);
    currentIndex++; 
    if (currentIndex > 4){
        currentIndex = 1;
    }
    setHeroImg(currentIndex);
}

function previousImg(){
    let currentIndex = getCurrentIndex(heroImg);
    currentIndex--;
    if (currentIndex < 1){
        currentIndex = 4;
    }
    setHeroImg(currentIndex);
}

function getCurrentIndex(img){
    const index = parseInt(img.src.split("/").pop().split("-").pop());
    return index;
}

function setHeroImg(currentIndex){
    heroImg.src = "images/image-product-" + currentIndex + ".jpg";
    // to sync the image and thumbnail
    // clear active state of all images
    thumbnails.forEach(img => {
        img.classList.remove("active");
    });
    // set active state for the selected thumbnail
    thumbnails[currentIndex-1].classList.add("active");
}

function addToCart(){
    cartContent += counterValue;

    const productElement = 
    `<div class="item flex">
        <img class="product-image" src="./images/image-product-1-thumbnail.jpg" alt="shoes-thumbnail-1">
        <div class="details">
            <p class="product-name">Autumn Limited Edition...</p>
            <div class="price-group flex">
                <p class="price">$${(price*discount).toFixed(2)}</p>x
                <p class="count">${cartContent}</p>
                <p class="total-amount">$${(price*discount*cartContent).toFixed(2)}</p>
            </div>
        </div>
        <img id="delete-icon" src="images/icon-delete.svg" alt="delete icon">
    </div>`;

    productsInCart.innerHTML = productElement;

    updateCart();

    const deleteBtn = document.querySelector("#delete-icon");
    deleteBtn.addEventListener("click", deleteEntry);
}

function updateCart(){
    updateCartIcon();
    updateMsgEmpty();
    updateCheckoutBtn();
}

function updateCartIcon(){
    cartCount.textContent = cartContent;
    if (cartContent == 0){
        if (!cartCount.classList.contains("hide")){
            cartCount.classList.add("hide");
        }
    } else {
        cartCount.classList.remove("hide");
    }
}

function updateMsgEmpty(){
    if (cartContent == 0) {
        if (msgEmpty.classList.contains("hide")){
            msgEmpty.classList.remove("hide");
        } 
    } else {
        if (!msgEmpty.classList.contains("hide")){
            msgEmpty.classList.add("hide");
        }
    }
}

function updateCheckoutBtn(){
    if (cartContent == 0){
        if (!checkoutBtn.classList.contains("hide")){
            checkoutBtn.classList.add("hide");
        }
    } else {
        checkoutBtn.classList.remove("hide");
    }
}

function deleteEntry(){
    cartContent--;
    updateCart();

    const count = document.querySelector(".count");
    const totalAmount = document.querySelector(".total-amount");

    count.innerText = cartContent;
    totalAmount.innerText = `$${(price*discount*cartContent).toFixed(2)}`;

    if (cartContent == 0){
        productsInCart.innerHTML = ``;
    }
}

function showLightBox(){
    if (window.innerWidth >= 1440){
        if (overlay.childElementCount == 1){
            const newNode = lightBox.cloneNode(true);
            overlay.appendChild(newNode);

            const btnLightBoxClose = document.querySelector("#btnLightboxClose");
            btnLightBoxClose.addEventListener("click", hideLightBox);

            lightBoxGallery = overlay.querySelectorAll(".pic");
            lightBoxHero = overlay.querySelector(".product-hero");

            lightBoxGallery.forEach(img => {
                img.addEventListener("click", showLightBoxImg);
            });

            const btnLightBoxNext = overlay.querySelector(".next");
            const btnLightBoxPrevious = overlay.querySelector(".previous");

            btnLightBoxNext.addEventListener("click", lightBoxNextImg);
            btnLightBoxPrevious.addEventListener("click", lightBoxPreviousImg);
        }
        overlay.classList.remove("hide");
    }
}

function hideLightBox(){
    overlay.classList.add("hide");
}

function showLightBoxImg(event){
    // clear active state of all images
    lightBoxGallery.forEach(img => {
        img.classList.remove("active");
    });
    // set active state for the selected thumbnail
    event.target.parentElement.classList.add("active");

    // update hero image
    lightBoxHero.src = event.target.src.replace("-thumbnail", "");
    lightBoxHero.alt = event.target.alt.replace("-thumbnail", "");
}

function lightBoxNextImg(){
    let currentIndex = getLightBoxCurrentIndex(lightBoxHero);
    currentIndex++; 
    if (currentIndex > 4){
        currentIndex = 1;
    }
    setLightBoxHeroImg(currentIndex);
}

function lightBoxPreviousImg(){
    let currentIndex = getLightBoxCurrentIndex(lightBoxHero);
    currentIndex--;
    if (currentIndex < 1){
        currentIndex = 4;
    }
    setLightBoxHeroImg(currentIndex);
}

function getLightBoxCurrentIndex(img){
    const index = parseInt(img.src.split("/").pop().split("-").pop());
    return index;
}

function setLightBoxHeroImg(currentIndex){
    lightBoxHero.src = "images/image-product-" + currentIndex + ".jpg";
    // to sync the image and thumbnail
    // clear active state of all images
    lightBoxGallery.forEach(img => {
        img.classList.remove("active");
    });
    // set active state for the selected thumbnail
    lightBoxGallery[currentIndex-1].classList.add("active");
}