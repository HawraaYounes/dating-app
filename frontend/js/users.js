
    const baseUrl="http://127.0.0.1:8000/api";
    //initialize variables
    const token=localStorage.getItem("token");
    const usersContainer=document.querySelector(".users-container");
   let blockBtn;
   let favBtn;
    //fetch login api
    const getUsers= ()=>{
        const getUsersAPI=`${baseUrl}/getUsers`;
        const data = new FormData();
        data.append("token", token);
              axios.post(getUsersAPI,data).then(
                response =>  {

                   response.data.data.forEach(element => {
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
                    blockBtn=document.createElement("button");
                    blockBtn.classList.add("user-btn");
                    userDiv.appendChild(blockBtn);
                    blockBtn.innerText="Block";
                    favBtn=document.createElement("button");
                    favBtn.classList.add("user-btn");
                    userDiv.appendChild(favBtn);
                    favBtn.innerText="Favourite";
                    const msg=document.createElement("p");
                    userDiv.appendChild(msg);
                    const icon=document.createElement("i");
                    icon.classList.add("msg-icon");
                    icon.classList.add("fa-brands");
                    icon.classList.add("fa-facebook-messenger");
                    msg.appendChild(icon);
                    blockBtn.addEventListener("click",function(){
                        block(element.id);
                    });
                    favBtn.addEventListener("click",function(){
                        favourite(element.id);
                    });
                    icon.addEventListener("click",function(){
                        localStorage.setItem("receiver_id",element.id);
                        window.location.replace("messages.html");
                    })
                   });
                }
            );
    }

const favourite=(id)=>{
    if(favBtn.innerText=="Favourite"){
        const favAPI=`${baseUrl}/favUser`;
        const data = new FormData();
        data.append("token", token);
        data.append("receiver_id", id);
         axios.post(favAPI,data).then(
            response =>  {
                console.log(response)
                if(response.data.status=="Success"){
                    favBtn.innerText="Un-Favourite";
                    favBtn.classList.remove("user-btn");
                    favBtn.classList.add("user-active-btn");
                }
            }
        );
    }
    else if(favBtn.innerText=="Un-Favourite"){
        const unfavAPI=`${baseUrl}/unfavUser`;
        const data = new FormData();
        data.append("token", token);
        data.append("receiver_id", id);
         axios.post(unfavAPI,data).then(
            response =>  {
                if(response.data.status=="Success"){
                    favBtn.innerText="Favourite";
                    favBtn.classList.remove("user-active-btn");
                    favBtn.classList.add("user-btn");
                }
            }
        );
    }
}

const block=(id)=>{
    if(blockBtn.innerText=="Block"){
        const blockAPI=`${baseUrl}/blockUser`;
        const data = new FormData();
        data.append("token", token);
        data.append("blocking_id", id);
         axios.post(blockAPI,data).then(
            response =>  {
                console.log(response)
                if(response.data.status=="Success"){
                    blockBtn.innerText="Unblock";
                    blockBtn.classList.remove("user-btn");
                    blockBtn.classList.add("user-active-btn");
                }
            }
        );
    }
    else if(blockBtn.innerText=="Unblock"){
        const unblockAPI=`${baseUrl}/unblockUser`;
        const data = new FormData();
        data.append("token", token);
        data.append("blocking_id", id);
         axios.post(unblockAPI,data).then(
            response =>  {
                if(response.data.status=="Success"){
                    blockBtn.innerText="Block";
                    blockBtn.classList.remove("user-active-btn");
                    blockBtn.classList.add("user-btn");
                }
            }
        );
    }
}

window.addEventListener("load",getUsers);
    
    
    