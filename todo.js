const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';
let toDos = []; //할일 항목 Array

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
         return toDo.id !==parseInt(li.id); // toDo.id는 숫자고 li.id는 String형태여서 변경
    });
    toDos = cleanToDos;
    saveToDos();
}
function paintToDo(text) {
    console.log(text);
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length +1;
    delBtn.innerHTML = "X";
    delBtn.addEventListener("click",deleteToDo);

    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj); // 배열에 push
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos)); //json.stringify -> 자바스크립트 object를 String으로 바꿔 줌
}
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value; 
    paintToDo(currentValue);
    toDoInput.value="";
}
function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(toDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
}
function init() {
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();