//header: 모바일 버전에서의 메뉴 구현(using toggle)
const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

btnCall.onclick = function (e) {
  e.preventDefault();

  btnCall.classList.toggle("on");
  menuMo.classList.toggle("on");
}

//visual section: swiper
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

//produtcs section: istope 이용한 상품들 정렬
$(".prodList").isotope({
  itemSelector: '.prod',
  layoutMode: 'fitRows',
  masonry: {
    columnWidth: 15,
    isFitWidth: true
  }
});

//products section: istope 적용시 overlay 문제해결
jQuery(document).ready(function ($) {
  var $grid = $('.prodList').isotope({
      itemSelector: '.prod',
      layoutMode: 'masonry'
  });
  $grid.imagesLoaded().progress(function() {
    setTimeout (function(){
      $grid.isotope('layout');
    }, 200);
  });
});

//products section: 상품목록 분류(filter)
$(".prodMenu ul li").click(function () {
  $(".prodMenu ul li").removeClass("active");
  $(this).addClass("active");

  var selector = $(this).attr("data-filter");
  $(".prodList").isotope({
    filter: selector
  });
  return false;
});
