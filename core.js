//表单校验
function checkItem(item){
  if(!item.name || item.name.trim()==="") return false;
  if(!item.contact || item.contact.trim()==="") return false;
  return true;
}
//关键词搜索
function searchItems(list, keyword){
  if(!keyword.trim()) return list;
  return list.filter( x=> x.name.includes(keyword) );
}
//类型筛选
function filterByType(list, type){
  if(type === "all") return list;
  return list.filter(item => item.type === type);
}
//修改状态
function changeStatus(item, newStatus){
  item.status = newStatus;
  return item;
}

