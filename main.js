const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=2&api_key=live_NDVFTiP32wpKzV0vKA5lKsT5PdkSkd0yHJL2O2krRLvXfBaFP09doQ10l5GPFuy8'
const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites?limit=2&api_key=live_NDVFTiP32wpKzV0vKA5lKsT5PdkSkd0yHJL2O2krRLvXfBaFP09doQ10l5GPFuy8'

const spanError = document.getElementById('error')

const img = document.querySelector('img')

const button = document.getElementById('update')

async function loadRandomDogs() {

    const res = await fetch(API_URL_RANDOM)
    const data = await res.json()

    console.log("Random");
    console.log(data);

    if (res.status !== 200) {
        spanError.innerText = "Hubo un error: " + res.status + " error completo: " + data.message;
    } else {

        const img1 = document.getElementById('img1')
        const img2 = document.getElementById('img2')

        img1.src = data[0].url
        img2.src = data[1].url
    }
}

const cambioImagenes = async () => {
    const res = await fetch(API_URL_RANDOM)
    const data = await res.json()

    console.log(data);

    const img1 = document.getElementById('img1')
    const img2 = document.getElementById('img2')

    img1.src = data[0].url
    img2.src = data[1].url

    // img.src = data[0].url
}

async function loadFavoriteDogs() {

    const res = await fetch(API_URL_FAVORITES)
    const data = await res.json()

    console.log("Favorites");
    console.log(data);

    if (res.status !== 200) {
        spanError.innerText = "Hubo un error: " + res.status + " error completo: " + data.message;
    }

}

async function saveFavoriteDogs() {
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            image_id: '9'
        }),
    })

    const data = await res.json();

    console.log("RESPUESTA POST");
    console.log(res);

    if (res.status !== 200) {
        spanError.innerText = "Hubo un error: " + res.status + " error completo: " + data.message;
    }

}

button.addEventListener("click", cambioImagenes)

loadRandomDogs();
loadFavoriteDogs();
saveFavoriteDogs();