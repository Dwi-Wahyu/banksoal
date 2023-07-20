const downloadbtn = document.getElementById("downloadbtn");
downloadbtn.addEventListener("click", () => {
    fetch("/tulis-soal/get-template-teori", {
        method: "GET",
    });
});
