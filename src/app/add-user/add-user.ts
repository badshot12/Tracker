import { Component,ChangeDetectorRef,inject  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiTest } from '../api-test';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  imports: [MatInputModule,MatFormFieldModule,FormsModule,MatButton],
  templateUrl: './add-user.html',
  styleUrl: './add-user.scss',
})
export class AddUser {
  private readonly api = inject(ApiTest);
  constructor(private router:Router){}
  public UserInfo = {
    NewFirst:  "",
    NewLast:  "",
    NewLmNum:""
  }
allowNumbersOnly(event: KeyboardEvent) {
  const allowedKeys = ['0','1','2','3','4','5','6','7','8','9'];
  if (!allowedKeys.includes(event.key)) {
    event.preventDefault(); // stop typing letters
  }
}


  Pullinfo(){
    console.log("did we get here")
    if (!/^\d+$/.test(this.UserInfo.NewLmNum)){
      alert("Please type only Numbers in employee field");

    } else if (this.UserInfo.NewFirst ===""){
      alert("Please Enter First Name");

    } else if(this.UserInfo.NewLast ==="") {
      alert("Please Enter Last Name");
    } else {
      this.api.NewUserSend(this.UserInfo).subscribe(res => {
      console.log("User Saved", res)
      })
      
      alert("Tooling Engineer added. Welcome to the Team")
      this.router.navigate(['/engpick']);

    }   
  }
  

}
