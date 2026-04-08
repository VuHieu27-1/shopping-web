const table_roles = document.querySelector('.table_roles');
const feature_roles = document.querySelector('#feature_roles');
let check_edit_roles = -1;
let check_action_edit = false;
// localStorage.clear();
function reload_page() {
    table_roles.innerHTML = `
        <tr>
            <th>Role ID</th>
            <th>Role Name</th>
            <th>Action</th>
        </tr>
    `;
    roles.forEach(role => {
        table_roles.innerHTML += `
            <tr>
                <td>${role.id}</td>
                <td>${role.name_roles}</td>
                <td>
                    <button onclick="edit_role(${role.id})">Edit</button>
                    <button onclick="delete_role(${role.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}
console.log(roles);
// function roles_default()
// {
//     if(roles.length == 0)
//     {
//         roles.push({
//             id: 1,
//             name_roles: 'admin'
//         });
//         localStorage.setItem('roles', JSON.stringify(roles));
//     }
//     if(roles.length == 1)
//     {
//         roles.push({
//             id: 2,
//             name_roles: 'user'
//         });
//         localStorage.setItem('roles', JSON.stringify(roles));
//     }
//     reload_page();
// }
function add_role() {
    let id = roles.length ? roles[roles.length - 1].id + 1 : 1;
    const name_role = document.querySelector('#feature_roles input');
    let check_name = roles.find(role => role.name_roles == name_role.value);
    if(!check_name && check_edit_roles == -1)
    {
        roles.push({ 
            id: id, 
            name_roles: name_role.value
        });
        name_role.value  = "";
    }else if(check_edit_roles != -1 && !check_name)
    {
        roles.find(role => role.id == check_edit_roles).name_roles = name_role.value;
        check_edit_roles = -1;
        name_role.value  = "";
        check_action_edit = false;
    }
    else
    {
        alert('The role name already exists.');
    }
    localStorage.setItem('roles', JSON.stringify(roles));
    reload_page();
}
feature_roles.addEventListener('keydown', envent => {
    if (envent.key === 'Enter') {
        add_role();
    }
}
);
function edit_role(id) {
    check_edit_roles = id;
    check_action_edit = true;
    document.querySelector('#feature_roles input').value = roles.find(role => role.id == id).name_roles;
    localStorage.setItem('roles', JSON.stringify(roles));
    reload_page();
}
function delete_role(id) {
    if(roles.find(role => role.id == id).name_roles == 'admin' || roles.find(role => role.id == id).name_roles == 'user')
    {
        alert('You cannot delete the default role.');
        return;
    }
    if(!check_action_edit)
    {
        roles = roles.filter(roles => roles.id != id);
    }else
    {
        alert("There's another action that hasn't been completed yet.");
    }
    localStorage.setItem('roles', JSON.stringify(roles));
    reload_page();
}
roles_default();
reload_page(); 