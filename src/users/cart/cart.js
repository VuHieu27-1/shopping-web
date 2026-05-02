const table_view_cart = document.querySelector('.table_view_cart');
const result_price = document.querySelector('.result_price');
console.log(cart);
window.addEventListener('storage', event => {
    cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined;
    if(event.key == 'products') {
        products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    }
    if(event.key == 'cart' || event.key == 'user' || event.key == 'products')
    {
        window.location.reload();
    }
});
function reload_page()
{
    let total_price = 0;
    table_view_cart.innerHTML = '';
    let cart_changed = false;
    cart.forEach(element => {
        if(element.user_id == user.id)
        {
            const product_item = products.find(p => p.id == element.product_id);
            const unit_price = product_item ? parseInt(product_item.price) : Math.round(parseInt(element.price_item) / parseInt(element.quantity));
            const current_price = unit_price * parseInt(element.quantity);
            if(element.price_item != current_price) {
                element.price_item = current_price;
                cart_changed = true;
            }

            const product_image = images.find(img => img.product_id == element.product_id);
            const img_html = product_image
                ? `<img onclick="open_detail_item(${element.product_id})" class="cart_card_img" src="../../../asset/img/${product_image.path}" alt="${element.product_name}">`
                : `<div class="cart_card_img_placeholder"><i class="material-icons">image</i></div>`;

            table_view_cart.innerHTML +=
            `
            <div class="cart_card">
                ${img_html}
                <div class="cart_card_body">
                    <div class="cart_card_name" onclick="open_detail_item(${element.product_id})">${element.product_name}</div>
                    <div class="cart_card_desc">${element.user_name}</div>
                    <div class="cart_card_bottom">
                        <div class="cart_qty_control">
                            <button class="cart_qty_btn" onclick="reduce_item(${element.id})">&#8722;</button>
                            <span class="cart_qty_count">${element.quantity}</span>
                            <button class="cart_qty_btn" onclick="increase_item(${element.id})">+</button>
                        </div>
                        <span class="cart_card_price">${current_price} VND</span>
                    </div>
                </div>
                <button class="cart_delete_btn" onclick="delete_item(${element.id})">
                    <i class="material-icons">delete_outline</i>
                </button>
            </div>
            `;
        total_price += current_price;
        }
    });
    if(cart_changed) localStorage.setItem('cart', JSON.stringify(cart));
    result_price.innerHTML = `${total_price} VND`;
}
function increase_item(id)
{
    const item_id = cart.find(item => item.id == id);
    const product_item = products.find(task => task.id == item_id.product_id);
    if(cart.find(item => item.id == id).quantity >= product_item.quantity)
    {
        alert("Quantity not valid");
        return;
    }
    console.log(products);
    cart.find(item => item.id == id).quantity++;
    cart.find(item => item.id == id).price_item = product_item.price * cart.find(item => item.id == id).quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    reload_page();
}
function reduce_item(id)
{
    const item_id = cart.find(item => item.id == id);
    const product_item = products.find(task => task.id == item_id.product_id);
    if(cart.find(item => item.id == id).quantity < 1)
    {
        cart.find(item => item.id == id).quantity = 1;
         cart.find(item => item.id == id).price_item = product_item.price * cart.find(item => item.id == id).quantity;
    }
    console.log(products);
    cart.find(item => item.id == id).quantity--;
    cart.find(item => item.id == id).price_item = product_item.price * cart.find(item => item.id == id).quantity;
    if(cart.find(item => item.id == id).quantity == 0)
    {
        delete_item(id);
        return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    reload_page();
}
function delete_item(id)
{
    const result = confirm("Do you want to delete this product?");
    if(!result)
    {
        return;
    }else
    {
        cart = cart.filter(task => task.id != id);
        localStorage.setItem('cart', JSON.stringify(cart));
        load_count_cart();
        reload_page();
    }
}
function open_detail_item(id)
{
    window.location.href = `../items/?id=${id}`;
}
function back_item()
{
    window.history.back();
}
reload_page();