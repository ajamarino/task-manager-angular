import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.sass']
})
export class SidenavContentComponent {

  sidenavPages = [{desc: 'All Tasks', route: 'all-tasks', icon: 'home'}, {desc: 'Today', route: 'today', icon: 'today'}]
}
