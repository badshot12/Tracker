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
import {ProgramInfoInt,ToolType,ToolNumber,NumberGen} from '../App_interfaces'
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-tool-number-gen',
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
  ClipboardModule,MatIcon,MatOption,MatSelectModule, MatDialogModule,MatTooltipModule],
  templateUrl: './tool-number-gen.html',
  styleUrl: './tool-number-gen.scss',
})


export class ToolNumberGen {
constructor(private route: ActivatedRoute, 
    private router:Router,
    private clipboard: Clipboard,
    private snack: MatSnackBar,
  ) { }

  private readonly api = inject(ApiTest);
  readonly dialog = inject(MatDialog);
  ProgramInfo: ProgramInfoInt[] = []
  ProgramFilter: number | null = 0;
  TooltypeFilter: string = "None";
  ToolTypes: ToolType[] = []
  ToolNumbers: ToolNumber[]=[]

  //edit and delete variables
  toolnumberdeletevar: number|null = null;
  toolnameeditvar: number|null = null;



  //dialog Variables
  EditNameDialogREF: any;
  NewTNDialogREF: any;
  TN_EditedName: ToolNumber = {
  TID:null,
  Code: "",
  Type: "",
  UniqueID: null,
  Misc: "",
  PRID: null,
  RIDS: null,
  FID: null,
  ToolName: "",
  Delete: null,
  }
  //ToolNumberGenerator Varaibles
  MISCCheck:number = 3;
  NTN_Program: number |null = null;
  NTN_ToolType: string | null = null; 
  NTN_ToolName: string | null = "";
  MISC_ToolNum: string | null = null;
  NTN_Code: string  = "";
  ToolNumGenClick: number = 0;
  maxTID:number = 0;
  NumberGenObj: NumberGen = {
    NTNobj_Program: null,
    NTNobj_ToolType: null,
    NTNobj_ToolName: null,
    NTNobj_Toolnum: null,
    NTNobj_Code: "",
  };


  



  ngOnInit(): void {
    this.startData();
  }
  startData(){
    this.api.ProgramInfo().subscribe(data=>{
      this.ProgramInfo = data;
      console.log(this.ProgramInfo)
    })

    this.api.Tooltype().subscribe(data=>{
      this.ToolTypes = data
      console.log(this.ToolTypes)

    })

    this.api.ToolNumbers().subscribe(dataT =>{
      this.ToolNumbers = dataT
      console.log(this.ToolNumbers)
        this.maxTID = Math.max(...this.ToolNumbers.map(t => t.TID ?? 0));
    })
  
  }
  DialogRefresh(){
    this.MISCCheck = 3;
  this.NTN_Program = null;
  this.NTN_ToolType= null; 
  this.NTN_ToolName= "";
  this.MISC_ToolNum= null;
  this.NTN_Code= "";
  this.ToolNumGenClick= 0;
  this.maxTID= 0;
  this.NumberGenObj= {
    NTNobj_Program: null,
    NTNobj_ToolType: null,
    NTNobj_ToolName: null,
    NTNobj_Toolnum: null,
    NTNobj_Code: "",
  };
  }

  

  ToolNumberDelete(ToolNumberobj: object){
    const concheck = window.confirm("Confim Deletion request");
  if (concheck){
   this.api.ToolNumberDeleteapi(ToolNumberobj).subscribe(res=>{

   })
  

  } else {
  }
  }
// Editing Tool Number functionality
  openNameDialog(template: TemplateRef<any>, toolname:ToolNumber){
    //if (!toolname) return; // guard against null
    this.TN_EditedName = toolname;
    this.EditNameDialogREF = this.dialog.open(template,{
      width: '1000px'
    })
  }
  
  SaveName(){

    this.api.SaveTN_Name(this.TN_EditedName).subscribe(res=>{
    this.snack.open('Tool Name Changed', 'OK', { duration: 1500 });
    this.EditNameDialogREF.close();
    })
  }

  //Tool Number Generator Functionality

  openNewTNDialog(template: TemplateRef<any>){
    this.NewTNDialogREF = this.dialog.open(template,{
      width: '1000px'
    })
  }

ToolNumGen(){
  this.ToolNumGenClick = 2;
  const selectedProgramobj = this.ProgramInfo.find(
  program =>
    program.PRID === this.NTN_Program)
    this.NTN_Code = selectedProgramobj?.ProgramCode!

  if (this.MISCCheck === 1) {
  this.NumberGenObj = {
    NTNobj_Program: this.NTN_Program,
    NTNobj_ToolType: this.NTN_ToolType,
    NTNobj_ToolName: this.NTN_ToolName,
    NTNobj_Toolnum: null,
    NTNobj_Code: this.NTN_Code
  };


  this.api.NumberGenerator(this.NumberGenObj).subscribe(res=>{
    this.ToolNumGenClick = 3;
    this.startData();
  })
}else{
  this.NumberGenObj = {
    NTNobj_Program: this.NTN_Program,
    NTNobj_ToolType: null,
    NTNobj_ToolName: this.NTN_ToolName,
    NTNobj_Toolnum: this.MISC_ToolNum,
    NTNobj_Code: this.NTN_Code,
  };
  this.api.NumberGenerator(this.NumberGenObj).subscribe(res=>{
    this.ToolNumGenClick = 3;
    this.startData();
  })
}
}
copyTextTN(text1: any, text2: any, text3: any) {
  const result = text1 + "-" + text2 + "-" + text3;

  this.clipboard.copy(result);
  this.snack.open('Copied!', 'OK', { duration: 1500 });
}
copyText(text1: any) {
  

  this.clipboard.copy(text1);
  this.snack.open('Copied!', 'OK', { duration: 1500 });
}


}
