// console.log(details_user);
console.log(user);
const table_details_user = document.querySelector('.table_details_user');
let check_gender = "";
function reload_page(){
    table_details_user.innerHTML=
    `                
    <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Gender</th>
        <th>Action</th>
    </tr>
    `;
    details_user.forEach(tasks => {
        table_details_user.innerHTML +=
        `
        <tr>
            <td>${tasks.id}</td>
            <td>${tasks.username}</td>
            <td>${tasks.name}</td>
            <td>${tasks.email}</td>
            <td>${tasks.phone}</td>
            <td>${tasks.address}</td>
            <td>${tasks.gender}</td>
            <td>
                <button onclick="edit_details_user(${tasks.id})">Edit</button>            
                <button onclick="delete_details_user(${tasks.id})">Delete</button>
            </td>
        </tr>
        `;
    });
}
function delete_details_user(id)
{
    details_user = details_user.filter(tasks => tasks.id != id);
    localStorage.setItem("details_user", JSON.stringify(details_user));
    reload_page();
}
function edit_details_user(id)
{
    check_edit_details_user = id;
    input_name.value = details_user.find(tasks => tasks.id == id).name;
    input_email.value = details_user.find(tasks => tasks.id == id).email;
    input_phone.value = details_user.find(tasks => tasks.id == id).phone;
    input_address.value = details_user.find(tasks => tasks.id == id).address;
    if(details_user.find(tasks => tasks.id == id).gender == "Male")
    {
        male.checked = true;
    }else
    {
        female.checked = true;
    }
    localStorage.setItem("details_user", JSON.stringify(details_user));
    reload_page();
}
console.log(user.detail_user_id);
console.log(admins);
reload_page();