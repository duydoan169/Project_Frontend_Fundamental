function loginStatusCheck(){
    if(localStorage.getItem("loginStatus")!=1){
        window.location.href="./login.html"
    }
}
loginStatusCheck();

let categories=JSON.parse(localStorage.getItem("categories"));
let tests=JSON.parse(localStorage.getItem("tests"))||[];
    
localStorage.setItem("tests", JSON.stringify(tests));
let currentPage=1;
let itemsPerPage=8;
let totalPages = Math.ceil(tests.length / itemsPerPage);

//khai báo các giá trị tìm kiếm
let searchedValue=document.getElementsByClassName("searchByName")[0].value.trim();
let searchedTests=tests.filter(item => item.testName.toLowerCase().includes(searchedValue.toLowerCase()));
let totalSearchedPages=Math.ceil(searchedTests.length / itemsPerPage);


function printTests(){
    let pageStart=itemsPerPage*(currentPage-1);
    let pageEnd=itemsPerPage*currentPage;
    totalPages = Math.ceil(tests.length / itemsPerPage);
    let sortBy=document.getElementById("sortByOthers").value;
    if (sortBy == "name") {
        tests.sort((a,b) => a.testName.localeCompare(b.testName));
    } else if(sortBy=="questionNum"){
        tests.sort((a,b) => a.questions.length - b.questions.length);
    } else if(sortBy=="time"){
        tests.sort((a,b) => a.playTime - b.playTime);
    }
    let str="";
    for(let i=pageStart; i<pageEnd; i++){
        if(i>=tests.length){
            break;
        }
        str+=`
            <tr>
                <td>${tests[i].id}</td>
                <td align="left">${tests[i].testName}</td>
                <td align="left">${categories[categories.findIndex(item => item.id == tests[i].categoryId)].emoji} ${categories[categories.findIndex(item => item.id == tests[i].categoryId)].name}</td>
                <td align="left">${tests[i].questions.length}</td>
                <td align="left">${tests[i].playTime} min</td>
                <td><button onclick="fixTest(${tests[i].id})" class="fixButton">Sửa</button> <button onclick="deleteTest(${tests[i].id})" class="deleteButton">Xóa</button></td>
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
    if(searchedValue.length==0){
        printTests();
    } else{
        searchByName();
    }
}
function goBack(){
    if(currentPage>1){
        currentPage--;
        if(searchedValue.length==0){
            printTests();
        } else{
            searchByName();
        }
    }
}
function goForward(){
    if(searchedValue.length==0){
        if(currentPage<totalPages){
            currentPage++;
            printTests();
        }
    } else{
        if(currentPage<totalSearchedPages){
            currentPage++;
            searchByName();
        }
    }
}
function buttonUnavailable(){
    if(searchedValue.length==0){
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
    } else{
        if(currentPage==1){
            document.getElementsByClassName("goBack")[0].classList.add("unavailable");
        } else{
            document.getElementsByClassName("goBack")[0].classList.remove("unavailable");
        }
        if(currentPage==totalSearchedPages){
            document.getElementsByClassName("goForward")[0].classList.add("unavailable");
        } else{
            document.getElementsByClassName("goForward")[0].classList.remove("unavailable");
        }
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


function searchByName(){
    searchedValue=document.getElementsByClassName("searchByName")[0].value.trim();
    if(searchedValue.length>0){
        searchedTests=tests.filter(item => item.testName.toLowerCase().includes(searchedValue.toLowerCase()));
        let pageStart=itemsPerPage*(currentPage-1);
        let pageEnd=itemsPerPage*currentPage;
        totalSearchedPages=Math.ceil(searchedTests.length / itemsPerPage);
        let sortBy=document.getElementById("sortByOthers").value;
        if (sortBy == "name") {
            searchedTests.sort((a,b) => a.testName.localeCompare(b.testName));
        } else if(sortBy=="questionNum"){
            searchedTests.sort((a,b) => a.questions.length - b.questions.length);
        } else if(sortBy=="time"){
            searchedTests.sort((a,b) => a.playTime - b.playTime);
        }
        let str="";
        for(let i=pageStart; i<pageEnd; i++){
            if(i>=searchedTests.length){
                break;
            }
            str+=`
                <tr>
                    <td>${searchedTests[i].id}</td>
                    <td align="left">${searchedTests[i].testName}</td>
                    <td align="left">${categories[categories.findIndex(item => item.id == searchedTests[i].categoryId)].emoji} ${categories[categories.findIndex(item => item.id == searchedTests[i].categoryId)].name}</td>
                    <td align="left">${searchedTests[i].questions.length}</td>
                    <td align="left">${searchedTests[i].playTime} min</td>
                    <td><button onclick="fixTest(${searchedTests[i].id})" class="fixButton">Sửa</button> <button onclick="deleteTest(${searchedTests[i].id})" class="deleteButton">Xóa</button></td>
                </tr>`
        }
        document.getElementsByTagName("tbody")[0].innerHTML=str;

        str="";
        for(let i=0; i<totalSearchedPages; i++){
            str+=`
            <div onclick="goToPage(${i+1})" class="number ${i+1 == currentPage ? "selected" : ""}">${i+1}</div>`
        }
        document.getElementsByClassName("numbers")[0].innerHTML=str;
        buttonUnavailable();
    }else{
        printTests();
    }
}

function sortByOthers(){
    if(searchedValue.length==0){
        printTests();
    } else{
        searchByName();
    }
}
let deleteIndex;
function deleteTest(deleteId){
    document.getElementsByClassName("deletePopUp")[0].style.display="block";
    document.getElementsByClassName("popUpBackground")[0].style.display="block";
    for(let i=0; i<tests.length; i++){
        if(tests[i].id == deleteId){
            deleteIndex=i;
        }
    }
}
function confirmDelete(){
    tests.splice(deleteIndex,1);
    localStorage.setItem("tests", JSON.stringify(tests));
    hidePopUp();
    Swal.fire({
        title: "Xóa thành công",
        icon: "success",
    });
    printTests();
}
function fixTest(id){
    localStorage.setItem("fixTestId", id);
    window.location.href="./fixTests.html";
}