"use strict";
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

// getBoundingClientRect(); // 이거 사용자가 보고 있는 최종 요소의 크기
// offsetWidth / offsetHeight 가 실제로 할당한 크기

// Make navbar transparent when it is on the top
document.addEventListener("scroll", () => {
  //console.log(window.scrollY); // 사용자가 스크롤한 Y size
  //console.log(navbarHeight);
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});
