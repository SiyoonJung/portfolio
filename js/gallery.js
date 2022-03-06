
const body = document.querySelector("body");
const main = document.querySelector("main");
const frame = document.querySelector("#list");
const loading = document.querySelector(".loading");
const input = document.querySelector("#search");
const btn = document.querySelector(".btnSearch");
const base = "https://www.flickr.com/services/rest/?";
const method1 = "flickr.interestingness.getList";
const method2 = "flickr.photos.search";
const key = "59306e618c1ccae927923d78b847eb75";
const per_page = 15;
const format = "json";

const method3 = "flickr.favorites.getList";
const username = "194851816@N07";
const url3 = `${base}method=${method3}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&user_id=${username}`;

callData(url3);

btn.addEventListener("click", e => {


    let tag = input.value;
    tag = tag.trim();
    const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

    if (tag != "") {
        callData(url);
    } else {
        console.log("검색어를 입력하세요")
    }
});

input.addEventListener("keypress", e => {
    if (e.keyCode == 13) {

        let tag = input.value;
        tag = tag.trim();

        const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

        if (tag != "") {
            callData(url);
        } else {
            console.log("검색어를 입력하세요")
        }
    }
});

frame.addEventListener("click", e => {
    e.preventDefault();

    if (e.target == frame) return;

    let target = e.target.closest(".item").querySelector(".thumb");


    if (e.target == target) {
        let imgSrc = target.parentElement.getAttribute("href");

        let pop = document.createElement("aside");
        pop.classList.add("pop");

        let pops = `
                    <img src="${imgSrc}">
                    <span class="close">close</span>
                    `;

        pop.innerHTML = pops;

        main.append(pop);
    } else {
        return;
    }

});

body.addEventListener("click", e => {

    let pop = body.querySelector(".pop");

    if (pop != null) {
        let close = pop.querySelector(".close");
        if (e.target == close) pop.remove();
    }
})






function callData(url) {

    frame.innerHTML = "";

    loading.classList.remove("off");

    frame.classList.remove("on");

    fetch(url)
        .then(data => {
            let result = data.json();
            return result;
        })
        .then(json => {

            let items = json.photos.photo;

            if (items.length > 0) {
                createList(items);
                delayLoading();
            } else {
                loading.classList.add("off");
                console.log("검색하신 이미지의 데이터가 없습니다");
            }

        })
}


function createList(items) {

    let htmls = "";


    items.map(data => {
        console.log(data);

        let imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`;

        let imgSrcBig = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;

        htmls += `
                         <li class="item">
                             <div>
                                 <a href=${imgSrcBig}>
                                     <img class="thumb" src=${imgSrc}>
                                 </a>
                                 <p>${data.title}</p>
                                 <span>
                                    <img class="profile" src="http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg">
                                    <strong>${data.owner}</strong>
                                 </span>
                             </div>
                         </li>
                 `;
    })

    frame.innerHTML = htmls;
}

function delayLoading() {

    const imgs = frame.querySelectorAll("img");
    const len = imgs.length;
    let count = 0;

    for (let el of imgs) {

        el.onload = () => {
            count++;

            if (count == len) isoLayout();
        }
    }
}


function isoLayout() {
    loading.classList.add("off");
    frame.classList.add("on");

    new Isotope("#list", {
        itemSelector: ".item",
        columnWidth: ".item",
        transitionDuration: "0.5s"
    });
}

