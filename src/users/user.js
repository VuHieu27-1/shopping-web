let urlParams = new URLSearchParams(window.location.search);
let id_url = urlParams.get('id');
console.log(id_url);
const my_account = document.querySelector('.my_account');
const setting_user = document.querySelector('.setting_user');
console.log(user);
if(user == undefined)
{
    my_account.innerHTML = 
    `
     <a href="../">Login</a>
    `;
}else if(user.id != id_url && user != undefined)
{
    window.location.href = "../";
}
else
{
    my_account.innerHTML = 
    `
    ${user.username}
    `
}
if(my_account.text.trim() == 'Login')
{
    setting_user.classList.add('hidden_feature');
}else
{
    setting_user.classList.remove('hidden_feature');
}
