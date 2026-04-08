const login_user = document.querySelector(".login_user");
const login_password = document.querySelector(".login_password");
const login_user_register = document.querySelector(".login_user_register");
const login_password_register = document.querySelector(".login_password_register");
const login_password_confirm = document.querySelector(".login_password_confirm");
const feature_login = document.querySelector(".feature_login");
const feature_sign_up = document.querySelector('.feature_sign_up');
function login_action() {
    const username = login_user.value.trim();
    const password = login_password.value.trim();
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    const account = admins.find(user =>
        user.username === username && user.password === password
    );

    if (!account) {
        alert("Wrong username or password");
        return;
    }
    const roleId = account.roles_id;
    if (roleId == 1) {
        window.location.href = `./admin/?id=${account.id}`;
    } else if (roleId == 2) {
        window.location.href = `./users/?id=${account.id}`;
    } else {
        alert("Role is invalid");
    }
    user = account;
    localStorage.setItem('user', JSON.stringify(user));
}
function register_action()
{
    admins = localStorage.getItem('admins') ? JSON.parse(localStorage.getItem('admins')) : [];
    let check_username = admins.find(admin => admin.username == login_user_register.value && admin.password == login_password_register.value);
    const id = admins.length ? admins[admins.length - 1].id + 1 : 1;
    if(!check_username && login_password_register.value == login_password_confirm.value)
    {
        admins.push({
            id: id,
            username: login_user_register.value,
            password: login_password_register.value,
            roles_id: 2
        });
        login_user_register.value = "";
        login_password_register.value = "";
        login_password_confirm.value = "";
    }else if(login_password_register.value != login_password_confirm.value)
    {
        console.log(login_password_register.value);
        console.log(login_password_confirm.value);
        alert('The password does not match.');
    }
    else{
        alert('The username already exists.');
    }
    localStorage.setItem('admins', JSON.stringify(admins));
}

feature_sign_up.addEventListener("keydown", event => {
    if(event.key == 'Enter')
    {
        register_action();
    }
});
feature_login.addEventListener("keydown", event => {
    if(event.key == 'Enter')
    {
        login_action();
    }
});
//////////////////////===== Status_sign==========////////////////////
const sign_in = document.querySelector('.sign_in');
const sign_up = document.querySelector('.sign_up');
const button_login = document.querySelector('.button_login');
const button_register = document.querySelector('.button_register');
function change_status_sign1()
{
    sign_in.classList.add('effect_sign_buttom');
    sign_up.classList.remove('effect_sign_buttom');
    feature_sign_up.classList.add('hidden_feature');
    feature_login.classList.remove('hidden_feature');
    button_login.classList.remove('hidden_feature');
    button_register.classList.add('hidden_feature');
}
function change_status_sign2()
{
    sign_up.classList.add('effect_sign_buttom');
    sign_in.classList.remove('effect_sign_buttom');
    feature_sign_up.classList.remove('hidden_feature');
    feature_login.classList.add('hidden_feature');
    button_login.classList.add('hidden_feature');
    button_register.classList.remove('hidden_feature');
}
//////////////////////===== Status_sign==========////////////////////
function togglePasswordVisibility(selector, icon) {
    const input = document.querySelector(selector);
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    icon.textContent = isPassword ? "visibility_off" : "visibility";
}
