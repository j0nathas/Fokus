const tarefaLista = document.querySelector('.app__section-task-list')

const CaixaDeTexto = document.querySelector('.app__form-add-task')

const alterarAbrirJanela = document.querySelector('.app__button--add-task')

const formLabel = document.querySelector('.app__form-label')

const areaDeTexto = document.querySelector('.app__form-textarea')

const botaoDeCancelar = document.querySelector('.app__form-footer__button--cancel')

const botaoDeletar = document.querySelector('.app__form-footer__button--delete')

const armazenarTarefas = localStorage.getItem('tarefas')

let tarefasA = armazenarTarefas ? JSON.parse(armazenarTarefas) : [ ]

 /*if (tarefas = armazenarTarefas) {
 JSON.parse(armazenarTarefas) 
} 
else {
   let tarefas = [ ]
}
 /*tem algo dentro de "localStorage"? se não, retornará a caixa vazia

JSON.parse transforma a string em um código JavaScript

   ? ou if_else = Averigua se "armazenarTarefas" não está vazio, se n estiver o JSON.parse irá transformar aqule informação em JavaScript
*/

const LimparCaixaDeTexto = () => {
    areaDeTexto.value = ''
    CaixaDeTexto.classList.add ('hidden')
}

const tarefaIconeSvg =  `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`
function criarTarefa(tarefa){
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svgIcone = document.createElement('svg')
    svgIcone.innerHTML = tarefaIconeSvg

    const paragrafo = document.createElement('p')
    paragrafo.classList.add('app__section-task-list-item-description')

    paragrafo.textContent = tarefa.descricao

    li.appendChild(svgIcone)
    li.appendChild(paragrafo)
    
    return li
}

tarefas.forEach(task => {
    const taskItem = criarTarefa(task)
    tarefaLista.appendChild(taskItem) 
})

alterarAbrirJanela.addEventListener('click', () => {
    formLabel.textContent = 'Adicionando Tarefa'
    CaixaDeTexto.classList.toggle ('hidden')
})

const enviarTarefasParaLocalStorage = () => {
    localStorage.setItem('tarefasA', JSON.stringify(tarefasA))
}
 
/* 
 Ao salvar a tarefa, a const "enviarTarefasParaLocalStorage" irá transformar o conteúdo em "tarefas" em uma string
  e armazenar ela no "localStorage" 
*/

CaixaDeTexto.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const task = {
        descricao: areaDeTexto.value,
        concluida: false
    }
    const tarefaItem = criarTarefa(task)
    tarefaLista.appendChild(tarefaItem)
    LimparCaixaDeTexto()
    enviarTarefasParaLocalStorage()
    
})

botaoDeCancelar.addEventListener('click', () => {
    CaixaDeTexto.classList.add('hidden')
    LimparCaixaDeTexto()
    
}) 

