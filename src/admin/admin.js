let urlParams = new URLSearchParams(window.location.search);
let id_url = urlParams.get('id');
// let roles = localStorage.getItem('roles') ? JSON.parse(localStorage.getItem('roles')) : [];
console.log(roles);
// let admins = localStorage.getItem('admins') ? JSON.parse(localStorage.getItem('admins')) : [];
console.log(admins);
const table_admin = document.querySelector('.table_admin');
const feature_admin = document.querySelector('#feature_admin');
const roles_users = document.querySelector('#roles_users');
let check_edit_admin = -1;
let check_action_edit = false;
if(id_url == null)
{
    window.location.href = `../`;
}
function render_roles()
{
    roles = localStorage.getItem('roles') ? JSON.parse(localStorage.getItem('roles')) : [];
    roles_users.innerHTML = `
        <option value="" hidden>Choose Role</option>
    `;
    roles.forEach(role => {
        roles_users.innerHTML += `
            <option value="${role.id}">${role.name_roles}</option>
        `;
    });
}
window.addEventListener("storage", event => {
    console.log(event.key == 'admins');
    if(event.key == 'roles' || event.key == 'admins')
    {
        admins = localStorage.getItem('admins') ? JSON.parse(localStorage.getItem('admins')) : [];
        render_roles();
        reload_page();
    }
});
function check_roles_available()
{
    admins.forEach(user =>
{
    if(!roles.find(role => role.id == user.roles_id))
    {
        delete_admin(user.id);
    }
});
}
// setInterval(check_roles_available, 1000);
// function user_admin()
// {
//     if(admins.length == 0)
//     {
//         admins.push({
//             id: 1,
//             username: 'admin',
//             password: 'admin',
//             roles_id: 1
//         });
//         localStorage.setItem('admins', JSON.stringify(admins));
//     }
//     reload_page();
// }

function reload_page() {
    table_admin.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Roles</th>
            <th>Action</th>
        </tr>
    `;
    admins.forEach(admin => {
        table_admin.innerHTML += `
            <tr>
                <td>${admin.id}</td>
                <td>${admin.username}</td>
                <td>${admin.password}</td>
                <td>${admin.roles_id}</td>
                <td>
                    <button onclick="edit_admin(${admin.id})">Edit</button>
                    <button onclick="delete_admin(${admin.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}
function add_users()
{
    const username = document.querySelector(".input_user");
    const password = document.querySelector(".input_password");
    let id = admins.length ? admins[admins.length - 1].id + 1 : 1;
    const roles = document.querySelector('#roles_users');
    let check_username = admins.find(admin => admin.username == username.value && admin.password == password.value);
    let check_input_empty = username.value == "" || password.value == "" || roles.value == "";
    if(!check_username && check_edit_admin == -1 && !check_input_empty)
    {
        admins.push({ 
            id: id, 
            username: username.value,
            password: password.value,
            roles_id: roles.value
        });
        username.value  = "";
        password.value  = "";
    }else if(check_edit_admin != -1 && !check_input_empty)
    {
        admins.find(admin => admin.id == check_edit_admin).username = username.value;
        admins.find(admin => admin.id == check_edit_admin).password = password.value;
        admins.find(admin => admin.id == check_edit_admin).roles_id = roles.value;
        check_edit_admin = -1;
        username.value  = "";
        password.value  = "";
    }
    else if(check_username)
    {
        alert('The username already exists.');
    }else{
        alert('Please fill in all fields.');
    }
    localStorage.setItem('admins', JSON.stringify(admins));
    reload_page();  
}
function edit_admin(id) {
    check_edit_admin = id;
    check_action_edit = true;
    document.querySelector('.input_user').value = admins.find(admin => admin.id == id).username;
    document.querySelector('.input_password').value = admins.find(admin => admin.id == id).password;
    document.querySelector('#roles_users').value = admins.find(admin => admin.id == id).roles_id;
    reload_page();
}
function delete_admin(id) {
    if(admins.find(admin => admin.id == id).username == 'admin')
    {
        alert('You cannot delete the admin account.');
        return;
    }
    if(!check_action_edit)
    {
        admins = admins.filter(admin => admin.id != id);    
    }else
    {
        alert("There's another action that hasn't been completed yet.");
    }
    localStorage.setItem('admins', JSON.stringify(admins));
    reload_page();
}
user_admin();
render_roles();
reload_page();