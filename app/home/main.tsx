'use client'

import { FC, useState } from 'react'
import ButtonBar from '@/app/home/buttonBar'
import { Task, Project, ProjectWithTasks, formTaskSchema, formProjectSchema } from './types'
import Body from './body'

const MainPage: FC<{ projectsWithTasks: ProjectWithTasks[] }> = (props) => {
  const { projectsWithTasks } = props
  const [selectedProject, setSelectedProject] = useState<Project>(
    projectsWithTasks.length > 0 ? {
      id: projectsWithTasks[0].id,
      title: projectsWithTasks[0].title,
      description: projectsWithTasks[0].description
    } : {} as Project)
  const [projects, setProjects] = useState<Project[]>(projectsWithTasks.map(item => ({ id: item.id, title: item.title, description: item.description })))

  return(
    <section>
      <div style={{ width: '90%', maxWidth: 'none', margin: 'auto', marginBottom: '10px' }}>
        <ButtonBar
          // addTask={addTask}
          // addProject={addProject}
          projects={projects}
          setProjectsAction={setProjects}
          selectedProject={selectedProject}
          setSelectedProjectAction={setSelectedProject}
          // filterTasksByNotStarted={filterTasksByNotStarted}
          // filterTasksByInProgress={filterTasksByInProgress}
          // filterTasksByCompleted={filterTasksByCompleted}
        />
      </div>
      <div style={{ width: '90%', maxWidth: 'none', margin: 'auto' }}>
        <Body
          tasks={selectedProject}
          removeTask={removeTask}
          updateTask={updateTask}
        />
      </div>
    </section>
  )
}

export default MainPage