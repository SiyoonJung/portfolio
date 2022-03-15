//visual section: slide 구현
var slides = document.querySelectorAll("#slides");
var next = document.getElementById("slide-next");
var prev = document.getElementById("slide-prev");
var current = 0;
showSlides(current);
prev.onclick = prevSlide;
next.onclick = nextSlide;

function showSlides(n) {
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[n].style.display = "block";
}

function prevSlide() {
  if (current > 0) current -= 1;
  else current = slides.length - 1;
  showSlides(current);
}

function nextSlide() {
  if (current < slides.length - 1) current += 1;
  else current = 0;
  showSlides(current);
}

// 슬라이드 자동 재생
// showSlides(current); 를 showSlides();로 바꾸고
// function showSlides() {
//   var slides = document.querySelectorAll("#slides");
//   for (let i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   current++;
//   if (current > slides.length)
//     current = 1;
//   slides[current - 1].style.display = "block";
//   setTimeout(showSlides, 2000);
// }


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
  $grid.imagesLoaded().progress(function () {
    setTimeout(function () {
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