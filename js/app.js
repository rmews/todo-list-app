// Problem: User interaction doesn't provide desired results
// Solution: Add interactivity so user can manage daily tasks


//Assign current html elements to variables
var newTaskInput = document.getElementById("new-task"); // get input from new-task
var newTaskButton = document.getElementsByTagName("button")[0]; // get first button
var incompletedTasks = document.getElementById("incomplete-tasks"); // get incomplete-tasks
var completedTasks = document.getElementById("completed-tasks"); // get completed-tasks

//Function to create new html elements and append to incompleted/completed tasks
var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li"); //Create List Item 
  var checkBox = document.createElement("input"); //Create checkbox
  var label = document.createElement("label"); //Create label 
  var editInput = document.createElement("input"); //Create text input 
  var editButton = document.createElement("button"); //Create button .edit
  var deleteButton = document.createElement("button"); //Create button .delete
  
  // Modify each new element
  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerHTML = "Edit";
  editButton.className = "edit";
  deleteButton.innerHTML = "Delete";
  deleteButton.className = "delete";
  label.innerText = taskString;
  
  // Appended new elements to current unordered list
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

// 1. Function to add a new task
var addTask = function() {
  var listItem = createNewTaskElement(newTaskInput.value);   //Calls function to get elements ready
  incompletedTasks.appendChild(listItem); //Append to incompleteTasks html body (child = li element)
  bindTaskEvents(listItem, taskComplete);
  newTaskInput.value = "";
}

var ajaxRequests = function() {
  console.log("AJAX request");
}

// DOM event trigger to call add task function 
newTaskButton.addEventListener("click", addTask);
newTaskButton.addEventListener("click", ajaxRequest);

// 2. Function to Edit an existing task 
var editTask = function() {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode");

  // if parent class is .editMode 
  if (containsClass) {
      // Switch from .editMode 
      // Label text will become input's value
    label.innerText = editInput.value;
  } else {   
      // Switch to .editMode
      // Input value becomes the label's text
    editInput.value = label.innerText;
  }
  
  listItem.classList.toggle("editMode");
}

// 3. Function to Delete an existing task
var deleteTask = function() {
  //Remove parent list item from ul
  var listItem = this.parentNode; 
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

// 4. Function to Mark task as complete
var taskComplete = function() {
  var listItem = this.parentNode;
  completedTasks.appendChild(listItem); //Append incomplete task to completed task list
  bindTaskEvents(listItem, taskIncomplete);
}

// 5. Function to Mark task as incomplete
var taskIncomplete = function() {
  var listItem = this.parentNode;
  incompletedTasks.appendChild(listItem); //Append complete task to incompleted task list
  bindTaskEvents(listItem, taskComplete);
}

var bindTaskEvents = function(taskListItem, checkBoxEvent) {
   // select children elements of completed/incompleted items
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  editButton.onclick = editTask; //Bind editTask to edit button
  deleteButton.onclick = deleteTask; //Bind deleteTask to delete button
  checkBox.onchange = checkBoxEvent; //Bind checkBoxEvent to checkbox function
}

// Cycle through the current incompleteTasks elements
for (var i = 0; i < incompletedTasks.children.length; i++) {
  bindTaskEvents(incompletedTasks.children[i], taskComplete); //Bind all current completed task elements and call the task complete function
}
   
// Cycle through the current completeTasks elements
for (var i = 0; i < completedTasks.children.length; i++) {
  bindTaskEvents(completedTasks.children[i], taskIncomplete); //Bind all current incomplete task elements and call the task complete function
}