import { Component,ChangeDetectorRef,inject } from '@angular/core';
import { ApiTest } from '../api-test';
import { MatFormField, MatLabel, MatOption, MatSelect, } from '@angular/material/select';
import { CommonModule, } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../App_interfaces';

@Component({
  selector: 'app-remove-user',
  imports: [MatSelect,MatFormField,MatLabel,MatOption,CommonModule,MatButton,RouterModule,FormsModule],
  templateUrl: './remove-user.html',
  styleUrl: './remove-user.scss',
})

 
export class RemoveUser {
   constructor(private router:Router){}
  Names: User[] = [];
  selecteduser: User | null = null;
  
  
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

  deleteuser() {
  console.log("buttonworked");
  console.log(this.selecteduser);

  if (!this.selecteduser) {
    console.log("No user selected!");
    alert("No User Selected")
    return;
  }

  const concheck = window.confirm("Confim Deletion of " + this.selecteduser.UserFirst + " " +this.selecteduser.UserLast);
  if (concheck){
  console.log('Deleting user:', this.selecteduser.UserFirst, this.selecteduser.UserLast);
  console.log('UID:', this.selecteduser.UID);

  this.api.RemoveUser(this.selecteduser).subscribe(res => {
    console.log("sentUID", res);
    this.router.navigate(['/engpick']);
  });
  } else {

  }



}

}
