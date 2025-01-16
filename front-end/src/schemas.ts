import { z } from "zod";

export const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required").default(""),
  description: z.string().min(1, "Description is required").default(""),
  status: z.string().min(1, "Status is required").default(""),
});

export const taskSchema = taskFormSchema.merge(
  z.object({
    taskId: z.number(),
  })
);

export const columnFormSchema = z.object({
  name: z.string().min(1, "Name is required").default(""),
});

export const columnSchema = columnFormSchema.merge(
  z.object({
    columnId: z.string(),
    tasks: z.array(taskSchema),
  })
);
