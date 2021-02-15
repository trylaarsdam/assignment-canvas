var inputField;
window.onload = function() {
  inputField = document.getElementById('canvasAPI');
}

async function setCanvasAPI(googleID){
  //var xhttp = new XMLHttpRequest();
  console.log(googleID);
  console.log(inputField.innerText);
  await fetch("/api/setCanvasAPI", {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify({google: googleID, canvas: "inputField.value"})
  })
}