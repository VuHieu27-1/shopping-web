const collection_catalog_card = document.querySelector('.collection_catalog_card');
const collection_profile_name = document.querySelector('.collection_profile_name');
const title_page_men = document.querySelector('.title_page_men h2');
window.addEventListener('storage', event => {
    if(event.key == 'products')
    {
        reload_page();
    }
});
if(user != undefined)
{
    collection_profile_name.innerHTML = `${user.username}`;
}
if(details_user.find(task => task.id == user.detail_user_id))
{
    title_page_men.innerHTML = `Welcome back, ${details_user.find(task => task.id == user.detail_user_id).username} !`;
}else
{
    title_page_men.innerHTML = `Welcome back !`;
}
console.log(products);
function reload_page()
{
    localStorage.setItem('products', JSON.stringify(products));
    collection_catalog_card.innerHTML = "";
    products.forEach(element => {
    const image_product = images.filter(image => image.product_id == element.id);
    element.image_path = image_product.map(image => image.path).join(",");
    if(element.type_name == window.location.pathname.split('/')[3]){
        collection_catalog_card.innerHTML +=
        `
            <div class="item_men" onclick="open_item_details(${element.id})">
                <img src="../../../asset/img/${element.image_path.split(",")[0]}"></img>
                <h3>${element.name}</h3>
                <span>${element.type_name}</span>
                <h3>$ ${element.price} VND</h3>
            </div>
        ` 
        }
    });        
}
function open_item_details(id)
{
    details_item = products.find(task => task.id == id)
    console.log(details_item);
    window.location.href = `../items/?id=${details_item.id}`
}
reload_page();