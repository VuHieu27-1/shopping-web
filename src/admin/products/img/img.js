const table_image = document.querySelector('.table_image');
const input_image_products = document.querySelector('#input_image_products');
const file_image = document.querySelector('#file_image');
const image_product_id = document.querySelector('#image_product_id');
const image_product_name = document.querySelector('#image_product_name');
const image_total = document.querySelector('#image_total');

// localStorage.removeItem("images");
if(product == undefined)
{
    window.location.href = "../";
}
window.addEventListener('storage', event =>
{
    if(event.key == 'products')
    {
        images = localStorage.getItem('images') ? JSON.parse(localStorage.getItem('images')) : [];
        products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
        images.forEach(element => {
            const product_img = products.find(product => product.id == element.product_id && product.name == element.product_name);
            if(product_img == undefined)
            {
                delete_images(element.id);
            }
            console.log(product_img);
        });
        localStorage.setItem('images', JSON.stringify(images));
        reload_page();
    }
});
function reload_page()
{
    image_product_id.innerHTML = product.id;
    image_product_name.innerHTML = product.name;
    image_total.innerHTML = images.filter(element => element.product_id == product.id && element.product_name == product.name).length;
    table_image.innerHTML = 
    `
        <tr>
            <th>Id</th>
            <th>Image Name</th>
            <th>Image Path</th>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Action</th>
        </tr>
    `;
    images.forEach(element => {
        if(element.product_id == product.id && element.product_name == product.name)
        {
            table_image.innerHTML +=
            `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${element.path}</td>
                    <td>${element.product_id}</td>
                    <td>${element.product_name}</td>
                    <td>
                        <button onclick="delete_images(${element.id})">Delete</button>
                    </td>
                </tr>
            `
        }
    });
}

function add_image()
{
    const id = images.length ? images[images.length - 1].id + 1 : 1;
    let file_image_index = file_image.value.split("\\")
    images.push({
        id: id,
        name: input_image_products.value,
        path: file_image_index[2],
        product_id: product.id,
        product_name: product.name
    });
    localStorage.setItem('images', JSON.stringify(images));
    reload_page();
}
function delete_images(id)
{
    images = images.filter(task => task.id != id);
    localStorage.setItem('images', JSON.stringify(images));
    reload_page();
}
reload_page();