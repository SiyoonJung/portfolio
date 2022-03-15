const dts = document.querySelectorAll("dt");
const dds = document.querySelectorAll("dd");
const dts_a = document.querySelectorAll("dt>a");

//dt의 갯수만큼 반복을 돌면서 dt에 이벤트를 바인딩 
dts.forEach((dt, index) => {

    //dt를 클릭했을 때 
    dt.addEventListener("click", e => {
        e.preventDefault(); //기본링크이동방지 

        // console.log(index); 
        //버튼을 클릭했을 때 활성화가 되어있는지 판별하여 
        //이미 활성화되어있다면 아래 함수 호출하지않고 종료 
        let isOn = e.currentTarget.classList.contains("active");
        if (isOn) return;

        activation(dts, index);
        activation(dds, index);
    });
});

//활성화 함수 정의
//반복을 돌면서 모든 dt,dd에 on을 제거하고 
//해당순번의 dt,dd에 on 추가 
function activation(items, index) {
    for (let el of items) {
        el.classList.remove("active");
    }
    items[index].classList.add("active");
} 
