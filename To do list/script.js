let tasks=[];
let completedTasksList=[];

document.addEventListener("DOMContentLoaded", function() {
    //getting the button from the document
    document.getElementById("add-task-button").addEventListener("click", function() {
        let taskInput = document.getElementById("add-task");
        let task = taskInput.value;
        //if there is a new task written in the text box, 
        //add the task to the list
        if (task) {
            tasks.push({ text: task, completed: false });
            taskInput.value = '';
            renderTasks();
        }
        console.log(task);//printing to check
    });
});

//code for display of the tasks
function renderTasks(){
    let taskList=document.getElementById("task-list");  
    taskList.innerHTML='';

    for(let i=0;i<tasks.length;i++){
        let task=tasks[i];
         // creating a list for the html document 
        let listItem = document.createElement("li");
        // creating the checkbox 
        let checkbox=document.createElement("input");
        checkbox.type="checkbox";
        checkbox.className="task-checkbox";
        checkbox.checked= task.completed;
        // if its clicked, make the task complete and order again 
        checkbox.addEventListener("change",function(){
            task.completed=this.checked;
            renderTasks();
        })
        // extracting the text from the task item
        let taskText=document.createElement("span");
        taskText.textContent= task.text;
        taskText.className="task-text";

        //in case its the checkbox is marked, add it to the "completed-
        // task list"
        if(task.completed){
            taskText.classList.add("task-complete");
            completedTasksList.push(listItem);
            updateCompletedTasksList();
            console.log(completedTasksList[i]);//testing to see whats going on
            renderCompletedTasks();
            
        }else{
            completedTasksList.pop();
        }
        // adding the check box and the text to the listItem 
        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        //append the listitem to the taskList which is the whole task
        //design
        taskList.appendChild(listItem);
        
    }
    

};

function updateCompletedTasksList() {
    completedTasksList = tasks.filter(task => task.completed);
}
function renderCompletedTasks() {
    let completedTasks = document.getElementById("completed-tasks");
    completedTasks.innerHTML = '';

    if(completedTasksList.length > 0) {
        let headerCompletedTasks = document.createElement("h3");
        headerCompletedTasks.textContent = "Completed Tasks";
        completedTasks.appendChild(headerCompletedTasks);

        completedTasksList.forEach(task => {
            let listItem = document.createElement("li");
            listItem.textContent = task.text;
            completedTasks.appendChild(listItem);
        });
    }
    if (completedTasksList.length==0){
        let headerCompletedTasks = document.querySelector("h3");
        if (headerCompletedTasks) {
            headerCompletedTasks.remove();
        }
    
        while (completedTasks.firstChild) {
            completedTasks.removeChild(completedTasks.firstChild);
        }
    }
}