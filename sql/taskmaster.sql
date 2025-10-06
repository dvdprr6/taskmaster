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