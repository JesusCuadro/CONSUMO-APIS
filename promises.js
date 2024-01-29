console.log('Hello word');

const URL = 'https://api.thedogapi.com/v1/images/search'

fetch(URL)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img')
        img.src = data[0].url
    })

const updateImage = () => {
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            const img = document.querySelector('img')
            img.src = data[0].url
        })
};

const button = document.querySelector ('button')

button.addEventListener("click", updateImage)