console.log('placeholder')

async function loadData(canvasKey) {
    var data = await fetch("https://canvas.toddr.org/api/html/feed/" + canvasKey, {
        method: "GET",
    }).then(
        document.getElementById("loader").style.display = 'none'
    ).then(
        document.body.innerHTML = document.body.innerHTML + data
    )
} 