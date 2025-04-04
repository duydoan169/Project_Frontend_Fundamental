function registerAccount(){
    let users=JSON.parse(localStorage.getItem("users"))||[{name:"admin", email: "admin123@gmail.com", password:"12345678", role:"admin"}];
    localStorage.setItem("users", JSON.stringify(users));
    let name=document.getElementById("name").value.trim();
    let email=document.getElementById("email").value.trim();
    let password=document.getElementById("password").value.trim();
    let confirmPassword=document.getElementById("confirmPassword").value.trim();
    if(name.length==0 || email.length==0 || password.length==0 || confirmPassword.length==0){
        Swal.fire("Không được để trống thông tin!");
        return;
    }
    if (!email.includes("@") || !(email.endsWith(".com") || email.endsWith(".vn") || email.endsWith(".edu"))) {
        Swal.fire("Email phải chứa '@' và kết thúc với '.com', '.vn' hoặc '.edu'");
        return;
    }
    if (users.some(user => user.email == email)) {
        Swal.fire("Email đã tồn tại");
        return;
    }
    if(password.length<8){
        Swal.fire("Mật khẩu cần phải có tối thiểu 8 ký tự!");
        return;
    }
    if(password!=confirmPassword){
        Swal.fire("Mật khẩu và xác nhận mật khẩu không trùng khớp!");
        return;
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