console.log('placeholder')

async function loadData(canvasKey) {
    fetch("https://canvas.toddr.org/api/html/feed/" + canvasKey, {
        method: "GET",
    }).then(data => {
        data.text()
    }).then(text => {
        document.body.innerHTML = document.body.innerHTML + data.toString()
    }).then(
        document.getElementById("loader").style.display = 'none'
    )
} 