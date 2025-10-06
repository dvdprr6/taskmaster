'use server'

import ButtonBar from './buttonBar'
import Body from './body'
import {
  getProjects, addProject, updateProject, deleteProject,
  getTasks, sortTasksByStatus, addTask, updateTask, removeTask
} from './actions'
import { Project } from './types'



const HomePage = async () => {

  const projectList: Project[] = await getProjects()

  return (
    <section>
      <div style={{ width: '90%', maxWidth: 'none', margin: 'auto', marginBottom: '10px' }}>
        <ButtonBar
          // addTask={addTask}
          // addProject={addProject}
          initialProjects={projectList}
          // filterTasksByNotStarted={filterTasksByNotStarted}
          // filterTasksByInProgress={filterTasksByInProgress}
          // filterTasksByCompleted={filterTasksByCompleted}
        />
      </div>
      <div style={{ width: '90%', maxWidth: 'none', margin: 'auto' }}>
        {/*<Body*/}
        {/*  tasks={taskList}*/}
        {/*  removeTask={removeTask}*/}
        {/*  updateTask={updateTask}*/}
        {/*/>*/}
      </div>
    </section>
  )
}

export default HomePage
