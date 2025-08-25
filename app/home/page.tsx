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

  const updateTask = (task: Task) => {
    const copyOfTaskList = [...taskList]
    const filteredTaskList = copyOfTaskList.filter(item => item.id !== task.id)
    const updatedTaskList = [...filteredTaskList, task]

    setTaskList(updatedTaskList)
  }

  const removeTask = (id: string) => {
    const copyOfTaskList = [...taskList]
    const filteredTaskList = copyOfTaskList.filter(task => task.id !== id)

    setTaskList(filteredTaskList)
  }

  const filterByNotStarted = () => {
    const filterByNotStarted = taskList.filter(task => task.status === 'NOT STARTED')

    setTaskList(filterByNotStarted)
  }

  const filterByInProgress = () => {
    const filterByNotStarted = taskList.filter(task => task.status === 'IN PROGRESS')

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
        <Body
          tasks={taskList}
          removeTask={removeTask}
          updateTask={updateTask}
        />
      </div>
    </section>
  )
}

export default HomePage
