let urlParams = new URLSearchParams(window.location.search);
let id_url = urlParams.get('id');
console.log(id_url);
let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined;
const view = document.querySelector('.view p');
// localStorage.removeItem('user');
console.log(user);
if(user == undefined)
{
    view.innerHTML = 
    `
    Chua dang nhap
    <a href="../">Bam vao links</a>
    `;
}else if(user.id != id_url && user != undefined)
{
    window.location.href = "../";
}
else
{
    view.innerHTML = 
    `
        user id: ${user.id},
        user name: ${user.username}
        user password: ${user.password}  
    `
}
function sign_out()
{
    localStorage.removeItem('user');
    window.location.href = "../";
}