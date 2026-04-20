const table_product_info = document.querySelector('.table_product_info');
const input_img_product = document.querySelector('#input_img_product');
const input_name_product = document.querySelector('#input_name_product');
const input_quantity = document.querySelector('#input_quantity');
const input_price = document.querySelector('#input_price');
const types_product = document.querySelector('#types_product');
const filter_types = document.querySelector('#filter_types');
let check_edit = -1;
let check_action_edit = false;
window.addEventListener('storage', event =>
{
    if(event.key == 'types')
    {
        render_types();
        reload_page();
    }
});
function check_types_product()
{
    let check_types;
    products.forEach(task => {
        check_types = types.find(type => type.id == task.type_id);
        if(!check_types)
        {
            task.type_id = "";
            localStorage.setItem('products', JSON.stringify(products));
            reload_page();
        }
    }); 
}
setInterval(check_types_product, 500);
function render_types()
{
    filter_types.innerHTML =
    `
        <option value="" hidden>Choose Type</option>
        <option value="all">All</option>
    `;
    types.forEach(type => 
        {
         filter_types.innerHTML +=
         `
            <option value="${type.id}">${type.name_types}</option>
         `;
        }
    );

    types_product.innerHTML =
    `
        <option value="" hidden>Choose Type</option>
    `;
    types.forEach(type => 
        {
         types_product.innerHTML +=
         `
            <option value="${type.id}">${type.name_types}</option>
         `;
        }
    );
}
function reload_page()
{
    table_product_info.innerHTML = 
    `
        <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Image Product</th>
            <th>Type Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
        </tr>
    `;
    products.forEach(product => {
        table_product_info.innerHTML +=
        `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.image}</td>
                <td class="feature_types">
                    ${product.type_name}
                    <h3 class="note_types_product">${types.find(task => task.id == product.type_id).decription}</h3>
                </td>
                <td>${product.quantity}</td>
                <td>${product.price}</td>
                <td>
                    <div class="feature_opening_setting">
                        <i class="material-icons" onclick="open_setting_buttom(this)">more_horiz</i>
                        <div class="buttom_setting_product">
                            <button onclick="edit_products(${product.id})" class="buttom_edit">Edit</button>
                            <button onclick="delete_products(${product.id})" class="buttom_delete">Delete</button>
                        </div>
                    </div>
                </td>
            </tr>
        `;
    });
}

function add_product()
{
    const id = products.length ? products[products.length - 1].id + 1 : 1;
    if(check_edit == -1 && input_name_product.value != "" && input_img_product.value != "" 
    && types_product.value != "" && input_quantity.value != "" && input_price.value != "")
    {
        products.push({
            id: id,
            name: input_name_product.value,
            image: input_img_product.value,
            type_id: types_product.value,
            type_name: types_product.options[types_product.selectedIndex].text,
            quantity: input_quantity.value,
            price: input_price.value
        });
        input_name_product.value = '';
        input_img_product.value = '';
        input_quantity.value = '';
        input_price.value = '';
        types_product.value='';
    }else if(check_edit != -1 && input_name_product.value != "" 
    && types_product.value != "" && input_quantity.value != "" && input_price.value != "")
    {
        console.log(input_name_product.value);
        products.find(product => product.id == check_edit).name = input_name_product.value;
        products.find(product => product.id == check_edit).quantity = input_quantity.value;
        products.find(product => product.id == check_edit).price = input_price.value;   
        products.find(product => product.id == check_edit).type_id = types_product.value;
        products.find(product => product.id == check_edit).type_name = types_product.options[types_product.selectedIndex].text;
        input_name_product.value = '';
        input_img_product.value = '';
        input_quantity.value = '';
        input_price.value = '';
        types_product.value='';
        check_edit = -1;
        check_action_edit = false;
    }else
    {
        alert('Please fill in all fields.');
    }

    localStorage.setItem('products', JSON.stringify(products));
    reload_page();
}
function delete_products(id)
{
    if(!check_action_edit)
    {
        products = products.filter(product => product.id != id)
    }else
    {
        alert("There's another action that hasn't been completed yet.");
    }
    localStorage.setItem('products', JSON.stringify(products));
    reload_page();
}
function edit_products(id)
{
    check_action_edit = true;
    check_edit = id;
    input_name_product.value = products.find(product => product.id == id).name;
    input_quantity.value = products.find(product => product.id == id).quantity;
    input_price.value = products.find(product => product.id == id).price;
    types_product.value = products.find(product => product.id == id).type_id;
    localStorage.setItem('products', JSON.stringify(products));
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
filter_types.addEventListener("change", function () {
    if(filter_types.value == "all")
    {
        reload_page();
        return;
    }
    table_product_info.innerHTML = 
        `
            <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Image Product</th>
                <th>Type Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
            </tr>
        `;
    products.forEach(product => {
        if(product.type_id == filter_types.value)
        {
            table_product_info.innerHTML +=
            `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.image}</td>
                    <td>${product.type_name}</td>
                    <td>${product.quantity}</td>
                    <td>${product.price}</td>
                    <td>
                        <div class="feature_opening_setting">
                            <i class="material-icons" onclick="open_setting_buttom(this)">more_horiz</i>
                            <div class="buttom_setting_product">
                                <button onclick="edit_products(${product.id})" class="buttom_edit">Edit</button>
                                <button onclick="delete_products(${product.id})" class="buttom_delete">Delete</button>
                            </div>
                        </div>
                    </td>
                </tr>
            `;
        }
    });
});
render_types();
reload_page();