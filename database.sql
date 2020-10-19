Database name is: to_do_app

// NEW // NEW // NEW PLEASE USE THIS TABLE //
CREATE TABLE "tasks" (
"id" serial primary key,
"task_name" VARCHAR (80) NOT NULL,
"priority_level" VARCHAR (80) NOT NULL,
"completion_timeline" VARCHAR (80) NOT NULL,
"completed" VARCHAR (20) DEFAULT 'NO',
"additional_notes" VARCHAR (255)
);

CREATE TABLE "tasks" (
"id" serial primary key,
"task_name" varchar (80),
"priority_level" integer,
"completion_timeline" varchar (80),
"completed" boolean,
"additional_notes" varchar (80)
);