function loginStatusCheck(){
    if(localStorage.getItem("loginStatus")!=1){
        window.location.href="./login.html"
    }
}
loginStatusCheck();

let categories=JSON.parse(localStorage.getItem("categories"));
let tests=JSON.parse(localStorage.getItem("tests"))||[
    {"id": 1, "testName": "Logic đỉnh cao", "categoryId": 1, "image": "/assets/images/quiz web design/Container/image 1.png", "playTime": 16, "playAmount": 4, "questions": [{"id": 1, "content": "Căn bậc hai của 16 là bao nhiêu?", "answers": [{"answer": "4"}, {"answer": "2"}, {"answer": "8"}, {"answer": "6"}]}, {"id": 2, "content": "2 + 2 bằng mấy?", "answers": [{"answer": "4"}, {"answer": "3"}, {"answer": "5"}, {"answer": "2"}]}, {"id": 3, "content": "Hành tinh nào được gọi là Hành tinh Đỏ?", "answers": [{"answer": "Sao Hỏa"}, {"answer": "Sao Kim"}, {"answer": "Sao Mộc"}, {"answer": "Sao Thổ"}]}, {"id": 4, "content": "Thủ đô của Pháp là gì?", "answers": [{"answer": "Paris"}, {"answer": "Lyon"}, {"answer": "Marseille"}, {"answer": "Nice"}]}]},
    {"id": 2, "testName": "Hiểu biết xã hội", "categoryId": 4, "image": "/assets/images/quiz web design/Container/image 1.png", "playTime": 19, "playAmount": 3, "questions": [{"id": 1, "content": "2 + 2 bằng mấy?", "answers": [{"answer": "4"}, {"answer": "3"}, {"answer": "5"}, {"answer": "2"}]}, {"id": 2, "content": "Ký hiệu hóa học của vàng là gì?", "answers": [{"answer": "Au"}, {"answer": "Ag"}, {"answer": "Gd"}, {"answer": "Pb"}]}, {"id": 3, "content": "Thủ đô của Mỹ là gì?", "answers": [{"answer": "Washington, D.C."}, {"answer": "New York"}, {"answer": "Los Angeles"}, {"answer": "Chicago"}]}]},
    {"id": 3, "testName": "Tư duy phản biện", "categoryId": 5, "image": "/assets/images/quiz web design/Container/image 1.png", "playTime": 13, "playAmount": 5, "questions": [{"id": 1, "content": "Mặt trời mọc ở hướng nào?", "answers": [{"answer": "Đông"}, {"answer": "Tây"}, {"answer": "Nam"}, {"answer": "Bắc"}]}, {"id": 2, "content": "Việt Nam có bao nhiêu tỉnh thành?", "answers": [{"answer": "63"}, {"answer": "64"}, {"answer": "60"}, {"answer": "62"}]}, {"id": 3, "content": "Ai là Chủ tịch Hồ Chí Minh?", "answers": [{"answer": "Lãnh tụ cách mạng Việt Nam"}, {"answer": "Vận động viên"}, {"answer": "Nhạc sĩ"}, {"answer": "Nhà thiết kế thời trang"}]}, {"id": 4, "content": "Cờ đỏ sao vàng là quốc kỳ của nước nào?", "answers": [{"answer": "Việt Nam"}, {"answer": "Trung Quốc"}, {"answer": "Hàn Quốc"}, {"answer": "Nhật Bản"}]}, {"id": 5, "content": "1 giờ có bao nhiêu phút?", "answers": [{"answer": "60"}, {"answer": "100"}, {"answer": "30"}, {"answer": "45"}]}]},
    {"id": 4, "testName": "Trắc nghiệm khoa học", "categoryId": 1, "image": "/assets/images/quiz web design/Container/image 1.png", "playTime": 11, "playAmount": 3, "questions": [{"id": 1, "content": "Nước sôi ở bao nhiêu độ C?", "answers": [{"answer": "100"}, {"answer": "90"}, {"answer": "80"}, {"answer": "70"}]}, {"id": 2, "content": "Hành tinh gần Mặt Trời nhất là gì?", "answers": [{"answer": "Sao Thủy"}, {"answer": "Sao Kim"}, {"answer": "Sao Hỏa"}, {"answer": "Sao Mộc"}]}, {"id": 3, "content": "Động vật nào sau đây biết bay?", "answers": [{"answer": "Chim"}, {"answer": "Chó"}, {"answer": "Mèo"}, {"answer": "Cá"}]}]},
    {"id": 5, "testName": "Tư duy nhanh", "categoryId": 6   , "image": "/assets/images/quiz web design/Container/image 1.png", "playTime": 14, "playAmount": 2, "questions": [{"id": 1, "content": "5 * 6 bằng bao nhiêu?", "answers": [{"answer": "30"}, {"answer": "25"}, {"answer": "35"}, {"answer": "20"}]}, {"id": 2, "content": "Hình học có bao nhiêu góc trong tam giác?", "answers": [{"answer": "3"}, {"answer": "4"}, {"answer": "5"}, {"answer": "2"}]}]}
]
    
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