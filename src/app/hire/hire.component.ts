import { Component } from '@angular/core';
import { PermissionDataService } from '../persmissions-data.service';
@Component({
  selector: 'app-hire',
  templateUrl: './hire.component.html',
  styleUrls: ['./hire.component.scss']
})
export class HireComponent {
  buttons: { [key: string]: boolean } = {};

  constructor(private permissionService: PermissionDataService) { }

  ngOnInit(): void {
    this.permissionService.permissionState.subscribe(states => {
      for (const name in states) {
        if (name === "Hire") {
          states[name].forEach(ele => {
            this.buttons[ele.name] = ele.isGranted
          })
        }
      }
    })
    console.log(this.buttons)
  }
}
