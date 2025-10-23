'use client'

import {FC, SetStateAction, useState, Dispatch} from 'react'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import {Task, Project, formTaskSchema, formProjectSchema } from './types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DialogAddProjectForm, DialogEditProjectForm, DialogDeleteProjectForm,
  DialogAddTaskForm
} from './dialogForm'
import {
  addProject, updateProject, deleteProject,
  getTasks, addTask
} from './actions'

const ButtonBar: FC<{
  projects: Project[],
  setProjectsAction: Dispatch<SetStateAction<Project[]>>,
  selectedProject: Project,
  setSelectedProjectAction: Dispatch<SetStateAction<Project>>
}> = (props) => {
  const { projects, setProjectsAction, selectedProject, setSelectedProjectAction } = props
  const [openAddDialogTask, setOpenAddDialogTask] = useState<boolean>(false)
  const [openEditDialogTask, setOpenEditDialogTask] = useState<boolean>(false)
  const [openAddDialogProject, setOpenAddDialogProject] = useState<boolean>(false)
  const [openEditDialogProject, setOpenEditDialogProject] = useState<boolean>(false)
  const [openDeleteDialogProject, setOpenDeleteDialogProject] = useState<boolean>(false)

  const handleAddProject = (values: z.infer<typeof formProjectSchema>) => {
    const newProject: Project = {
      id: values.id,
      title: values.title,
      description: values.description || ''
    }
    addProject(newProject)
      .then(project => setProjectsAction(prev => [...prev, project]))
      .catch(error => console.error('Error adding project:', error))
      .finally(() => setOpenAddDialogProject(false))
  }

  const handleEditProject = (values: z.infer<typeof formProjectSchema>) => {
    const updatedProject: Project = {
      id: values.id,
      title: values.title,
      description: values.description || ''
    }

    updateProject(updatedProject)
      .then(project => {
        setProjectsAction(prev => prev.map(p => p.id === updatedProject.id ? project : p))
        setSelectedProjectAction(project)
      })
      .catch(error => console.error('Error updating project:', error))
      .finally(() => setOpenEditDialogProject(false))
  }

  const handleDeleteProject = () => {
    deleteProject(selectedProject)
      .then(() => setProjectsAction(prev => prev.filter(p => p.id !== selectedProject.id)))
      .catch(error => console.error('Error deleting project:', error))
      .finally(() => setOpenDeleteDialogProject(false))
  }


  const onTaskSubmit = (values: z.infer<typeof formTaskSchema>) => {
    const task: Task = {
      id: values.id,
      status: values.status,
      title: values.title,
      description: values.description,
      projectId: selectedProject.id
    }

    addTask(task)
      .then()
      .catch(error => console.log('Error adding item', error))
      .finally(() => setOpenAddDialogTask(false))
  }
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
      <Button onClick={() => setOpenAddDialogTask(true)}>Add Task</Button>
      <DialogAddTaskForm
        open={openAddDialogTask}
        setOpenAction={setOpenAddDialogTask}
        onSubmitAction={onTaskSubmit}
      />
      {/*<Button onClick={filterTasksByNotStarted}>Filter By Not Started</Button>*/}
      {/*<Button onClick={filterTasksByInProgress}>Filter By In Progress</Button>*/}
      {/*<Button onClick={filterTasksByCompleted}>Filter By Complete</Button>*/}
      {/*<DialogAddTaskForm open={openTask} setOpenAction={setOpenTask} onSubmitAction={onTaskSubmit} />*/}
      <div className={'ml-auto'}>
        <ProjectSelection projects={projects} setSelectedProjectAction={setSelectedProjectAction}/>
      </div>
      <Button onClick={() => setOpenAddDialogProject(true)}>Add Project</Button>
      <DialogAddProjectForm
        open={openAddDialogProject}
        projects={projects}
        setOpenAction={setOpenAddDialogProject}
        onSubmitAction={handleAddProject}
      />
      <Button onClick={() => setOpenEditDialogProject(true)}>Edit Project</Button>
      <DialogEditProjectForm
        open={openEditDialogProject}
        setOpenAction={setOpenEditDialogProject}
        onSubmitAction={handleEditProject}
        initialValues={selectedProject}
      />
      <Button onClick={() => setOpenDeleteDialogProject(true)}>Delete Project</Button>
      <DialogDeleteProjectForm
        open={openDeleteDialogProject}
        setOpenAction={setOpenDeleteDialogProject}
        onDeleteAction={handleDeleteProject}
      />
    </div>
  )
}

export default ButtonBar

const ProjectSelection: FC<{
  projects: Project[]
  setSelectedProjectAction: Dispatch<SetStateAction<Project>>
}> = (props) => {
  const { projects, setSelectedProjectAction } = props

  const handleOnValueChange = (value: string) => {
    const selectedProject = projects.find(project => project.title === value) || {} as Project
    setSelectedProjectAction(selectedProject)
  }

  return(
    <Select onValueChange={handleOnValueChange}>
      <SelectTrigger className={'w-[200px]'}>
        <SelectValue placeholder={'Select a Project'} />
      </SelectTrigger>
      <SelectContent>
        {projects.map(item => (
          <SelectItem key={item.id} value={item.title}>{item.title}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}