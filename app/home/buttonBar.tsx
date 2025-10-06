'use client'

import { FC, useState } from 'react'
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
import { DialogAddProjectForm, DialogEditProjectForm } from './dialogForm'
import { addProject, updateProject, deleteProject } from './actions'

const ButtonBar: FC<{
  initialProjects: Project[]
}> = (props) => {
  const { initialProjects } = props
  const [openTask, setOpenTask] = useState<boolean>(false)
  const [openAddDialogProject, setOpenAddDialogProject] = useState<boolean>(false)
  const [openEditDialogProject, setOpenEditDialogProject] = useState<boolean>(false)
  const [openDeleteDialogProject, setOpenDeleteDialogProject] = useState<boolean>(false)
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [selectedProject, setSelectedProject] = useState<Project>({} as Project)

  const handleAddProject = (values: z.infer<typeof formProjectSchema>) => {
    const newProject: Project = {
      id: values.id,
      title: values.title,
      description: values.description || ''
    }
    addProject(newProject)
      .then(project => setProjects(prev => [...prev, project]))
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
        setProjects(prev => prev.map(p => p.id === updatedProject.id ? project : p))
        setSelectedProject(project)
      })
      .catch(error => console.error('Error updating project:', error))
      .finally(() => setOpenEditDialogProject(false))
  }

  const handleDeleteProject = (values: z.infer<typeof formProjectSchema>) => {
    const deletedProject: Project = {
      id: values.id,
      title: values.title,
      description: values.description || ''
    }

    deleteProject(deletedProject)
      .then(() => setProjects(prev => prev.filter(p => p.id !== deletedProject.id)))
      .catch(error => console.error('Error deleting project:', error))
      .finally(() => setOpenDeleteDialogProject(false))
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
        <ProjectSelection projectList={projects} setSelectedProject={setSelectedProject}/>
      </div>
      <Button onClick={() => setOpenAddDialogProject(true)}>Add Project</Button>
      <DialogAddProjectForm
        open={openAddDialogProject}
        projects={initialProjects}
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
    </div>
  )
}

export default ButtonBar

const ProjectSelection: FC<{
  projectList: Project[]
  setSelectedProject: (project: Project) => void
}> = (props) => {
  const { projectList, setSelectedProject } = props

  const handleOnValueChange = (value: string) => {
    const selectedProject = projectList.find(project => project.title === value) || {} as Project
    setSelectedProject(selectedProject)
  }

  return(
    <Select onValueChange={handleOnValueChange}>
      <SelectTrigger className={'w-[200px]'}>
        <SelectValue placeholder={'Select a Project'} />
      </SelectTrigger>
      <SelectContent>
        {projectList.map(item => (
          <SelectItem key={item.id} value={item.title}>{item.title}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}