Database name is: to_do_app

CREATE TABLE "tasks" (
"id" serial primary key,
"task_name" varchar (80),
"priority_level" integer,
"completion_timeline" varchar (80),
"completed" boolean,
"additional_notes" varchar (80)
);