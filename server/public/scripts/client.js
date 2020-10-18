console.log('js');

$(document).ready(function(){
    console.log('jq');
});

function clickListeners(){
    $('#addTask').on('click', function(){
        console.log('in addTask on click');
        
        let taskToSend ={
            taskName: $('#taskName').val(),
            priorityLevel: $('#priorityLevel').val(),
            completionTimeLine: $('#completionTimeLine').val(),
            completed: $('#completed').val(),
            addAdditionalNotes: $('#addAdditionalNotes').val()
        };
    });
}