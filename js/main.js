// prodList에 istope 적용 시 folded(overlay) 되는 문제 해결
$(window).load(function() {
  $.getScript(`https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.js`, function() { })
});

//visual section의 swiper
var swiper = new Swiper(".swiper", {
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
  },
  autoplay : {  
    delay : 2000,   
    disableOnInteraction : false, 
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//모바일 버전에서의 메뉴 구현(using toggle)
const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");


btnCall.onclick = function (e) {
  e.preventDefault();

  btnCall.classList.toggle("on");
  menuMo.classList.toggle("on");
}

// 상품 목록 분류 기능(filter)
$(".prodList").isotope({
  itemSelector: '.prod',
  layoutMode: 'fitRows',
  masonry: {
    columnWidth: 10,
    isFitWidth: true
    }
});

//상품 목록 분류하기(filter)
$(".prodMenu ul li").click(function () {
  $(".prodMenu ul li").removeClass("active");
  $(this).addClass("active");

  var selector = $(this).attr("data-filter");
  $(".prodList").isotope({
    filter: selector
  });
  return false;
});

//shopping cart 수량 증감하기
$(document).on("click", "#add-cart", function(){
  $("#cart").attr("data-num").spinner({
    max:10000, min:0, step:1
  });
});

