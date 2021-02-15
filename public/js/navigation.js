var inputField;
window.onload = function() {
  inputField = document.getElementById('canvasAPI');
}

async function setCanvasAPI(googleID){
  //var xhttp = new XMLHttpRequest();
  console.log(googleID);
  console.log(inputField.value);
  await fetch("/api/setCanvasAPI/" + googleID + "/" + inputField.value, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify({google: googleID, canvas: "inputField.value"})
  })
}