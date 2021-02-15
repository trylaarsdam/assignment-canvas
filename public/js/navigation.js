var inputField;
window.onload = function() {
  inputField = document.getElementById('canvasAPI');
}

function setCanvasAPI(googleID){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/api/setCanvasAPI", true);
  console.log(googleID);
  console.log(inputField.innerText);
  xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhttp.send({google: googleID, canvas: inputField.innerText})
}