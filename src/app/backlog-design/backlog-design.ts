import { Component,ChangeDetectorRef,inject,TemplateRef } from '@angular/core';
import { Router,RouterModule,Route,ActivatedRoute } from '@angular/router';
import { ApiTest } from '../api-test';
import { CommonModule } from '@angular/common';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ProgramInfoInt,ProjectDataInt,User} from '../App_interfaces'


@Component({
  selector: 'app-backlog-design',
  imports: [RouterModule,
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
  MatSnackBarModule, MatButtonToggleModule,
  ClipboardModule,MatIcon,MatOption,MatSelectModule, MatDialogModule],
  templateUrl: './backlog-design.html',
  styleUrl: './backlog-design.scss',
})


export class BacklogDesign {

private readonly api = inject(ApiTest);
constructor(private route: ActivatedRoute, 
    private router:Router,
    private clipboard: Clipboard,
    private snack: MatSnackBar,
    private cd: ChangeDetectorRef
  ) { }
readonly dialog = inject(MatDialog);
uid :number | null= null;
selecteduser :number | null = null;
ProgramInfo: ProgramInfoInt[] = []
BacklogProjectList: ProjectDataInt[]=[]
ProgramFilter: number | null = 0;
ReqEnumberFilter: number | null= null;
ReqNumFilter: number | null = null;
ReqTypeFilter: number | null = 0;
Names: User[] = [];
RID_Dia: number | null = null;  // in your component class
dialogRef: any; // in your component class
EditdialogRef: any; // in your component class
selectedProject: ProjectDataInt = {} as ProjectDataInt;
NewStatusUpdateVar:number|null = 1;

  ngOnInit(): void{
    
    this.route.paramMap.subscribe(params => {
      this.uid = Number(params.get('UID')); // convert to number if needed
    });

   
      this.api.getUserforRemove().subscribe((data: any[]) => {
        this.Names = data
        console.log(this.Names)
    })
  


    this.api.ProgramInfo().subscribe(data=>{
      this.ProgramInfo = data;
      console.log(this.ProgramInfo)
    })

    this.api.BacklogProjectList().subscribe(data1=>{
      console.log("backlog projects")
      this.BacklogProjectList = data1
      console.log(this.BacklogProjectList)
    })
    this.selecteduser = this.uid

  }
  
  refreshRender(){
    console.log(this.ReqEnumberFilter, this.ReqNumFilter)

    console.log("Did I try to refresh")
    this.cd.detectChanges();

  }
  openDialog(template: TemplateRef<any>, Project: any, uid: any,names:any){
    console.log("openDialog Function:",Project)
    this.RID_Dia = Project
    this.dialogRef = this.dialog.open(template,{
      width:'480px',
      
    });
  }
  AssignFun(RID: number|null){
    const ApiVar ={
      RID: this.RID_Dia,
      UID: this.selecteduser
    }
    
    console.log("Post API Assign", ApiVar)
    this.api.AssignUser(ApiVar).subscribe(res =>{
      console.log("sent User to API");
      this.dialogRef.close();
    })
    this.SaveStatusUpdate();
    this.snack.open('Project Added', 'OK', { duration: 1000 });
    this.router.navigate(['/TEDashboard', ApiVar.UID]);
  }

  openEditDialog(template: TemplateRef<any>, project: ProjectDataInt | null) {
    if (!project) return; // guard against null
    
    this.selectedProject = project
    console.log(this.selectedProject)
  this.EditdialogRef = this.dialog.open(template, {
    width: '2000px'
  });
  }
  SaveFun(){
    const ArrselectedProject = [this.selectedProject]
    this.api.UpdateProject(ArrselectedProject).subscribe(res => {
    });
    this.snack.open('Saved Project Info', 'OK', { duration: 1500 });
    this.EditdialogRef.close();
}
deleteFun(rid:number){
  const concheck = window.confirm("Confim Deletion of " + rid);
  if (concheck){

  this.api.DeleteProject(rid).subscribe(res =>{
  });
  } else {
  }
}
toggleDesignItem(isChecked: boolean) {
  // Map toggle to 1 or 2
  this.selectedProject.Designitem = isChecked ? 2 : 1;
  console.log('Designitem value:', this.selectedProject.Designitem);
}
SaveStatusUpdate() {
  const StatusInfo = {
    RID: this.RID_Dia,
    Status: this.NewStatusUpdateVar
  };

  // First: save the status
  this.api.SaveStatus(StatusInfo).subscribe({
    
  });
}

}
  
  


