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
                    <div class="feature_opening_setting">
                        <i class="material-icons" onclick="open_setting_buttom(this)">more_horiz</i>
                        <div class="buttom_setting_product">
                            <button onclick="edit_types(${type.id})" class="buttom_edit">Edit</button>
                            <button onclick="delete_types(${type.id})" class="buttom_delete">Delete</button>
                        </div>
                    </div>
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
    if(types.find(task => task.id == id).name_types == "Men" || types.find(task => task.id == id).name_types == "Women")
    {
        alert("You cannot delete the default types")
        return;
    }
    types = types.filter(type => type.id != id)
    localStorage.setItem('types', JSON.stringify(types));
    reload_page();
}
let check_open_setting = false;
function open_setting_buttom(event)
{
    off_open_setting();
    const buttom_setting_product = event.parentElement.querySelector('.buttom_setting_product')
    
    buttom_setting_product.classList.toggle('status_feature_opening_setting');
    check_open_setting = true;
}
function off_open_setting() {
    
    let buttom_setting_product = document.querySelectorAll('.buttom_setting_product')

    if (!check_open_setting) {
        buttom_setting_product.forEach(item => {
            item.classList.remove("status_feature_opening_setting");
        });
    }
    check_open_setting = false;
}
reload_page();