
var logOutModal = new bootstrap.Modal(document.getElementById('logOutModal'), {
    keyboard: false
});
function logOut(){
    logOutModal.show();
    let btnLogout = document.getElementById("btnLogout");
    btnLogout.onclick = ()=>{
         localStorage.removeItem("userLogin");
         window.location.href="loginPage.html";
    } 
}