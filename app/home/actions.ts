'use server'

import { query } from '@/lib/db'
import {
  SELECT_PROJECTS, INSERT_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, SELECT_TASKS_BY_PROJECT_ID, PROJECTS_WITH_TASKS_VIEW,
  SELECT_TASKS_BY_PROJECT_ID_AND_STATUS, INSERT_TASK, UPDATE_TASK, DELETE_TASK
} from './constants'
import {Project, ProjectWithTasks, ProjectWithTasksDao, Task} from './types'
import { revalidatePath } from 'next/cache'
import { QueryResult } from 'pg'
import _ from 'lodash'

export async function getProjectsWithTasks(): Promise<ProjectWithTasks[]> {
  try{
    const projectsWithTasksRows: QueryResult<ProjectWithTasksDao> = await query(PROJECTS_WITH_TASKS_VIEW, [])
    const projectsWithTasksDao: ProjectWithTasksDao[] = projectsWithTasksRows.rows

    const projectsGroupedWithTasks = _.groupBy(projectsWithTasksDao, 'projectid')

    const projectsWithTasks: ProjectWithTasks[] = _.toPairs(projectsGroupedWithTasks)
      .map(([projectid, value]) => {

        const projectDetails = value[0];

        return {
          id: projectid,
          title: projectDetails.projecttitle,
          description: projectDetails.projectdescription,
          tasks: value.map(item => ({
            id: item.taskid,
            title: item.tasktitle,
            description: item.taskdescription,
            status: item.taskstatus,
            projectId: item.taskprojectid
          }))
        }
      })

    return projectsWithTasks
  } catch(error){
    console.error('Error getting projects with tasks:', error)
    return []
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const projectListRows: QueryResult<Project> = await query(SELECT_PROJECTS, [])
    revalidatePath('/home') // Revalidate the current page
    return projectListRows.rows
  } catch (error) {
    console.error('Error getting projects:', error)
    return []
  }
}

export async function addProject(project: Project): Promise<Project> {
  const params = [project.id, project.title, project.description]
  try {
    const result: QueryResult<Project> = await query(INSERT_PROJECT, params)
    revalidatePath('/home') // Revalidate the current page
    return result.rows[0]
  } catch (error) {
    console.error('Error adding project:', error)
    return {} as Project
  }
}

export async function updateProject(project: Project): Promise<Project> {
  const params = [project.id, project.title, project.description]
  try {
    const result: QueryResult<Project> = await query(UPDATE_PROJECT, params)
    revalidatePath('/home')
    return result.rows[0]
  } catch (error) {
    console.error('Error updating project:', error)
    return {} as Project
  }
}

export async function deleteProject(project: Project): Promise<boolean> {
  const params = [project.id]
  try {
    const result: QueryResult<Project> = await query(DELETE_PROJECT, params)
    revalidatePath('/home')
    return result.rowCount !== 0
  } catch (error) {
    console.error('Error deleting project:', error)
    return false
  }
}

export async function getTasks(project: Project): Promise<Task[]> {
  const params = [project.id]
  try{
    const taskListRows: QueryResult<Task> = await query(SELECT_TASKS_BY_PROJECT_ID, params)
    return taskListRows.rows
  }catch(error){
    console.error('Error getting tasks:', error)
    return []
  }
}

export async function sortTasksByStatus(project: Project, status: 'NOT STARTED' | 'IN PROGRESS' | 'COMPLETED'): Promise<Task[]> {
  const params = [project.id, status]
  try {
    const taskListRows: QueryResult<Task> = await query(SELECT_TASKS_BY_PROJECT_ID_AND_STATUS, params)
    return taskListRows.rows
  } catch (error) {
    console.error('Error getting tasks:', error)
    return []
  }
}

export async function addTask(task: Task): Promise<Task | undefined> {
  const params = [task.id, task.title, task.description, task.status, task.projectId]
  try{
    const taskRow: QueryResult<Task> = await query(INSERT_TASK, params)
    return taskRow.rows[0]
  } catch(error){
    console.log('Error creating task:', error)
  }
}

export async function updateTask(task: Task): Promise<Task | undefined>{
  const params = [task.title, task.description, task.status, task.projectId, task.id]
  try{
    const taskRow: QueryResult<Task> = await query(UPDATE_TASK, params)
    return taskRow.rows[0]
  } catch(error){
    console.log('Error updating task:', error)
  }
}

export async function removeTask(task: Task): Promise<boolean> {
  const params = [task.id]
  try{
    const taskRow: QueryResult<Task> = await query(DELETE_TASK, params)
    return taskRow.rowCount !== 0
  } catch(error){
    console.log('Error deleting task:', error)
    return false
  }
}

