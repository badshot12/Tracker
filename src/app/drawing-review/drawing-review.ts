import { Component,ChangeDetectorRef,inject, NgModule,TemplateRef} from '@angular/core';
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
import { DrawingReviewINT,User } from '../App_interfaces';
import { MatDialogModule,MatDialog} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatOption } from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient } from "@angular/common/http";
import { throwError } from "rxjs";
@Component({
  selector: 'app-drawing-review',
  providers: [provideNativeDateAdapter()],
  imports: [MatSnackBarModule,MatDatepickerModule,MatIcon,MatOption,MatSelectModule ,MatCardModule,MatButtonModule,MatDialogModule,MatInputModule,MatFormFieldModule,MatListModule,FormsModule, MatDividerModule,CommonModule,MatAccordion,MatExpansionPanel,MatExpansionPanelHeader,MatExpansionPanelTitle,RouterModule],
  templateUrl: './drawing-review.html',
  styleUrl: './drawing-review.scss',
})
export class DrawingReview {
uid!: number; // or string if your UID is string
UserName:any = "" 
Names: User[] = []
DR: DrawingReviewINT[] = []
new_DR: DrawingReviewINT = {
  DID: null,
  FromUID: null,
  ToUID: null,
  ToolNumber: null,
  ToolDesc: null,
  FirstItem: null,
  Complete: null,
  Checked: null,
  DateSub: null,
  DateNeed: null,
  FileName: null,
  Revs: null,
  FromName: null,
  ToName: null,
  RedFileName: null,
};

constructor(private route: ActivatedRoute,private router:Router,private snack: MatSnackBar,private http: HttpClient) { }
private readonly api = inject(ApiTest);
readonly dialog = inject(MatDialog);

//Dialog Vars
// selecteduser:number = 0
// DesignerUser: number = this.uid
NewReviewDialogRef: any;
NewDID: number = 0;
countOut = 0;
countIn = 0;

//fileupload
  status: "initial" | "uploading" | "success" | "fail" = "initial"; // Variable to store file status
  file: File | null = null; // Variable to store file

ngOnInit(): void{
this.OnStart()

}
OnStart(){
this.route.paramMap.subscribe(params => {
      this.uid = Number(params.get('UID')); // convert to number if needed
});
this.api.getUserDashboardData(this.uid).subscribe(data => {
  console.log(data)
  this.UserName = data;
});
this.api.getDrawingReviewInfo(this.uid).subscribe(data =>{
  this.DR = data;
  console.log(this.DR)
  this.countOut = this.DR.filter(item => item.FromUID === this.uid && item.FirstItem === 1 ).length
  this.countIn = this.DR.filter(item => item.ToUID === this.uid && item.FirstItem === 1).length
})


this.getUserforRemoves();
this.new_DR.FromUID = this.uid


}



  getUserforRemoves(){
      this.api.getUserforRemove().subscribe((data: any[]) => {
        this.Names = data
        //console.log(this.Names)
    })
  }
  Warnlogic(DateSub: Date | null, DateNeed: Date | null):boolean{
    
  if (!DateSub || !DateNeed) return false;

  const d1 = new Date().getTime(); // gives date in miliseconds
  const d2 = new Date(DateNeed).getTime(); // gives date in miliseconds

  return (d1 - d2) <= 24 * 60 * 60 * 1000; // the last part multiplication is converting from miliseconds to days
  }

openNewDrawRev(template:TemplateRef<any>,DID:number,ToUID:number){
  this.NewReviewDialogRef = this.dialog.open(template,{
    width: '1000px',
    maxWidth: '95vw',
    
  });
  this.NewDID = DID
  if (ToUID !== 0 ){
    this.new_DR.ToUID = ToUID
  }
}
NewDrawRev_Logic(){
  if (this.NewDID === 0 ){
    //setting logic variables
    this.new_DR.FirstItem = 1;
    this.new_DR.Complete = 0;
    this.new_DR.Checked = 0;
    this.new_DR.DateSub = new Date();
    this.new_DR.Revs = 0;
    //getting last and first name for Requestor
    const userFrom = this.Names.find(u => u.UID === this.new_DR.FromUID);
    if (userFrom) {
       this.new_DR.FromName = `${userFrom.UserFirst} ${userFrom.UserLast}`;
    }
    //getting last and first name for Reviwers
    const userTo = this.Names.find(u => u.UID === this.new_DR.ToUID);
    if (userTo) {
       this.new_DR.ToName = `${userTo.UserFirst} ${userTo.UserLast}`;
    } 
    
    

}else{
    //setting logic variables
    this.new_DR.FirstItem = 0;
    this.new_DR.Complete = 0;
    this.new_DR.Checked = 0;
    this.new_DR.DateSub = new Date();
    this.new_DR.Revs = this.NewDID;
    //getting last and first name for Requestor
    const userFrom = this.Names.find(u => u.UID === this.new_DR.FromUID);
    if (userFrom) {
       this.new_DR.FromName = `${userFrom.UserFirst} ${userFrom.UserLast}`;
    }
    //getting last and first name for Reviwers
    const userTo = this.Names.find(u => u.UID === this.new_DR.ToUID);
    if (userTo) {
       this.new_DR.ToName = `${userTo.UserFirst} ${userTo.UserLast}`;
    } 
    
}

this.api.DrawRevUpdate(this.new_DR,this.file!).subscribe({
  
});


}

CompleteDrwRev(DID:number){
 
  this.api.CompleteDrwRev(DID).subscribe(res=>{
  this.OnStart()
  this.snack.open('Review Complete!', 'OK', { duration: 2000 });
  })
}

onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.status = "initial";
      this.file = file;
    }
    
  }

FileDownload(filename:string){
  this.api.FiledownloadAPI(filename).subscribe(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  });
}

RedlineUpload(DID:number){
  this.new_DR.DID = DID
  this.api.RedlineUpload(this.new_DR,this.file!).subscribe(res=>{
    this.OnStart()
});
  
}

ToUID(){
  this.new_DR.ToUID = null;
}






}

