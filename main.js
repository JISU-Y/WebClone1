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
  navbarMenu.classList.remove("open");

  //scrollIntoView()
  // 요소가 있는 부모 요소에 스크롤해서 가져다 놓음
  //   const scrollTo = document.querySelector(link); // link는 #home, #about이니까 바로 넣어서 사용
  //   scrollTo.scrollIntoView({ behavior: "smooth" }); // 부드럽게 움직임
  scrollIntoView(link); // 인자만 전달해서 function 소환
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
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

//Projects
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");

workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  // 혹시라도 target에 filter가 없으면 그 타겟의 부모 요소의 filter를 찾아본다.
  // 이렇게 할 수도 있지만 나는 지금 button 안에 span은 pointer event none으로 처리함
  if (filter == null) {
    return;
  }
  // remove selection form the previous item and select the new one
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  //   e.target이 button이면 e.target으로 지정하고, span이면 parentNode를 할당한다.
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");

  projectContainer.classList.add("anim-out");
  // anim out만 추가하면 opacity가 0인 채로 유지가 되기 때문에 안보인다.
  // 그러므로 300ms 가 지나면 anim out 클래스를 지워준다.
  setTimeout(() => {
    projectContainer.classList.remove("anim-out");
  }, 500);
  // remove 까지 되고 나서 projects loop 돌려야 자연스럽게 나온다.
  // 왜냐면 동기적으로 작동하므로 anim out 추가하자마자
  // 밑에 invisible 클래스를 지정해주기 때문에 조금 이상하게 나온다.

  projects.forEach((project) => {
    console.log(project.dataset.type);
    if (filter === "*" || filter === project.dataset.type) {
      // 안보여주는 것을 제거함
      // 왜냐면 all을 선택하거나 지금 선택된 버튼 filter랑 profect 속성 type이랑 같을 때는
      // 보여주어야 하니까
      project.classList.remove("invisible");
    } else {
      project.classList.add("invisible");
    }
  });
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
