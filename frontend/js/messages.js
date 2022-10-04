const baseUrl="http://127.0.0.1:8000/api";
//get message receiver id and token from local storage
const receiver_id= localStorage.getItem("receiver_id");
const token=localStorage.getItem("token");

const getMessages= ()=>{
    const getMessagesAPI=`${baseUrl}/getMessages`;
    const data = new FormData();
    data.append("token", token);
    data.append("user_id", receiver_id)
          axios.post(getMessagesAPI,data).then(
            response =>  {

              console.log(response.data)
               
            }
        );
}

window.addEventListener('load', getMessages);