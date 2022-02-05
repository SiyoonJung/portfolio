
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
    columnWidth: 10,
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
/* ----- Typing Effect ----- */
function randomiseDelay(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}


/* ----- Typing Effect ----- */

function randomiseDelay(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function typeWrite(el){
  el.addClass('cursor')
  var text = el.data('string');
  var delay = parseInt(el.data('delay'));
  var randInt = 0;
  for (var i = 0; i < text.length; i++) {
    randInt += parseInt(randomiseDelay(50,100));
    var typing = setTimeout(function(y){
      el.append(text.charAt(y));
    },randInt, i);
  };
}

typeWrite($(".title"));