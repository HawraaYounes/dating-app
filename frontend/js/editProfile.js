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
//Add page event listeners
window.addEventListener("load",getUserInfo);
signupBtn.addEventListener("click",editProfile);