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
import {ProgramInfoInt,ToolType,ToolNumber} from '../App_interfaces'

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
  ClipboardModule,MatIcon,MatOption,MatSelectModule, MatDialogModule],
  templateUrl: './tool-number-gen.html',
  styleUrl: './tool-number-gen.scss',
})
export class ToolNumberGen {
  private readonly api = inject(ApiTest);
  ProgramInfo: ProgramInfoInt[] = []
  ProgramFilter: number | null = 0;
  TooltypeFilter: string = "None";
  ToolTypes: ToolType[] = []
  ToolNumbers: ToolNumber[]=[]




  ngOnInit(): void {
    this.api.ProgramInfo().subscribe(data=>{
      this.ProgramInfo = data;
      console.log(this.ProgramInfo)
    })

    this.api.Tooltype().subscribe(data=>{
      this.ToolTypes = data

    })

    this.api.ToolNumbers().subscribe(data =>{
      this.ToolNumbers = data
      console.log(this.ToolNumbers)
    })

    this
  }


}
