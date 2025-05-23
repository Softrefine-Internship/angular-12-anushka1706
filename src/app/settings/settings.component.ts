import { Component } from '@angular/core';
import { PermissionDataService } from '../persmissions-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  buttons: { [key: string]: boolean } = {};

  constructor(private permissionService: PermissionDataService) { }

  ngOnInit(): void {
    this.permissionService.permissionState.subscribe(states => {
      for (const name in states) {
        if (name === "Settings") {
          states[name].forEach(ele => {
            this.buttons[ele.name] = ele.isGranted
          })
        }
      }
    })
    console.log(this.buttons)
  }
}
