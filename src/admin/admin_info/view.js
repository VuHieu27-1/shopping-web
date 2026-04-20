const table_info_user = document.querySelector(".table_details_user");
const title_name = document.querySelector(".title_name");
const admin_info = details_user.find(task => task.id == user.detail_user_id);

function reload_page() {
    title_name.innerHTML = `
        <img src="../../../asset/img/avata_img.png" alt="" style="width:96px; height:96px; border-radius:28px; object-fit:cover; box-shadow:0 12px 24px rgba(240,107,131,0.18);">
        <div style="display:flex; flex-direction:column; gap:8px;">
            <h2 style="margin:0; font-family:var(--font_text); color:#8d4f58; font-size:32px;">${admin_info ? admin_info.name : "Who you are"}</h2>
            <span style="font-family:var(--font_text); color:#ab7f86; font-size:18px;">${admin_info ? admin_info.email : "justone@gmail.com"}</span>
        </div>
    `;

    table_info_user.innerHTML = `
        <tr>
            <th width="30%">Field</th>
            <th>Value</th>
        </tr>
        <tr>
            <td>Name</td>
            <td>${admin_info ? admin_info.name : "N/A"}</td>
        </tr>
        <tr>
            <td>Gender</td>
            <td>${admin_info ? admin_info.gender : "N/A"}</td>
        </tr>
        <tr>
            <td>Email</td>
            <td>${admin_info ? admin_info.email : "N/A"}</td>
        </tr>
        <tr>
            <td>Phone</td>
            <td>${admin_info ? admin_info.phone : "N/A"}</td>
        </tr>
        <tr>
            <td>Address</td>
            <td>${admin_info ? admin_info.address : "N/A"}</td>
        </tr>
    `;
}

reload_page();
