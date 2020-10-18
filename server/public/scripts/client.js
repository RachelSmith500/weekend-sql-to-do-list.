console.log('js');

$(document).ready(function(){
    console.log('jq');
    getTasks();
    clickListeners();
});

function clickListeners(){
    // $('#targetNewToDo').on('click', '.deleteBtn', deleteTask);
    $('#addTask').on('click', function(){
        console.log('in addTask on click');
        
        let taskToSend ={
            taskName: $('#taskName').val(),
            priorityLevel: $('#priorityLevel').val(),
            completionTimeline: $('#completionTimeline').val(),
            completed: $('#completed').val(),
            additionalNotes: $('#additionalNotes').val()
        };

        saveTask(taskToSend);
    });
}

function getTasks(){
    console.log( 'in getTasks' );
  $.ajax({
    type: 'GET',
    url: '/toDoApp'
  }).then(function(response) {
    console.log("in GET toDoApp", response);
    $('#targetNewToDo').empty();
    for (let i = 0; i < response.length; i++) {
      if(!response[i].completed) {
      $('#targetNewToDo').append(`
        <tr data-id=${response[i].id}>
            <td>${response[i].task_name}</td>
            <td>${response[i].priority_level}</td>
            <td>${response[i].completion_timeline}</td>
            <td>${response[i].completed}</td>
            <td>${response[i].additional_notes}</td>
            <td><button class="completedBtn">Completed</button></td>
            <td><button class="deleteBtn">Delete</button></td>
        </tr>
      `);
      }
      else {
        $('#targetNewToDo').append(`
        <tr data-id=${response[i].id}>
            <td>${response[i].task_name}</td>
            <td>${response[i].priority_level}</td>
            <td>${response[i].completion_timeline}</td>
            <td>${response[i].completed}</td>
            <td>${response[i].additional_notes}</td>
            <td></td>
            <td><button class="deleteBtn">Delete</button></td>
        </tr>
      `);
      }
    }
  }).catch(function(error){
    console.log('error in GET', error);
  });
  
  }

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
      clearInputs();
  
    }).catch(function(error) {
      console.log('error in post', error);
      
    });
  }

  function clearInputs() {
    $('#taskName').val('');
    $('#priorityLevel').val('');
    $('#completionTimeLine').val('');
    $('#completed').val('');
    $('#additionalNotes').val('');
  }