'use client'

import { FC, useState } from 'react'
import ButtonBar from '@/app/home/buttonBar'
import { Task, Project, ProjectWithTasks, formTaskSchema, formProjectSchema } from './types'
import Body from './body'

const MainPage: FC<{ projectsWithTasks: ProjectWithTasks[] }> = (props) => {
  const { projectsWithTasks } = props
  const [selectedProject, setSelectedProject] = useState<ProjectWithTasks>(projectsWithTasks.length > 0 ? projectsWithTasks[0] : {} as ProjectWithTasks)
  const [projects, setProjects] = useState<ProjectWithTasks[]>(projectsWithTasks)

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
        {/*<Body*/}
        {/*  tasks={selectedProject}*/}
        {/*  removeTask={removeTask}*/}
        {/*  updateTask={updateTask}*/}
        {/*/>*/}
      </div>
    </section>
  )
}

export default MainPage