const table_product_info = document.querySelector('.table_product_info');
const input_img_product = document.querySelector('#input_img_product');
const input_name_product = document.querySelector('#input_name_product');
const input_quantity = document.querySelector('#input_quantity');
const input_price = document.querySelector('#input_price');
const types_product = document.querySelector('#types_product');
let check_edit = -1;
window.addEventListener('storage', event =>
{
    if(event.key == 'types')
    {
        render_types();
        reload_page();
    }
});
function render_types()
{
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
                <td>${product.type_name}</td>
                <td>${product.quantity}</td>
                <td>${product.price}</td>
                <td>
                    <button onclick="edit_products(${product.id})">Edit</button>
                    <button onclick="delete_products(${product.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function add_product()
{
    const id = products.length ? products[products.length - 1].id + 1 : 1;
    if(check_edit == -1)
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
    }else if(check_edit != -1)
    {
        console.log(input_name_product.value);
        products.find(product => product.id == check_edit).name = input_name_product.value;
        products.find(product => product.id == check_edit).image = input_img_product.value;
        products.find(product => product.id == check_edit).quantity = input_quantity.value;
        products.find(product => product.id == check_edit).price = input_price.value;   
        input_name_product.value = '';
        input_img_product.value = '';
        input_quantity.value = '';
        input_price.value = '';
        types_product.value='';
        check_edit = -1;
    }

    localStorage.setItem('products', JSON.stringify(products));
    reload_page();
}
function delete_products(id)
{
    products = products.filter(product => product.id != id)
    localStorage.setItem('products', JSON.stringify(products));
    reload_page();
}
function edit_products(id)
{
    check_edit = id;
    input_name_product.value = products.find(product => product.id == id).name;
    input_img_product.value = products.find(product => product.id == id).image;
    input_quantity.value = products.find(product => product.id == id).quantity;
    input_price.value = products.find(product => product.id == id).price;
    localStorage.setItem('products', JSON.stringify(products));
    reload_page();
}
render_types();
reload_page();