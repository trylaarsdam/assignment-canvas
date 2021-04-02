function loadData(canvasKey, announcement, classID) {
    fetch("https://canvas.toddr.org/api/html/announcement/" + classID + "/" + announcement + "/" + canvasKey, {
        method: "GET",
    }).then(async data => {
        return data.text()
    }).then(text => {
        updateBody(text).then(
            document.getElementById("loader").style.display = 'none'
        )
    })
}

function updateBody(text){
    return document.body.innerHTML = document.body.innerHTML + text
}