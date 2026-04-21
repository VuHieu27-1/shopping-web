const my_account = document.querySelector('.my_account');
const my_account_side = document.querySelector('.my_account_side');
const setting_user = document.querySelector('.setting_user');
const open_side_bar = document.querySelector('.open_side_bar');
const side_bar_menu = document.querySelector('.side_bar_menu');
const open_icon = document.querySelector('.open_icon');
console.log(user);
if(user == undefined)
{
    if(my_account)
    {
        my_account.innerHTML = 
        `
         <a href="../">Login</a>
        `;
    }
    if(my_account_side)
    {
        my_account_side.innerHTML =
        `
        <a href="../">Login</a>
        `;
    }
}
else
{
    if(my_account)
    {
        my_account.innerHTML = 
        `
        ${user.username}
        `
    }
    if(my_account_side)
    {
        my_account_side.innerHTML =
        `
        ${user.username}
        `
    }
}
if(my_account && setting_user && my_account.text.trim() == 'Login')
{
    setting_user.classList.add('hidden_feature');
}else if(setting_user)
{
    setting_user.classList.remove('hidden_feature');
}

if(open_side_bar && side_bar_menu && open_icon)
{
    open_side_bar.addEventListener('click', () => {
        side_bar_menu.classList.toggle('side_bar_menu_close');
        open_side_bar.classList.toggle('open_side_bar_shift');
        open_icon.innerHTML = side_bar_menu.classList.contains('side_bar_menu_close') ? 'arrow_forward_ios' : 'arrow_back_ios';
    });
}
