//필요한 변수 설정
const vidList = document.querySelector(".vidList");
const key = 'AIzaSyA1fDMXcSMZ5dv0-Ri9Yo532XvYPQeV_fE';
const playlistId = 'PLr8jYWsFcIRgGiSValZTDq9NCaQPbveOF';
const num = 8;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

//url에서 데이터 호출
fetch(url)
    .then(data => {
        return data.json();
    })
    .then(json => {

        let items = json.items;
        console.log(items);
        let result = '';

        items.map(item => {
            //제목(title): 길이가 30 초과할 시 뒤는 ...으로 표시
            let title = item.snippet.title;
            if (title.length > 30) {
                title = title.substr(0, 30) + "...";
            }
            //설명(description): 길이가 100 초과할 시 뒤는 ...으로 표시
            let con = item.snippet.description;
            if (con.length > 100) {
                con = con.substr(0, 100) + "...";
            }
            //날짜(date): split함수 이용해서 '배열'로 전환한 뒤 첫번째 값으로 설정
            let date = item.snippet.publishedAt;
            date = date.split("T")[0];

            //비어있던 변수 result에 아래의 형식으로 채워넣음
            result += `
                <article>
                    <a href="${item.snippet.resourceId.videoId}" class="pic">
                        <img src="${item.snippet.thumbnails.medium.url}">
                        <i class="fas fa-play"></i>
                    </a>
                    <div class="con">
                        <h2>${title}</h2>
                        <p>${con}</p>
                        <span>${date}</span>
                    </div>
                </article>
        `;
        })

        vidList.innerHTML = result;
    });

//이벤트 위임으로 썸네일 클릭시 영상iframe 팝업 만들기
vidList.addEventListener("click", e => {
    e.preventDefault();

    if (!e.target.closest("a")) return;
    const vidId = e.target.closest("a").getAttribute("href");
    let pop = document.createElement("figure");
    pop.classList.add("pop");
    pop.innerHTML = `
                    <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
                    <span class="btnClose">close</span>
    `;

    vidList.append(pop);
});

//영상 클릭시 popup창 뜨고 재생 & close버튼 누르면 닫힘
vidList.addEventListener("click", e => {
    const pop = vidList.querySelector(".pop");
    if (pop) {
        const close = pop.querySelector("span");
        if (e.target == close) pop.remove();

    }

})