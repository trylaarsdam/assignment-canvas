var inputFieldAPI;
var inputFieldURL;

window.onload = function() {
  inputFieldAPI = document.getElementById('canvasAPI');
  inputFieldURL = document.getElementById('canvasURL')
}

async function setCanvasAPI(databaseUUID){
  //var xhttp = new XMLHttpRequest();
  console.log(databaseUUID);
  console.log(inputFieldAPI.value);
  await fetch("https://canvas.toddr.org/api/setCanvasAPI/" + databaseUUID + "/" + inputFieldAPI.value.toString(), {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify({uuid: databaseUUID, canvas: "inputFieldAPI.value"})
  })
}

async function setCanvasURL(databaseUUID){
  //var xhttp = new XMLHttpRequest();
  console.log(databaseUUID);
  console.log(inputFieldURL.value);
  await fetch("https://canvas.toddr.org/api/setCanvasURL/" + databaseUUID + "/" + inputFieldURL.value.toString(), {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify({uuid: databaseUUID, canvas: "inputFieldURL.value"})
  })
}