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
import { formSchema } from './types'
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

const DialogForm: FC<{
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  onSubmit: (values: z.infer<typeof formSchema>) => void
  initialValues?: Partial<z.infer<typeof formSchema>>
}> = (props) => {
  const { open, setOpen, onSubmit, initialValues } = props
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: uuidv4(),
      status: 'NOT STARTED',
      title: '',
      description: '',
      ...initialValues
    },
  })

  useEffect(() => {
    if(open){
      form.reset({
        id: initialValues?.id || uuidv4(),
        status: initialValues?.status || 'NOT STARTED',
        title: initialValues?.title || '',
        description: initialValues?.description || ''
      })
    }
  }, [open, form])

  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
            {initialValues ?
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
              </div> : <div></div>
            }
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

export default DialogForm