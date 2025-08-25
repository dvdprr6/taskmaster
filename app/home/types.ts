import { z } from 'zod'

export type Task = {
  id: string,
  status: 'NOT STARTED' | 'IN PROGRESS' | 'COMPLETED',
  title: string,
  description: string
}

export const formSchema = z.object({
  id: z.string(),
  status: z.enum(['NOT STARTED', 'IN PROGRESS', 'COMPLETED']),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
})