
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

const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");


btnCall.onclick = function (e) {
  e.preventDefault();

  btnCall.classList.toggle("on");
  menuMo.classList.toggle("on");
}

/* ------------ Isotope ------------*/
$(".prodList").isotope({
  itemSelector: '.prod',
  layoutMode: 'fitRows',
  masonry: {
    columnWidth: 20,
    isFitWidth: true
    }
});

$(".prodMenu ul li").click(function () {
  $(".prodMenu ul li").removeClass("active");
  $(this).addClass("active");

  var selector = $(this).attr("data-filter");
  $(".prodList").isotope({
    filter: selector
  });
  return false;
});