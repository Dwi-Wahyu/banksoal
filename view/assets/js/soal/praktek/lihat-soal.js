const tambahGambar = document.getElementById("tambah-gambar");
const ubahGambar = document.getElementById("form");
const hapusgmb1 = document.getElementById("hapus-gambar1");
const hapusgmb2 = document.getElementById("hapus-gambar2");

const idSoal = document.getElementById("idSoal").value;

tambahGambar.addEventListener("submit", (e) => {
    e.preventDefault();
    const gambar = document.getElementById("gambar").files[0];
    let formData = new FormData();
    formData.append("gambar", gambar);
    fetch(`/tulis-soal/lihat-soal/tambah-gambar-praktek/${idSoal}`, {
        method: "POST",
        body: formData,
    }).then((result) => {
        if (result.status == "201") {
            location.reload();
        }
    });
});

ubahGambar.addEventListener("submit", (e) => {
    e.preventDefault();
    const gambar1 = document.getElementById("gambar1").files[0];
    const gambar2 = document.getElementById("gambar2").files[0];
    let formData = new FormData();
    if (!gambar1 && !gambar2) {
        alert("ganti minimal satu gambar");
    } else {
        formData.append("gambar1", gambar1);
        formData.append("gambar2", gambar2);
        fetch(`/tulis-soal/lihat-soal/ubah-gambar-praktek/${idSoal}`, {
            method: "POST",
            body: formData,
        }).then((result) => {
            if (result.status == "201") {
                location.reload();
            }
        });
    }
});

hapusgmb1.addEventListener("click", () => {
    fetch(`/tulis-soal/hapus-gambar-praktek/${idSoal}/gambar1`, {
        method: "DELETE",
    }).then((result) => {
        if (result.status == "201") {
            location.reload();
        }
    });
});

hapusgmb2.addEventListener("click", () => {
    fetch(`/tulis-soal/hapus-gambar-praktek/${idSoal}/gambar2`, {
        method: "DELETE",
    }).then((result) => {
        if (result.status == "201") {
            location.reload();
        }
    });
});
