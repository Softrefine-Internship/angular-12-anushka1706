import { Component } from '@angular/core';
import { PermissionDataService } from '../persmissions-data.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  buttons: { [key: string]: boolean } = {};

  constructor(private permissionService: PermissionDataService) { }

  ngOnInit(): void {
    this.permissionService.permissionState.subscribe(states => {
      for (const name in states) {
        if (name === "Reports") {
          states[name].forEach(ele => {
            this.buttons[ele.name] = ele.isGranted
          })
        }
      }
    })
    console.log(this.buttons)
  }
}
