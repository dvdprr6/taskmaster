export const SELECT_PROJECTS: string = 'select id, title, description from projects order by title'
export const INSERT_PROJECT = 'INSERT INTO projects (id, title, description) VALUES ($1, $2, $3) RETURNING *';
export const UPDATE_PROJECT = 'UPDATE projects SET title = $2, description = $3 WHERE id = $1 RETURNING *';
export const DELETE_PROJECT = 'DELETE FROM projects WHERE id = $1';

export const SELECT_TASKS_BY_PROJECT_ID = 'SELECT * FROM tasks WHERE project_id = $1';
export const SELECT_TASKS_BY_PROJECT_ID_AND_STATUS = 'SELECT * FROM tasks WHERE project_id = $1 AND status = $2';
export const INSERT_TASK = 'INSERT INTO tasks (id, title, description, status, project_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
export const UPDATE_TASK = 'UPDATE tasks SET title = $1, description = $2, status = $3, project_id = $4 WHERE id = $5 RETURNING *';
export const DELETE_TASK = 'DELETE FROM tasks WHERE id = $1';

export const PROJECTS_WITH_TASKS_VIEW = 'SELECT projectid, projecttitle, projectDescription, taskId, taskTitle, taskDescription, taskStatus, taskProjectId FROM projects_with_tasks_view'