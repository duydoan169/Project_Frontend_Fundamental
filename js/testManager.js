function loginStatusCheck(){
    if(localStorage.getItem("loginStatus")!=1){
        window.location.href="./login.html"
    }
}
loginStatusCheck();


let tests=JSON.parse(localStorage.getItem("tests"))||[];
let currentPage=1;
let itemsPerPage=8;
let totalPages = Math.ceil(tests.length / itemsPerPage);
function printTests(){
    let pageStart=itemsPerPage*(currentPage-1);
    let pageEnd=itemsPerPage*currentPage;
    totalPages = Math.ceil(tests.length / itemsPerPage);
    let str="";
    for(let i=pageStart; i<pageEnd; i++){
        if(i>=tests.length){
            break;
        }
        str+=`
            <tr>
                <td>${tests[i].id}</td>
                <td align="left">${tests[i].testName}</td>
                <td align="left">📚 Lịch sử</td>
                <td align="left">${tests[i].questions.length}</td>
                <td align="left">${tests[i].playTime} min</td>
                <td><button class="fixButton">Sửa</button> <button onclick="deleteTest()" class="deleteButton">Xóa</button></td>
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
printTests();
function goToPage(index){
    currentPage=index;
    printTests();
}
function goBack(){
    if(currentPage>1){
        currentPage--;
        printTests();
    }
}
function goForward(){
    if(currentPage<totalPages){
        currentPage++;
        printTests();
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
function hidePopUp(){
    document.getElementsByClassName("popUpBackground")[0].style.display="none";
    document.getElementsByClassName("deletePopUp")[0].style.display="none";
}
function deleteTest(){
    document.getElementsByClassName("deletePopUp")[0].style.display="block";
    document.getElementsByClassName("popUpBackground")[0].style.display="block";
}

