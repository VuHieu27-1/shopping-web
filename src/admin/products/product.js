const table_product_info = document.querySelector('.table_product_info');
const input_img_product = document.querySelector('#input_img_product');
const input_name_product = document.querySelector('#input_name_product');
const input_quantity = document.querySelector('#input_quantity');
const input_price = document.querySelector('#input_price');
function reload_page()
{
    table_product_info.innerHTML = 
    `
        <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Image Product</th>
            <th>Type Id</th>
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
                <td>${product.type_id}</td>
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
    products.push({
        id: id,
        name: input_name_product.value,
        image: input_img_product.value,
        type_id: null,
        quantity: input_quantity.value,
        price: input_price.value
    });
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
    input_name_product.value = products.find(product => product.id == id).name;
}
reload_page();