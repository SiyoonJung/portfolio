//모바일 버전에서의 메뉴 구현(using toggle)
const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

btnCall.onclick = function (e) {
  e.preventDefault();

  btnCall.classList.toggle("on");
  menuMo.classList.toggle("on");
}

//visual section의 swiper
var swiper = new Swiper(".swiper", {
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// prodList section에서 istope 적용시 folded(overlay) 되는 문제 해결
$(window).load(function () {
  $.getScript(`https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.js`, function () { })
});

//prodList section에서 상품들 정렬(istope 이용)
$(".prodList").isotope({
  itemSelector: '.prod',
  layoutMode: 'fitRows',
  masonry: {
    columnWidth: 15,
    isFitWidth: true
  }
});

//prodList section에서 상품목록 분류(filter)
$(".prodMenu ul li").click(function () {
  $(".prodMenu ul li").removeClass("active");
  $(this).addClass("active");

  var selector = $(this).attr("data-filter");
  $(".prodList").isotope({
    filter: selector
  });
  return false;
});

//shopping cart 클릭시 수량 증감하기
$("#add-cart").click(function add() {
  var quan = document.querySelector('#cart').getAttribute('data-num');
  var n = Number(quan.innerHTML);
  quan.innerHTML = n + 1;
});