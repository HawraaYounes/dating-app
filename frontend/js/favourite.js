//On page load,get users that are favourite by authenticated user
window.addEventListener("load",function(){
    const getFavsAPI=`${baseUrl}/getFavUsers`;
    getUsers(getFavsAPI);
});