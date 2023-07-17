const hapusbtn = document.getElementById("hapus-aspek");
hapusbtn.addEventListener("click", () => {
    const idAspek = document.getElementById("id-aspek");
    fetch(`/tulis-soal/hapus-aspek/${idAspek}`, {
        method: "GET",
    }).then(() => {
        location.reload();
    });
});
