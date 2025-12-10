import { Component,ChangeDetectorRef,inject } from '@angular/core';
import { ApiTest } from '../api-test';
import { MatFormField, MatLabel, MatOption, MatSelect, } from '@angular/material/select';
import { CommonModule, } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../App_interfaces'; 




@Component({
  selector: 'app-engpick',
  imports: [MatSelect,MatFormField,MatLabel,MatOption,CommonModule,MatButton,RouterModule,FormsModule],
  templateUrl: './engpick.html',
  styleUrl: './engpick.scss',
})


export class ENGPick {
  
  
  Names: User[] = []
  selecteduser: User | null = null;
  constructor(private router:Router){}
  private readonly api = inject(ApiTest);
  private readonly changeDetector = inject(ChangeDetectorRef);
  ngOnInit(){
    this.getUserforRemoves();
  }


  getUserforRemoves(){
      this.api.getUserforRemove().subscribe((data: any[]) => {
        this.Names = data
        console.log(this.Names)
        this.changeDetector.markForCheck();
    })
  }

  RoutetoTEDashboard(){
    console.log(this.selecteduser?.UID)
    this.router.navigate(['/TEDashboard/', this.selecteduser?.UID]);
  }
    
}
