import { Component } from '@angular/core';
import { PermissionDataService } from '../persmissions-data.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent {
  buttons: { [key: string]: boolean } = {};

  constructor(private permissionService: PermissionDataService) { }

  ngOnInit(): void {
    this.permissionService.permissionState.subscribe(states => {
      for (const name in states) {
        if (name === "Candidate") {
          states[name].forEach(ele => {
            this.buttons[ele.name] = ele.isGranted
          })
        }
      }
    })
    console.log(this.buttons)
  }
}
