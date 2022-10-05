window.onload=function(){
const baseUrl="http://127.0.0.1:8000/api";
//initialize variables
const loginModal = document.getElementById('login-modal');
const loginEmail= document.getElementById('email-login');
const loginPassword=document.getElementById('password-login');
const loginBtn=document.getElementById('login');
const signupBtn=document.getElementById("signup");
const signupEmail=document.getElementById("email-signup");
const signupPassword=document.getElementById("psw");
const location=document.getElementById("location");
const genderArray = document.getElementsByName('gender');
let gender;
const pGenderArray = document.getElementsByName('p-gender');
let pGender;
const fullName=document.getElementById("name");

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
               localStorage.setItem("authID", response.data.user.id)
                window.location.replace("./hero.html");
            }
        );
}
const getCheckedRadios=()=>{
  //get checked gender and preffered gender values
for(i = 0; i < genderArray.length; i++) {
  if(genderArray[i].checked)
  gender=genderArray[i].value;
}
for(i = 0; i < pGenderArray.length; i++) {
  if(pGenderArray[i].checked)
  pGender=pGenderArray[i].value;
}

}
const signup= (e)=>{
  getCheckedRadios();
  e.preventDefault();
  const signupAPI=`${baseUrl}/signup`;
      const data = new FormData();
      data.append("name", fullName.value);
      data.append("email", signupEmail.value);
        data.append("password", signupPassword.value);
        data.append("gender", gender);
        data.append("preffered_gender", pGender);
        data.append("location", location.value);
        
       axios.post(signupAPI,data).then(
          response =>  {
              window.location.replace("./index.html");
              alert("Account Created Successfully! Login now")
          }
      );
}
signupBtn.addEventListener("click",signup);
loginBtn.addEventListener("click",login);

};


