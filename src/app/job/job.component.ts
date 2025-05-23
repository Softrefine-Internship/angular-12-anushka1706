import { Component, OnInit } from '@angular/core';
import { PermissionDataService } from '../persmissions-data.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})

export class JobComponent implements OnInit {
  buttons: { [key: string]: boolean } = {};

  constructor(private permissionService: PermissionDataService) { }

  ngOnInit(): void {
    this.permissionService.permissionState.subscribe(states => {
      for (const name in states) {
        if (name === "Job") {
          states[name].forEach(ele => {
            this.buttons[ele.name] = ele.isGranted
          })
        }
      }
    })
  }
}
