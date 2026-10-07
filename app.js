let dataList = loadData();
const listWrap = document.getElementById("listWrap");
const addModal = document.getElementById("addModal");
const detailModal = document.getElementById("detailModal");

//渲染卡片
function render(list){
    listWrap.innerHTML = "";
    list.forEach((item,idx)=>{
        let div = document.createElement("div");
        div.className="card";
        div.innerHTML = `
            <h4>${item.name}</h4>
            <p>${item.type==='lost'?'寻物':'招领'}</p>
            <p>状态：${item.status}</p>
        `;
        div.onclick = ()=>showDetail(item,idx);
        listWrap.appendChild(div);
    })
}

//弹窗控制
document.getElementById("addBtn").onclick=()=>addModal.style.display="block";
document.getElementById("closeBtn").onclick=()=>addModal.style.display="none";
document.getElementById("closeDetail").onclick=()=>detailModal.style.display="none";

//提交发布
document.getElementById("submitBtn").onclick = function(){
    let obj = {
        type:document.getElementById("itemType").value,
        name:document.getElementById("itemName").value,
        contact:document.getElementById("itemContact").value,
        desc:document.getElementById("itemDesc").value,
        status:"pending"
    }
    if(!checkItem(obj)){alert("名称和联系方式不能为空");return;}
    dataList.push(obj);
    saveData(dataList);
    render(dataList);
    addModal.style.display="none";
}

//详情展示
let currentIndex;
function showDetail(item,idx){
    currentIndex=idx;
    document.getElementById("detailBody").innerHTML = `
        <p>类型：${item.type==='lost'?'寻物':'招领'}</p>
        <p>物品：${item.name}</p>
        <p>描述：${item.desc}</p>
        <p>联系方式：${item.contact}</p>
        <p>当前状态：${item.status}</p>
    `;
    detailModal.style.display="block";
}
document.getElementById("statusRecover").onclick=()=>{
    changeStatus(dataList[currentIndex],"finished");
    saveData(dataList);render(dataList);
    detailModal.style.display="none";
}

//搜索+筛选联动
function refreshFilter(){
    let kw = document.getElementById("searchInput").value;
    let t = document.getElementById("typeSelect").value;
    let res = searchItems(dataList, kw);
    res = filterByType(res,t);
    render(res);
}
document.getElementById("searchInput").oninput = refreshFilter;
document.getElementById("typeSelect").onchange = refreshFilter;

//页面初始渲染
render(dataList);

