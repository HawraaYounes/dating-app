const baseUrl="http://127.0.0.1:8000/api";
const token=localStorage.getItem("token");

//initialize variables
const fullName=document.getElementById("name");
const password=document.getElementById("psw");
const loc=document.getElementById("location");
const femaleGender=document.getElementById("female");
const maleGender=document.getElementById("male");
const femalePrefferedGender=document.getElementById("p-female");
const malePrefferedGender=document.getElementById("p-male");
const updateBtn=document.getElementById("update");
const genderArray = document.getElementsByName('gender');
let gender;
const pGenderArray = document.getElementsByName('p-gender');
let pGender;
const containerDiv=document.querySelector(".container")

const getUserInfo=()=>{
    //Fill form inputs with authenticated user information
        const userInfoAPI=`${baseUrl}/me`;
        const data = new FormData();
        data.append("token", token);
         axios.post(userInfoAPI,data).then(
            response =>  {
                if(response.data.user.gender=="female"){
                    femaleGender.checked = true;
                }
                else if(response.data.user.gender=="male"){
                    maleGender.checked = true;
                }
                if(response.data.user.preffered_gender=="female"){
                    femalePrefferedGender.checked = true;
                }
                else if(response.data.user.preffered_gender=="male"){
                    malePrefferedGender.checked = true;
                }
                fullName.value=response.data.user.name;
                loc.value=response.data.user.location;
            }
        );
}

const editProfile=()=>{
    const userInfoAPI=`${baseUrl}/updateProfile`;
        const data = new FormData();
        data.append("token", token);
         axios.post(userInfoAPI,data).then(
            response =>  {
                if(response.data.user.gender=="female"){
                    femaleGender.checked = true;
                }
                else if(response.data.user.gender=="male"){
                    maleGender.checked = true;
                }
                if(response.data.user.preffered_gender=="female"){
                    femalePrefferedGender.checked = true;
                }
                else if(response.data.user.preffered_gender=="male"){
                    malePrefferedGender.checked = true;
                }
                fullName.value=response.data.user.name;
                loc.value=response.data.user.location;
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

const updateProfile=()=>{
    getCheckedRadios();
    //insert updated user information to database
    const updateProfileAPI=`${baseUrl}/updateProfile`;
    const data = new FormData();
    data.append("name",fullName.value)
    data.append("password", password.value);
    data.append("location", loc.value);
    data.append("gender", gender);
    data.append("preffered_gender", pGender);
    data.append("token", token)
    axios.post(updateProfileAPI, data)
    .then(response => {
       const msg=document.createElement("p")
       msg.innerText="Profile Updated Successfully!"
       msg.style.color="green";
       containerDiv.appendChild(msg);
    })
    .catch((e)=>{
        console.log(e)
    });
}

//Add page event listeners
window.addEventListener("load",getUserInfo);
updateBtn.addEventListener("click",updateProfile);