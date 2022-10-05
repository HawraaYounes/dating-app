
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

window.addEventListener("load",function(){
    const getUsersAPI=`${baseUrl}/getUsers`;
    getUsers(getUsersAPI);
});
    
    
    