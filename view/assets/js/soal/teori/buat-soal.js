const form = document.getElementById("tambah-soal-teori");
const inpKunci = document.getElementById("kunci");
const inpDepartemen = document.getElementById("departemen");
const msg = document.getElementById("warning-msg");
var popup = document.getElementsByClassName("popup-info-wrap")[0];
var popupSuccess = document.getElementById("popup-success");
var closePopup = document.getElementsByClassName("closebtn");

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

const btn = document.getElementById("submit-btn");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    var err = "";
    const tinjauan1 = $("#tinjauan1").val();
    const tinjauan2 = $("#tinjauan2").val();
    const tinjauan3 = $("#tinjauan3").val();
    const kunci = inpKunci.options[inpKunci.selectedIndex].value;
    const departemen = inpDepartemen.options[inpDepartemen.selectedIndex].value;
    const nama_departemen = $("#departemen").select2("data")[0].text;
    const gambar = document.getElementById("gambar").files[0];
    const jawabanA = document.getElementById("jawaban_a").value;
    const jawabanB = document.getElementById("jawaban_b").value;
    const jawabanC = document.getElementById("jawaban_c").value;
    const jawabanD = document.getElementById("jawaban_d").value;
    const jawabanE = document.getElementById("jawaban_e").value;
    const alasan = document.getElementById("alasan_singkat").value;
    const referensi = document.getElementById("referensi").value;
    const vignette = tinymce.get("vignette").getContent();
    const pertanyaan = tinymce.get("pertanyaan").getContent();

    err = `${err}${setErr(checkEmpty(tinjauan1), "Tinjauan 1<br>")}`;
    err = `${err}${setErr(checkEmpty(tinjauan2), "Tinjauan 2<br>")}`;
    err = `${err}${setErr(checkEmpty(tinjauan3), "Tinjauan 3<br>")}`;
    err = `${err}${setErr(checkEmpty(kunci), "Kunci jawaban<br>")}`;
    err = `${err}${setErr(checkEmpty(departemen), "Departemen<br>")}`;
    err = `${err}${setErr(checkEmpty(jawabanA), "Jawaban A<br>")}`;
    err = `${err}${setErr(checkEmpty(jawabanB), "Jawaban B<br>")}`;
    err = `${err}${setErr(checkEmpty(jawabanC), "Jawaban C<br>")}`;
    err = `${err}${setErr(checkEmpty(jawabanD), "Jawaban D<br>")}`;
    err = `${err}${setErr(checkEmpty(jawabanE), "Jawaban E<br>")}`;
    err = `${err}${setErr(checkEmpty(vignette), "Vignette<br>")}`;
    err = `${err}${setErr(
        checkEmpty(pertanyaan),
        "pertanyaan / intruksi<br>"
    )}`;

    if (err.length > 0) {
        msg.innerHTML = err;
        $("#pesan-error").show();
    } else {
        $("#pesan-error").hide();
        popup.style.display = "block";
        popupSuccess.style.display = "flex";
        let formData = new FormData();
        formData.append("tinjauan1", tinjauan1);
        formData.append("tinjauan2", tinjauan2);
        formData.append("tinjauan3", tinjauan3);
        formData.append("kunci", kunci);
        formData.append("departemen", departemen);
        formData.append("namaDepartemen", nama_departemen);
        formData.append("gambar", gambar);
        formData.append("jawabanA", jawabanA);
        formData.append("jawabanB", jawabanB);
        formData.append("jawabanC", jawabanC);
        formData.append("jawabanD", jawabanD);
        formData.append("jawabanE", jawabanE);
        formData.append("alasan", alasan);
        formData.append("referensi", referensi);
        formData.append("vignette", vignette);
        formData.append("pertanyaan", pertanyaan);

        fetch("/tulis-soal/form-soal-teori/tambah-soal", {
            method: "POST",
            body: formData,
        });
    }
});

for (let i = 0; i < closePopup.length; i++) {
    closePopup[i].addEventListener("click", function () {
        popup.style.display = "none";
    });
}
