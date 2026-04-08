let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined;
let admins = localStorage.getItem('admins') ? JSON.parse(localStorage.getItem('admins')) : [];
let roles = localStorage.getItem('roles') ? JSON.parse(localStorage.getItem('roles')) : [];
let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
// console.log(user);
console.log(window.location.pathname);
if(window.location.pathname.indexOf('admin') != -1)
{
    if(user != undefined && user.roles_id == 2)
    {
        window.location.href = "../users/?id=" + user.id;
    }else if(user == undefined)
    {
        window.location.href = "../";
    }
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


