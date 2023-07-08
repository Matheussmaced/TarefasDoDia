// seleção de elementos

const listForm = document.querySelector('#list-form');
const listInput = document.querySelector('#list-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');
const check = document.querySelector('#edit-input-ok') // botão para confirmar edição

// Search

// const deleteBtn = document.querySelector('#arase-button');
// const searchInput = document.querySelector('#search-input');

let oldInputValue;  // salvando o valor do input para depois fazer alteração

// funções

const saveList = (text) =>{

    // criando um elemento DIV e adicionando a classe já criado e estilizada

    const list = document.createElement('div');
    list.classList.add('todo')
    

    // criando um texto

    const listTitle = document.createElement('h3');
    listTitle.innerText = text  // para mostrar meu texto quando adicionado
    list.appendChild(listTitle) // adicionando meu texto na div criado acima

    // adicionando botões

    const doneBtn = document.createElement('button') // criando um elemento button
    doneBtn.classList.add('finish-todo') // add clase
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>' // add icone
    list.appendChild(doneBtn) // add na div

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit-todo') // add clase
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>' // add icone
    list.appendChild(editBtn) // addd na div

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('remove-todo') // add clase
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>' // add icone
    list.appendChild(deleteBtn) // addd na div

    // colocar a list na lista geral
    
    todoList.appendChild(list)  // adicionando a div que criei a minha lista

    // retoques no botão de adicionar tarefa

    listInput.value = '';   // apaga o texto depois de enviado
    listInput.focus(); // foca no input novamente apos enviar

}

// função para esconder o formulario apos clicar em edit
const toggleForms = () =>{
    editForm.classList.toggle('hide')
    listForm.classList.toggle('hide')
    todoList.classList.toggle('hide')
};

// pegando o valor para editar

const updateTodo = (text) =>{
    const todos = document.querySelectorAll('.todo')

    todos.forEach((todo) => {
        
        let todoTitle = todo.querySelector('h3')

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerHTML = text
        }

    });

}

//search bar 



// eventos

// removendo o evento de submit, pegando o valor do input e executando a função acima

listForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const inputValue = listInput.value;
    
    // se escrever no input irá rodar a função
    if(inputValue){
        saveList(inputValue)
    }
})

// adicionando evento de click no documento todo
document.addEventListener('click', (e) =>{
    // pegando o elemento que foi clicado
    const targetEl = e.target;
    //selecinando o elemento mais próximo
    const parentEl = targetEl.closest('div');
    // pegando o titulo criado para conseguir editar
    let todoTitle;
    // validação para ver se o elemento pai existe e se contem o h3 para conseguir editar
    if(parentEl && parentEl.querySelector('h3')){
        todoTitle = parentEl.querySelector('h3').innerText;
    }
    
    // se conteim a classe dita, ele executará o codigo
    if (targetEl.classList.contains('finish-todo')){
        parentEl.classList.toggle('done'); // adicionando a classe done a minha Div mais proximo

    }else if(targetEl.classList.contains('edit-todo')){
        toggleForms()

        //salvando o valor do input para depois fazer a alteração
        editInput.value = todoTitle;
        oldInputValue = todoTitle;

    }else if(targetEl.classList.contains('remove-todo')){
        parentEl.remove();  // removendo div
    
    }
})


check.addEventListener('click', (e)=>{
    e.preventDefault()

    const editInputValue = editInput.value; // pegando o valor de um input

    if(editInputValue){
        updateTodo(editInputValue)
    }

    toggleForms()

})


//Cacelando o envio do botão cancel

cancelEditBtn.addEventListener('click', (e)=>{
    e.preventDefault()

    //voltando para a origem apos apertar em cancel novamente usando a função que adiciona a classe hide
    toggleForms()
})


/* cancelando envio do deleteBtn e adicionando função de excluir texto ao botão

deleteBtn.addEventListener('click', (e) => {
    e.preventDefault()

    searchInput.value = '';
     
}); */


