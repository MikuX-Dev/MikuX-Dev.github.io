document.getElementById("accountForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var email = document.getElementById("email").value;

  createMegaAccount(username, password, email);
});

function createMegaAccount(username, password, email) {
  var request = new XMLHttpRequest();
  var url = "create_account.php";
  var params = "username=" + username + "&password=" + password + "&email=" + email;

  request.open("POST", url, true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      alert(request.responseText);
      document.getElementById("accountForm").reset();
    }
  };

  request.send(params);
}
