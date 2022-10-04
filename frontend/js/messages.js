const baseUrl="http://127.0.0.1:8000/api";
//get message receiver id and token from local storage
const authID=localStorage.getItem("authID");
const user_id= localStorage.getItem("receiver_id");
const token=localStorage.getItem("token");
//initialize messenger div 
const messenger=document.getElementById("messenger");
const messageInput=document.getElementById("msg-input");
const sendBtn=document.getElementById("send-msg-btn");

const getMessages= (e)=>{
    e.preventDefault();
    const getMessagesAPI=`${baseUrl}/getMessages`;
    const data = new FormData();
    data.append("token", token);
    data.append("user_id", user_id);
          axios.post(getMessagesAPI,data).then(
            response =>  {
                response.data.data.forEach(element => {
                    const msgDiv=document.createElement("div");
                    msgDiv.classList.add("msg");
                    messenger.appendChild(msgDiv);
                    const img=document.createElement("img");
                    img.src = "./images/default.jpg";
                    msgDiv.appendChild(img);
                    const msgContent=document.createElement("p");
                    msgContent.innerText=element.content;
                    msgDiv.appendChild(msgContent);
                    const msgTime=document.createElement("span");
                    msgTime.innerText=element.created_at;
                    msgDiv.appendChild(msgTime);
                    if(element.sender_id==user_id){
                        msgDiv.classList.add("user-message");
                        img.classList.add("right");
                        msgTime.classList.add("time-left");
                    }
                    else{
                        msgDiv.classList.add("my-message");
                        msgTime.classList.add("time-right");
                    }
                });
               
            }
        );
}
const sendMessage=()=>{
    //post input data and user ids to database
    const sendMessageAPI=`${baseUrl}/sendMessage`;
    const data = new FormData();
    data.append("sender_id",authID)
    data.append("receiver_id", user_id);
    data.append("content", messageInput.value);
    data.append("token", token)
    axios.post(sendMessageAPI, data)
    .then(response => {
        const msgDiv=document.createElement("div");
        msgDiv.classList.add("msg");
        messenger.appendChild(msgDiv);
        const img=document.createElement("img");
        img.src = "./images/default.jpg";
        msgDiv.appendChild(img);
        const msgContent=document.createElement("p");
        msgContent.innerText=response.data.data.content;
        msgDiv.appendChild(msgContent);
        const msgTime=document.createElement("span");
        msgTime.innerText=response.data.data.created_at;
        msgDiv.appendChild(msgTime);
        msgDiv.classList.add("my-message");
        msgTime.classList.add("time-right");
    })
    .catch((e)=>{
        console.log(e)
    });
}

window.addEventListener("load", getMessages);
sendBtn.addEventListener("click",sendMessage);