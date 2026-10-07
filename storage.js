// 本地存储读写
function saveData(arr){
    localStorage.setItem("lostfound", JSON.stringify(arr));
}
function loadData(){
    let str = localStorage.getItem("lostfound");
    return str ? JSON.parse(str) : [];
}

