//전체페이지 공통 영역인 header, footer 불러오기
fetch("header.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("header").innerHTML = data;

        //데이터 불러온 후, header 내 작동해야 할 script 구문
        const btnCall = document.querySelector(".btnCall");
        const menuMo = document.querySelector(".menuMo");

        window.addEventListener("load", function () {
            btnCall.onclick = function (e) {
                e.preventDefault();
                btnCall.classList.toggle("on");
                menuMo.classList.toggle("on");
            }
        });
    });

fetch("footer.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("footer").innerHTML = data;
    });
