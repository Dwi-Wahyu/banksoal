tinymce.init({
    selector: "textarea#default",
    height: 250,
});

const skor0 = document.getElementsByClassName("skor0")[0];
const skor1 = document.getElementsByClassName("skor1")[0];
const skor2 = document.getElementsByClassName("skor2")[0];

function disabilityToggle(angka, cbx) {
    if (cbx.checked) {
        $(`#inp-skor${angka}`).prop("disabled", false);
    } else {
        $(`#inp-skor${angka}`).prop("disabled", true);
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
