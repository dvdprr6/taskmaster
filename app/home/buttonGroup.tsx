'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const ButtonGroup = () => {
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
          <DialogFooter>
            <Button>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button>Filter By Not Started</Button>
      <Button>Filter by In Progress</Button>
      <Button>Filter By Complete</Button>
    </div>

  )
}

export default ButtonGroup