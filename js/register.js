function registerAccount(){
    let users=JSON.parse(localStorage.getItem("users"))||[{name:"admin", email: "admin123@gmail.com", password:"12345678", role:"admin"}];
    localStorage.setItem("users", JSON.stringify(users));
    let name=document.getElementById("name").value.trim();
    let email=document.getElementById("email").value.trim();
    let password=document.getElementById("password").value.trim();
    let confirmPassword=document.getElementById("confirmPassword").value.trim();
    if(name.length == 0){
        document.getElementsByClassName("redWarning")[0].style.display="block";
        document.getElementsByClassName("redWarning")[0].textContent="Không được để trống tên";
        return;
    }else{
        document.getElementsByClassName("redWarning")[0].style.display="none";
    }
    if(email.length == 0){
        document.getElementsByClassName("redWarning")[1].style.display="block";
        document.getElementsByClassName("redWarning")[1].textContent="Không được để trống email";
        return;
    }else{
        document.getElementsByClassName("redWarning")[1].style.display="none";
    }
    if(password.length == 0){
        document.getElementsByClassName("redWarning")[2].style.display="block";
        document.getElementsByClassName("redWarning")[2].textContent="Không được để trống mật khẩu";
        return;
    }else{
        document.getElementsByClassName("redWarning")[2].style.display="none";
    }
    if(confirmPassword.length == 0){
        document.getElementsByClassName("redWarning")[3].style.display="block";
        document.getElementsByClassName("redWarning")[3].textContent="Không được để trống xác nhận mật khẩu";
        return;
    }else{
        document.getElementsByClassName("redWarning")[3].style.display="none";
    }
    if(!email.includes("@") || !(email.endsWith(".com") || email.endsWith(".vn") || email.endsWith(".edu"))){
        document.getElementsByClassName("redWarning")[1].style.display="block";
        document.getElementsByClassName("redWarning")[1].textContent="Email phải chứa '@' và kết thúc với '.com', '.vn' hoặc '.edu'";
        return;
    }else{
        document.getElementsByClassName("redWarning")[1].style.display="none";
    }
    if(users.some(user => user.email == email)){
        document.getElementsByClassName("redWarning")[1].style.display="block";
        document.getElementsByClassName("redWarning")[1].textContent="Email đã tồn tại";
        return;
    }else{
        document.getElementsByClassName("redWarning")[1].style.display="none";
    }
    if(password.length<8){
        document.getElementsByClassName("redWarning")[2].style.display="block";
        document.getElementsByClassName("redWarning")[2].textContent="Mật khẩu cần phải có tối thiểu 8 ký tự!";
        return;
    }else{
        document.getElementsByClassName("redWarning")[2].style.display="none";
    }
    if(password!=confirmPassword){
        document.getElementsByClassName("redWarning")[3].style.display="block";
        document.getElementsByClassName("redWarning")[3].textContent="Xác nhận mật khẩu và mật khẩu không trùng khớp!";
        return;
    }else{
        document.getElementsByClassName("redWarning")[3].style.display="none";
    }
    users.push({name:name, email:email, password:password, role:"user"});
    localStorage.setItem("users", JSON.stringify(users));
    Swal.fire({
        title: "Đăng ký tài khoản thành công",
        icon: "success",
    });
    localStorage.setItem("loginStatus", 1);
    window.location.href="./home.html";
}