window.onload=function(){
const baseUrl="http://127.0.0.1:8000/api";
//initialize variables
const loginModal = document.getElementById('login-modal');
const loginEmail= document.getElementById('email-login');
const loginPassword=document.getElementById('password-login');
const loginBtn=document.getElementById('login');
//close loginModal when clicking outside it
window.onclick = function(event) {
    if (event.target == loginModal) {
      loginModal.style.display = "none";
    }
  }
//fetch login api
const login= (e)=>{
    e.preventDefault();
    const loginAPI=`${baseUrl}/login`;
        const data = new FormData();
        data.append("email", loginEmail.value);
        data.append("password", loginPassword.value);
         axios.post(loginAPI,data).then(
            response =>  {
               localStorage.setItem("token", response.data.authorisation.token)
                window.location.replace("./users.html");
            }
        );
}
loginBtn.addEventListener("click",login);

};


