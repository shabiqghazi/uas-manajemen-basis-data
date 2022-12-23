document.getElementById("update_user").addEventListener("submit", function (e) {
  e.preventDefault();
  id = document.getElementById("id").value;
  nama = document.getElementById("nama").value;
  email = document.getElementById("email").value;
  jenisKelamin = document.querySelector(
    "input[name='jenisKelamin']:checked"
  ).value;
  status = document.querySelector("input[name='status']:checked").value;
  let formData = { nama, email, jenisKelamin, status };
  var formBody = [];
  for (var property in formData) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(formData[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alert(JSON.parse(this.response).message);
      document.location.href = "/";
    }
  };

  xhttp.open("PUT", `http://localhost:3000/api/users/${id}`, true);
  xhttp.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded;charset=UTF-8"
  );
  xhttp.setRequestHeader(
    "Authorization",
    `Bearer ${getCookie('token')}`
  );
  xhttp.send(formBody);

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
});
