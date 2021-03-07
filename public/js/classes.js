function loadData(canvasKey) {
    fetch("https://canvas.toddr.org/api/html/classes/" + canvasKey, {
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