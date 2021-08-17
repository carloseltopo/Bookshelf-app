const ITEMID = "itemId";

document.addEventListener("DOMContentLoaded", function() {
    const submitBook = document.getElementById("book-form");

    submitBook.addEventListener("submit", function(event){
        event.preventDefault();
        addBookmark();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

// document.addEventListener("ondatasaved", () => {
//     console.log("Data berhasil disimpan.");
// });

// document.addEventListener("ondataloaded", () => {
//     refreshDataFromTodos();
// });

const addBookmark = ()=>{
    const uncompletedList = document.getElementById("one");

    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const author = document.getElementById("author").value;

    const todo = makeTodo(title, date, author);
    // const todoObject = composeTodoObject(title, date, author, false);

    // todo[ITEMID] = todoObject.id;
    // todos.push(todoObject);

    uncompletedList.append(todo);
    // updateDataToStorage();
}

const makeTodo = (data, timestamp, nama, isCompleted)=>{
    const textTitle = document.createElement('h2');
    textTitle.innerText = data;
    const textDate = document.createElement('p');
    textDate.innerText = timestamp;
    const textAuthor = document.createElement('p');
    textAuthor.classList.add('author')
    textAuthor.innerText = nama;

    const container = document.createElement("div");
    container.classList.add("shelf-container");
    container.append(textTitle, textDate, textAuthor);

    // const innerContainer = document.createElement('div');
    // innerContainer.classList.add('shelf-container')
    // innerContainer.append(container)

    if(isCompleted){
        container.append(undoButton());
        container.append(clearButton());
       
    }else{
        container.append(checkButton());
        container.append(clearButton());
    }

    return container;
}

const createButton = (buttonType, text, eventListener)=>{
    const button = document.createElement('button');
    button.classList.add(buttonType);
    button.innerText = text;
    button.addEventListener("click", function(event){
        eventListener(event);
    });
    return button;
}

const checkButton = ()=>{
    return createButton("green", "Complete", function(event){
        addTaskToCompleted(event.target.parentElement);

    });
}

const clearButton = ()=>{
    return createButton("red", "Remove", function(event){
        removeTaskFromCompleted(event.target.parentElement);

    });
}

const undoButton = ()=>{
    return createButton("undo", "Bookmark", function(event){
        undoTaskFromCompleted(event.target.parentElement);
    })
}

function addTaskToCompleted(taskElement) {
    const taskTitle = taskElement.querySelector(".shelf-container > h2").innerText;
    const tasktimestamp = taskElement.querySelector(".shelf-container > p").innerText;
    const taskauthor = taskElement.querySelector(".shelf-container > .author").innerText;

    const newTodo = makeTodo(taskTitle, tasktimestamp, taskauthor, true)
    // const todo = findTodo(taskElement[ITEMID]);
    // todo.isCompleted = true;
    // newTodo[ITEMID] = todo.id;

    const listCompleted = document.getElementById("two")
    listCompleted.append(newTodo);
    taskElement.remove();

    // updateDataToStorage();
} 

const removeTaskFromCompleted = (taskElement)=>{
    
    // const todoPosition = findTodoIndex(taskElement[ITEMID]);
    // todos.splice(todoPosition, 1);

    taskElement.remove();
    // updateDataToStorage();
}

const undoTaskFromCompleted = (taskElement)=>{
    const listuncompleted = document.getElementById("one");
    const taskTitle = taskElement.querySelector(".shelf-container > h2").innerText;
    const tasktimestamp = taskElement.querySelector(".shelf-container > p").innerText;
    const taskauthor = taskElement.querySelector(".shelf-container > .author").innerText;

    const newTodo = makeTodo(taskTitle, tasktimestamp, taskauthor, false);

    // const todo =findTodo(taskElement[ITEMID]);
    // todo.isCompleted = false;
    // newTodo[ITEMID] = todo.id;

    listuncompleted.append(newTodo);
    taskElement.remove();

    // updateDataToStorage();
}

const tombol = document.querySelectorAll('.shelf-container button');

Array.from(tombol).forEach((tbl)=>{
    tbl.addEventListener('click',(e)=>{
        if(e.target.className=='red'){
            const container = e.target.parentElement;
            container.remove()
        } else if (e.target.className=='green'){
            addTaskToCompleted(e.target.parentElement)
        } else {
            undoTaskFromCompleted(e.target.parentElement)
        } 
    })
})

//Filter content
const filter = document.querySelector('#filter input');

filter.addEventListener('input',(e)=>{
    const filterBar = e.target.value.toLowerCase();

    const books = document.querySelectorAll('.panel h2')
    const shelf = Array.from(books);

    shelf.forEach((book)=>{
        const eachTitle = book.innerText;
        const hide = book.parentElement;
        if(eachTitle.toLowerCase().indexOf(filterBar) != -1){
            book.style.display = 'block';
            hide.style.display = 'block';
        }else{
            hide.style.display = 'none';
        }
    })
});


//Tabbed content
const tabs = document.querySelector('.tabs')
const panel = document.querySelectorAll('.panel')
const eachtabs = document.querySelectorAll('.tabs Li')
const taptap = Array.from(eachtabs);
const tabBookmark = document.querySelector('.tabs li:nth-child(1)')
const tabComplete = document.querySelector('.tabs li:nth-child(2)')

tabs.addEventListener('click', (e)=>{
    if(e.target.tagName == 'LI'){
        const targetPanel = document.querySelector(e.target.dataset.target);
        Array.from(panel).forEach((panele)=>{
            if(panele == targetPanel){
                panele.classList.add('active');
            }else{
                panele.classList.remove('active');
            }
        })
    }
})

function tabFunctionBookmark(){
    tabBookmark.classList.add('active');
    tabComplete.classList.remove("active");
}

function tabFunctionComplete(){
    tabBookmark.classList.remove('active');
    tabComplete.classList.add('active');
}
// tabs.addEventListener('click', (e)=>{
//     if(e.target.classList == '.tabs li'){
//         console.log('yo')
//         // tabComplete.classList.remove('active');
//         // tabBookmark.classList.add('active');
//     }else{
//         tabComplete.classList.add('active');
//         tabBookmark.classList.remove('active');
//     }
// })