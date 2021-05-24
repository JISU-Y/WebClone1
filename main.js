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
  // console.log(1 - window.scrollY / homeHeight);
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

// 일단 모든 section들과 메뉴 아이템 가져옴
const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#testimonials",
  "#contact",
];

// forEach 처럼
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
); // id가 담긴 data-link 속성 모두 가져옴
// console.log(sections);
// console.log(navItems);

let selectedNavItem = navItems[0];
let selectedNavIndex;

function selectNavItem(selected) {
  selectedNavItem.classList.remove("active"); // 먼저 선택된 것은 active 지워주고
  // selectedNavItem = navItems[selectedIndex]; // 그 다음에 선택될 것을 active 추가해줌
  selectedNavItem = selected; // 그 다음에 선택될 것을 active 추가해줌
  selectedNavItem.classList.add("active"); // 아니면 지나가는 거 마다 다 선택됨
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  // 직접 버튼을 클릭했을 때도 활성화가 적용이 되게
  selectNavItem(navItems[sectionIds.indexOf(selector)]); // selector는 #뭐뭐뭐니까!!
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};
// observer 객체안에 인자 두개 필요(entries, observer)
// 객체 생성 후 부를 함수
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    // 요소가 빠져나갔을 때와, 지금 요소의 ratio 가 0 이상일 때만(다 보여져 있는 상태일 때만)
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      // 요소가 빠져 나갈때
      // 그 때의 왼쪽 위 y 좌표를 얻어서 -일 경우는 위로 빠져나간 것이고
      // +일 경우 아래로 빠져 나간 것임을 이용
      const index = sectionIds.indexOf(`#${entry.target.id}`);

      if (entry.boundingClientRect.y < 0) {
        // 페이지가 올라가는 중에 요소가 빠져나간 경우
        // 빠져나간 요소의 그 다음 요소를 활성화 시킴
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

// 함수와 설정을 인자로 같이 넣어준다.
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section)); // observer로 관측한 section을 보여준다.

// wheel은 사용자가 스스로 스크롤한 경우만
// scroll은 그냥 보여지는 작동 자체
window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    // scroll이 제일 위에 있으면
    selectedNavIndex = 0;
  } else if (
    // scrollY이랑 더한 값이 소수점으로 나올 수도 있기 때문에 반올림 한다.
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});
