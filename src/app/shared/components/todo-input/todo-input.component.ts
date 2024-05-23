import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IInput } from '../../interfaces/IInput';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.sass']
})
export class TodoInputComponent implements OnInit {

  @Input() input!: IInput;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.valueChange.emit(inputElement.value)
  }

}
