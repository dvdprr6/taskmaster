'use client'

import { FC } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Task } from './types'
import { Textarea } from '@/components/ui/textarea'



const formSchema = z.object({
  title: z.string(),
  description: z.string()
})

const ButtonGroup: FC<{
  addTask: (tasks: Task) => void
  filterByNotStarted: () => void
  filterByInProgress: () => void
  filterByCompleted: () => void
}> = (props) => {
  const { addTask, filterByNotStarted, filterByInProgress, filterByCompleted } = props


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: ''
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values.title)
    console.log(values.description)
  }

  return (
    <div style={{ display: 'flex', gap: '10px'}}>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Task</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <div>
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
            </form>
          </Form>
          <DialogFooter>
            <Button>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button onClick={filterByNotStarted}>Filter By Not Started</Button>
      <Button onClick={filterByInProgress}>Filter by In Progress</Button>
      <Button onClick={filterByCompleted}>Filter By Complete</Button>
    </div>

  )
}

export default ButtonGroup