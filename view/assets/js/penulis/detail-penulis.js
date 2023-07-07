const ubah = document.getElementById("ubah");
const simpan = document.getElementById("simpan");
// const form = document.getElementById("form-ubah");

function undisable(para1, para2, para3, para4, para5) {
    $(para1).prop("disabled", false);
    $(para2).prop("disabled", false);
    $(para3).prop("disabled", false);
    $(para4).prop("disabled", false);
    $(para5).prop("disabled", false);
}

function disable(para1, para2, para3, para4, para5) {
    $(para1).prop("disabled", true);
    $(para2).prop("disabled", true);
    $(para3).prop("disabled", true);
    $(para4).prop("disabled", true);
    $(para5).prop("disabled", true);
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
            "#nama-belakang"
        );
    } else {
        ubah.innerHTML = "Ubah Penulis";
        disable(
            "#simpan",
            "#email",
            "#kode-pengguna",
            "#nama-depan",
            "#nama-belakang"
        );
    }
};

simpan.onclick = () => {
    const email = document.getElementById("email").value;
    const nama_depan = document.getElementById("nama-depan").value;
    const nama_belakang = document.getElementById("nama-belakang").value;
    const data = { email, nama_depan, nama_belakang };
    fetch(`/penulis/update-penulis/${email}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    ubah.classList.toggle("ubah");
    ubah.innerHTML = "Ubah Penulis";
    disable(
        "#simpan",
        "#email",
        "#kode-pengguna",
        "#nama-depan",
        "#nama-belakang"
    );
};
