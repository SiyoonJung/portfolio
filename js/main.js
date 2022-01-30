
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 15,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  
  const btnCall = document.querySelector(".btnCall");
  const menuMo = document.querySelector(".menuMo");
  
  
  btnCall.onclick = function (e) {
    e.preventDefault();
  
    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
  }
  
  let containers = document.querySelectorAll(".container");
  
  containers.forEach((container) => {
    container.addEventListener("click", () => {
      container.classList.toggle('active');
    });
  });
  