import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PermissionNode {
    name: string;
    value: boolean;
    isDisable?: boolean;
    expanded?: boolean;
    isGranted?: boolean;
    originalIsDisable?: boolean,
    permissions?: PermissionNode[];
}

@Injectable({ providedIn: 'root' })
export class PermissionDataService {
    data =
        [
            {
                "name": "Job",
                "value": true,
                "isDisable": false,
                "permissions": [
                    {
                        "name": "Add Job",
                        "value": true,
                        "isDisable": false
                    },
                    {
                        "name": "View Job",
                        "value": true,
                        "isDisable": false,
                        "permissions": [
                            {
                                "name": "View Job Details",
                                "value": false,
                                "isDisable": false
                            },
                            {

                                "name": "View Applicants",
                                "value": true,
                                "isDisable": true
                            }
                        ]
                    },
                    {
                        "name": "Edit Job",
                        "value": false,
                        "isDisable": false
                    }
                ]
            },
            {
                "name": "Candidate",
                "value": true,
                "isDisable": false,
                "permissions": [
                    {
                        "name": "Add Candidate",
                        "value": false,
                        "isDisable": false
                    },
                    {
                        "name": "View Candidate",
                        "value": true,
                        "isDisable": false,
                        "permissions": [
                            {
                                "name": "View Candidate Profile",
                                "value": true,
                                "isDisable": true
                            },
                            {
                                "name": "View Candidate History",
                                "value": false,
                                "isDisable": false
                            }
                        ]
                    },
                    {
                        "name": "Edit Candidate",
                        "value": true,
                        "isDisable": false
                    }
                ]
            },
            {

                "name": "Settings",
                "value": true,
                "isDisable": true,
                "permissions": [
                    {
                        "name": "Manage Settings",
                        "value": false,
                        "isDisable": true
                    },
                    {
                        "name": "View Logs",
                        "value": true,
                        "isDisable": false
                    }
                ]
            },
            {
                "name": "Reports",
                "value": false,
                "isDisable": false,
                "permissions": [
                    {
                        "name": "Generate Reports",
                        "value": true,
                        "isDisable": false
                    },
                    {
                        "name": "Export Reports",
                        "value": false,
                        "isDisable": false
                    }
                ]
            },
            {
                "name": "Hire",
                "value": false,
                "isDisable": false,
                "permissions": [
                    {
                        "name": "Create Job Opening",
                        "value": true,
                        "isDisable": false
                    },
                    {
                        "name": "Review Applications",
                        "value": false,
                        "isDisable": true
                    }

                ]
            },
            {
                "name": "Department",
                "value": true,
                "isDisable": true,
                "permissions": [
                    {
                        "name": "View Departments",
                        "value": true,
                        "isDisable": false
                    },
                    {
                        "name": "Manage Departments",
                        "value": false,
                        "isDisable": true
                    }
                ]
            }
        ]
    sidebarItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    permissionState: BehaviorSubject<{ [key: string]: any[] }> =
        new BehaviorSubject<{ [key: string]: any[] }>({});
    toggleState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
    constructor() {
        this.injectOriginalIsDisable(this.data);
        this.permissionData.next(this.createClone())
        this.getSideBarItems()
    }
    private injectOriginalIsDisable(nodes: PermissionNode[]) {
        nodes.forEach(node => {
            node.originalIsDisable = node.isDisable ?? false;
            if (node.permissions?.length) {
                this.injectOriginalIsDisable(node.permissions);
            }
        });
    }
    permissionData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    getData(): any[] {
        return this.permissionData.getValue();
    }
    getSideBarItems() {
        const iconMap: { [key: string]: string } = {
            'Job': 'work',
            'Candidate': 'person',
            'Settings': 'settings',
            'Reports': 'bar_chart',
            'Hire': 'how_to_reg',
            'Department': 'business'
        };

        const data = this.data
            .filter(item => item)
            .map(item => ({
                name: item.name,
                route: `/${item.name.toLowerCase()}`,
                icon: iconMap[item.name] || 'folder',
                isGranted: item.value
            }));
        this.sidebarItems.next(data)
    }
    setData(updatedData: any[]) {
        this.permissionData.next(updatedData);
    }

    createClone() {
        return JSON.parse(JSON.stringify(this.data))
    }
}