const API_KEY = 'JZ237Q2-WEHMHTK-MXRV1JD-HQ9STJ9'
const API_URL = 'https://api.kinopoisk.dev/v1.4/'

const movies_container = document.getElementById('movies-container')

let page = 1

function prevPage() {
    if (page <= 1) {
        page = 1
    } else {
        page -= 1
    }
    console.log(page)
    loadFilms()
}

function nextPage() {
    if (page >= 1) {
        page += 1
    }
    console.log(page)
    loadFilms()
}

function loadFilms() {
    fetch(` ${API_URL}movie?page=${page}&limit=30`, {
        method: 'GET',
        headers: {
            'X-API-KEY': API_KEY
        }
    })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            movies_container.innerHTML = response.docs.map(movieComponent).join('')
        })
}

function movieComponent(movie) {
    if (typeof movie.poster === 'undefined') {
        const urls = [
            "https://sun9-32.userapi.com/impg/vHpaPd-DPNRyeIj12BLXpx4DolB4zqGGOUGYgA/kblz8RFtolQ.jpg?size=557x604&quality=96&sign=6963dfc703fa057a8a1f2017a0a3574d&type=album",
            "https://www.meme-arsenal.com/memes/99c6d17a9d265ca3c94b0baa93202f9a.jpg",
            "https://i1.sndcdn.com/artworks-AyDs6aWQ14LDmM2w-HiNvWQ-t500x500.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVkA_E-SFd_kBTiNBXNkEZiC6iBmFQvpDRZw&s",
            "https://disgustingmen.com/wp-content/uploads/2022/02/Ev0vnOpXAAwtoVR.jpg",
            "https://sun9-77.userapi.com/impg/nmnm-QMAAjP8-HyioaSmCpF4Ues3VmURXm8oKA/0EHfHUW2hqE.jpg?size=426x807&quality=96&sign=639b40fcf8e0d95885c8f4e49ba441a5&c_uniq_tag=cNqEZWtbYGNIXa2tKxYYMior-i74ck1y4_RLnsvLKH0&type=album",
            "https://static.insales-cdn.com/images/products/1/766/570368766/RZMZ790_%D0%91%D0%B8%D0%BB%D0%BB%D0%B8_%D0%A5%D0%B5%D1%80%D1%80%D0%B8%D0%BD%D0%B3%D1%82%D0%BE%D0%BD__Billy_Herrington__873%D1%851800_%D0%BC%D0%BC.jpg"
        ]

        const num = Math.floor(Math.random() * urls.length)
        return `
        <div class="card" onclick="modalContent(${movie.id})">
            <img style="height: 100%" src="${urls[num]}" alt="">
            <div class="title">${movie.name}</div>
        </div>`
    } else {
        return `
        <div class="card"  onclick="modalContent(${movie.id})">
            <img src="${movie.poster.url}" alt="">
            <div class="title">${movie.name}</div>
        </div>`
    }
}


function searchFilms() {
    const data = document.getElementById('film_name').value
    fetch(` ${API_URL}movie/search?query=${data}`, {
        method: 'GET',
        headers: {
            'X-API-KEY': API_KEY
        }
    })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            movies_container.innerHTML = response.docs.map(movieComponent).join('')
        })
}

const modal_content = document.querySelector('.modal__content')


function modalContent(film_id) {
    console.log(film_id)
    fetch(`${API_URL}movie/${film_id}`, {
        method: 'GET',
        headers: {
            'X-API-KEY': API_KEY
        }
    })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            document.body.classList.add('active')
            modal_content.innerHTML = modalComponent(response)
        })
}


function modalComponent(movie) {
    if (typeof movie.poster === 'undefined') {
        const urls = [
            "https://sun9-32.userapi.com/impg/vHpaPd-DPNRyeIj12BLXpx4DolB4zqGGOUGYgA/kblz8RFtolQ.jpg?size=557x604&quality=96&sign=6963dfc703fa057a8a1f2017a0a3574d&type=album",
            "https://www.meme-arsenal.com/memes/99c6d17a9d265ca3c94b0baa93202f9a.jpg",
            "https://i1.sndcdn.com/artworks-AyDs6aWQ14LDmM2w-HiNvWQ-t500x500.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVkA_E-SFd_kBTiNBXNkEZiC6iBmFQvpDRZw&s",
            "https://disgustingmen.com/wp-content/uploads/2022/02/Ev0vnOpXAAwtoVR.jpg",
            "https://sun9-77.userapi.com/impg/nmnm-QMAAjP8-HyioaSmCpF4Ues3VmURXm8oKA/0EHfHUW2hqE.jpg?size=426x807&quality=96&sign=639b40fcf8e0d95885c8f4e49ba441a5&c_uniq_tag=cNqEZWtbYGNIXa2tKxYYMior-i74ck1y4_RLnsvLKH0&type=album",
            "https://static.insales-cdn.com/images/products/1/766/570368766/RZMZ790_%D0%91%D0%B8%D0%BB%D0%BB%D0%B8_%D0%A5%D0%B5%D1%80%D1%80%D0%B8%D0%BD%D0%B3%D1%82%D0%BE%D0%BD__Billy_Herrington__873%D1%851800_%D0%BC%D0%BC.jpg"
        ]

        const num = Math.floor(Math.random() * urls.length)
        return `
            <div>
                <img src="${urls[num]}" alt="">
            </div>
            <div>
                ${movie.name}
            </div>
            <div>
                год: ${movie.year}
            </div>
            <div>
                рейтинг: ${movie.rating.kp}
            </div>`

    }else{
        return `
            <div>
                <img src="${movie.poster.url}" alt="">
            </div>
            <div>
                ${movie.name}
            </div>
            <div>
                год: ${movie.year}
            </div>
            <div>
                рейтинг: ${movie.rating.kp}
            </div>`
    }

}

function closeModal() {
    document.body.classList.remove('active')
}

loadFilms()
