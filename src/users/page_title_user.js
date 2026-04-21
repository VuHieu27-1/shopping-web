const content_inventory_ỉtem = document.querySelector('.content_inventory_ỉtem');

window.addEventListener('storage', event => {
    if(event.key == 'products')
    {
        reload_page();
    }
});
console.log(products);
function reload_page()
{
    products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    content_inventory_ỉtem.innerHTML = "";
    products.forEach(element => {
    if(element.type_name == window.location.pathname.split('/')[3]){
        content_inventory_ỉtem.innerHTML +=
        `
            <div class="item_men">
                <img src="../../../asset/img/${element.image_path.split("<br>")[0]}" alt="">
                <h3>${element.name}</h3>
                <span>${element.type_name}</span>
                <h3>$ ${element.price} VND</h3>
            </div>
        ` 
        }
    });        
}

reload_page();