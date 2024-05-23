import { Priority } from "../enums/Priority";

export interface ITask{
  id: Number,
  description: string,
  limitDate:string,
  priority: Priority,
  label:string,
  isActive:boolean
}
