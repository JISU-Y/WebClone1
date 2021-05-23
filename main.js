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

//Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  // event.target에서 li들 마다 data-link에 각각의 id를 넣어두었기 때문에
  // 그거를 이용해서 이름을 가져오면 된다.
  //   console.log(event.target.dataset.link);

  const target = event.target;
  const link = target.dataset.link;

  if (link == null) {
    // navbar menu 바탕을 눌렀을 때는 undefined를 가져오므로
    return;
  }
  //scrollIntoView()
  // 요소가 있는 부모 요소에 스크롤해서 가져다 놓음
  //   const scrollTo = document.querySelector(link); // link는 #home, #about이니까 바로 넣어서 사용
  //   scrollTo.scrollIntoView({ behavior: "smooth" }); // 부드럽게 움직임
  scrollIntoView(link); // 인자만 전달해서 function 소환
});

// Handle click on 'contact me' button on home
const contactBtn = document.querySelector(".home__contact");
contactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector(".home__container"); // #home으루하면 home 모든 것이 날라감 background까지
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  // scrollY가 0에서 800이 되면서 homeHeight 나눈 거에다가 1을 뻄
  console.log(1 - window.scrollY / homeHeight);
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show 'arrow-up' button when scrolling down
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
