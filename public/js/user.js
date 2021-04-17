var inputFieldAPI;
var inputFieldURL;
var modal;
var span;

window.onload = function () {
  inputFieldAPI = document.getElementById('canvasAPI');
  inputFieldURL = document.getElementById('canvasURL');
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

async function setCanvasAPI(databaseUUID) {
  //var xhttp = new XMLHttpRequest();
  console.log(databaseUUID);
  console.log(inputFieldAPI.value);
  await fetch("https://canvas.toddr.org/api/setCanvasAPI/" + databaseUUID + "/" + inputFieldAPI.value.toString(), {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify({ uuid: databaseUUID, canvas: "inputFieldAPI.value" })
  })
}

async function setCanvasURL(databaseUUID) {
  //var xhttp = new XMLHttpRequest();
  console.log(databaseUUID);
  console.log(inputFieldURL.value);
  var httpRemoved;
  if (inputFieldURL.value.startsWith('https://') || inputFieldURL.value.startsWith('http://')) {
    httpRemoved = inputFieldURL.value.split("://")[1];
  }
  else {
    httpRemoved = inputFieldURL.value
  }

  if (httpRemoved.split("/").length > 1) {
    httpRemoved = httpRemoved.split("/")[0];
    //TODO add modal
  }

  if (httpRemoved != inputFieldURL.value) {
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

  return false;
}


