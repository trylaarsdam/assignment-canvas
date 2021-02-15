var inputField;
window.onload = function() {
  inputField = document.getElementById('canvasAPI');
}

function setCanvasAPI(googleID){
  //var xhttp = new XMLHttpRequest();
  console.log(googleID);
  console.log(inputField.innerText);
  fetch("/api/setCanvasAPI", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({google: googleID, canvas: "inputField.value"})
  })
}