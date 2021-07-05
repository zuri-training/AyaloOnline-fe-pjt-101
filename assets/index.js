
const hamburger = document.getElementById('hamburger');
const close = document.getElementById('close');
const nav = document.querySelector('.nav-div');
const cover = document.getElementById('cover');
const signup = document.querySelector('.signup');
const linkApple = document.querySelector('.apple-store');
const linkGoogle = document.querySelector('.google-play');
const rent = document.querySelector('.rent-equipment')

cover.addEventListener('click', toggleMenu);
signup.addEventListener('click', signupPage);
linkApple.addEventListener('click', appleStore);
linkGoogle.addEventListener('click', googlePlay);
rent.addEventListener('click', rentEquipment );


function toggleMenu() {
    if (nav.classList.contains("show")) {
        nav.classList.remove("show");
        cover.style.display = "none";
        close.style.display = "none";
        hamburger.style.display = "block";
        enableScroll();

    } else {
        nav.classList.add("show");
        cover.style.display = "block";
        close.style.display = "block";
        hamburger.style.display = "none";
        disableScroll();
    };
}

function disableScroll() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    window.onscroll = function () {
        window.scrollTo(0, scrollTop);
    };
}

function enableScroll() {
    window.onscroll = function () { };
}

function signupPage() {
    window.location.href = "signup-page.html";
}

function appleStore() {
    window.location.href = "https://www.apple.com/shop";
}

function googlePlay() {
    window.location.href = "https://play.google.com/store/apps";
}

function rentEquipment() {
    window.location.href = "explore-page.html";
}

