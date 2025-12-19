import { NullLiteral } from "typescript";

//Used in Backlog-design
export interface ProgramInfoInt{ 
  PRID: number;
  ProgramName: string;
  Building: string;
  ProgramCode: string;
}
//Used in Backlog-design
export interface BacklogProjectListInt{ 
  RID: number;
  ReqName: String;
  ReqENumber: number;
  Designitem: number;
  ToolNumber: string;
  ToolDesc: string;
  ToolReq: string;
  Rational: String;
  DETNum: String;
  QTY: String;
  Priority: String;
  PRID: number
}
//Used in Backlog-design, Eng-Pick, Remove-user
export interface User { 
  UserFirst: string;
  UserLast: string;
  UID: number;
}
//Used in Project-Dashboard
export interface ProjectDataInt{ 
  ChargeNumber: String|null;
  DeliveryDate:String|null;
  
  PRREODI: String|null;
  PurchaseOrder: String|null;
  RID: number|null;
  ToolDesc: String|null;
  ToolNumber:String|null;
  ToolOrder:String|null;
  UID: number|null;
  ToolReq: string|null;
  Rational: String|null;
  DETNum: String|null;
  QTY: String|null;
  Priority: String|null;
  PRID: number|null
  ReqName: String|null;
  ReqENumber: number|null;
  Designitem: number|null;
  Complete: number |null;
  
}
//Used in Project-Dashboard, TEDashboard
export interface StatusUpdate{ 
  StatusUpdate: String;
  DateOnly: String;
  SID: number;
  RID: number;
  
}
// //Used in TEDashboard
export interface Project {
  PID: number;
  ToolNumber: string;
  ToolDesc: string;
  ToolOrder: number;
  UID: number;
  RID: number;
  PRREODI: string;
  PurchaseOrder: String;
  ChargeNumber: String;
  DeliveryDate: String;
  // add any other fields your API returns
}
export interface ToolType{
  ToolType: string | null;
  Order: number |null;
} 

export interface ToolNumber{
  TID: number | null;
  Code: string |null;
  Type: string |null;
  UniqueID: string | null;
  Misc: string | null;
  PRID: number | null;
  RIDS: number[] | null;
  FID: number[] | null;
  ToolName: string | null;
  Delete: number | null;
}

export interface NumberGen {
  NTNobj_Program: number | null;
  NTNobj_ToolType: string | null;
  NTNobj_ToolName: string | null;
  NTNobj_Toolnum: string | null;
  NTNobj_Code:string | null;

}
export interface DrawingReviewINT {
  DID: number | null;
  FromUID: number | null;
  ToUID: number | null;
  ToolNumber: string | null;
  ToolDesc: string | null;
  FirstItem:number | null;
  Complete: number | null;
  Checked: number | null;
  DateSub: string | null;
  DateNeed: string | null;
  FileName: string | null;
  Revs: number | null;
  FromName:string|null;
  ToName: string|null;
}