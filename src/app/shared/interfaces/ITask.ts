import { Label } from "../enums/Label.enum";
import { Priority } from "../enums/Priority.enum";

export interface ITask{
  id: string,
  description: string,
  limitDate:string,
  priority: Priority,
  label:Label,
  isActive:boolean
}
