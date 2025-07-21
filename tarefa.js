const btAdicionarTarefa = document.querySelector ('.app__button--add-task')
const displayAddTarefa  = document.querySelector('.app__form-add-task')
const textoArea = document.querySelector ('.app__form-textarea')
const ulTarefa = document.querySelector('.app__section-task-list')
const btCancelarTarefa = document.querySelector('.app__form-footer__button--cancel')
const liDescricaoTarefaSelecionada = document.querySelector('.app__section-active-task-description')
const botaoLimparConcluidas = document.querySelector('#btn-remover-concluidas')// # = id's
const botaoLimparTarefas = document.querySelector('#btn-remover-todas')// # = id's

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

/*Explicação da const tarefas

Nessa linha, o termo 'tarefas' está sendo utilizado como uma chave para acessar o local storage do navegador. O método getItem
 é usado para recuperar o valor associado à chave 'tarefas' no armazenamento local. Se não houver nenhum valor associado a essa chave, o 
 código retorna um array vazio como valor padrão, usando o operador ||.

Em resumo, essa linha de código está verificando se há algum valor salvo no local storage com a chave 'tarefas' e, se houver, está 
convertendo esse valor de volta para um array usando JSON.parse(). Se não houver nenhum valor associado a essa chave, o código 
define um array vazio como valor padrão para a variável tarefas. */

function atualizarLocalStorage () {
  localStorage.setItem('tarefas',JSON.stringify(tarefas))
}

let tarefaSelecionada = null
let liTarefaSelecionada = null

/*Explicação da linha acima
JSON.parse = transformar uma string em código JavaScript

local.Storage.getItem('tarefas') = está pegando a lista de strings criadas no LocalStorage

|| = significa "ou", no caso dessa linha, caso não aja nada no localStorage, retornará uma caixa vazia
*/

function criarTarefa (tarefa) {
  const li = document.createElement('li')
  li.classList.add('app__section-task-list-item')

  const svg = document.createElement('svg')
  svg.innerHTML = `

  <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
      <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
  </svg>
  `
  const paragrafo = document.createElement('p')
  paragrafo.textContent = tarefa.descricao
  paragrafo.classList.add('app__section-task-list-item-description')

  const botao = document.createElement('button')
  botao.classList.add('app_button-edit')
  const imagemBotao = document.createElement('img')
  imagemBotao.setAttribute('src', 'img/edit.png') //possível erro no GitPages

botao.addEventListener ('click', () => {
  //debugger
  const editarTarefa = prompt('Qual a nova descrição da tarefa?')
  if (editarTarefa !== null && editarTarefa !== '') {
    paragrafo.textContent = editarTarefa
    tarefa.descricao = editarTarefa
    console.log ('Nova descrição da tarefa: ', editarTarefa)
    atualizarLocalStorage()
    alert('Tarefa Atualizada!')
  }

  else {
    alert('Edição de tarefa cancelada!')
  }

/* Explicação da linha acima
criamos uma caixa de texto com o prompt e usamos seu valor para atualizar a descrição da tarefa

criamos um if para, se o valor for true (ou seja, se houver algo dentro de 'editarTarefa'), o nome da tarefa será atualizado
e será atualizado dentro do localStorage também

' !== ' = diferente de 

' && ' = tem a funcionalidade de dar outro parâmetro para a função ser executada, como se fosse um "e" ou "and"

debugger = Abre o devtools e executa uma linha por vez
******/

})

  botao.append(imagemBotao)

  li.append(svg)
  li.append(paragrafo)
  li.append(botao)
  

  if (tarefa.completa) {
    li.classList.add('app__section-task-list-item-complete')
    botao.setAttribute('disabled', true)
  }

  else {
    li.onclick = () => {
      const selecaoTarefa = document.querySelectorAll('.app__section-task-list-item-active')
        selecaoTarefa.forEach(elemento => {
        elemento.classList.remove('app__section-task-list-item-active')
      })
  
      if (tarefaSelecionada == tarefa) {
        liDescricaoTarefaSelecionada.textContent = ''
        tarefaSelecionada = null
        liTarefaSelecionada = null
        return
      }
      tarefaSelecionada = tarefa
      liTarefaSelecionada = li
      liDescricaoTarefaSelecionada.textContent = tarefa.descricao
      li.classList.add('app__section-task-list-item-active')
    }
  
   
  }

  return li
}

/*Explicação da linha acima
Nós criamos a const li que cria uma tag 'li', adicionamos uma classes para 'li' e criamos uma const para o design da tarefa

'InnerHMTL tem a função de armenezar uma linha de código HTML dentro da função 'svg'.

definimos o atributo para 'src' que seria 'src' e o seu valor '=' que seria '/imagens/edit.png'

'append' tem a função de colocar algo dentro de um elemento, como por exemplo, colocar 'ImagemBotao' dentro de 'botao' que seria adicionar
uma linha de código para uma tag, que resultaria no valor abaixo.
""""""
<button class="app_button-edit">
        <img src="/imagens/edit.png">
    </button>       

""""""
Explicando remoção de classe ativa = Ao clicar na tarefa (Li) a lista tarefaSelecionada se torna a própria tarefa em si, e ao clicar novamente,
o 'if' será executado, tendo em vista que agora tarefaSlecionada = tarefa




.........................................................................................................................................

<li class="app__section-task-list-item">
    <svg>
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    </svg>
    <p class="app__section-task-list-item-description">
        Estudando localStorage
    </p>
    <button class="app_button-edit">
        <img src="/imagens/edit.png">
    </button>
</li>
*/


btAdicionarTarefa.addEventListener ('click', () => {
    displayAddTarefa.classList.toggle('hidden')
})

btCancelarTarefa.addEventListener ('click', () => {
  displayAddTarefa.classList.add('hidden')
  textoArea.value = ''
})

/*Explicação da linha acima
addEventListener = ao executar um tipo de ação, algo será feito. No caso, ao clicar no botão de adicionar tarefa, será executado
uma "Arrow function"
dentro da função, pegamos a classe do botão e averiguamoos todas as classes associadas a ele com o "classList"
"toogle" tem a função de retirar 'hidden' se ele estiver na "classList", ou adicionar se não estiver
*/

displayAddTarefa.addEventListener('submit', (evento)=> {
  evento.preventDefault();
  const tarefa = {
    descricao: textoArea.value
  }
  tarefas.push(tarefa)
  const aparecerTarefa = criarTarefa(tarefa)
  ulTarefa.append(aparecerTarefa)
  atualizarLocalStorage()
  textoArea.value = ''
  displayAddTarefa.classList.toggle('hidden')
})

/*Explicação da linha acima
"submit" é quando enviamos a informação para o sistema, estamos adicionando um evento para quando for enviado essa informação.
"evento" é o nome que estamos dando para essa ação, por assim dizer
"defaultPrevented" previne um evento que está pré programado para acontecer, no caso seria a página recarregar ao submeter o formulário
"push" tem a função de enviar a informação para a const/lista ("[]" significa que é uma lista).
"LocalStorage" é o armazenamento local de informações do usuário, "setItem" serve para transformar uma informação em string.
" 'tarefas' " significa o nome da string e "tarefas" do lado é a constante que criamos, ela que transformaremos em string.
"JSON.stringify(tarefas)" trasforma "tarefas" em uma string, assim podendo ser armazenada no LocalStorage que só aceita strings.

textoArea.value = ''  = esvaziar a caixa de texto
*/

tarefas.forEach(tarefa => {
  const aparecerTarefa = criarTarefa(tarefa)
  ulTarefa.append(aparecerTarefa)
});

/* Explicação da linha acima
adicionamos a linha de código criada para dar a aparência da tarefa
 ForEach = para cada elemento dentro da constante "tarefas"
 UlTarefa.append(aparecerTarefa) = adicionar o código da tarefa no "ul" dentro do html

*/

document.addEventListener('tarefaFinalizada', () => {
  if (liTarefaSelecionada && tarefaSelecionada) { // Verificando se existe uma tarefa selecionada
    liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
    liTarefaSelecionada.classList.add('app__section-task-list-item-complete') // Adicionando a classe à <li>
    liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
    tarefaSelecionada.completa = true
    /*tarefaSelecionada.completa
    No trecho tarefaSelecionada.completa = true, estamos atribuindo o valor true à propriedade completa do objeto tarefaSelecionada.
     Isso significa que estamos marcando a tarefa selecionada como completa, atualizando diretamente a propriedade completa desse objeto 
     específico.

    Por outro lado, no trecho if (tarefa.completa) { ... }, 
    estamos verificando se a propriedade completa do objeto tarefa possui um valor verdadeiro. Aqui, não estamos realizando uma atribuição,
    mas sim uma verificação condicional para decidir se a tarefa está completa ou não. */
    atualizarLocalStorage()
  }
})


/* Explicação da linha acima

 'if' verifica se 'tarefaSelecionada' e 'liTarefaSelecionada'tem algum valor atribuido e executa as linhas abaixo.
 disabled = tira o valor de 'button', ou seja, desabilita ele 
 */

 const removerTarefas = (somenteCompletas) => {
  const seletor = somenteCompletas
    ? ".app__section-task-list-item-complete"
    : ".app__section-task-list-item"

  // Remove os elementos do DOM
  document.querySelectorAll(seletor).forEach(elemento => {
    elemento.remove()
  })

  // Atualiza a lista de tarefas
  if (somenteCompletas) {
    tarefas = tarefas.filter(tarefa => !tarefa.completa)
  } else {
    tarefas = []
  }

  // Atualiza o localStorage com a nova lista
  atualizarLocalStorage()
}

botaoLimparConcluidas.onclick = () => removerTarefas(true)
botaoLimparTarefas.onclick = () => removerTarefas(false)

/*Explicação
Ela está utilizando o método filter para criar uma nova lista contendo apenas as tarefas que não estão completas.

Vamos analisar a expressão tarefa => !tarefa.completa:

O tarefa => é uma função de flecha que representa um predicado, ou seja, uma condição que será aplicada a cada elemento da lista.
O !tarefa.completa verifica se a propriedade completa da tarefa é falsa, ou seja, se a tarefa não está completa.

btnRemoverConcluidas.onclick = () => removerTarefas(true)
Ao usar esta sintaxe, estamos definindo o evento de clique do botão para uma função anônima (uma função sem nome) que, 
quando chamada, executará a função removerTarefas com o argumento true.

Uma maneira simples de entender isso é imaginar que estamos dizendo ao botão: "Quando você for clicado, quero que você execute 
essa pequena função para mim. E essa pequena função chamará removerTarefas passando true (ou false, como vimos em aula)."

*/
  