var closePopup = document.getElementsByClassName("closebtn");
const msg = document.getElementById("warning-msg");
var popup = document.getElementsByClassName("popup-info-wrap")[0];
var popupSuccess = document.getElementById("popup-success");
const form = document.getElementById("tambah-soal-praktek");

function checkEmpty(variabel) {
    if (variabel.length > 0) {
        return false;
    } else {
        return true;
    }
}

function setErr(empty, input) {
    if (empty) {
        return input;
    } else {
        return "";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    var err = "";
    const tinjauan1 = $("#tinjauan1").val();
    const tinjauan2 = $("#tinjauan2").val();
    const subtinjauan2 = $("#subtinjauan2").val();
    const tinjauan3 = $("#tinjauan3").val();
    const tinjauan4 = $("#tinjauan4").val();
    const tujuan = tinymce.get("tujuan").getContent();
    const skenarioKlinik = tinymce.get("skenario-klinik").getContent();
    const tugasKandidat = tinymce.get("tugas-kandidat").getContent();
    const tugasPenguji = tinymce.get("tugas-penguji").getContent();
    const intruksiPasien = tinymce.get("intruksi-pasien").getContent();
    const peralatan = tinymce.get("peralatan").getContent();
    const gambar = e.target.gambar.files;
    const departemen = $("#departemen").val();
    const namaDepartemen = $("#departemen").select2("data")[0].text;
    const referensi = $("#referensi").val();

    err = `${err}${setErr(checkEmpty(tinjauan1), "Tinjauan 1<br>")}`;
    err = `${err}${setErr(checkEmpty(tinjauan2), "Tinjauan 2<br>")}`;
    err = `${err}${setErr(checkEmpty(subtinjauan2), "Sub Tinjauan 2<br>")}`;
    err = `${err}${setErr(checkEmpty(tinjauan3), "Tinjauan 3<br>")}`;
    err = `${err}${setErr(checkEmpty(tinjauan4), "Tinjauan 4<br>")}`;
    err = `${err}${setErr(checkEmpty(tujuan), "Tujuan<br>")}`;
    err = `${err}${setErr(checkEmpty(skenarioKlinik), "Skenario Klinik<br>")}`;
    err = `${err}${setErr(checkEmpty(tugasKandidat), "Tugas Kandidat<br>")}`;
    err = `${err}${setErr(checkEmpty(tugasPenguji), "Tugas Penguji<br>")}`;
    err = `${err}${setErr(checkEmpty(peralatan), "Peralatan<br>")}`;
    err = `${err}${setErr(checkEmpty(departemen), "Departemen<br>")}`;

    if (gambar.length == 0) {
        err = `${err}Gambar<br>`;
    }

    if (err.length > 0) {
        msg.innerHTML = err;
        $("#pesan-error").show();
    } else {
        let formData = new FormData();
        formData.append("tinjauan1", tinjauan1);
        formData.append("tinjauan2", tinjauan2);
        formData.append("subtinjauan2", subtinjauan2);
        formData.append("tinjauan3", tinjauan3);
        formData.append("tinjauan4", tinjauan4);
        formData.append("tujuan", tujuan);
        formData.append("skenarioKlinik", skenarioKlinik);
        formData.append("tugasKandidat", tugasKandidat);
        formData.append("tugasPenguji", tugasPenguji);
        formData.append("intruksiPasien", intruksiPasien);
        formData.append("peralatan", peralatan);
        formData.append("gambar", gambar);
        formData.append("departemen", departemen);
        formData.append("namaDepartemen", namaDepartemen);
        formData.append("referensi", referensi);
        for (const file of gambar) {
            formData.append("gambar", file);
        }
        fetch("/tulis-soal/form-soal-praktek/tambah-soal", {
            method: "POST",
            body: formData,
        }).then((result) => {
            if (result.statusText == "Payload Too Large") {
                msg.innerHTML =
                    "Format gambar yang diperbolehkan yaitu png jpg dan jpeg";
                $("#pesan-error").show();
            } else if (result.status == 500) {
                msg.innerHTML = "Maaf maksimal upload dua gambar";
                $("#pesan-error").show();
            } else {
                $("#pesan-error").hide();
                popup.style.display = "block";
                popupSuccess.style.display = "flex";
            }
        });
    }
});

for (let i = 0; i < closePopup.length; i++) {
    closePopup[i].addEventListener("click", function () {
        popup.style.display = "none";
    });
}
