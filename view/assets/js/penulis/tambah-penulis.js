var inpEmail = document.getElementById("email");
var popup = document.getElementsByClassName("popup-info-wrap")[0];
var popupSuccess = document.getElementById("popup-success");
var popupFail = document.getElementById("popup-fail");
var closePopup = document.getElementsByClassName("closebtn");
var form = document.getElementById("tambah-penulis");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = inpEmail.value;
    const password = document.getElementById("password").value;
    const repass = document.getElementById("repeat-password").value;
    const departemen = $("#departemen").val();
    const namaDepartemen = $("#departemen").select2("data")[0].text;

    const data = {
        firstName,
        lastName,
        email,
        password,
        departemen,
        namaDepartemen,
    };

    if (repass == password) {
        fetch("/penulis/tambah-penulis", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((value) => {
            if (value.status == "200") {
                popup.style.display = "block";
                popupSuccess.style.display = "flex";
            } else {
                popup.style.display = "block";
                popupFail.style.display = "flex";
            }
        });
    } else {
        alert("Ketik ulang password dengan baik");
    }
});

for (let i = 0; i < closePopup.length; i++) {
    closePopup[i].addEventListener("click", function () {
        popup.style.display = "none";
    });
}
