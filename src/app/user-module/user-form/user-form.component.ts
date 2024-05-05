import { Component } from '@angular/core';

export interface UserProfile {
  _id: String,
  userId: String,
  email:[String],
  firstName:String,
  lastName: String,
  type: string;
  phone:number,
}


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  keepSpinning: boolean = true;
  user!: any;

  userInfo: any = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
  };


  type = [
    "Administrateur",
    "Player",
    "Coach",
    "Medical Staff"
  ];
  progressForm = 0;
  isLinear = true;


}
