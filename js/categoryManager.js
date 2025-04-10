function loginStatusCheck(){
    if(localStorage.getItem("loginStatus")!=1){
        window.location.href="./login.html"
    }
}
loginStatusCheck();


let categories=JSON.parse(localStorage.getItem("categories"))||[];
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
                <td><button onclick="fixCategory(${i})" class="fixButton">Sửa</button> <button onclick="deleteCategory(${i})" class="deleteButton">Xóa</button></td>
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
    document.getElementsByClassName("popUpBackground")[0].style.display="none";
    document.getElementsByClassName("addPopUp")[0].style.display="none";
    document.getElementsByClassName("fixPopUp")[0].style.display="none";
    document.getElementsByClassName("deletePopUp")[0].style.display="none";
    document.getElementsByClassName("redWarning")[0].style.display="none";
    document.getElementsByClassName("redWarning")[1].style.display="none";
    document.getElementsByClassName("redWarning")[2].style.display="none";
    document.getElementsByClassName("redWarning")[3].style.display="none";
    for (let i = 0; i < document.getElementsByClassName("inputBar").length; i++) {
        document.getElementsByClassName("inputBar")[i].value = "";
    }
}
let fixIndex;
function fixCategory(index){
    document.getElementsByClassName("fixPopUp")[0].style.display="block";
    document.getElementsByClassName("popUpBackground")[0].style.display="block";
    document.getElementById("fixCategoryName").value=categories[index].name;
    document.getElementById("fixCategoryEmoji").value=categories[index].emoji;
    fixIndex=index;
}
let deleteIndex;
function deleteCategory(index){
    document.getElementsByClassName("deletePopUp")[0].style.display="block";
    document.getElementsByClassName("popUpBackground")[0].style.display="block";
    deleteIndex=index;
}
function saveCategory(){
    let categoryName=document.getElementById("categoryName").value.trim();
    let categoryEmoji=document.getElementById("categoryEmoji").value.trim();
    if(categoryName.length == 0){
        document.getElementsByClassName("redWarning")[0].style.display="block";
        document.getElementsByClassName("redWarning")[0].textContent="Không được để trống tên danh mục";
        return;
    }else{
        document.getElementsByClassName("redWarning")[0].style.display="none";
    }
    if(categoryEmoji.length == 0){
        document.getElementsByClassName("redWarning")[1].style.display="block";
        document.getElementsByClassName("redWarning")[1].textContent="Không được để trống emoji";
        return;
    } else{
        document.getElementsByClassName("redWarning")[1].style.display="none";
    }
    if(categories.some(categories => categories.name == categoryName)){
        document.getElementsByClassName("redWarning")[0].style.display="block";
        document.getElementsByClassName("redWarning")[0].textContent="Tên danh mục đã tồn tại";
        return;
    } else{
        document.getElementsByClassName("redWarning")[1].style.display="none";
    }
    categories.push({id:(categories.length > 0 ? categories[categories.length - 1].id + 1 : 1)||1, name: categoryName, emoji: categoryEmoji});
    localStorage.setItem("categories", JSON.stringify(categories));
    hidePopUp();
    Swal.fire({
        title: "Thêm thành công",
        icon: "success",
    });
    printCategories();
}
function confirmDelete(){
    let tests=JSON.parse(localStorage.getItem("tests"));
    for (let i = tests.length - 1; i >= 0; i--) {
        if (tests[i].categoryId == categories[deleteIndex].id) {
            tests.splice(i, 1);
        }
    }
    categories.splice(deleteIndex,1);
    localStorage.setItem("tests", JSON.stringify(tests));
    hidePopUp();
    Swal.fire({
        title: "Xóa thành công",
        icon: "success",
    });
    printCategories();
}
function updateCategory(){
    let fixCategoryName=document.getElementById("fixCategoryName").value.trim();
    let fixCategoryEmoji=document.getElementById("fixCategoryEmoji").value.trim();
    if(fixCategoryName.length == 0){
        document.getElementsByClassName("redWarning")[2].style.display="block";
        document.getElementsByClassName("redWarning")[2].textContent="Không được để trống tên danh mục";
        return;
    }else{
        document.getElementsByClassName("redWarning")[2].style.display="none";
    }
    if(fixCategoryEmoji.length == 0){
        document.getElementsByClassName("redWarning")[3].style.display="block";
        document.getElementsByClassName("redWarning")[3].textContent="Không được để trống emoji";
        return;
    } else{
        document.getElementsByClassName("redWarning")[3].style.display="none";
    }
    if(categories.some((categories, index) => (categories.name == fixCategoryName) && index!=fixIndex)){
        document.getElementsByClassName("redWarning")[2].style.display="block";
        document.getElementsByClassName("redWarning")[2].textContent="Tên danh mục đã tồn tại";
        return;
    } else{
        document.getElementsByClassName("redWarning")[2].style.display="none";
    }
    categories[fixIndex].name=fixCategoryName;
    categories[fixIndex].emoji=fixCategoryEmoji;
    localStorage.setItem("categories", JSON.stringify(categories));
    hidePopUp();
    Swal.fire({
        title: "Sửa thành công",
        icon: "success",
    });
    printCategories();
}