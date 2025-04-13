function loginStatusCheck(){
    if(localStorage.getItem("loginStatus")!=1){
        window.location.href="./login.html"
    }
}
loginStatusCheck();
let fixTestId=localStorage.getItem("fixTestId")||0;
let categories=JSON.parse(localStorage.getItem("categories"))||[];
let tests=JSON.parse(localStorage.getItem("tests"))||[];
let fixTestIndex=0;
for(let i=0; i<tests.length; i++){
    if(tests[i].id == fixTestId){
        fixTestIndex=i;
        break;
    }
}
document.getElementById("testNameInput").value=tests[fixTestIndex].testName;
document.getElementById("testTimeInput").value=tests[fixTestIndex].playTime;
function printTestQuestions(){
    let str="";
    for(let i=0; i<tests[fixTestIndex].questions.length; i++){
        str+=`
            <tr>
                <td>${tests[fixTestIndex].questions[i].id}</td>
                <td align="left">${tests[fixTestIndex].questions[i].content}</td>
                <td><button onclick="fixQuestion(${i})" class="fixButton">Sửa</button> <button onclick="deleteQuestion(${i})" class="deleteButton">Xóa</button></td>
            </tr>`
    }
    document.getElementsByTagName("tbody")[0].innerHTML=str;
}
function printCategoryOptions(){
    let str="";
    for(let i=0; i<categories.length; i++){
        str+=`
            <option ${tests[fixTestIndex].categoryId == categories[i].id ? "selected" : ""} value="${categories[i].id}">${categories[i].emoji} ${categories[i].name}</option>`
    }
    document.getElementsByTagName("select")[0].innerHTML+=str;
}
printTestQuestions();
printCategoryOptions();
function hidePopUp(){
    document.getElementsByClassName("popUpBackground")[0].style.display="none";
    document.getElementsByClassName("addPopUp")[0].style.display="none";
    document.getElementsByClassName("deletePopUp")[0].style.display="none";
    document.getElementsByClassName("fixPopUp")[0].style.display="none";
    document.getElementsByClassName("inputBar")[0].value="";
    document.getElementsByClassName("inputBar")[1].value="";
    document.getElementsByClassName("inputBar")[2].value="";
    document.getElementsByClassName("inputBar")[3].value="";
    document.getElementsByClassName("inputBar")[4].value="";
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    document.querySelectorAll('.redWarning').forEach( redWarning => {
        redWarning .style.display="none";
    });
}
let deleteIndex;
function deleteQuestion(index){
    document.getElementsByClassName("deletePopUp")[0].style.display="block";
    document.getElementsByClassName("popUpBackground")[0].style.display="block";
    deleteIndex=index;
}
function confirmDelete(){
    tests[fixTestIndex].questions.splice(deleteIndex,1);
    hidePopUp();
    Swal.fire({
        title: "Xóa thành công",
        icon: "success",
    });
    printTestQuestions();
}
function addQuestion(){
    document.getElementsByClassName("popUpBackground")[0].style.display="block";
    document.getElementsByClassName("addPopUp")[0].style.display="block";
}
let fixQuestionIndex;
function fixQuestion(index){
    document.getElementsByClassName("popUpBackground")[0].style.display="block";
    document.getElementsByClassName("fixPopUp")[0].style.display="block";
    document.getElementsByClassName("inputBar")[5].value=tests[fixTestIndex].questions[index].content;
    document.getElementsByClassName("inputBar")[6].value=tests[fixTestIndex].questions[index].answers[0].answer;
    document.getElementsByClassName("inputBar")[7].value=tests[fixTestIndex].questions[index].answers[1].answer;
    document.getElementsByClassName("inputBar")[8].value=tests[fixTestIndex].questions[index].answers[2].answer;
    document.getElementsByClassName("inputBar")[9].value=tests[fixTestIndex].questions[index].answers[3].answer;
    fixQuestionIndex=index;
}
function saveTest(){
    if(document.getElementById("testNameInput").value.trim().length==0){
        document.getElementsByClassName("redWarning")[0].style.display="block";
        document.getElementsByClassName("redWarning")[0].textContent="Không được để trống tên bài test";
        return;
    } else{
        document.getElementsByClassName("redWarning")[0].style.display="none";
    }
    if(tests.some((tests, index) => (tests.testName == document.getElementById("testNameInput").value.trim() && (index!=fixTestIndex)))){
        document.getElementsByClassName("redWarning")[0].style.display="block";
        document.getElementsByClassName("redWarning")[0].textContent="Tên bài test đã tồn tại";
        return;
    } else{
        document.getElementsByClassName("redWarning")[0].style.display="none";
    }
    if(document.getElementById("testCategoryInput").value.trim().length==0){
        document.getElementsByClassName("redWarning")[1].style.display="block";
        document.getElementsByClassName("redWarning")[1].textContent="Không được để trống danh mục";
        return;
    } else{
        document.getElementsByClassName("redWarning")[1].style.display="none";
    }
    if(document.getElementById("testTimeInput").value.trim().length==0){
        document.getElementsByClassName("redWarning")[2].style.display="block";
        document.getElementsByClassName("redWarning")[2].textContent="Không được để trống thời gian làm bài";
        return;
    } else{
        document.getElementsByClassName("redWarning")[2].style.display="none";
    }
    if(document.getElementById("testTimeInput").value<=0 || document.getElementById("testTimeInput").value>120 || !Number.isInteger(Number(document.getElementById("testTimeInput").value))){
        document.getElementsByClassName("redWarning")[2].style.display="block";
        document.getElementsByClassName("redWarning")[2].textContent="Thời gian làm bài phải là số nguyên dương và <=120";
        return;
    } else{
        document.getElementsByClassName("redWarning")[2].style.display="none";
    }
    if(tests[fixTestIndex].questions.length==0){
        Swal.fire("Bài test phải có ít nhất 1 câu hỏi!");
        return;
    }
    tests[fixTestIndex].testName=document.getElementById("testNameInput").value.trim();
    tests[fixTestIndex].categoryId=document.getElementById("testCategoryInput").value;
    tests[fixTestIndex].image="/assets/images/quiz web design/Container/image 1.png";
    tests[fixTestIndex].playTime=document.getElementById("testTimeInput").value.trim();
    localStorage.setItem("tests", JSON.stringify(tests));
    window.location.href="/pages/testManager.html"
}

function saveQuestion(){
    if(document.getElementsByClassName("inputBar")[0].value.trim().length==0){
        document.getElementsByClassName("redWarning")[3].style.display="block";
        document.getElementsByClassName("redWarning")[3].textContent="Không được để trống tên câu hỏi";
        return;
    } else{
        document.getElementsByClassName("redWarning")[3].style.display="none";
    }
    if(document.getElementsByClassName("inputBar")[1].value.trim().length==0){
        document.getElementsByClassName("redWarning")[4].style.display="block";
        document.getElementsByClassName("redWarning")[4].textContent="Không được để trống câu trả lời";
        return;
    } else{
        document.getElementsByClassName("redWarning")[4].style.display="none";
    }
    if(document.getElementsByClassName("inputBar")[2].value.trim().length==0){
        document.getElementsByClassName("redWarning")[5].style.display="block";
        document.getElementsByClassName("redWarning")[5].textContent="Không được để trống câu trả lời";
        return;
    } else{
        document.getElementsByClassName("redWarning")[5].style.display="none";
    }
    if(document.getElementsByClassName("inputBar")[3].value.trim().length==0){
        document.getElementsByClassName("redWarning")[6].style.display="block";
        document.getElementsByClassName("redWarning")[6].textContent="Không được để trống câu trả lời";
        return;
    } else{
        document.getElementsByClassName("redWarning")[6].style.display="none";
    }
    if(document.getElementsByClassName("inputBar")[4].value.trim().length==0){
        document.getElementsByClassName("redWarning")[7].style.display="block";
        document.getElementsByClassName("redWarning")[7].textContent="Không được để trống câu trả lời";
        return;
    } else{
        document.getElementsByClassName("redWarning")[7].style.display="none";
    }
    let newQuestions={
        id:(tests[fixTestIndex].questions.length > 0 ? tests[fixTestIndex].questions[tests[fixTestIndex].questions.length - 1].id + 1 : 1),
        content:document.getElementsByClassName("inputBar")[0].value.trim(),
        answers:[
            {answer:document.getElementsByClassName("inputBar")[1].value.trim()},
            {answer:document.getElementsByClassName("inputBar")[2].value.trim()},
            {answer:document.getElementsByClassName("inputBar")[3].value.trim()},
            {answer:document.getElementsByClassName("inputBar")[4].value.trim()}
        ]
    };
    tests[fixTestIndex].questions.push(newQuestions);   
    printTestQuestions();
    hidePopUp();
}
function saveFixedQuestion(){
    if(document.getElementsByClassName("inputBar")[5].value.trim().length==0){
        document.getElementsByClassName("redWarning")[8].style.display="block";
        document.getElementsByClassName("redWarning")[8].textContent="Không được để trống tên câu hỏi";
        return;
    } else{
        document.getElementsByClassName("redWarning")[8].style.display="none";
    }
    if(document.getElementsByClassName("inputBar")[6].value.trim().length==0){
        document.getElementsByClassName("redWarning")[9].style.display="block";
        document.getElementsByClassName("redWarning")[9].textContent="Không được để trống câu trả lời";
        return;
    } else{
        document.getElementsByClassName("redWarning")[9].style.display="none";
    }
    if(document.getElementsByClassName("inputBar")[7].value.trim().length==0){
        document.getElementsByClassName("redWarning")[10].style.display="block";
        document.getElementsByClassName("redWarning")[10].textContent="Không được để trống câu trả lời";
        return;
    } else{
        document.getElementsByClassName("redWarning")[10].style.display="none";
    }
    if(document.getElementsByClassName("inputBar")[8].value.trim().length==0){
        document.getElementsByClassName("redWarning")[11].style.display="block";
        document.getElementsByClassName("redWarning")[11].textContent="Không được để trống câu trả lời";
        return;
    } else{
        document.getElementsByClassName("redWarning")[11].style.display="none";
    }
    if(document.getElementsByClassName("inputBar")[9].value.trim().length==0){
        document.getElementsByClassName("redWarning")[12].style.display="block";
        document.getElementsByClassName("redWarning")[12].textContent="Không được để trống câu trả lời";
        return;
    } else{
        document.getElementsByClassName("redWarning")[12].style.display="none";
    }
    tests[fixTestIndex].questions[fixQuestionIndex].content=document.getElementsByClassName("inputBar")[5].value.trim();
    tests[fixTestIndex].questions[fixQuestionIndex].answers[0].answer=document.getElementsByClassName("inputBar")[6].value.trim();
    tests[fixTestIndex].questions[fixQuestionIndex].answers[1].answer=document.getElementsByClassName("inputBar")[7].value.trim();
    tests[fixTestIndex].questions[fixQuestionIndex].answers[2].answer=document.getElementsByClassName("inputBar")[8].value.trim();
    tests[fixTestIndex].questions[fixQuestionIndex].answers[3].answer=document.getElementsByClassName("inputBar")[9].value.trim();
    Swal.fire({
        title: "Sửa câu hỏi thành công",
        icon: "success",
    });
    hidePopUp();
}