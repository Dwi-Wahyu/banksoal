var closePopup = document.getElementsByClassName("closebtn");
const msg = document.getElementById("warning-msg");
var popup = document.getElementsByClassName("popup-info-wrap")[0];
var popupSuccess = document.getElementById("popup-success");
const form = document.getElementById("ubah-soal-praktek");

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
    const id = $("#id").val();
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

    if (err.length > 0) {
        msg.innerHTML = err;
        $("#pesan-error").show();
    } else {
        const data = {
            tinjauan1,
            tinjauan2,
            subtinjauan2,
            tinjauan3,
            tinjauan4,
            tujuan,
            skenarioKlinik,
            tugasKandidat,
            tugasPenguji,
            intruksiPasien,
            peralatan,
            departemen,
            namaDepartemen,
            referensi,
        };

        console.log(data);
        fetch(`/tulis-soal/lihat-soal/ubah-soal-praktek/${id}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((result) => {
            if (result.statusText == "Berhasil update soal") {
                location.reload();
            }
            // $("#pesan-error").hide();
            // popup.style.display = "block";
            // popupSuccess.style.display = "flex";
        });
    }
});

for (let i = 0; i < closePopup.length; i++) {
    closePopup[i].addEventListener("click", function () {
        popup.style.display = "none";
    });
}
