import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todo-password',
  templateUrl: './todo-password.component.html',
  styleUrls: ['./todo-password.component.sass']
})
export class TodoPasswordComponent {
  hide = true;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();


  onInputChange(event: Event){
    const inputElement = event.target as HTMLInputElement;
    this.valueChange.emit(inputElement.value)
  }
}
