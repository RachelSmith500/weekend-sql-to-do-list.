# To Do List Application


## Description

I created a front end experience that allows a user to create a Task.
When a task is created, its stored inside of the sql data base. 
The name of the database is 'to_do_app'.
Whenever a Task is created the front end refreshes to show all tasks that need to be completed.
Each Task has an option to mark the task as complete or uncompleted. You also have the option to delete a task.
When a Task is complete, its visual representation changes on the front end. The background of the task container changes from gray to green. 
Whether or not a task has been completed is also be stored in the database.
Deleting a task removes it both from the front end as well as the Database.

## Prerequisites

In order to run this app you will need to install some apps.
Please install node, pg, express, and body-parser. You will also need to create a database in Postico. The name of the database needs to be called 'to_do_app'. Refer to the database.sql file for more specific information regarding table set up. 

## Installation
Create a database named 'to_do_app'.
The queries in the tables.sql file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on Postgres, so you will need to make sure to have that installed. I recommend using Postico to run those queries as that was used to create the queries,
Open up your editor of choice and run an npm install
Run npm run server in your terminal
Run npm run client in your terminal
The npm run client command will open up a new browser tab for you!

## Built With
This application is built with node, express, pg, javaScript, html, CSS, bootstrap, and jQuery.

## Acknowledgement

Thanks to Prime Digital Academy who helped me to make this application a reality. A special thank you to Adam Boerhave for the pointers along the way.

