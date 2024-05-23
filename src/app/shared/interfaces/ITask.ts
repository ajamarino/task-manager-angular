import { Priority } from "../enums/priority";

export interface ITask{
  id: Number,
  description: string,
  limitDate:string,
  priority: Priority,
  label:string
}
