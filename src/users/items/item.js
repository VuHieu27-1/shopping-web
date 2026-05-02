const url_params = new URLSearchParams(window.location.search).get('id');
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
        <td>
            <div class="sub_area_item">
                <i class="material-icons">location_on</i>
                <span>${element.area}</span>
            </div>
        </td>
        <td style="text-align: center;">
            <button class="view_more_btn">View More</button>
        </td>
        `;
        name_item.innerHTML = element.name;
        price_item.innerHTML = `${element.price} VND`;
        let decription = types.find(task => task.id == element.type_id).decription;
        decription_item.innerHTML = decription;
        arrive_items.innerHTML = position_user;
        }
    });
}
// ==========================================Page_cart==========================================
// console.log(products);
// console.log(admins);
// localStorage.removeItem('cart');
if(user != undefined)
{
    collection_profile_name.innerHTML = `${user.username}`;
}
console.log(cart);
reload_page();

(function action_add_cart() {
    const addBtn      = document.querySelector('.buttom_item button:last-child');
    const cartIconWrap = document.querySelector('.cart_icon_wrap');
    const badge       = document.querySelector('.number_of_cart');
    if (!addBtn || !cartIconWrap) return;

    const toast = document.createElement('div');
    toast.className = 'cart_success_toast';
    toast.innerHTML = '<i class="material-icons toast_icon">check_circle</i><span>Added to Cart!</span>';
    document.body.appendChild(toast);
    let toastTimer;

    addBtn.addEventListener('click', function () {
        const btnRect  = addBtn.getBoundingClientRect();
        const cartRect = cartIconWrap.getBoundingClientRect();
        const startX = btnRect.left  + btnRect.width  / 2;
        const startY = btnRect.top   + btnRect.height / 2;
        const endX   = cartRect.left + cartRect.width  / 2;
        const endY   = cartRect.top  + cartRect.height / 2;

        const imgEl  = document.querySelector('.main_img_item img');
        const flyEl  = document.createElement('div');
        flyEl.className = 'fly_item';
        flyEl.innerHTML = imgEl
            ? `<img src="${imgEl.src}" alt="">`
            : '<i class="material-icons fly_item_icon">shopping_bag</i>';
        flyEl.style.left = (startX - 30) + 'px';
        flyEl.style.top  = (startY - 30) + 'px';
        document.body.appendChild(flyEl);

        flyEl.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${endX - startX}px,${endY - startY}px) scale(0.2)`, opacity: 0 }
        ], { duration: 700, easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)', fill: 'forwards' }
        ).onfinish = function () {
            flyEl.remove();
            cartIconWrap.classList.remove('cart_icon_bounce');
            void cartIconWrap.offsetWidth;
            cartIconWrap.classList.add('cart_icon_bounce');
            if (badge) {
                badge.classList.remove('badge_pulse');
                void badge.offsetWidth;
                badge.classList.add('badge_pulse');
            }
        };

        clearTimeout(toastTimer);
        toast.classList.add('toast_show');
        toastTimer = setTimeout(() => toast.classList.remove('toast_show'), 2500);
    });
})();
