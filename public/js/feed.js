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

function announcements(button) {
  var elements = document.getElementsByClassName("container announcement");
  if (announcementToggle) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
    announcementToggle = false;
    button.style.background = '#555555';
  }
  else {
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = ""
    }
    announcementToggle = true;
    button.style.background = '#ff0000';
  }
}

function assignments(button) {
  var elements = document.getElementsByClassName("container assignment");
  if (assignmentToggle) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
    button.style.background = '#555555';
    assignmentToggle = false;
  }
  else {
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = ""
    }
    assignmentToggle = true;
    button.style.background = '#ff0000';
  }
}