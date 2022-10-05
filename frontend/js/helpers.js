//This file contains the helper functions that will be used in more than one page (favourite users page, and users page) 
//with different variables(API, id..),these variables will be passed as parameters to every function
const baseUrl="http://127.0.0.1:8000/api";
//initialize variables
const token=localStorage.getItem("token");
const usersContainer=document.querySelector(".users-container");


//checkIfFav:This function fetch api that checks if the user with given id is favourite user or not
const checkIfFav=async(id)=>{
    const checkAPI=`${baseUrl}/checkIfFav`;
    const data = new FormData();
        data.append("token", token);
        data.append("receiver_id", id);
        
         const response=await axios.post(checkAPI,data);
            if(response.data.data.length>0){
               return true;
            }else{
               return false;
               
            }
        
}
//getUsers:this function get users from database based on given API
const getUsers= (API)=>{
    const data = new FormData();
    data.append("token", token);
          axios.post(API,data).then(
            async response =>  {
               response.data.data.map(async element => { 
                const userDiv=document.createElement("div");
                userDiv.classList.add("container-flex");
                userDiv.classList.add("user");
                usersContainer.appendChild(userDiv);
                const img=document.createElement("img");
                img.src = "./images/default.jpg";
                img.classList.add("user-img");
                userDiv.appendChild(img);
                const userInfo=document.createElement("div");
                userInfo.classList.add("user-info");
                userDiv.appendChild(userInfo);
                const nameText=document.createElement("p");
                nameText.classList.add("user-name");
                nameText.innerText=element.name;
                const locationText=document.createElement("p");
                locationText.innerText=element.location;
                userInfo.appendChild(nameText);
                userInfo.appendChild(locationText);
                if(API==`${baseUrl}/getUsers`){//Check if given api is for getting all users,add block button,else,don't
                    const blockBtn=document.createElement("button");
                    blockBtn.classList.add("user-btn");
                    userDiv.appendChild(blockBtn);
                    blockBtn.innerText="Block";

                    blockBtn.addEventListener("click",function(){
                        block(element.id,this);
                    });
                }
                const favBtn=document.createElement("button");
                favBtn.classList.add("user-btn");
                userDiv.appendChild(favBtn);
                const msg=document.createElement("p");
                userDiv.appendChild(msg);
                const icon=document.createElement("i");
                icon.classList.add("msg-icon");
                icon.classList.add("fa-brands");
                icon.classList.add("fa-facebook-messenger");
                msg.appendChild(icon);
                if(await checkIfFav(element.id)){
                    favBtn.innerText="Un-Favourite";
                    favBtn.classList.remove("user-btn");
                    favBtn.classList.add("user-active-btn");
                  }
                  else{
                    favBtn.innerText="Favourite";
                    favBtn.classList.remove("user-active-btn");
                    favBtn.classList.add("user-btn");
                  }
                favBtn.addEventListener("click",function(){
                    favourite(element.id,this);
                });
                icon.addEventListener("click",function(){
                    localStorage.setItem("receiver_id",element.id);
                    window.location.replace("messages.html");
                })
               });
               
            }
        );
}

const favourite=(id,btn)=>{
    if(btn.innerText=="Favourite"){
        const favAPI=`${baseUrl}/favUser`;
        const data = new FormData();
        data.append("token", token);
        data.append("receiver_id", id);
         axios.post(favAPI,data).then(
            response =>  {
                console.log(response)
                if(response.data.status=="Success"){
                    btn.innerText="Un-Favourite";
                    btn.classList.remove("user-btn");
                    btn.classList.add("user-active-btn");
                }
            }
        );
    }
    else if(btn.innerText=="Un-Favourite"){
        const unfavAPI=`${baseUrl}/unfavUser`;
        const data = new FormData();
        data.append("token", token);
        data.append("receiver_id", id);
         axios.post(unfavAPI,data).then(
            response =>  {
                if(response.data.status=="Success"){
                    btn.innerText="Favourite";
                    btn.classList.remove("user-active-btn");
                    btn.classList.add("user-btn");
                }
            }
        );
    }
}
