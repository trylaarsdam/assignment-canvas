var inputField;
window.onload = function() {
  inputField = document.getElementById('canvasAPI');
}

async function setCanvasAPI(databaseUUID){
  //var xhttp = new XMLHttpRequest();
  console.log(googleID);
  console.log(inputField.value);
  await fetch("https://canvas.toddr.org/api/setCanvasAPI/" + databaseUUID + "/" + inputField.value.toString(), {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify({uuid: databaseUUID, canvas: "inputField.value"})
  })
}