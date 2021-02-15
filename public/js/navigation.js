var inputField;
window.onload = function() {
  inputField = document.getElementById('canvasAPI');
}

async function setCanvasAPI(googleID){
  //var xhttp = new XMLHttpRequest();
  console.log(googleID.toString());
  console.log(inputField.value);
  await fetch("https://canvas.toddr.org/api/setCanvasAPI/" + googleID.toString() + "/" + inputField.value.toString(), {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify({google: googleID, canvas: "inputField.value"})
  })
}