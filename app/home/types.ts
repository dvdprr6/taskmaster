import { z } from 'zod'

export type Task = {
  id: string,
  status: 'NOT STARTED' | 'IN PROGRESS' | 'COMPLETED',
  title: string,
  description: string,
  projectId: string
}

export type ProjectWithTasksDao = {
  projectid: string,
  projecttitle: string,
  projectdescription: string,
  taskid: string,
  taskstatus: 'NOT STARTED' | 'IN PROGRESS' | 'COMPLETED',
  tasktitle: string,
  taskdescription: string,
  taskprojectid: string
}


export type ProjectWithTasks = Project & { tasks: Task[] }

export type Project = {
  id: string,
  title: string,
  description: string
}

export const formTaskSchema = z.object({
  id: z.string(),
  status: z.enum(['NOT STARTED', 'IN PROGRESS', 'COMPLETED']),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  projectId: z.string()
})

export const formProjectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional()
})