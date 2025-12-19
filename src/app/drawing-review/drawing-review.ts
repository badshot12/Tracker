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
@Component({
  selector: 'app-drawing-review',
  providers: [provideNativeDateAdapter()],
  imports: [MatDatepickerModule,MatIcon,MatOption,MatSelectModule ,MatCardModule,MatButtonModule,MatDialogModule,MatInputModule,MatFormFieldModule,MatListModule,FormsModule, MatDividerModule,CommonModule,MatAccordion,MatExpansionPanel,MatExpansionPanelHeader,MatExpansionPanelTitle,RouterModule],
  templateUrl: './drawing-review.html',
  styleUrl: './drawing-review.scss',
})
export class DrawingReview {
uid!: number; // or string if your UID is string
UserName:any = "" 
Names: User[] = []
DR: DrawingReviewINT[] = []

constructor(private route: ActivatedRoute,private router:Router) { }
private readonly api = inject(ApiTest);
readonly dialog = inject(MatDialog);

//Dialog Vars
selecteduser:number = 0
DesignerUser: number = this.uid
NewReviewDialogRef: any;

ngOnInit(): void{
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
})

this.getUserforRemoves();
this.DesignerUser = this.uid
}



  getUserforRemoves(){
      this.api.getUserforRemove().subscribe((data: any[]) => {
        this.Names = data
        //console.log(this.Names)
    })
  }
  Warnlogic(DateSub: string | null, DateNeed: string | null):boolean{
    
  if (!DateSub || !DateNeed) return false;

  const d1 = new Date(DateSub).getTime(); // gives date in miliseconds
  const d2 = new Date(DateNeed).getTime(); // gives date in miliseconds

  return (d1 - d2) <= 24 * 60 * 60 * 1000; // the last part multiplication is converting from miliseconds to days
  }

openNewDrawRev(template:TemplateRef<any>){
  this.NewReviewDialogRef = this.dialog.open(template,{
    width: '1000px'
  });
}


}
