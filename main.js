const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=2'
const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites'
const API_DELETE_FAVORITES = (id) => `https://api.thedogapi.com/v1/favourites/${id}`
const API_URL_UPLOAD = 'https://api.thedogapi.com/v1/images/upload'

const API_KEY = 'live_NDVFTiP32wpKzV0vKA5lKsT5PdkSkd0yHJL2O2krRLvXfBaFP09doQ10l5GPFuy8'

const spanError = document.getElementById("error")
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

        const btn1 = document.getElementById('btn1')
        const btn2 = document.getElementById('btn2')

        img1.src = data[0].url
        img2.src = data[1].url

        btn1.onclick = () => saveFavoriteDogs(data[0].id)
        btn2.onclick = () => saveFavoriteDogs(data[1].id)

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
}

async function loadFavoriteDogs() {

    const res = await fetch(API_URL_FAVORITES, {
        method: 'GET',
        headers: {
            'X-API-KEY': API_KEY,
        },
    })
    const data = await res.json()

    console.log("Favorites");
    console.log(data);

    if (res.status !== 200) {
        spanError.innerText = "Hubo un error: " + res.status + " error completo: " + data.message;
    } else {
        data.forEach(dog => {

            const section = document.getElementById('favoriteDogs')

            const article = document.createElement('article')
            const img = document.createElement('img')
            const btn = document.createElement('button')

            const btnText = document.createTextNode('Delete from favorites')

            btn.appendChild(btnText);

            img.src = dog.image.url;
            img.width = 150

            btn.onclick = () => deleteFavoriteDogs(dog.id)

            article.appendChild(img)
            article.appendChild(btn)

            section.appendChild(article)

        })
    }

}

async function saveFavoriteDogs(id) {
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
        },

        body: JSON.stringify({
            image_id: id,
        }),
    })

    const data = await res.json();

    console.log("Save");
    console.log(res);

    if (res.status !== 200) {
        spanError.innerHTML = "hubo un error: " + res.status + " error completo: " + data.message;
    } else {
        console.log("Dog saved!!");
    }

}

async function deleteFavoriteDogs(id) {
    const res = await fetch(API_DELETE_FAVORITES(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': API_KEY
        },
    })

    const data = await res.json();

    console.log("Delete");
    console.log(res);

    if (res.status !== 200) {
        spanError.innerHTML = "An error: " + res.status + " error complete: " + data.message;
    } else {
        console.log('Dog deleted succesfully!!');
    }

}

async function uploadDogPhoto() {

    const form = document.getElementById('uploadingForm')
    const formData = new FormData(form);

    console.log(formData.get('file'));

    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            'X-API-KEY': API_KEY
        },
        body: formData,
    })

    const data = await res.json();

    if (res.status !== 201) {
        spanError.innerHTML = "An error" + res.status + data.message
        console.log(data);
    } else {
        console.log('Dog picture upload :3');
        console.log({ data });
        console.log(data.url);
    }
}

const previewImage = () => {
    const file = document.getElementById("file").files;
    console.log(file);
    if (file.length > 0) {

        const fileReader = new FileReader();

        fileReader.onload = function (e) {
            document.getElementById("preview").setAttribute("src", e.target.result);
        };
        fileReader.readAsDataURL(file[0]);
    }
}

button.addEventListener("click", cambioImagenes)

loadRandomDogs();
loadFavoriteDogs();