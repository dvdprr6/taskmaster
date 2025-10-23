set schema 'public';

drop table if exists tasks;
drop table if exists projects;

create table if not exists tasks(
    id text not null,
    title text not null,
    description text,
    status text not null,
    project_id text not null
 );

create table if not exists projects(
    id text not null,
    title text not null,
    description text
);

drop view if exists projects_with_tasks_view;

create or replace view projects_with_tasks_view as
select
    p.id as projectId,
    p.title as projectTitle,
    p.description as projectDescription,
    t.id as taskId,
    t.title as taskTitle,
    t.description as taskDescription,
    t.status as taskStatus,
    t.project_id as taskProjectId
from projects p
 left join tasks t on p.id = t.project_id