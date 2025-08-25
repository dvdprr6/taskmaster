'use client'

import { FC, useState } from 'react'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { Task, formSchema } from './types'
import DialogForm from './dialogForm'

const ButtonGroup: FC<{
  addTask: (tasks: Task) => void
  filterByNotStarted: () => void
  filterByInProgress: () => void
  filterByCompleted: () => void
}> = (props) => {

  const { addTask, filterByNotStarted, filterByInProgress, filterByCompleted } = props
  const [open, setOpen] = useState<boolean>(false)

  const openDialog = () => { setOpen(true) }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const task: Task = {
      id: values.id,
      status: values.status,
      title: values.title,
      description: values.description
    }
    addTask(task)
    setOpen(false)
  }

  return (
    <div style={{ display: 'flex', gap: '10px'}}>
      <Button onClick={openDialog}>Add Task</Button>
      <Button onClick={filterByNotStarted}>Filter By Not Started</Button>
      <Button onClick={filterByInProgress}>Filter By In Progress</Button>
      <Button onClick={filterByCompleted}>Filter By Complete</Button>
      <DialogForm open={open} setOpen={setOpen} onSubmit={onSubmit} />
    </div>
  )
}

export default ButtonGroup