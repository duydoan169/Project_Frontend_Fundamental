function loginStatusCheck(){
    if(localStorage.getItem("loginStatus")!=1){
        window.location.href="./login.html"
    }
}
loginStatusCheck();


let categories=JSON.parse(localStorage.getItem("categories"))||[
    {id:1, name:"Lịch sử", emoji:"📚"},
    {id:2, name:"Lịch sử", emoji:"📚"},
    {id:3, name:"Lịch sử", emoji:"📚"},
    {id:4, name:"Lịch sử", emoji:"📚"},
    {id:5, name:"Lịch sử", emoji:"📚"},
    {id:6, name:"Lịch sử", emoji:"📚"},
    {id:7, name:"Lịch sử", emoji:"📚"},
    {id:8, name:"Lịch sử", emoji:"📚"},
    {id:9, name:"Lịch sử", emoji:"📚"},
    {id:1, name:"Lịch sử", emoji:"📚"},
    {id:2, name:"Lịch sử", emoji:"📚"},
    {id:3, name:"Lịch sử", emoji:"📚"},
    {id:4, name:"Lịch sử", emoji:"📚"},
    {id:5, name:"Lịch sử", emoji:"📚"},
    {id:6, name:"Lịch sử", emoji:"📚"},
    {id:7, name:"Lịch sử", emoji:"📚"},
    {id:8, name:"Lịch sử", emoji:"📚"},
    {id:7, name:"Lịch sử", emoji:"📚"},
    {id:8, name:"Lịch sử", emoji:"📚"}
];
let currentPage=1;
let itemsPerPage=8;
let totalPages = Math.ceil(categories.length / itemsPerPage);
function printCategories(){
    let pageStart=itemsPerPage*(currentPage-1);
    let pageEnd=itemsPerPage*currentPage;
    totalPages = Math.ceil(categories.length / itemsPerPage);
    let str="";
    for(let i=pageStart; i<pageEnd; i++){
        if(i>=categories.length){
            break;
        }
        str+=`
            <tr>
                <td>${categories[i].id}</td>
                <td align="left">${categories[i].emoji} ${categories[i].name}</td>
                <td><button onclick="fixCategory()" class="fixButton">Sửa</button> <button onclick="deleteCategory()" class="deleteButton">Xóa</button></td>
            </tr>`
    }
    document.getElementsByTagName("tbody")[0].innerHTML=str;

    str="";
    for(let i=0; i<totalPages; i++){
        str+=`
        <div onclick="goToPage(${i+1})" class="number ${i+1 == currentPage ? "selected" : ""}">${i+1}</div>`
    }
    document.getElementsByClassName("numbers")[0].innerHTML=str;
    buttonUnavailable();
}
printCategories();
function goToPage(index){
    currentPage=index;
    printCategories();
}
function goBack(){
    if(currentPage>1){
        currentPage--;
        printCategories();
    }
}
function goForward(){
    if(currentPage<totalPages){
        currentPage++;
        printCategories();
    }
}
function buttonUnavailable(){
    if(currentPage==1){
        document.getElementsByClassName("goBack")[0].classList.add("unavailable");
    } else{
        document.getElementsByClassName("goBack")[0].classList.remove("unavailable");
    }
    if(currentPage==totalPages){
        document.getElementsByClassName("goForward")[0].classList.add("unavailable");
    } else{
        document.getElementsByClassName("goForward")[0].classList.remove("unavailable");
    }
}

function addCategory(){
    document.getElementsByClassName("addPopUp")[0].style.display="block";
    document.getElementsByClassName("popUpBackground")[0].style.display="block";
}
function hidePopUp(){
    document.getElementsByClassName("addPopUp")[0].style.display="none";
    document.getElementsByClassName("popUpBackground")[0].style.display="none";
    document.getElementsByClassName("fixPopUp")[0].style.display="none";
    document.getElementsByClassName("deletePopUp")[0].style.display="none";
}
function fixCategory(){
    document.getElementsByClassName("fixPopUp")[0].style.display="block";
    document.getElementsByClassName("popUpBackground")[0].style.display="block";
}
function deleteCategory(){
    document.getElementsByClassName("deletePopUp")[0].style.display="block";
    document.getElementsByClassName("popUpBackground")[0].style.display="block";
}