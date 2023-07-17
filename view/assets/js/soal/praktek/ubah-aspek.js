const form = document.getElementById("ubah-aspek");
const msg = document.getElementsByClassName("warning-msg")[0];
var popup = document.getElementsByClassName("popup-info-wrap")[0];
var popupSuccess = document.getElementById("popup-success");
var popupFail = document.getElementById("popup-fail");
var closePopup = document.getElementsByClassName("closebtn");
const skor0 = document.getElementsByClassName("skor0")[0];
const skor1 = document.getElementsByClassName("skor1")[0];
const skor2 = document.getElementsByClassName("skor2")[0];

const isChecked = (inputCheck) => {
    if (inputCheck) {
        return 1;
    } else {
        return 0;
    }
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let skorDiisi = 0;
    const aspekDinilai = tinymce.get("aspek_dinilai").getContent();
    const inp0 = $("#inp-skor0").val();
    const inp1 = $("#inp-skor1").val();
    const inp2 = $("#inp-skor2").val();
    let skor0 = isChecked($("#skor0").is(":checked"));
    let skor1 = isChecked($("#skor1").is(":checked"));
    let skor2 = isChecked($("#skor2").is(":checked"));
    const id = $("#id").val();

    if (skor0 == 1) {
        skorDiisi += 1;
    }
    if (skor1 == 1) {
        skorDiisi += 1;
    }
    if (skor2 == 1) {
        skorDiisi += 1;
    }

    const data = {
        aspekDinilai,
        inp0,
        inp1,
        inp2,
        skor0,
        skor1,
        skor2,
    };

    if (!aspekDinilai) {
        popup.style.display = "block";
        popupFail.style.display = "flex";
        msg.innerHTML = "Mohon isi aspek yang dinilai";
    } else if (skorDiisi < 2) {
        popup.style.display = "block";
        popupFail.style.display = "flex";
        msg.innerHTML = "Mohon isi minimal dua skor";
    } else {
        fetch(`/tulis-soal/ubah-aspek/${id}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((result) => {
            if (result.status == "201") {
                location.reload();
            }
        });
    }
});

function disabilityToggle(angka, cbx) {
    if (cbx.checked) {
        $(`#inp-skor${angka}`).prop("disabled", false);
    } else {
        $(`#inp-skor${angka}`).prop("disabled", true);
        $(`#inp-skor${angka}`).val("");
    }
}

document.onreadystatechange = () => {
    disabilityToggle("0", skor0);
    disabilityToggle("1", skor1);
    disabilityToggle("2", skor2);
};

skor0.onclick = () => {
    disabilityToggle("0", skor0);
};

skor1.onclick = () => {
    disabilityToggle("1", skor1);
};

skor2.onclick = () => {
    disabilityToggle("2", skor2);
};

for (let i = 0; i < closePopup.length; i++) {
    closePopup[i].addEventListener("click", function () {
        popup.style.display = "none";
    });
}
