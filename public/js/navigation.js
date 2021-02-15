const inputField = document.getElementById('canvasAPI');

function setCanvasAPI(googleID){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/api/setCanvasAPI", true);
  xhttp.send({google: googleID, canvas: inputField});
}