const hapusbtn = document.getElementById("hapusbtn");
hapusbtn.addEventListener("click", () => {
    const idAspek = document.getElementById("idAspek").value;
    const idSoal = document.getElementById("idSoal").value;
    fetch(`/tulis-soal/hapus-aspek/${idSoal}/${idAspek}`, {
        method: "DELETE",
    }).then((result) => {
        if (result.status == "201") {
            location.href = `/tulis-soal/lihat-soal-praktek/${idSoal}`;
        } else {
            alert("gagal");
        }
    });
});
