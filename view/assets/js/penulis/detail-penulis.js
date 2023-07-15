const ubah = document.getElementById("ubah");
const simpan = document.getElementById("simpan");
var popup = document.getElementsByClassName("popup-info-wrap")[0];
var closePopup = document.getElementsByClassName("closebtn");
var popupSuccess = document.getElementById("popup-success");
// const form = document.getElementById("form-ubah");

function undisable(para1, para2, para3, para4, para5, para6) {
    $(para1).prop("disabled", false);
    $(para2).prop("disabled", false);
    $(para3).prop("disabled", false);
    $(para4).prop("disabled", false);
    $(para5).prop("disabled", false);
    $(para6).prop("disabled", false);
}

function disable(para1, para2, para3, para4, para5, para6) {
    $(para1).prop("disabled", true);
    $(para2).prop("disabled", true);
    $(para3).prop("disabled", true);
    $(para4).prop("disabled", true);
    $(para5).prop("disabled", true);
    $(para6).prop("disabled", true);
}

ubah.onclick = () => {
    ubah.classList.toggle("ubah");
    var editCon = ubah.classList.contains("ubah");
    if (editCon) {
        ubah.innerHTML = "Batalkan";
        undisable(
            "#simpan",
            "#email",
            "#kode-pengguna",
            "#nama-depan",
            "#nama-belakang",
            "#departemen"
        );
    } else {
        ubah.innerHTML = "Ubah Penulis";
        disable(
            "#simpan",
            "#email",
            "#kode-pengguna",
            "#nama-depan",
            "#nama-belakang",
            "#departemen"
        );
    }
};

simpan.onclick = () => {
    const email = document.getElementById("email").value;
    const firstName = document.getElementById("nama-depan").value;
    const lastName = document.getElementById("nama-belakang").value;
    const namaDepartemen = $("#departemen").select2("data")[0].text;
    const departemen = $("#departemen").val();
    const id = document.getElementById("id").value;
    const data = { email, firstName, lastName, departemen, namaDepartemen };
    fetch(`/penulis/update-penulis/${id}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((value) => {
        if (value.status == "201") {
            popup.style.display = "block";
            popupSuccess.style.display = "flex";
        }
    });

    ubah.classList.toggle("ubah");
    ubah.innerHTML = "Ubah Penulis";
    disable(
        "#simpan",
        "#email",
        "#kode-pengguna",
        "#nama-depan",
        "#nama-belakang",
        "#departemen"
    );
};

for (let i = 0; i < closePopup.length; i++) {
    closePopup[i].addEventListener("click", function () {
        popup.style.display = "none";
    });
}
