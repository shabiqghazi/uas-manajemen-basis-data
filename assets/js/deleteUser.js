let buttons = document.getElementsByClassName("delete_user");
function deleteUser() {
  let id = this.getAttribute("data-id");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alert(JSON.parse(this.response).message);
      document.location.href = "/";
    }
  };

  xhttp.open("DELETE", `http://localhost:3000/api/users/${id}`, true);
  xhttp.setRequestHeader(
    "Authorization",
    `Bearer ${getCookie('token')}`
  );
  xhttp.send();

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", deleteUser);
}
