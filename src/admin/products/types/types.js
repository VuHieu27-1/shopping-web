const table_type_product_info = document.querySelector('.table_type_product_info');
const input_name_type_product = document.querySelector('#input_name_type_product');
const decription_product = document.querySelector('#decription_product');
let check_edit_types = -1
function reload_page() {
    table_type_product_info.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Type Name</th>
            <th>Description</th>
            <th>Action</th>
        </tr>
    `;
    types.forEach(type => {
        table_type_product_info.innerHTML += `
            <tr>
                <td>${type.id}</td>
                <td>${type.name_types}</td>
                <td>${type.decription}</td>
                <td>
                    <button onclick="edit_types(${type.id})">Edit</button>
                    <button onclick="delete_types(${type.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}
function add_type_product() {
    let id = types.length ? types[types.length - 1].id + 1 : 1;
    const name_role = document.querySelector('#feature_types input');
    if(check_edit_types == -1 && input_name_type_product.value != "")
    {
        types.push({ 
            id: id, 
            name_types: input_name_type_product.value,
            decription: decription_product.value
        });
        input_name_type_product.value  = "";
        decription_product.value = "";

    }else if(check_edit_types != -1)
    {
        types.find(type => type.id == check_edit_types).name_types = input_name_type_product.value;
        types.find(type => type.id == check_edit_types).decription = decription_product.value;
        input_name_type_product.value  = "";
        decription_product.value = "";
        check_edit_types = -1;
    }
    else
    {
        alert('The role name already exists.');
    }
    localStorage.setItem('types', JSON.stringify(types));
    reload_page();
}
function edit_types(id)
{
    check_edit_types = id;
    input_name_type_product.value = types.find(type => type.id == id).name_types;
    decription_product.value = types.find(type => type.id == id).decription;
    localStorage.setItem('types', JSON.stringify(types));
    reload_page();
}
function delete_types(id)
{
    types = types.filter(type => type.id != id)
    localStorage.setItem('types', JSON.stringify(types));
    reload_page();
}
reload_page();