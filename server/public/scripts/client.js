console.log('js');

$(document).ready(function(){
    console.log('jq');
    getTasks();
    clickListeners();
    //click listener for the delete function 
    $('#targetNewToDo').on('click', '.deleteBtn', deleteTasks);
});

function clickListeners(){
    $('#addTask').on('click', function(){
        console.log('in addTask on click');
        //getting the input values and putting the values into an object
        let taskToSend ={
            taskName: $('#taskName').val(),
            priorityLevel: $('#priorityLevel').val(),
            completionTimeline: $('#completionTimeline').val(),
            completed: $('#completed').val(),
            additionalNotes: $('#additionalNotes').val()
        };
        //alert for if inputs are left empty 
        if(taskToSend.taskName === ''|| taskToSend.priorityLevel === '' || taskToSend.deadline === '' || taskToSend.completed === '' || taskToSend.additionalNotes === ''){
            alert('Please enter all fields.');
         } else if (taskToSend.completed.toLowerCase() === 'yes' || taskToSend.completed.toLowerCase() === 'no'){
             // (taskToSend);
             saveTask(taskToSend);
             clearInputs();
         }else{
             alert('Complete input must be YES or NO')
         }
       
    });
    //click listeners for completed and uncompleted task button
    $('#targetNewToDo').on('click', '.completedBtn', completeTask);
    $('#targetNewToDo').on('click', '.uncompleteBtn', unCompleteTask);  
}
//function for GET 
//appending table data to the dom
//sending our data via ajax to the server
//emptying the dom
//conditional for if the task is completed or not 
//if the get doesn't work an error is thrown
function getTasks(){
    console.log( 'in getTasks' );
  $.ajax({
    type: 'GET',
    url: '/toDoApp'
  }).then(function(response) {
    console.log("in GET toDoApp", response);
    $('#targetNewToDo').empty();
    for (let i = 0; i < response.length; i++) {
      if(response[i].completed.toLowerCase() == 'no') {
      $('#targetNewToDo').append(`
        <tr data-id=${response[i].id}>
            <td>${response[i].task_name}</td>
            <td>${response[i].priority_level}</td>
            <td>${response[i].completion_timeline}</td>
            <td>${response[i].completed}</td>
            <td>${response[i].additional_notes}</td>
            <td><button class="completedBtn alert alert-success btn-sm">Mark Completed</button></td>
            <td><button class="deleteBtn btn btn-danger">Delete</button></td>
        </tr>
      `);
      }
      else {
        $('#targetNewToDo').append(`
        <tr class="color" data-id=${response[i].id}>
            <td>${response[i].task_name}</td>
            <td>${response[i].priority_level}</td>
            <td>${response[i].completion_timeline}</td>
            <td>${response[i].completed}</td>
            <td>${response[i].additional_notes}</td>
            <td><button class="uncompleteBtn btn btn-warning">Mark Incomplete</button></td>
            <td><button class="deleteBtn btn btn-danger">Delete</button></td>
            
        </tr>
      `);
      }
    }
  }).catch(function(error){
    console.log('error in GET', error);
  });
  
  }
//POST 
//sending data to the server
  function saveTask(newTask){
    console.log( 'in saveTask', newTask );
    // ajax call to server to get tasks
    $.ajax({
      method: 'POST',
      url: '/toDoApp', 
      data: newTask
    }).then(function(response) {
      console.log('response', response);
      getTasks();
    }).catch(function(error) {
      console.log('error in post', error);
      
    });
  }
//clearing our Inputs
  function clearInputs(){
    $('#taskName').val('');
    $('#priorityLevel').val('');
    $('#completionTimeline').val('');
    $('#completed').val('');
    $('#additionalNotes').val('');
  }

  //function for completing a task 
  //this sends across a completed task change to our list on the dom and the server
  function completeTask(){
    console.log('Completing task!');
    let idToComplete = $(this).closest('tr').data('id');
    console.log(idToComplete)
    let completeStatus = {
      completed: 'YES'
    };
    $.ajax({
      method: 'PUT',
      url: `/toDoApp/T/${idToComplete}`, 
      data: completeStatus
    }).then(function() {
      getTasks();
    }).catch(function(error) {
      console.log('In complete', error);
    })
  }
//this allows the user to reverse a completed task 
//sends the new change to the server
  function unCompleteTask(){
    console.log('Whops that was not complete!');
    // $(this).closest('tr').removeClass("color");
    let idToComplete = $(this).closest('tr').data('id');
    let completeStatus = {
      completed: 'NO'
    };
    $.ajax({
      method: 'PUT',
      url: `/toDoApp/U/${idToComplete}`, 
      data: completeStatus
    }).then(function() {
      getTasks();
    }).catch(function(error) {
      console.log('In uncomplete', error);
    })
  }
  //this function allows the user to delete a task 
  //the delete happens to the dom and then sends the message over to the server 
  //and the database
  function deleteTasks(){
    console.log('delete clicked');
    let taskId = $(this).closest('tr').data('id');
    console.log(taskId);
    
    $.ajax({
        method: 'DELETE',
        url: `/toDoApp/${taskId}`,
    }).then(function(response){
        console.log(response);
        getTasks(); 
    }).catch(function(error){
        console.log('error', error); 
    });
    
  }

