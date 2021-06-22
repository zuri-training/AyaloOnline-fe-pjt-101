const hamburger = document.getElementById('hamburger')
const close = document.getElementById('close')
const nav = document.getElementById('nav-ul') 


function toggleMenu() {
    if (nav.classList.contains("show")) {
      nav.classList.remove("show");
      close.style.display = "none";
      hamburger.style.display = "block";
    } else {
      nav.classList.add("show");
      close.style.display = "block";
      hamburger.style.display = "none";
    }
  }
