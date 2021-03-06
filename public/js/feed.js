console.log('placeholder')

async function loadData(canvasKey) {
    await fetch("https://canvas.toddr.org/api/html/feed/" + canvasKey, {
        method: "GET",
    }).then(async data => {
        return await data.text()
    }).then(text => {
        document.body.innerHTML = document.body.innerHTML + text
    }).then(
        document.getElementById("loader").style.display = 'none'
    )
}