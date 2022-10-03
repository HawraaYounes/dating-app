
    const baseUrl="http://127.0.0.1:8000/api";
    //initialize variables
    const token=localStorage.getItem("token");
    //fetch login api
    const getUsers= ()=>{
        const getUsersAPI=`${baseUrl}/getUsers`;
        const data = new FormData();
        data.append("token", token);
              axios.post(getUsersAPI,data).then(
                response =>  {
                   console.log(response.data);
                }
            );
    }
window.addEventListener("load",getUsers);
    
    
    