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
        // saveTask(taskToSend);
        // clearInputs();
        if(taskToSend.taskName === ''|| taskToSend.priorityLevel === '' || taskToSend.deadline === '' || taskToSend.complete === '' || taskToSend.additionalNotes === ''){
            alert('Please enter all fields.');
         } else if (taskToSend.completed.toLowerCase() === 'yes' || taskToSend.completed.toLowerCase() === 'no'){
             // (taskToSend);
             saveTask(taskToSend);
             clearInputs();
         }else{
             alert('Complete input must be YES or NO')
         }
       
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

  function clearInputs(){
    $('#taskName').val('');
    $('#priorityLevel').val('');
    $('#completionTimeline').val('');
    $('#completed').val('');
    $('#additionalNotes').val('');
  }

  function editCompletion(){
    let completedYesNo = $(this).data('direction');
    let taskId = $(this).closest('tr').data('id');
    console.log("clicked", completedYesNo, taskId);
  
    $.ajax({
        method: 'PUT',
        url: `/task_data/completed/${taskId}`,
        data: {direction: completedYesNo}
    }).then(function (response){
        console.log('response', response);
        getTasks();
    }).catch(function(error){
        console.log('error in put', error);
    });
  }

//   function deleteTasks(){
//     console.log('delete clicked');
//     let taskId = $(this).closest('tr').data('id');
//     console.log(taskId);
    
//     $.ajax({
//         method: 'DELETE',
//         url: `/tasks/${taskId}`,
//     }).then(function(response){
//         console.log(response);
//         getKoalas(); 
//     }).catch(function(error){
//         console.log('error', error); 
//     });
    
//   }

