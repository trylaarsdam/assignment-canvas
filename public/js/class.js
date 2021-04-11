console.log('placeholder')

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