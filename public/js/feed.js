console.log('placeholder')

async function loadData(canvasKey) {
    await fetch("https://canvas.toddr.org/api/html/feed/" + canvasKey, {
        method: "GET",
    }).then(data => {
        document.body.innerHTML = document.body.innerHTML + data.body
    }).then(
        document.getElementById("loader").style.display = 'none'
    )
} 