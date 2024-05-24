import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.sass']
})
export class SidenavContentComponent {

  sidenavPages = [{desc: 'Todas tarefas', route: 'all-tasks', icon: 'home'}, {desc: 'Hoje', route: 'today', icon: 'today'}]
}
