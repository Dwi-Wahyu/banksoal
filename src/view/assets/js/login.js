const togglePassword = document.getElementById("togglePassword")
const password = document.getElementById("password")
const perhatian = document.getElementsByClassName("perhatian")[0]
const msg = document.getElementById("err_message")
togglePassword.addEventListener("click", () => {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password"
  password.setAttribute("type", type)

  togglePassword.classList.toggle("bi-eye")
})

$("#form").on("submit", (e) => {
  e.preventDefault()

  const user = $("#user").val()
  const pass = password.value

  $("#user").removeClass("tidak-valid")
  $("#password").removeClass("tidak-valid")
  $("#user-salah").hide()
  $("#password-salah").hide()

  const data = { user, pass }
  fetch("/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    switch (result.status) {
      case 201:
        location.href = "/dashboard"
        break
      case 301:
        $("#user").addClass("tidak-valid")
        $("#user-salah").show()
        break
      case 302:
        $("#password").addClass("tidak-valid")
        $("#password-salah").show()
        break
    }
  })
})
