
function loginAccount(){
    let users=JSON.parse(localStorage.getItem("users"))||[{name:"admin", email: "admin123@gmail.com", password:"12345678", role:"admin"}];
    localStorage.setItem("users", JSON.stringify(users));
    let count=0;
    let email=document.getElementById("email").value.trim();
    let password=document.getElementById("password").value.trim();
    if(email.length == 0){
        document.getElementsByClassName("redWarning")[0].style.display="block";
        document.getElementsByClassName("redWarning")[0].textContent="Không được để trống email";
        return;
    }else{
        document.getElementsByClassName("redWarning")[0].style.display="none";
    }
    if(password.length == 0){
        document.getElementsByClassName("redWarning")[1].style.display="block";
        document.getElementsByClassName("redWarning")[1].textContent="Không được để trống mật khẩu";
        return;
    }else{
        document.getElementsByClassName("redWarning")[1].style.display="none";
    }
    users.forEach(user => {
        if(user.password==password && user.email==email){
            localStorage.setItem("loginStatus", 1);
            count++;
            if(user.role=="admin"){
                window.location.href="./categoryManager.html";
            } else{
                window.location.href="./home.html";
            }
        }
    });
    if(count==0){
        document.getElementsByClassName("redWarning")[0].style.display="block";
        document.getElementsByClassName("redWarning")[0].textContent="Tài khoản hoặc mật khẩu không chính xác!";
        document.getElementsByClassName("redWarning")[1].style.display="block";
        document.getElementsByClassName("redWarning")[1].textContent="Tài khoản hoặc mật khẩu không chính xác!";
    }
}