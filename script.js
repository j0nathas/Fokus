const html = document.querySelector('html')
const focoBotao = document.querySelector('.app__card-button--foco')
const curtoBotao = document.querySelector('.app__card-button--curto')
const longoBotao = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startBotão = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const comecarOuPausar = document.querySelector('#start-pause span')
const imagemBotão = document.querySelector('.app__card-primary-butto-icon')
const timer = document.getElementById('timer')

const musica = new Audio('som/BrownNoise.mp3')
const start = new Audio('som/play.mp3')
const pause = new Audio('som/pause.mp3')
const tempoAcabou = new Audio('som/tempoAcabou.mp3')
const startMusica = new Audio('som/start.mp3')
const pauseMusica = new Audio('som/stop.mp3')
const trocaDeModo = new Audio('som/som.mp3')

const botaoAparecerFormMinutos = document.querySelector('.botao-mostrarform-minutos')
const formMinutos = document.querySelector('.form-minutos')
const minutosImput = document.getElementById('tempoInput')
const botaoConfirmar = document.querySelector('.botao-confirmar')

musica.loop = true

let tempoDecorridoEmSegundos = 60 * 25
let intervaloId = null

/*********************** Botões de foco, curto e longo *********************/

focoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 60 * 25
    alterarContexto('foco')
    focoBotao.classList.add('active')
})

curtoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 60 * 5
    alterarContexto('descanso-curto')
    curtoBotao.classList.add('active')
})

longoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 60 * 15
    alterarContexto('descanso-longo')
    longoBotao.classList.add('active')
})

/*********************** Alternar música foco ***********************/

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        startMusica.play()
        musica.play()
    } else {
        pauseMusica.play()
        musica.pause()
    }
})

/*********************** Trocar minutos (formulário) ***********************/

botaoAparecerFormMinutos.addEventListener('click', () => {
    formMinutos.classList.toggle('hidden')
})

const botaoCancelar = document.querySelector('.botao-cancelar')

botaoCancelar.addEventListener('click', () => {
    formMinutos.classList.toggle('hidden')
})

formMinutos.addEventListener('submit', (evento) => {
    evento.preventDefault()
})

botaoConfirmar.addEventListener('click', () => {
    const minutos = parseInt(minutosImput.value)

    if (!isNaN(minutos) && minutos > 0) {
        tempoDecorridoEmSegundos = minutos * 60
        tempoNaTela()
        formMinutos.classList.add('hidden')
        minutosImput.value = '' 
        console.log(`Novo tempo definido: ${tempoDecorridoEmSegundos} segundos`)
    } else {
        alert("Digite um valor válido em minutos.")
    }
})

//*********************** Alterar contexto ***********************/

function alterarContexto(contexto) {
    tempoNaTela()
    botoes.forEach((btn) => btn.classList.remove('active'))
    trocaDeModo.play()
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`
            break
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break
    }
}

/*********************** Contagem regressiva e controle ***********************/

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        tempoAcabou.play()
        const FocoAtivo = html.getAttribute('data-contexto') === 'foco'
        if (FocoAtivo) {
            const evento = new CustomEvent('tarefaFinalizada')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }

    tempoDecorridoEmSegundos -= 1
    tempoNaTela()
}

startBotão.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        pausarTempo()
        pause.play()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
    start.play()
    comecarOuPausar.textContent = "Pausar"
    alterarImagem('pause')
}

function pausarTempo() {
    clearInterval(intervaloId)
    intervaloId = null
    comecarOuPausar.textContent = "Começar"
    alterarImagem('play_arrow')
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
    comecarOuPausar.textContent = "Começar"
    alterarImagem('play_arrow')

    const dataContexto = html.getAttribute('data-contexto')
    if (dataContexto === 'foco') {
        tempoDecorridoEmSegundos = 60 * 25
    }

    tempoNaTela()
}

/*********************** Atualizar tempo na tela ***********************/

function tempoNaTela() {
    const minutos = Math.floor(tempoDecorridoEmSegundos / 60)
    const segundos = tempoDecorridoEmSegundos % 60
    const minutosFormatados = minutos.toString().padStart(2, '0')
    const segundosFormatados = segundos.toString().padStart(2, '0')
    timer.innerHTML = `${minutosFormatados}:${segundosFormatados}`
}

function alterarImagem(contexto) {
    imagemBotão.setAttribute('src', `/imagens/${contexto}.png`)
}


tempoNaTela()
