'use client'

import { FC, useState } from 'react'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import {Task, Project, formTaskSchema, formProjectSchema } from './types'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DialogAddTaskForm, DialogAddProjectForm } from './dialogForm'
import { addProject } from './actions';

const ButtonBar: FC<{
  initialProjects: Project[]
}> = (props) => {
  const { initialProjects } = props
  const [openTask, setOpenTask] = useState<boolean>(false)
  const [openDialogProject, setOpenDialogProject] = useState<boolean>(false)
  const [projects, setProjects] = useState<Project[]>(initialProjects)

  const handleAddProject = (values: z.infer<typeof formProjectSchema>) => {
    const newProject: Project = {
      id: values.id,
      title: values.title,
      description: values.description
    }
    addProject(newProject)
      .then(project => setProjects(prev => [...prev, project]))
      .catch(error => console.error('Error adding project:', error))
      .finally(() => setOpenDialogProject(false))
  }

  // const openTaskDialog = () => { setOpenTask(true) }
  //
  // const openProjectDialog = () => { setOpenProject(true) }
  //
  // const onTaskSubmit = (values: z.infer<typeof formTaskSchema>) => {
  //   const task: Task = {
  //     id: values.id,
  //     status: values.status,
  //     title: values.title,
  //     description: values.descriptions
  //   }
  //   addTask(task)
  //   setOpenTask(false)
  // }
  //
  // const onProjectSubmit = (values: z.infer<typeof formProjectSchema>) => {
  //   const project: Project = {
  //     id: values.id,
  //     title: values.title,
  //     description: values.description
  //   }
  //   addProject(project)
  //   setOpenProject(false)
  // }

  return (
    <div className={'flex gap-[10px]'}>
      {/*<Button onClick={openTaskDialog}>Add Task</Button>*/}
      {/*<Button onClick={filterTasksByNotStarted}>Filter By Not Started</Button>*/}
      {/*<Button onClick={filterTasksByInProgress}>Filter By In Progress</Button>*/}
      {/*<Button onClick={filterTasksByCompleted}>Filter By Complete</Button>*/}
      {/*<DialogAddTaskForm open={openTask} setOpenAction={setOpenTask} onSubmitAction={onTaskSubmit} />*/}
      <div className={'ml-auto'}>
        <ProjectSelection projectList={projects}/>
      </div>
      <Button onClick={() => setOpenDialogProject(true)}>Add Project</Button>
      <DialogAddProjectForm
        open={openDialogProject}
        setOpenAction={setOpenDialogProject}
        onSubmitAction={handleAddProject}
      />
      <Button>Delete Project</Button>
    </div>
  )
}

export default ButtonBar

const ProjectSelection: FC<{ projectList: Project[] }> = (props) => {
  const { projectList } = props
  return(
    <Select>
      <SelectTrigger className={'w-[200px]'}>
        <SelectValue placeholder={'Select a Project'} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {projectList.map(item => (
            <SelectItem key={item.id} value={item.title}>{item.title}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}