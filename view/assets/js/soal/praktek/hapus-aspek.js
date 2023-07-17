const hapusbtn = document.getElementById("hapusbtn");
hapusbtn.addEventListener("click", () => {
    const idAspek = document.getElementById("idAspek");
    fetch(`/tulis-soal/hapus-aspek/${idAspek}`, {
        method: "DELETE",
    });
});
