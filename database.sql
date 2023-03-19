CREATE TABLE todo_list (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(255),
    "due" DATE DEFAULT CURRENT_DATE,
    "notes" TEXT,
    "status" VARCHAR(50) DEFAULT 'Incomplete'
);

INSERT INTO todo_list (task, notes)
VALUES ('Bicep Curls', 'Do three sets of ten')
