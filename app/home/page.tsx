'use server'

import { getProjectsWithTasks } from './actions'
import { ProjectWithTasks } from './types'
import MainPage from './main'

const HomePage = async () => {

  const projectWithTasks: ProjectWithTasks[] = await getProjectsWithTasks()

  return <MainPage projectsWithTasks={projectWithTasks} />
}

export default HomePage
