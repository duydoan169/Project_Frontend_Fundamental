
function loginAccount(){
    let users=JSON.parse(localStorage.getItem("users"))||[{name:"admin", email: "admin123@gmail.com", password:"12345678", role:"admin"}];
    localStorage.setItem("users", JSON.stringify(users));
    let count=0;
    let email=document.getElementById("email").value.trim();
    let password=document.getElementById("password").value.trim();
    if(email.length==0 || password.length==0){
        Swal.fire("Không được để trống thông tin!");
        return;
    }
    users.forEach(user => {
        if(user.password==password && user.email==email){
            Swal.fire({
                title: "Đăng nhập thành công!",
                icon: "success",
            });
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
        Swal.fire("Tài khoản hoặc mật khẩu không chính xác!");
    }
}