function loginStatusCheck(){
    if(localStorage.getItem("loginStatus")!=1){
        window.location.href="./login.html"
    }
}
loginStatusCheck();


document.body.style.zoom = "80%";
let categories=JSON.parse(localStorage.getItem("categories"))||[];
let tests=JSON.parse(localStorage.getItem("tests"))||[];
localStorage.setItem("tests", JSON.stringify(tests));
let currentPage=1;
let itemsPerPage=8;
let totalPages = Math.ceil(tests.length / itemsPerPage);
function printTests(){
    let pageStart=itemsPerPage*(currentPage-1);
    let pageEnd=itemsPerPage*currentPage;
    totalPages = Math.ceil(tests.length / itemsPerPage);

    if(localStorage.getItem("homeSortOrder")==1){
        tests.sort((a,b)=> b.playAmount - a.playAmount);
        document.getElementsByClassName("ascending")[0].classList.remove("selected");
        document.getElementsByClassName("decending")[0].classList.add("selected");    
    } else{
        tests.sort((a,b)=> a.playAmount - b.playAmount);
        document.getElementsByClassName("ascending")[0].classList.add("selected");
        document.getElementsByClassName("decending")[0].classList.remove("selected");
    }

    let str="";
    for(let i=pageStart; i<pageEnd; i++){
        if (i >= tests.length){
            break;
        }
        str+=`
            <div class="card">
                <img src="${tests[i].image}" alt="" width="120px" height="120px">
                <div class="card-text">
                    <div class="category">${categories[categories.findIndex(item => item.id == tests[i].categoryId)].emoji} ${categories[categories.findIndex(item => item.id == tests[i].categoryId)].name}</div>
                    <h3>${tests[i].testName}</h3>
                    <div class="testInfo">${tests[i].questions.length} câu hỏi - ${tests[i].playAmount} lượt chơi</div>
                    <button onclick="takeTest(${tests[i].id})">Chơi</button>
                </div>
            </div>`
    }
    document.getElementsByClassName("content")[0].innerHTML=str;
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
function sortAscending(){
    localStorage.setItem("homeSortOrder", 0);
    printTests();
}
function sortDecending(){
    localStorage.setItem("homeSortOrder", 1);
    printTests();
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
function takeTest(id){
    localStorage.setItem("currentTestId", id);
    window.location.href="/pages/testTakingPage.html";
}
function randomTest(){
    let randomTest=Math.round(Math.random()*tests.length);
    localStorage.setItem("currentTestId", randomTest);
    window.location.href="/pages/testTakingPage.html";
}