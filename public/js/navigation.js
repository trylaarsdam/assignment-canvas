const inputField = document.getElementById('canvasAPI');

function setCanvasAPI(googleID){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/api/setCanvasAPI", true);
  console.log(googleID);
  console.log(inputField);
  xhttp.send(JSON.stringify({google: googleID, canvas: inputField}));
}