var inputFieldAPI;
var inputFieldURL;

window.onload = function () {
  inputFieldAPI = document.getElementById('canvasAPI');
  inputFieldURL = document.getElementById('canvasURL')
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
  await fetch("https://canvas.toddr.org/api/setCanvasURL/" + databaseUUID + "/" + httpRemoved, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify({ uuid: databaseUUID, canvas: httpRemoved })
  })
}