'use client'

import { FC, useState } from 'react'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { Task, formTaskSchema } from './types'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DialogAddTaskForm } from './dialogForm'

const ButtonBar: FC<{
  addTask: (tasks: Task) => void
  filterByNotStarted: () => void
  filterByInProgress: () => void
  filterByCompleted: () => void
}> = (props) => {

  const { addTask, filterByNotStarted, filterByInProgress, filterByCompleted } = props
  const [open, setOpen] = useState<boolean>(false)

  const openDialog = () => { setOpen(true) }

  const onSubmit = (values: z.infer<typeof formTaskSchema>) => {
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
    <div className={'flex gap-[10px]'}>
      <Button onClick={openDialog}>Add Task</Button>
      <Button onClick={filterByNotStarted}>Filter By Not Started</Button>
      <Button onClick={filterByInProgress}>Filter By In Progress</Button>
      <Button onClick={filterByCompleted}>Filter By Complete</Button>
      <DialogAddTaskForm open={open} setOpenAction={setOpen} onSubmitAction={onSubmit} />
      <div className={'ml-auto'}>
        <ProjectSelection />
      </div>
      <Button>Add Project</Button>
      <Button>Delete Project</Button>
    </div>
  )
}

export default ButtonBar

const ProjectSelection = () => {
  return(
    <Select>
      <SelectTrigger className={'w-[200px]'}>
        <SelectValue placeholder={'Select a Project'} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Project</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}