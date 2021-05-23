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
  const scrollTo = document.querySelector(link); // link는 #home, #about이니까 바로 넣어서 사용
  scrollTo.scrollIntoView({ behavior: "smooth" }); // 부드럽게 움직임
});
