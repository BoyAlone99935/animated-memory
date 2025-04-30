const todoform = document.querySelector('form')
const userinput = document.getElementById('todoinput')
const todolistul = document.getElementById('todo-list')

let todoItem;

let alltodos = getTodo()
updateList()

const tojson = JSON.stringify(alltodos)
localStorage.setItem("todos", tojson)

todoform.addEventListener('submit', function(e) {
  e.preventDefault()
  addtodo()
} )


function addtodo () {
  const todotext = userinput.value.trim()
  if (todotext.length > 0) {
    alltodos.push(todotext)
    updateList()
    saveTodo()
    userinput.value = ""
    // IF YOU WISH TO CHECK IF AN IMPUT FEILD IS EMPTY USE THE .LENGHT PROPERTY OF THE VARIABLE
  }
  
  
}
function updateList () {
  todolistul.innerHTML = ""
  alltodos.forEach((todo, todoindex) => {
   todoItem = createitem(todo, todoindex)
   todolistul.append(todoItem)
  })
}

function  createitem (todo, todoindex) {
  const todoId = "todo"+ todoindex;
  const createLI = document.createElement('li')
  createLI.className = "todo"
  createLI.innerHTML = ` 
       <input type="checkbox" id="${todoId}">
       <label class="customcheckbox" for="${todoId}">
        <svg fill = "transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
       </label>
       <label for="${todoId}" class="todotext">
       ${todo}
       </label>
       <button class="deletebtn">
        <img   src="delete_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg">
       </button>
    
  `
   const deletebtn = createLI.querySelector(".deletebtn")
   deletebtn.addEventListener('click', () => {
      deleteitem(todoindex)
   })

   return createLI
  }

  function deleteitem(todoindex) {
    alltodos = alltodos.filter((_, i) => i !== todoindex)
    saveTodo()
    updateList()
  }


function saveTodo() {
  const tojson = JSON.stringify(alltodos)
  console.log(tojson)
  localStorage.setItem("todos", tojson)
}
function getTodo() {
  const todo = localStorage.getItem("todos") || "[]"
  return JSON.parse(todo)
}