'use client'

import { useState } from 'react'
import ButtonGroup from './buttonGroup'
import Body from './body'
import { Task } from './types'


const HomePage = () => {
  const [taskList, setTaskList] = useState<Task[]>([])

  const addTask = (task: Task) => {
    const copyOfTaskList = [...taskList]

    const addedTask = [...copyOfTaskList, task]

    setTaskList(addedTask)
  }

  const filterByNotStarted = () => {

    const filterByNotStarted = taskList.filter(task => task.status === 'NOT_STARTED')

    setTaskList(filterByNotStarted)
  }

  const filterByInProgress = () => {

    const filterByNotStarted = taskList.filter(task => task.status === 'IN_PROGRESS')

    setTaskList(filterByNotStarted)
  }

  const filterByCompleted = () => {

    const filterByNotStarted = taskList.filter(task => task.status === 'COMPLETED')

    setTaskList(filterByNotStarted)
  }

  return (
    <section>
      <div style={{ width: '90%', maxWidth: 'none', margin: 'auto', marginBottom: '10px' }}>
        <ButtonGroup
          addTask={addTask}
          filterByNotStarted={filterByNotStarted}
          filterByInProgress={filterByInProgress}
          filterByCompleted={filterByCompleted}
        />
      </div>
      <div style={{ width: '90%', maxWidth: 'none', margin: 'auto' }}>
        <Body />
      </div>
    </section>
  )
}

export default HomePage
