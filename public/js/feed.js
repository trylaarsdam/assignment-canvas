var announcementToggle = true;
var assignmentToggle = true;

function loadData(canvasKey) {
  fetch("https://canvas.toddr.org/api/html/feed/" + canvasKey, {
    method: "GET",
  }).then(async data => {
    return data.text()
  }).then(text => {
    updateBody(text).then(
      document.getElementById("loader").style.display = 'none'
    )
  })
}

function updateBody(text) {
  return document.body.innerHTML = document.body.innerHTML + text
}

function announcements() {
  var elements = document.getElementsByClassName("container announcement");
  if (announcementToggle) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  }
  else {
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = ""
    }
  }
}

function assignments() {
  var elements = document.getElementsByClassName("container assignment");
  if (assignmentToggle) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  }
  else {
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "block"
    }
  }
}