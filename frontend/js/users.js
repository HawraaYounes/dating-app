
    const baseUrl="http://127.0.0.1:8000/api";
    //initialize variables
    const token=localStorage.getItem("token");
    const usersContainer=document.querySelector(".users-container");
   let blockBtn;
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
                    const favBtn=document.createElement("button");
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
                        block(element.id,this);
                    });
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
    alert(id)
    if(btn.innerText=="Favourite"){
        alert("good")
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

const block=(id,btn)=>{
    if(btn.innerText=="Block"){
        const blockAPI=`${baseUrl}/blockUser`;
        const data = new FormData();
        data.append("token", token);
        data.append("blocking_id", id);
         axios.post(blockAPI,data).then(
            response =>  {
                console.log(response)
                if(response.data.status=="Success"){
                    btn.innerText="Unblock";
                    btn.classList.remove("user-btn");
                    btn.classList.add("user-active-btn");
                }
            }
        );
    }
    else if(btn.innerText=="Unblock"){
        const unblockAPI=`${baseUrl}/unblockUser`;
        const data = new FormData();
        data.append("token", token);
        data.append("blocking_id", id);
         axios.post(unblockAPI,data).then(
            response =>  {
                if(response.data.status=="Success"){
                    btn.innerText="Block";
                    btn.classList.remove("user-active-btn");
                    btn.classList.add("user-btn");
                }
            }
        );
    }
}

window.addEventListener("load",getUsers);
    
    
    