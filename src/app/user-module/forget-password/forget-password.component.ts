import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit{
forgetForm!: FormGroup;
fb = inject(FormBuilder);



  
constructor(private userService: UserServiceService){

  }
ngOnInit(): void {
    this.forgetForm = this.fb.group({
      email : ['', Validators.compose([Validators.required, Validators.email])],
    })

}

submit(){
  this.userService.forgetPassword(this.forgetForm.value).subscribe();
  console.log(this.forgetForm.value);
}

}
