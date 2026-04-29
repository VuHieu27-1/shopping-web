const url_params = new URLSearchParams(window.location.search).get('id');
console.log(url_params)
detail_item = products.find(task => task.id == url_params);
document.querySelector("title").innerHTML = detail_item.name;
const main_img_item = document.querySelector('.main_img_item');
const sub_img_item = document.querySelector('.sub_img_item');
const area_item = document.querySelector('.area_item');
const price_item = document.querySelector('.price_item');
const name_item = document.querySelector('.name_item');
const decription_item = document.querySelector('.decription_item');
const delivery_items = document.querySelector('.delivery_items');
const arrive_items = document.querySelector('.arrive_items')
const quantity_buy = document.querySelector('#quantity_buy');
const collection_profile_name = document.querySelector('.collection_profile_name');
function back_item()
{
    window.location.href = `../${detail_item.type_name}`;
}
window.addEventListener("storage", event => {
    images = localStorage.getItem('images') ? JSON.parse(localStorage.getItem('images')) : [];
    products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    if(event.key == 'images' || event.key == 'products')
    {
        window.location.reload();
    }
});
function reload_page()
{
    admins.forEach(element => {
        if(element.id == 1)
        {
            let position_admin = details_user.find(task => task.id == element.detail_user_id) ? details_user.find(task => task.id == element.detail_user_id).address : "No address";
            delivery_items.innerHTML = position_admin;
        }
    });
    products.forEach(element => {
        if(element.id == url_params)
        {
        const image_product = images.filter(image => image.product_id == element.id);
        let position_user = details_user.find(task => task.id == user.detail_user_id) ? details_user.find(task => task.id == user.detail_user_id).address : "No address";
        element.image_path = image_product.map(image => image.path).join(",");
        main_img_item.innerHTML = `<img src="../../../asset/img/${element.image_path.split(",")[0]}"></img>`
        for(let i = 1; i < 4; i++)
        {
            if(element.image_path.split(",")[i] != "" && element.image_path.split(",")[i] != undefined)
            {
                sub_img_item.innerHTML += 
                `
                <img src="../../../asset/img/${element.image_path.split(",")[i]}" alt="">
                `
            }
        }
        area_item.innerHTML = 
        `
        <td class="sub_area_item">
            <i class="material-icons">location_on</i>
            <span>${element.area}</span>
        </td>
        </td>
        <td>
            <button>View More</button>
        </td>
        `;
        name_item.innerHTML = element.name;
        price_item.innerHTML = `$ ${element.price} VND`;
        let decription = types.find(task => task.id == element.type_id).decription;
        decription_item.innerHTML = decription;
        arrive_items.innerHTML = position_user;
        }
    });
}
// ==========================================Page_cart==========================================
// console.log(products);
// console.log(admins);
function add_item_cart()
{
    const id = cart.length ? cart[cart.length - 1].id + 1 : 1;
    const product_item = products.find(task => task.id == url_params);
    // const user_item
    if(quantity_buy.value != 0 && parseInt(quantity_buy.value) < parseInt(product_item.quantity) && !(cart.find(task => task.product_id == product_item.id) && cart.find(task => task.user_id == user.id)))
    {
        cart.push({
            id: id,
            product_id: product_item.id,
            product_name: product_item.name,
            user_id: user.id,
            user_name: user.username,
            quantity: quantity_buy.value,
            price_item:  quantity_buy.value * product_item.price
        });
    }else if(cart.find(task => task.product_id == product_item.id) && cart.find(task => task.user_id == user.id))
    {
        cart.find(task => task.product_id == product_item.id).quantity =  quantity_buy.value;
        cart.find(task => task.product_id == product_item.id).price_item =  quantity_buy.value * product_item.price;
    }
    else if(parseInt(quantity_buy.value) > parseInt(product_item.quantity))
    {
        alert("Quantity not valid");
    }
    quantity_buy.value = "";
    localStorage.setItem('cart', JSON.stringify(cart));
}
// localStorage.removeItem('cart');
if(user != undefined)
{
    collection_profile_name.innerHTML = `${user.username}`;
}
console.log(cart);
reload_page();
