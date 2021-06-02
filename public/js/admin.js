var banuserText;
var unbanuserText;
var modal;
var span;

window.onload = function () {
  banuserText = document.getElementById('banuserText');
  unbanuserText = document.getElementById('unbanuserText');
  modal = document.getElementById("myModal");

  span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

async function banuser(databaseUUID) {
  //var xhttp = new XMLHttpRequest();
  console.log(databaseUUID);
  console.log(banuserText.value);
  await fetch("https://canvas.toddr.org/api/admin/ban/" + databaseUUID + "/" + banuserText.value.toString(), {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify({ uuid: databaseUUID, canvas: "banuserText.value" })
  })
  banuserText.value = ""
}

async function unbanuser(databaseUUID) {
  //var xhttp = new XMLHttpRequest();
  console.log(databaseUUID);
  console.log(banuserText.value);
  await fetch("https://canvas.toddr.org/api/admin/unban/" + databaseUUID + "/" + banuserText.value.toString(), {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify({ uuid: databaseUUID, canvas: "banuserText.value" })
  })
  unbanuserText.value = ""
  /*
  //var xhttp = new XMLHttpRequest();
  console.log(databaseUUID);
  console.log(unbanuserText.value);
  var httpRemoved;
  if (unbanuserText.value.toLowerCase().startsWith('https://') || unbanuserText.value.toLowerCase().startsWith('http://')) {
    httpRemoved = unbanuserText.value.split("://")[1];
  }
  else {
    httpRemoved = unbanuserText.value
  }

  if (httpRemoved.split("/").length > 1) {
    httpRemoved = httpRemoved.split("/")[0];
    //TODO add modal
  }

  if (httpRemoved != unbanuserText.value) {
    document.getElementById("canvasurl").innerHTML = httpRemoved
    modal.style.display = "block";
  }

  await fetch("https://canvas.toddr.org/api/setCanvasURL/" + databaseUUID + "/" + httpRemoved, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify({ uuid: databaseUUID, canvas: httpRemoved })
  })

  unbanuserText.value = ""
  */
}


