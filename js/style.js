// Events scroll
let navbarClassElt = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  navbarClassElt.style.backgroundColor = "#6563a4";
});

// Top button
var mybutton = document.getElementById("btnTop");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Style height de la section "#home"
let bodyElt = getComputedStyle(document.querySelector("body"));
let homeElt = document.getElementById("home");
homeElt.style.height = bodyElt.height;
