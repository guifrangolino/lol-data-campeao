const campeaoContainer = document.querySelector('.campeoes')
const campeao = document.querySelectorAll('.campeao')
const campeaoImg = document.querySelectorAll('.campeao-img')
const campeaoNome = document.querySelectorAll('.campeao-nome')
const input = document.querySelector('.input-nome')
const loadingGif = document.querySelector('.loading-gif')

fetch('https://ddragon.leagueoflegends.com/cdn/13.4.1/data/pt_BR/champion.json')
    .then(resp => resp.json())
    .then(data => Object.keys(data.data))
    .then(nomes => nomes.forEach(nome => {
        if (nome == 'Fiddlesticks') nome = 'FiddleSticks'

        const elem = `<li class="campeao">
            <div class="img-container"><img class="campeao-img" src="http://ddragon.leagueoflegends.com/cdn/img/champion/centered/${nome}_0.jpg" alt="imagem do campeão"></div>
            <p class="campeao-nome">${nome}</p>
            </li>`
            
        campeaoContainer.insertAdjacentHTML('beforeend', elem)
    }))
    .catch(err => console.log(err))
    .finally(loadingGif.style.display = 'none')


input.addEventListener('input', inputListener)

function inputListener() {
    let champName = document.querySelectorAll('.campeao')
    let champDisplay = 0

    champName.forEach(champ => {
        let nome = champ.children[1].innerHTML.toLowerCase()

        if (nome.includes(input.value.toLowerCase())) {
            champ.style.display = 'flex'
        } else {
            champ.style.display = 'none'
            champDisplay += 1
            console.log(champDisplay)
        }

    })

    if (champDisplay == champName.length) {
        document.querySelector('.nome-invalido').style.display = 'flex'
    } else {
        document.querySelector('.nome-invalido').style.display = 'none'
    }

}

// nome-invalido

