function setCanvasAPI(googleID, canvasAPI){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/api/setCanvasAPI", true);
  xhttp.send({google: googleID, canvas: canvasAPI});
}