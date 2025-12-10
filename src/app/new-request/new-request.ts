
import { Component,ChangeDetectorRef,inject,TemplateRef } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router,RouterModule,Route,ActivatedRoute } from '@angular/router';
import { ApiTest } from '../api-test';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { ProgramInfoInt, ProjectDataInt } from '../App_interfaces';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';



@Component({
  selector: 'app-new-request',
  imports: [MatButtonToggleModule,FormsModule,CommonModule,MatOption,MatSelectModule,MatButtonModule,MatFormFieldModule, MatInputModule],
  templateUrl: './new-request.html',
  styleUrl: './new-request.scss',
})
export class NewRequest {
  constructor(private route: ActivatedRoute,private router:Router,
    private snack: MatSnackBar,
  ) { }
  private readonly api = inject(ApiTest);
  ProgramInfo: ProgramInfoInt[] = []
  selectedtype:number|null=null;
  InputInfo: ProjectDataInt = {
    ChargeNumber: null,
    DeliveryDate: null, 
    PRREODI: null,
    PurchaseOrder:null, 
    RID: null,
    ToolDesc: null,
    ToolNumber:null,
    ToolOrder:null,
    UID: null,
    ToolReq: null,
    Rational: null,
    DETNum: null,
    QTY: null,
    Priority: null,
    PRID: null,
    ReqName: null,
    ReqENumber: null,
    Designitem: null,
    Complete: null,
  };
  

  

  ngOnInit(): void {
  this.selectedtype= 0;
  }

selectedUpdate(select:number){
this.selectedtype = select;


this.api.ProgramInfo().subscribe(data=>{
      this.ProgramInfo = data;
      console.log(this.ProgramInfo)
    })

}
allowNumbersOnly(event: KeyboardEvent) {
  const allowedKeys = ['0','1','2','3','4','5','6','7','8','9'];
  if (!allowedKeys.includes(event.key)) {
    event.preventDefault(); // stop typing letters
  }
}

submitRequest(){

  if (this.InputInfo.ReqENumber === null && this.InputInfo.ReqName === null && this.InputInfo.ToolNumber === null && this.InputInfo.PRID === null){ 
    alert("Please fill out required fields")
  }else if (!/^\d+$/.test(String(this.InputInfo.ReqENumber))){
      alert("Please type only Numbers in employee number field")

    
  } else{
    console.log(this.selectedtype)
    this.InputInfo.Designitem = this.selectedtype
  this.api.SubmitNewRequest(this.InputInfo).subscribe(res=>{
    console.log("sent InputInfo",this.InputInfo)
    this.router.navigate(['/RequestComplete']);
    this.snack.open('Request Submitted', 'OK', { duration: 1500 });
  })

  }
  
}
  

}
