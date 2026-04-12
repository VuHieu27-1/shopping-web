let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined;
let details_user = localStorage.getItem('details_user') ? JSON.parse(localStorage.getItem('details_user')) : [];
let admins = localStorage.getItem('admins') ? JSON.parse(localStorage.getItem('admins')) : [];
let roles = localStorage.getItem('roles') ? JSON.parse(localStorage.getItem('roles')) : [];
let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
const admin_brand_text = document.querySelector('.admin_brand_text h1');
// localStorage.clear();
// console.log(user);
console.log(window.location.pathname);
if(window.location.pathname.indexOf('admin') != -1)
{
    if(user != undefined && user.roles_id == 2)
    {
        window.location.href = "../users";
    }else if(user == undefined)
    {
        window.location.href = "../";
    }
}
if(user != undefined)
{
    admin_brand_text.innerHTML = 
    `
    ${user.username}
    `
}
//add_admin
function user_admin()
{
    if(admins.length == 0)
    {
        admins.push({
            id: 1,
            username: 'admin',
            password: 'admin',
            detail_user_id: -1,
            roles_id: 1
        });
        localStorage.setItem('admins', JSON.stringify(admins));
    }
}
//add_roles
function roles_default()
{
    if(roles.length == 0)
    {
        roles.push({
            id: 1,
            name_roles: 'admin'
        });
        localStorage.setItem('roles', JSON.stringify(roles));
    }
    if(roles.length == 1)
    {
        roles.push({
            id: 2,
            name_roles: 'user'
        });
        localStorage.setItem('roles', JSON.stringify(roles));
    }
}
function sign_out()
{
    localStorage.removeItem('user');
    window.location.href = "../";
}
user_admin();
roles_default();
// =============================================================================================PAGE_DETAIL_USER===========================================/////\
let check_edit_details_user = -1;
const input_name = document.querySelector('.input_name');
const input_email = document.querySelector('.input_email');
const input_phone = document.querySelector('.input_phone');
const input_address = document.querySelector('.input_address');
const male = document.querySelector('.male');
const female = document.querySelector('.female');
const info_detail_user = document.querySelector('.info_detail_user');

function add_details_user()
{
    const id = details_user.length ? details_user[details_user.length - 1].id + 1 : 1;
    if(male.checked == true)
    {
        check_gender = "Male";
    }else
    {
        check_gender = "Female";
    }
    if(input_name.value != "" && input_email.value != "" && input_phone.value != "" && input_address.value != "" && check_gender != "" && check_edit_details_user == -1)
    {
        details_user.push({
            id: id,
            username: user.username,
            name: input_name.value,
            email: input_email.value,
            phone: input_phone.value,
            address: input_address.value,
            gender: check_gender
        });
        input_name.value = "";
        input_email.value = "";
        input_phone.value = "";
        input_address.value = "";
        check_gender = "";
    }else if(check_edit_details_user != -1 && input_name.value != "" && input_email.value != "" && input_phone.value != "" && input_address.value != "" && check_gender != "")
    {
        details_user.find(tasks => tasks.id == check_edit_details_user).name = input_name.value;
        details_user.find(tasks => tasks.id == check_edit_details_user).email = input_email.value;
        details_user.find(tasks => tasks.id == check_edit_details_user).phone = input_phone.value;
        details_user.find(tasks => tasks.id == check_edit_details_user).address = input_address.value;
        details_user.find(tasks => tasks.id == check_edit_details_user).gender = check_gender;
        check_edit_details_user = -1;
        input_name.value = "";
        input_email.value = "";
        input_phone.value = "";
        input_address.value = "";
        check_gender = "";
    }else
    {
        alert("Please fill in all fields");
    }
    user.detail_user_id = id;
    admins.find(tasks => tasks.id == user.id).detail_user_id = user.detail_user_id;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem("details_user", JSON.stringify(details_user));
    localStorage.setItem('admins', JSON.stringify(admins));
}
info_detail_user.addEventListener("keydown", event => {
    if(event.key == 'Enter')
    {
        add_details_user();
    }
});

setInterval(() => {
    admins.forEach(element => {
        if (!details_user.find(task => task.id === element.detail_user_id)) {
            element.detail_user_id = -1;
            localStorage.setItem('admins', JSON.stringify(admins));
        }
    });
},500);


