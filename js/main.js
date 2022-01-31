var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
  },
});

const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");


btnCall.onclick = function (e) {
  e.preventDefault();

  btnCall.classList.toggle("on");
  menuMo.classList.toggle("on");
}

window.addEventListener("load", () => {
  /* 전역변수 리스트---------------------------------------- */
  const grid = new Isotope("#products", {
    itemSelection: "article",
    columnWidth: "article",
    transitionDuration: "0.5s"
  });

  const className_on = "on";

  //header#header
  const menu = header.querySelector("menuProd");
  const btns = menu.querySelector("li");

  //section#sort
  const articles = document.querySelectorAll("article");

  /* 이벤트 연결---------------------------------------- */
  for (let el of btns) {
    el.addEventListener("click", e => {
      e.preventDefault();

      sortFrame(e);
      activation(btns, e);
    });
  }

  for (let el of articles) {
    el.addEventListener("click", e => {
      activePopUp(e);
    })
  }


  /* 함수 선언---------------------------------------- */
  //선택한 메뉴에 .on 추가
  function activation(lists, active) {
    for (let el of lists) {
      el.classList.remove(className_on);
    }

    active.currentTarget.classList.add(className_on);
  }

  //정렬 함수
  function sortFrame(target) {
    const sort = target.currentTarget.querySelector("a").getAttribute("href");

    grid.arrange({
      filter: sort,
    });
  }
});
