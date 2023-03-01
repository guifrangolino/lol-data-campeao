const campeaoContainer = document.querySelector('.campeoes')
const campeaoImg = document.querySelectorAll('.campeao-img')
const campeaoNome = document.querySelectorAll('.campeao-nome')
const input = document.querySelector('.input-nome')
const loadingGif = document.querySelector('.loading-gif')


// FETCH DOS CAMPEÕES
fetch('https://ddragon.leagueoflegends.com/cdn/13.4.1/data/pt_BR/champion.json')
    .then(resp => resp.json())
    .then(data => {
        dataCampeoes = data.data
        return Object.keys(data.data)
    })
    .then(nomes => nomes.forEach(nome => {
        if (nome == 'Fiddlesticks') dataCampeoes[nome].id = 'FiddleSticks'

        const elem = `<li class="campeao">
            <div class="img-container"><img class="campeao-img" src="https://ddragon.leagueoflegends.com/cdn/img/champion/centered/${dataCampeoes[nome].id}_0.jpg" alt="imagem do campeão"></div>
            <p class="campeao-nome">${dataCampeoes[nome].name}</p>
            </li>`
            
        campeaoContainer.insertAdjacentHTML('beforeend', elem)

        if (dataCampeoes[nome].id == 'FiddleSticks') dataCampeoes[nome].id = 'Fiddlesticks'


    }))
    .catch(err => console.log(err))
    .then(() => {
        loadingGif.style.display = 'none'
        const campeao = document.querySelectorAll('.campeao')
        const dadosContainer = document.querySelector('.campeao-dados')
        const dadosImg = document.querySelector('.campeao-dados-img img')
        const dadosImgSmall = document.querySelector('.campeao-dado-nome-container img')
        const habilidadeIcones = document.querySelectorAll('.habilidade-icone')
        const habilidadeDados = document.querySelectorAll('.habilidade')
        const habilidadeNome = document.querySelectorAll('.habilidade-nome')
        const habilidadeDesc = document.querySelectorAll('.habilidade-desc')
        const btnFechar = document.querySelector('.btn-fechar')
        const campeaoDadosNome = document.querySelector('.campeao-dado-nome')
        const campeaoDadosTitulo = document.querySelector('.campeao-dado-titulo')

        btnFechar.addEventListener('click', () => dadosContainer.style.display = 'none')

        habilidadeDados[0].style.display = 'flex'

        for (let hab = 0; hab < habilidadeIcones.length; hab++) {
            
            habilidadeIcones[hab].addEventListener('click', () => {
                habilidadeDados.forEach( desc => desc.style.display = 'none')
                habilidadeIcones.forEach( icone => icone.classList.remove('ativo'))
                habilidadeDados[hab].style.display = 'flex'
                habilidadeIcones[hab].classList.add('ativo')
            })
        }

        campeao.forEach( champ => {
            champ.addEventListener('click', () => {
                champNome = champ.children[1].innerHTML
                champNome = champNome.replace(/\s+/g, '')
                champNome = champNome.replace(/'/g, '')
                if (champNome == 'BelVeth') champNome = 'Belveth'
                if (champNome == 'ChoGath') champNome = 'Chogath'
                if (champNome == 'Dr.Mundo') champNome = 'DrMundo'
                if (champNome == 'Bardo') champNome = 'Bard'
                if (champNome == 'KaiSa') champNome = 'Kaisa'
                if (champNome == 'KhaZix') champNome = 'Khazix'
                if (champNome == 'LeBlanc') champNome = 'Leblanc'
                if (champNome == 'LeBlanc') champNome = 'Leblanc'
                if (champNome == 'NunueWillump') champNome = 'Nunu'
                if (champNome == 'RenataGlasc') champNome = 'Renata'
                if (champNome == 'VelKoz') champNome = 'Velkoz'

                dadosImg.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${dataCampeoes[champNome].id}_0.jpg`
                if (champNome == 'Fiddlesticks') dadosImg.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/FiddleSticks_0.jpg`
                dadosImgSmall.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${dataCampeoes[champNome].id}_0.jpg`
                if (champNome == 'Fiddlesticks') dadosImgSmall.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/FiddleSticks_0.jpg`
                
                fetch(`https://ddragon.leagueoflegends.com/cdn/13.4.1/data/pt_BR/champion/${champNome}.json`)
                    .then(resp => resp.json())
                    .then(data => campeaoAtual = data.data[champNome])
                    .then(() => {

                        // NOME E TITULO
                        campeaoDadosNome.innerHTML = campeaoAtual.name
                        campeaoDadosTitulo.innerHTML = campeaoAtual.title

                        // IMAGEM DAS HABILIDADES
                        habilidadeIcones[0].childNodes[1].src = `https://ddragon.leagueoflegends.com/cdn/13.4.1/img/passive/${campeaoAtual.passive.image.full}`
                        habilidadeIcones[1].childNodes[1].src = `https://ddragon.leagueoflegends.com/cdn/13.4.1/img/spell/${campeaoAtual.spells[0].image.full}`
                        habilidadeIcones[2].childNodes[1].src = `https://ddragon.leagueoflegends.com/cdn/13.4.1/img/spell/${campeaoAtual.spells[1].image.full}`
                        habilidadeIcones[3].childNodes[1].src = `https://ddragon.leagueoflegends.com/cdn/13.4.1/img/spell/${campeaoAtual.spells[2].image.full}`
                        habilidadeIcones[4].childNodes[1].src = `https://ddragon.leagueoflegends.com/cdn/13.4.1/img/spell/${campeaoAtual.spells[3].image.full}`

                        //NOME DAS HABILIDADES
                        habilidadeNome[0].innerHTML = campeaoAtual.passive.name
                        habilidadeNome[1].innerHTML = campeaoAtual.spells[0].name
                        habilidadeNome[2].innerHTML = campeaoAtual.spells[1].name
                        habilidadeNome[3].innerHTML = campeaoAtual.spells[2].name
                        habilidadeNome[4].innerHTML = campeaoAtual.spells[3].name

                        // DESCRIÇÃO DAS HABILIDADES
                        habilidadeDesc[0].innerHTML = campeaoAtual.passive.description
                        habilidadeDesc[1].innerHTML = campeaoAtual.spells[0].description
                        habilidadeDesc[2].innerHTML = campeaoAtual.spells[1].description
                        habilidadeDesc[3].innerHTML = campeaoAtual.spells[2].description
                        habilidadeDesc[4].innerHTML = campeaoAtual.spells[3].description

                    })
                    .catch(err => console.log(err))
                    .finally(() => dadosContainer.style.display = 'flex')
            })
        })
        
    })

// PESQUISA DOS CAMPEÕES
input.addEventListener('input', inputListener)

function inputListener() {
    let champNome = document.querySelectorAll('.campeao')
    // NÚMERO PARA CHECAR SE NENHUM CAMPEÃO FOI ENCONTRADO
    let champDisplay = 0

    champNome.forEach(champ => {
        let nome = champ.children[1].innerHTML.toLowerCase()

        if (nome.includes(input.value.toLowerCase())) {
            champ.style.display = 'flex'
        } else {
            champ.style.display = 'none'
            champDisplay += 1
        }

    })

    if (champDisplay == champNome.length) {
        document.querySelector('.nome-invalido').style.display = 'flex'
    } else {
        document.querySelector('.nome-invalido').style.display = 'none'
    }

}