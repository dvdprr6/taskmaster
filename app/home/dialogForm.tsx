'use client'

import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Project, formTaskSchema, formProjectSchema } from './types'
import { v4 as uuidv4 } from 'uuid'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'



export const DialogAddProjectForm: FC<{
  open: boolean,
  projects: Project[],
  setOpenAction: Dispatch<SetStateAction<boolean>>,
  onSubmitAction: (values: z.infer<typeof formProjectSchema>) => void
}> = (props) => {
  const { open, projects, setOpenAction, onSubmitAction } = props
  const form = useForm<z.infer<typeof formProjectSchema>>({
    resolver: zodResolver(formProjectSchema.refine(
      (data) => {
        return !projects.some(project =>
          project.title.toLowerCase() === data.title.toLowerCase() &&
          project.id !== data.id
        )
      },
      {
        message: 'A project with this title already exists',
        path: ['title'],
      }
    )),
    defaultValues: {
      id: uuidv4(),
      title: '',
      description: ''
    },
  })

  useEffect(() => {
    if(open){
      form.reset({
        id: uuidv4(),
        title: '',
        description: ''
      })
    }
  }, [open, form])

  return(
    <Dialog open={open} onOpenChange={setOpenAction}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitAction)}>
            <DialogHeader>
              <DialogTitle>Add Project</DialogTitle>
            </DialogHeader>
            <div style={{ marginBottom: '10px'}}>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Title' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div style={{ marginBottom: '10px'}}>
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Describe your task' {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type='submit'>Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export const DialogEditProjectForm: FC<{
  open: boolean,
  setOpenAction: Dispatch<SetStateAction<boolean>>,
  onSubmitAction: (values: z.infer<typeof formProjectSchema>) => void,
  initialValues: Partial<z.infer<typeof formTaskSchema>>
}> = (props) => {
  const { open, setOpenAction, onSubmitAction, initialValues } = props
  const form = useForm<z.infer<typeof formProjectSchema>>({
    resolver: zodResolver(formProjectSchema),
    defaultValues: {
      ...initialValues
    },
  })

  useEffect(() => {
    if(open){
      form.reset({
        id: initialValues.id,
        title: initialValues.title,
        description: initialValues.description
      })
    }
  }, [open, form])

  return(
    <Dialog open={open} onOpenChange={setOpenAction}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitAction)}>
            <DialogHeader>
              <DialogTitle>Add Project</DialogTitle>
            </DialogHeader>
            <div style={{ marginBottom: '10px'}}>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Title' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div style={{ marginBottom: '10px'}}>
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Describe your task' {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type='submit'>Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


export const DialogAddTaskForm: FC<{
  open: boolean,
  setOpenAction: Dispatch<SetStateAction<boolean>>,
  onSubmitAction: (values: z.infer<typeof formTaskSchema>) => void
}> = (props) => {
  const { open, setOpenAction, onSubmitAction } = props
  const form = useForm<z.infer<typeof formTaskSchema>>({
    resolver: zodResolver(formTaskSchema),
    defaultValues: {
      id: uuidv4(),
      status: 'NOT STARTED',
      title: '',
      description: ''
    },
  })

  useEffect(() => {
    if(open){
      form.reset({
        id: uuidv4(),
        status: 'NOT STARTED',
        title: '',
        description: ''
      })
    }
  }, [open, form])

  return(
    <Dialog open={open} onOpenChange={setOpenAction}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitAction)}>
            <DialogHeader>
              <DialogTitle>Add Task</DialogTitle>
            </DialogHeader>
            <div style={{ marginBottom: '10px'}}>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Title' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div style={{ marginBottom: '10px'}}>
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Describe your task' {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type='submit'>Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export const DialogEditTaskForm: FC<{
  open: boolean,
  setOpenAction: Dispatch<SetStateAction<boolean>>,
  onSubmitAction: (values: z.infer<typeof formTaskSchema>) => void
  initialValues: Partial<z.infer<typeof formTaskSchema>>
}> = (props) => {
  const { open, setOpenAction, onSubmitAction, initialValues } = props
  const form = useForm<z.infer<typeof formTaskSchema>>({
    resolver: zodResolver(formTaskSchema),
    defaultValues: {
      ...initialValues
    },
  })

  useEffect(() => {
    if(open){
      form.reset({
        id: initialValues.id,
        status: initialValues.status,
        title: initialValues.title,
        description: initialValues.description
      })
    }
  }, [open, form])

  return(
    <Dialog open={open} onOpenChange={setOpenAction}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitAction)}>
            <DialogHeader>
              <DialogTitle>Add Task</DialogTitle>
            </DialogHeader>
            <div style={{ marginBottom: '10px'}}>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Title' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <FormField
                control={form.control}
                name={'status'}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value='NOT STARTED'>NOT STARTED</SelectItem>
                        <SelectItem value='IN PROGRESS'>IN PROGRESS</SelectItem>
                        <SelectItem value='COMPLETED'>COMPLETED</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div style={{ marginBottom: '10px'}}>
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Describe your task' {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type='submit'>Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export const DialogRemoveTaskForm: FC<{
  open: boolean,
  setOpenAction: (open: boolean) => void,
  confirmDeleteTaskAction: () => void
}> = (props) => {
  const { open, setOpenAction, confirmDeleteTaskAction } = props

  return(
    <Dialog open={open} onOpenChange={setOpenAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are sure you want to remove this task?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpenAction(false)}>No</Button>
          <Button onClick={() => confirmDeleteTaskAction()}>Yes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
