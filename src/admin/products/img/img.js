const table_image = document.querySelector('.table_image');
const input_image_products = document.querySelector('#input_image_products');
const file_image = document.querySelector('#file_image');
console.log(product);
console.log(products);
// localStorage.removeItem("images");
if(product == undefined)
{
    window.location.href = "../";
}
function reload_page()
{
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
        table_image.innerHTML +=
        `
            <tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.path}</td>
                <td>${element.product_id}</td>
                <td>${element.product_name}</td>
                <td>
                    <button onclick="edit_images(${element.id})">Edit</button>
                    <button onclick="delete_images(${element.id})">Delete</button>
                </td>
            </tr>

        `
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
    product.image_id = id;
    product.image_path = file_image_index[2];
    localStorage.setItem('images', JSON.stringify(images));
    localStorage.setItem('product', JSON.stringify(product));
    reload_page();
}
function delete_images(id)
{
    images = images.filter(task => task.id != id);
    localStorage.setItem('images', JSON.stringify(images));
    // localStorage.setItem('product', JSON.stringify(product));
    // localStorage.setItem('products', JSON.stringify(products));
    reload_page();
}
reload_page();