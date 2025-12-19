import { Component,ChangeDetectorRef,inject, NgModule,TemplateRef  } from '@angular/core';
import { ActivatedRoute, RouterModule,Router } from '@angular/router';
import { ApiTest } from '../api-test';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { ProjectDataInt, StatusUpdate } from '../App_interfaces';
import { MatDialogModule,MatDialog} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';




@Component({
  selector: 'app-tedashboard',
  imports: [MatIcon,MatCardModule,MatButtonModule,MatDialogModule,MatInputModule,MatFormFieldModule,MatListModule,FormsModule, MatDividerModule,CommonModule,MatAccordion,MatExpansionPanel,MatExpansionPanelHeader,MatExpansionPanelTitle,RouterModule],
  templateUrl: './tedashboard.html',
  styleUrl: './tedashboard.scss',
})
export class TEDashboard {
uid!: number; // or string if your UID is string
constructor(private route: ActivatedRoute,private router:Router) { }

private readonly api = inject(ApiTest);
readonly dialog = inject(MatDialog);
UserName: any;
picurl = "src/assets/ToolingLogo.png";
projects: ProjectDataInt[] = [];
Statusup: StatusUpdate[] = []
NewStatusdialogRef: any
NewStatusUpdateVar: string = "Hello"
selectedRID:number = 1




ngOnInit(): void{
this.route.paramMap.subscribe(params => {
      this.uid = Number(params.get('UID')); // convert to number if needed
});

this.api.getUserDashboardData(this.uid).subscribe(data => {
  console.log(data)
  this.UserName = data;
});
this.api.getProjectInfo(this.uid).subscribe(data=>{
  console.log(data)
  this.projects = data as ProjectDataInt[];
  this.GetFewStatusUpdates()
  //console.log(this.projects)
});

}
RoutetoProjectDashboard(stat: ProjectDataInt){
    console.log("did I get here")
    console.log(stat)
    this.router.navigate(['/ProjectDashboard/', stat.RID]);
  }
toBacklogDesign(){
  console.log("to project list")
  this.router.navigate(['/BacklogDesign', this.projects[0].UID]);
}
GetFewStatusUpdates(){
  if (!this.projects || this.projects.length === 0) {
    return;
  }

  let AllRID: number[] = []
  AllRID = this.projects.map(project => project.RID ?? 0) 
  this.api.getstatusupdate(AllRID).subscribe(data=>{
    this.Statusup = data

  });
}
openNewStatusUpdate(template: TemplateRef<any>,rid:number){
  console.log("rid ",rid)
  this.selectedRID = rid;
  console.log("selectedPID", this.selectedRID)
  this.NewStatusdialogRef = this.dialog.open(template, {
    width: '2000px'
  });
}
SaveStatusUpdate() {
  const StatusInfo = {
    RID: this.selectedRID,
    Status: this.NewStatusUpdateVar
  };

  // First: save the status
  this.api.SaveStatus(StatusInfo).subscribe({
    next: (res) => {
      // After saving, refresh status list
      this.api.getstatusupdate_Inv(this.selectedRID).subscribe({
        next: (updatedList) => {
          this.Statusup = updatedList;  // update local array if needed

          // Close dialog AFTER refresh completes
          this.NewStatusdialogRef.close(true);
        },
        error: (err) => {
          console.error("Refresh failed:", err);
          this.NewStatusdialogRef.close(false);
        }
      });
    },
    error: (err) => {
      console.error("Save failed:", err);
    }
  });
}

ToolNumberGenRoute(){
  this.router.navigate(['/ToolNumberGen', this.uid]);
}
DrawingReviewRoute(){
  this.router.navigate(['/DrawingReview',this.uid])
}


}

