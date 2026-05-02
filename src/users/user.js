const my_account = document.querySelector('.my_account');
const my_account_side = document.querySelector('.my_account_side');
const setting_user = document.querySelector('.setting_user');
const open_side_bar = document.querySelector('.open_side_bar');
const side_bar_menu = document.querySelector('.side_bar_menu');
const open_icon = document.querySelector('.open_icon');
const number_of_cart = document.querySelector('.number_of_cart')
function load_count_cart()
{
    const count = user ? cart.filter(item => item.user_id == user.id).length : 0;

    number_of_cart.innerHTML = count;

    if(count == 0)
    {
        number_of_cart.style.display = 'none';
    }
    else
    {
        number_of_cart.style.display = 'block';
    }
}
if(user == undefined)
{
    if(my_account)
    {
        my_account.innerHTML = 
        `
         <a href="../">Login</a>
        `;
    }
    if(my_account_side)
    {
        my_account_side.innerHTML =
        `
        <a href="../">Login</a>
        `;
    }
}
else
{
    if(my_account)
    {
        my_account.innerHTML = 
        `
        ${user.username}
        `
    }
    if(my_account_side)
    {
        my_account_side.innerHTML =
        `
        ${user.username}
        `
    }
}
if(my_account && setting_user && my_account.text.trim() == 'Login')
{
    setting_user.classList.add('hidden_feature');
}else if(setting_user)
{
    setting_user.classList.remove('hidden_feature');
}

if(open_side_bar && side_bar_menu && open_icon)
{
    open_side_bar.addEventListener('click', () => {
        side_bar_menu.classList.toggle('side_bar_menu_close');
        open_side_bar.classList.toggle('open_side_bar_shift');
        open_icon.innerHTML = side_bar_menu.classList.contains('side_bar_menu_close') ? 'arrow_forward_ios' : 'arrow_back_ios';
    });
}
load_count_cart();
function add_item_cart()
{
    const id = cart.length ? cart[cart.length - 1].id + 1 : 1;
    const product_item = products.find(task => task.id == url_params);
    // const user_item
    if(quantity_buy.value > 0 && parseInt(quantity_buy.value) <= parseInt(product_item.quantity) && !(cart.find(task => task.product_id == product_item.id) && cart.find(task => task.user_id == user.id)))
    {
        cart.push({
            id: id,
            product_id: product_item.id,
            product_name: product_item.name,
            user_id: user.id,
            user_name: user.username,
            quantity: quantity_buy.value,
            price_item: quantity_buy.value * product_item.price
        });
    }else if(cart.find(task => task.product_id == product_item.id) && cart.find(task => task.user_id == user.id))
    {
        const item = cart.find(task => task.product_id == product_item.id);
        item.quantity = parseInt(item.quantity) + parseInt(quantity_buy.value);
        item.price_item = parseInt(item.price_item) + parseInt(quantity_buy.value) * parseInt(product_item.price);
    }
    else if(parseInt(quantity_buy.value) > parseInt(product_item.quantity) + 1)
    {
        alert("Quantity not valid");
    }
    console.log(cart);
    quantity_buy.value = "1";
    localStorage.setItem('cart', JSON.stringify(cart));
    load_count_cart();
}