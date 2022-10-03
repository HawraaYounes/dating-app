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
const login= ()=>{
    const loginAPI=`${baseUrl}/login`;
        const data = new FormData();
        data.append("email", loginEmail.value);
        data.append("password", loginPassword.value);
        console.log(data);
         axios.post(loginAPI,data).then(
            response =>  {
               // localStorage.setItem("token", response.data.token)
                console.log(response);
                //refresh page
                window.location.replace("users.html");
            }
        );

}
loginBtn.addEventListener("click",login);
