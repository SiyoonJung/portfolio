
//#list 변수로 저장 
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
const per_page = 10; 
const format = "json"; 

// //검색량이 많은 이미지를 요청하는 주소 
// const url1 = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1`; 

//처음 페이지 로딩시 호출되는 메소드 : url1 
//callData(url1);  


// 좋아요 사진 찾기 
const method3 = "flickr.favorites.getList";
const username = "194851816@N07";
const url3 = `${base}method=${method3}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&user_id=${username}`; 

callData(url3);
/*
//이름으로 찾기 
const method4 = "flickr.people.getPhotos";
const username = "187597869@N08";
const url4 = `${base}method=${method4}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&user_id=${username}`; 

callData(url4);
*/

//갤러리 사진 출력하기 
// const method5 ="flickr.galleries.getPhotos";
// const username = "187597869@N08";
// const gallery = "72157720420913425";
// const url5 = `${base}method=${method5}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&user_id=${username}&gallery_id=${gallery}`; 

// callData(url5);

//btnSearch 버튼을 클릭했을 때 
btn.addEventListener("click", e=>{

    //input요소에 value값을 가져옴
    let tag = input.value; 
    tag = tag.trim(); //공백없애기 메소드 
    //키워드를 통한 이미지를 요청하는 주소 
    const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`; 
    
    //input value가 있을 때만  
    if(tag !=""){
        callData(url); 
    }else{
        console.log("검색어를 입력하세요")
    }   
});

//input태그에 값 입력후 엔터키 눌렀을 때 
input.addEventListener("keypress", e=>{
    if(e.keyCode == 13){
        //input요소에 value값을 가져옴
        let tag = input.value; 
        tag = tag.trim(); 
       
        //키워드를 통한 이미지를 요청하는 주소 
        const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`; 

        if(tag !=""){
            callData(url); 
        }else{
            console.log("검색어를 입력하세요")
        }   
    }
}); 

//이벤트 위임으로 리스트 클릭시 동적 레이어팝업 생성  
frame.addEventListener("click", e=>{
    e.preventDefault(); 
 
    if(e.target == frame) return;

    let target = e.target.closest(".item").querySelector(".thumb");
    //console.log(e.target); 
    
    if(e.target == target){
        let imgSrc = target.parentElement.getAttribute("href"); 

        let pop = document.createElement("aside");
        pop.classList.add("pop"); 

        let pops = `
                    <img src="${imgSrc}">
                    <span class="close">close</span>
                    `; 
    
        pop.innerHTML = pops; 
    
        main.append(pop); 
    }else{
        return; 
    }
    
}); 

//pop 제거 이벤트 위임 
body.addEventListener("click", e=>{
    
    let pop = body.querySelector(".pop"); 

    if(pop != null){
        let close = pop.querySelector(".close"); 
        if(e.target == close) pop.remove(); 
    }    
})






 function callData(url){

    //기존에 있는 이미지를 순간적으로 제거 
    frame.innerHTML = ""; 
    //로딩 이미지를 다시 출력 
    loading.classList.remove("off"); 
    //프레임의 on클래스를 지워서 활성화 모션 전 상태로 되돌림 
    frame.classList.remove("on"); 

    fetch(url) 
    .then(data=>{
       let result = data.json(); 
       return result;
    })
    .then(json=>{
       
        let items = json.photos.photo; 
        //console.log(items);
        
        //받아올 데이터가 있는 경우 함수 호출 
        if(items.length > 0){
            createList(items);
            delayLoading(); 
        }else{
            loading.classList.add("off"); 
            console.log("검색하신 이미지의 데이터가 없습니다");
        }
        
    })
 }

//동적으로 리스트 생성 함수 정의 
 function createList(items){
             //htmls 변수에 빈문자열 저장 
             let htmls =""; 
    
             //배열의 갯수만큼 반복처리 
             items.map(data=>{
                 console.log(data); 
         
                 //data정보값을 이용해서 썸네일 이미지 URL 생성 
                 let imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`; 
         
                 let imgSrcBig = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;
         
                 htmls +=`
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
         
             //완성된 DOM문자열을 frame에 삽입해서 동적 리스트 DOM생성 
             frame.innerHTML = htmls;
 }

 function delayLoading(){
      //동적으로 생성된 이미지의 전체 갯수를 구해서 
      const imgs = frame.querySelectorAll("img"); 
      const len = imgs.length; 
      let count = 0; 
     // console.dir(imgs[0]); 
  
      //이미지의 갯수만큼 반복을 돌면서 
      for(let el of imgs){
          //이미지가 하나씩 로딩될때마다 count값을 1씩 증가 
          el.onload =()=>{
              count++; 
  
              //count값이 이미지전체갯수와 같다면 
              //모두 로딩완료됐으므로
              //isoLayout 함수 호출 
              if(count == len) isoLayout(); 
          }
  
          //만약 img DOM요소에 이미지 소스가 없거나 엑박이 뜨게 되면 
          //해당 내용을 숨김처리 
          
        //   let thumb = el.closest(".item").querySelector(".thumb"); 
        //   thumb.onerror = e=>{
        //       e.currentTarget.closest(".item").querySelector("div a img").setAttribute("src", "img/k1.jpg");              
        //   }
        //   let profile = el.closest(".item").querySelector(".profile"); 
        //   profile.onerror = e=>{
        //       e.currentTarget.closest(".item").querySelector("div span img").setAttribute("src","https://combo.staticflickr.com/pw/images/buddyicon09.png"); 
        //   }
      }  
 }


 function isoLayout(){ 
    loading.classList.add("off");
    frame.classList.add("on"); 

     new Isotope("#list",{
         itemSelector :".item", 
         columnWidth : ".item", 
         transitionDuration:"0.5s"
     });
 }

