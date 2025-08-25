'use client'

import { FC, useState } from 'react'
import { formSchema, Task } from './types'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import DialogForm from './dialogForm'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const Body: FC<{
  tasks: Task[],
  removeTask: (id: string) => void
  updateTask: (task: Task) => void
}> = (props) => {
  const { tasks, removeTask, updateTask } = props
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [deleteTaskId, setDeleteTaskId] = useState<string>('')
  const [taskItem, setTaskItem] = useState<Task>({ id: uuidv4(), status: 'NOT STARTED', title: '', description: ''})

  const onOpenEdit = (taskItem: Task) => {
    setTaskItem(taskItem)
    setOpenEdit(true)
  }

  const onEdit = (values: z.infer<typeof formSchema>) => {
    const task: Task = {
      id: values.id,
      status: values.status,
      title: values.title,
      description: values.description
    }
    updateTask(task)
    setOpenEdit(false)
  }

  const openDeleteDialog = (id: string) => {
    setDeleteTaskId(id)
    setOpenDelete(true)
  }

  const confirmDeleteTask = () => {
    removeTask(deleteTaskId)
    setOpenDelete(false)
  }

  return (
    <div>
      <div className={'grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(18rem,1fr))]'}>
        {tasks.map(item => (
          <Card key={item.id} className={'w-full max-w-sm'}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              {item.status === 'NOT STARTED' ?
                <CardDescription className={'text-red-500'}>{item.status}</CardDescription>
                : item.status === 'IN PROGRESS' ?
                  <CardDescription className={'text-yellow-500'}>{item.status}</CardDescription>
                  : <CardDescription className={'text-green-500'}>{item.status}</CardDescription>
              }
            </CardHeader>
            <CardContent>
              <ScrollArea className='rounded-base h-[200px] text-main-foreground border-2 border-border p-4 shadow-shadow'>
                {item.description}
              </ScrollArea>
            </CardContent>
            <CardFooter className={'flex-col gap-2'}>
              <Button className={'w-full'} onClick={() => onOpenEdit(item)}>Open</Button>
              <Button className={'w-full'} onClick={() => openDeleteDialog(item.id)}>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <DialogForm
        open={openEdit}
        setOpen={setOpenEdit}
        initialValues={taskItem}
        onSubmit={onEdit}
      />
      <DialogRemoveForm
        open={openDelete}
        setOpen={setOpenDelete}
        confirmDeleteTask={confirmDeleteTask}
      />
    </div>
  )
}

const DialogRemoveForm: FC<{
  open: boolean,
  setOpen: (open: boolean) => void,
  confirmDeleteTask: () => void
}> = (props) => {
  const { open, setOpen, confirmDeleteTask } = props

  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are sure you want to remove this task?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button onClick={() => confirmDeleteTask()}>Yes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Body