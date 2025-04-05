function loginStatusCheck(){
    if(localStorage.getItem("loginStatus")!=1){
        window.location.href="./login.html"
    }
}
loginStatusCheck();


document.body.style.zoom = "80%";
let tests=JSON.parse(localStorage.getItem("tests"))||[
    {id:1, testName:"Thách thức sự hiểu biết của bạn1", categoryId:1, image:"/assets/images/quiz web design/Container/image 1.png", playTime:15, playAmount:1, questions:[1,2]},
    {id:2, testName:"Thách thức sự hiểu biết của bạn2", categoryId:1, image:"/assets/images/quiz web design/Container/image 1.png", playTime:14, playAmount:2, questions:[1]},
    {id:3, testName:"Thách thức sự hiểu biết của bạn3", categoryId:1, image:"/assets/images/quiz web design/Container/image 1.png", playTime:12, playAmount:3, questions:[2,3,5,6]},
    {id:10, testName:"Thách thức sự hiểu biết của bạn4bbbb", categoryId:1, image:"/assets/images/quiz web design/Container/image 1.png", playTime:15, playAmount:2, questions:[]},
    {id:1, testName:"Thách thức sự hiểu biết của bạnbbbb", categoryId:1, image:"/assets/images/quiz web design/Container/image 1.png", playTime:13, playAmount:5, questions:[]},
    {id:8, testName:"Thách thức sự hiểu biết của bạnbbbb", categoryId:1, image:"/assets/images/quiz web design/Container/image 1.png", playTime:15, playAmount:6, questions:[]},
    {id:5, testName:"Thách thức sự hiểu biết của bạnbbbb", categoryId:1, image:"/assets/images/quiz web design/Container/image 1.png", playTime:11, playAmount:4, questions:[]},
    {id:4, testName:"Thách thức sự hiểu biết của bạnbbbb", categoryId:1, image:"/assets/images/quiz web design/Container/image 1.png", playTime:15, playAmount:8, questions:[]},
    {id:1, testName:"Thách thức sự hiểu biết của bạnbbbb", categoryId:1, image:"/assets/images/quiz web design/Container/image 1.png", playTime:15, playAmount:3, questions:[]},
    {id:7, testName:"Thách thức sự hiểu biết của bạnbbbb", categoryId:1, image:"/assets/images/quiz web design/Container/image 1.png", playTime:25, playAmount:10, questions:[]},
    {id:1, testName:"Thách thức sự hiểu biết của bạnbbbb", categoryId:1, image:"/assets/images/quiz web design/Container/image 1.png", playTime:9, playAmount:5, questions:[]},
    {id:1, testName:"Thách thức sự hiểu biết của bạnbbbb", categoryId:1, image:"/assets/images/quiz web design/Container/image 1.png", playTime:15, playAmount:5, questions:[]},
    {id:9, testName:"Thách thức sự hiểu biết của bạnbbbb", categoryId:1, image:"/assets/images/quiz web design/Container/image 1.png", playTime:1, playAmount:5, questions:[]},
    {id:1, testName:"Thách thức sự hiểu biết của bạnbbbb", categoryId:1, image:"/assets/images/quiz web design/Container/image 1.png", playTime:5, playAmount:5, questions:[]},
    {id:1, testName:"Thách thức sự hiểu biết của bạn", categoryId:1, image:"/assets/images/quiz web design/Container/image 1.png", playTime:3, playAmount:5, questions:[]},
    {id:1, testName:"Thách thức sự hiểu biết của bạn", categoryId:1, image:"/assets/images/quiz web design/Container/image 1.png", playTime:15, playAmount:5, questions:[]},
    {id:1, testName:"Thách thức sự hiểu biết của bạn", categoryId:1, image:"/assets/images/quiz web design/Container/image 1.png", playTime:15, playAmount:5, questions:[]}
];
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
                    <div class="category">🏠 Đời sống</div>
                    <h3>${tests[i].testName}</h3>
                    <div class="testInfo">${tests[i].questions.length} câu hỏi - ${tests[i].playAmount} lượt chơi</div>
                    <button>Chơi</button>
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