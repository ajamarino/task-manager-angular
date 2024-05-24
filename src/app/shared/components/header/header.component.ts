import { Component, Input } from '@angular/core';
import { IHeader } from '../../interfaces/IHeader';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  @Input() header!:IHeader;
}
