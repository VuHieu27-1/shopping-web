const table_view_cart = document.querySelector('.table_view_cart');
const result_price = document.querySelector('.result_price');
console.log(cart);
window.addEventListener('storage', event => {
    cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined;
    if(event.key == 'cart' || event.key == 'user')
    {
        window.location.reload();
    }
});
function reload_page()
{
    let total_price = 0;
    table_view_cart.innerHTML = '';
    cart.forEach(element => {
        if(element.user_id == user.id)
        {
            const product_image = images.find(img => img.product_id == element.product_id);
            const img_html = product_image
                ? `<img class="cart_card_img" src="../../../asset/img/${product_image.path}" alt="${element.product_name}">`
                : `<div class="cart_card_img_placeholder"><i class="material-icons">image</i></div>`;

            table_view_cart.innerHTML +=
            `
            <div class="cart_card">
                ${img_html}
                <div class="cart_card_body">
                    <div class="cart_card_name">${element.product_name}</div>
                    <div class="cart_card_desc">${element.user_name}</div>
                    <div class="cart_card_bottom">
                        <div class="cart_qty_control">
                            <button class="cart_qty_btn" onclick="reduce_item(${element.id})">&#8722;</button>
                            <span class="cart_qty_count">${element.quantity}</span>
                            <button class="cart_qty_btn" onclick="increase_item(${element.id})">+</button>
                        </div>
                        <span class="cart_card_price">$ ${parseFloat(element.price_item).toFixed(2)}</span>
                    </div>
                </div>
                <button class="cart_delete_btn" onclick="delete_item(${element.id})">
                    <i class="material-icons">delete_outline</i>
                </button>
            </div>
            `;
        total_price += element.price_item;
        }
    });
    result_price.innerHTML = `$ ${total_price} VND`;
}
function increase_item(id)
{
    const item_id = cart.find(item => item.id == id);
    const product_item = products.find(task => task.id == item_id.product_id);
    console.log(products);
    cart.find(item => item.id == id).quantity++;
    cart.find(item => item.id == id).price_item = product_item.price * cart.find(item => item.id == id).quantity;
    if(cart.find(item => item.id == id).quantity > product_item.quantity)
    {
        alert("Quantity not valid");
        return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    reload_page();
}
function reduce_item(id)
{
    const item_id = cart.find(item => item.id == id);
    const product_item = products.find(task => task.id == item_id.product_id);
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
    cart = cart.filter(task => task.id != id);
    localStorage.setItem('cart', JSON.stringify(cart));
    reload_page();
}
function back_item()
{
    window.history.back();
}
reload_page();