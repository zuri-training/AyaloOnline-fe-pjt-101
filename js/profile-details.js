
const hamburger = document.getElementById('hamburger');
const close = document.getElementById('close');
const nav = document.querySelector('.nav-div');
const menu = document.querySelector('.menu-div');
const submenu = document.querySelector('.submenu');
const cover = document.getElementById('cover');
const id = document.getElementById('verify');
const bvn = document.querySelector('.bvn-input');
const nin = document.querySelector('.nin-input');


cover.addEventListener('click', toggleMenu);

function toggleMenu() {
    if (nav.classList.contains("show")){
        nav.classList.remove("show");
        cover.style.display = "none";
        close.style.display = "none";
        hamburger.style.display = "block";
        enableScroll()

        if (submenu.classList.contains("showmenu")) {
            submenu.classList.remove("showmenu")
        }

    } else {
        nav.classList.add("show");
        cover.style.display = "block";
        close.style.display = "block";
        hamburger.style.display = "none";
        disableScroll()
        console.log(screen.height - nav.offsetHeight);
    };
}


menu.addEventListener('click', openMenu);
id.addEventListener('change', changeDiv);

function openMenu() {
    if (submenu.classList.contains("showmenu")) {
        submenu.classList.remove("showmenu")
    }
    else {
        submenu.classList.add("showmenu");
    };
}

function changeDiv() {
    if (id.value === 'BVN') {
        nin.classList.add("id-type");
        bvn.classList.remove("id-type");
    }
    else {
        nin.classList.remove("id-type");
        bvn.classList.add("id-type");
    };
}

function disableScroll() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    window.onscroll = function () {
        window.scrollTo(0, scrollTop)
    };
}

function enableScroll() {
    window.onscroll = function () { };
}
