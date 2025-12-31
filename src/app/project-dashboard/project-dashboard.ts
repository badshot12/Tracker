import { Component,ChangeDetectorRef,inject,TemplateRef  } from '@angular/core';
import { Router,RouterModule,Route,ActivatedRoute } from '@angular/router';
import { ApiTest } from '../api-test';
import { CommonModule } from '@angular/common';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { switchMap } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import {ProjectDataInt,StatusUpdate} from '../App_interfaces'
import { MatDialogModule,MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-project-dashboard',
  standalone: true,
  imports: [  RouterModule,
  CommonModule,
  MatCardModule,
  MatButtonModule,
  MatListModule,
  FormsModule,
  MatDividerModule,
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
  MatInputModule,
  MatFormFieldModule,
  MatSnackBarModule,MatDialogModule,
  ClipboardModule,MatIcon,MatSelectModule],
  templateUrl: './project-dashboard.html',
  styleUrls: ['./project-dashboard.scss'],
  
})
export class ProjectDashboard {
rid!: number;
ProjectData: ProjectDataInt[]= []
constructor(private route: ActivatedRoute, 
    private router:Router,
    private clipboard: Clipboard,
    private snack: MatSnackBar
  ) { }

private readonly api = inject(ApiTest);
readonly dialog = inject(MatDialog);
valueToCopy: string = ""
Statusup: StatusUpdate[] = []
isDrawerOpen = false;
NewStatusUpdateVar: string = "Hello"
UnassignStatusVar: number = 2;
selectedRID:number|null = null
isDisabled = true;
//Dialog Variables
NewStatusdialogRef: any
SerialdialogRef: any
SerialeditdialogRef: any
VerifydialogRef: any
//Complete Project Variables
ToolDeliverd:number = 0
VerifyCheck:string|null = null//"vb"
SerialNumbersInput:string[] = []//["001","002","003"]
SerialNumberHolder: string | null = null;
//ToolDialog Variables
ProgramCode: number | null = null
ToolType:number | null = null

ngOnInit(): void {
  this.route.paramMap.pipe(
    // Step 1: get RID from route
    switchMap(params => {
      this.rid = Number(params.get('RID'));
      return this.api.get_invprojectinfo(this.rid);
    }),

    // Step 2: use result from first API call
    switchMap(projectData => {
      this.ProjectData = projectData;
      console.log("this is actually the first one what happens here",this.ProjectData[0].RID)
      return this.api.getstatusupdate_Inv(this.rid);
    })
  )
  .subscribe(statusData => {
    this.Statusup = statusData;
    console.log("did I get here")
    console.log("what about here",this.Statusup[0])
    console.log("what about the next one",this.Statusup[0].RID)
    console.log("All data loaded:", this.ProjectData[0], this.Statusup);
  });
}



toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

copyText(text: any) {
  this.clipboard.copy(text);
  this.snack.open('Copied!', 'OK', { duration: 1500 });
}

savecontent(){
  console.log(this.ProjectData)
  this.api.UpdateProject(this.ProjectData).subscribe(res => {
  });
  this.snack.open('Saved Project Info', 'OK', { duration: 1500 });
}
backtoprojectlist(){
  this.api.UpdateProject(this.ProjectData).subscribe(res => {
  });
  this.snack.open('Saved Project Info', 'OK', { duration: 1000 });
  this.router.navigate(['/TEDashboard', this.ProjectData[0].UID]);
}

toBacklogDesign(){
  console.log("to project list")
  this.router.navigate(['/BacklogDesign', this.ProjectData[0].UID]);
}

Unassign(){
  const concheck = window.confirm("Please confirm you would like to unassign project:  " + this.rid);
  if (concheck){

  this.api.Unassign(this.rid).subscribe(res =>{
  });
  this.UnAssignStatusUpdate()
  this.snack.open('Removed Project', 'OK', { duration: 1000 });
  this.router.navigate(['/TEDashboard', this.ProjectData[0].UID]);
  } else {
  }
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
      this.api.getstatusupdate_Inv(this.rid).subscribe({
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
UnAssignStatusUpdate() {
  const StatusInfo = {
    UID: this.ProjectData[0].UID,
    RID: this.rid,
    Status: this.UnassignStatusVar
  };

  // First: save the status
  this.api.SaveStatus(StatusInfo).subscribe({
    
  });
}
openSerialNumbers(template: TemplateRef<any>){

  this.SerialdialogRef = this.dialog.open(template, {
    width: '2000px'
  });
}
openToolNumberVerify(template: TemplateRef<any>){
  this.VerifydialogRef= this.dialog.open(template, {
    width: '2000px'
  });
}
ResetToolNumber(){
  this.VerifyCheck = null
  this.ProgramCode  = null
  this.ToolType = null
}
SerialNumberHandling(SerialFunction:number){
  if (SerialFunction === 1 && this.SerialNumberHolder !==null){
    this.SerialNumbersInput.push(this.SerialNumberHolder)
    this.SerialNumberHolder = null;
  }else{
    console.log("gotta figure this part out")
  }
}
openSerialEditNumbers(template: TemplateRef<any>){

  this.SerialeditdialogRef = this.dialog.open(template, {
    width: '2000px'
  });
}
CompleteProject(logic:number){
  if (logic === 1){
  this.ProjectData[0].Complete = 2; // sets database value to 2. 2 Is value for complete project
  this.api.UpdateProject(this.ProjectData).subscribe(res => {
  });
  this.snack.open('Project Complete Congrats!', 'OK', { duration: 1000 });
  this.router.navigate(['/TEDashboard', this.ProjectData[0].UID]);
}if (logic === 2) {
      const concheck = window.confirm("Would you like to abandon project number: " + this.ProjectData[0].RID + " Tool Number: " + this.ProjectData[0].ToolNumber);
      if (concheck){
        this.ProjectData[0].Complete = 3; // sets database value to 3. 3 Is value for aboandoned projects
        this.api.UpdateProject(this.ProjectData).subscribe(res => {
        this.snack.open('Project abandoned', 'OK', { duration: 2000 });
        this.router.navigate(['/TEDashboard', this.ProjectData[0].UID]);
      });
    }else{}
  
} else {
  
}
}
ToolNumberGenRoute(){
  this.router.navigate(['/ToolNumberGen', this.ProjectData[0].UID]);
}
ToolHistoryRoute(){
  this.router.navigate(['/ToolHistory']);
}

}
