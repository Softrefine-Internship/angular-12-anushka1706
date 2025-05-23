import { Component, OnInit } from '@angular/core';
import { PermissionDataService } from '../persmissions-data.service';

interface PermissionNode {
  name: string;
  value: boolean;
  isDisable?: boolean;
  expanded?: boolean;
  isGranted?: boolean,
  originalIsDisable?: boolean,
  permissions?: PermissionNode[];
}

@Component({
  selector: 'app-permission',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})

export class PermissionComponent implements OnInit {
  dataSource: PermissionNode[] = [];
  permissionStates: { [key: string]: any[] } = {};
  showButton !: boolean

  constructor(private permissionService: PermissionDataService) { }

  ngOnInit(): void {
    this.permissionService.permissionData.subscribe(data => {
      this.dataSource = data
    })
    this.createPermissionState()
    this.permissionService.toggleState.subscribe(state => {
      this.showButton = state
    })
  }

  createPermissionState() {
    for (let i = 0; i < this.dataSource.length; i++) {
      const data = this.dataSource[i]
      this.permissionStates[data.name] = []
      this.permissionStates[data.name].push({
        name: data.name,
        value: data.value,
        isGranted: data.value
      })
      if (data.permissions) {
        this.traverseChild(data.permissions, data.name);
      }
    }
    this.permissionService.permissionState.next(this.permissionStates)
  }

  traverseChild(nodes: PermissionNode[], stateName: string) {
    nodes.forEach(node => {
      this.permissionStates[stateName].push({
        name: node.name,
        value: node.value,
        isGranted: node.value
      });
      if (node.permissions) {
        this.traverseChild(node.permissions, stateName);
      }
    });
  }

  togglePermission(node: PermissionNode, topParent: PermissionNode, checked: boolean) {
    node.value = checked
    this.permissionStates[topParent.name].forEach(ele => {
      if (ele.name === node.name) {
        ele.value = checked
        ele.isGranted = checked
      }
    })
    if ((node === topParent && node.permissions?.length) || node.permissions) {
      if (node === topParent) {
        this.toggleParent(checked, topParent.name)
      }
      let nestedChild !: any[]
      if (node.permissions) {
        nestedChild = node.permissions
      }
      this.permissionStates[topParent.name].forEach(ele => {
        if (ele.name === topParent.name) {
          ele.value = checked
          ele.isGranted = checked
        }
      })
      this.traverseToggle(node.permissions, checked, topParent, nestedChild);
    }
    this.permissionService.permissionState.next(this.permissionStates)
  }

  private traverseToggle(
    children: PermissionNode[],
    checked: boolean,
    parent: PermissionNode,
    nestedChild: any[] | undefined
  ): void {
    children.forEach(child => {
      if (checked === false) {
        child.isDisable = true
        this.permissionStates[parent.name].forEach(ele => {
          if (ele.name === child.name) {
            ele.value = child.value;
            ele.isGranted = checked;
          }
        });
      }
      if (checked) {
        child.isDisable = child.originalIsDisable
        this.permissionStates[parent.name].forEach(ele => {
          if (ele.name === child.name) {
            ele.value = child.value;
            ele.isGranted = child.value;
          }
        });
      }

      if (child.permissions?.length) {
        this.traverseToggle(child.permissions, checked, parent, nestedChild);
      }
    });
  }
  toggleParent(checked: boolean, parent: string) {
    let items: any[] = []
    this.permissionService.sidebarItems.subscribe(data => {
      items = data
    })
    items.forEach(e => {
      if (e.name === parent) {
        e.isGranted = checked
      }
    })
    this.permissionService.sidebarItems.next(items)
  }
  onSetDefault() {
    this.dataSource = this.permissionService.createClone()
    this.createPermissionState()
    this.dataSource.forEach(e => {
      this.toggleParent(e.value, e.name)
    })
    this.permissionService.permissionData.next(this.dataSource)
  }
  onSelectAll(checked: boolean) {
    this.permissionService.toggleState.next(!this.showButton);
    for (let i = 0; i < this.dataSource.length; i++) {
      if (!this.dataSource[i].isDisable) {
        this.dataSource[i].value = checked
        if (this.dataSource[i].permissions) {
          this.changeChildrenState(this.dataSource[i].permissions ?? [], checked);
        }

        this.toggleParent(true, this.dataSource[i].name)
        this.permissionStates[this.dataSource[i].name].forEach(e => {
          if (!e.isDisable) {
            e.isGranted = checked
          }
        })
      }
    }
    this.permissionService.permissionData.next(this.dataSource)
    this.permissionService.permissionState.next(this.permissionStates)
  }
  changeChildrenState(child: PermissionNode[], checked: boolean) {
    child.forEach(element => {
      if (!element.isDisable) {
        element.value = checked
      }
      if (element.permissions) {
        this.changeChildrenState(element.permissions, checked)
      }
    });
  }
  onDeselectAll(checked: boolean) {
    this.permissionService.toggleState.next(!this.showButton);
    for (let i = 0; i < this.dataSource.length; i++) {
      if (!this.dataSource[i].originalIsDisable) {
        this.dataSource[i].value = checked
        if (this.dataSource[i].permissions) {
          this.changeChildrenState(this.dataSource[i].permissions ?? [], checked);
        }
        this.toggleParent(false, this.dataSource[i].name)
        this.permissionStates[this.dataSource[i].name].forEach(e => {
          if (!e.isDisable) {
            e.isGranted = checked
          }
        })
      }
    }
    this.permissionService.permissionData.next(this.dataSource)
    this.permissionService.permissionState.next(this.permissionStates)
  }
}
