import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDataInt } from '../App_interfaces';
import {MatButtonModule} from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-request-complete',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatDividerModule],
  templateUrl: './request-complete.html',
  styleUrl: './request-complete.scss',
})
export class RequestComplete {
ProjectInfo: ProjectDataInt = {
    ChargeNumber: null,
    DeliveryDate: null, 
    PRREODI: null,
    PurchaseOrder:null, 
    RID: 10,
    ToolDesc: "tool for working thing",
    ToolNumber:"VB-T0-XXXXXX",
    ToolOrder:null,
    UID: null,
    ToolReq: "Tool needs to spin around on its head",
    Rational: "Tool perviously used didn't spin spinning is a good trick",
    DETNum: "5-50",
    QTY: "20",
    Priority: "Urgent",
    PRID: 3,
    ReqName: "Josiah Chesher",
    ReqENumber: 442685,
    Designitem: null,
    Complete: 1,
  };

  ngOnInit(): void {
  this.ProjectInfo.Designitem = 2;
  }

  


}
