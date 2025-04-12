function loginStatusCheck(){
    if(localStorage.getItem("loginStatus")!=1){
        window.location.href="./login.html"
    }
}
loginStatusCheck();

let tests=JSON.parse(localStorage.getItem("tests"))||[];
let currentTestId=localStorage.getItem("currentTestId")||1;
let currentTestIndex=0;
let currentQuestion=0;
for(let i=0; i<tests.length; i++){
    if(currentTestId==tests[i].id){
        currentTestIndex=i;
    }
}
document.getElementsByTagName("h1")[1].innerText=tests[currentTestIndex].testName;
document.getElementsByTagName("p")[1].innerText=`Thời gian: ${tests[currentTestIndex].playTime} phút`;
document.getElementsByTagName("p")[2].innerText=`Còn lại: ${tests[currentTestIndex].playTime-1}:59 phút`;
function printAll(){
    let str="";
    for(let i=0; i<tests[currentTestIndex].questions.length; i++){
        str+=`
            <div onclick="goToQuestion(${i})" class="questions ${(currentQuestion==i)? "selected" : ""}">
                ${i+1}
            </div>`
    }
    document.getElementsByClassName("nav")[0].innerHTML=str;
    for(let i=0; i<tests[currentTestIndex].questions.length; i++){
        document.getElementsByTagName("h2")[1].innerText=`Câu hỏi ${currentQuestion+1} trên ${tests[currentTestIndex].questions.length}:`;
        document.getElementsByTagName("p")[0].innerText=`${tests[currentTestIndex].questions[currentQuestion].content}`;
    }
    let answers="";
    for(let i=0; i<tests[currentTestIndex].questions[currentQuestion].answers.length; i++){
        answers+=`
            <div class="answer">
                <input type="checkbox">
                <label for="">${tests[currentTestIndex].questions[currentQuestion].answers[i].answer}</label>
            </div>`
    }
    document.getElementsByClassName("answers")[0].innerHTML=answers;

}
printAll();
function goToQuestion(index){
    currentQuestion=index;
    printAll();
}
function goBack(){
    if(currentQuestion>0){
        currentQuestion--;
        printAll();
    }
}
function goForward(){
    if(currentQuestion<tests[currentTestIndex].questions.length-1){
        currentQuestion++;
        printAll();
    }
}
function hidePopUp(){
    document.getElementsByClassName("popUpBackground")[0].style.display="none";
    document.getElementsByClassName("resultPopUp")[0].style.display="none";
}
function testDone(){
    document.getElementsByClassName("popUpBackground")[0].style.display="block";
    document.getElementsByClassName("resultPopUp")[0].style.display="block";
    document.getElementById("totalQuestionsNum").innerText=tests[currentTestIndex].questions.length;
    document.getElementById("correctAnswersNum").innerText=tests[currentTestIndex].questions.length;
    tests[currentTestIndex].playAmount+=1;
    localStorage.setItem("tests", JSON.stringify(tests));
}