import { Component, OnInit } from '@angular/core';
import { PermissionDataService } from './persmissions-data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  sidebarItems: any[] = [];
  rawData !: any[]

  constructor(private permissionService: PermissionDataService) { }

  ngOnInit() {
    this.permissionService.sidebarItems.subscribe(data => {
      this.sidebarItems = data
    })
  }
}