const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");
const perhatian = document.getElementsByClassName("perhatian")[0];
const msg = document.getElementById("err_message");
togglePassword.addEventListener("click", () => {
    const type =
        password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    togglePassword.classList.toggle("bi-eye");
});

const form = document.getElementById("form");
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const user = document.getElementById("user").value;
    const pass = password.value;

    if (!user && !pass) {
        perhatian.style.display = "flex";
        msg.innerHTML = "Isi username dan password";
    } else if (!user) {
        perhatian.style.display = "flex";
        msg.innerHTML = "Isi username";
    } else if (!pass) {
        perhatian.style.display = "flex";
        msg.innerHTML = "Isi password";
    } else {
        const data = { user, pass };
        fetch("/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((result) => {
            switch (result.status) {
                case 201:
                    location.href = "/dashboard";
                    break;
                case 301:
                    perhatian.style.display = "flex";
                    msg.innerHTML = "Tidak ada username";
                    break;
                case 302:
                    perhatian.style.display = "flex";
                    msg.innerHTML = "Password salah";
                    break;
            }
        });
    }
});
