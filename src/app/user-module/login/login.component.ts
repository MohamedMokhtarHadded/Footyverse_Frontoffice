import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthGuardService } from 'src/app/service/auth-guard.service';
import { User } from 'src/models/User';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  protected aFormGroup: FormGroup;
  falock = faLock;
  loginForm!: FormGroup;

  

  constructor(private auth: AuthGuardService, private router: Router, private formBuilder: FormBuilder,
     private userService: UserServiceService) {
    this.aFormGroup = new FormGroup({});
  }



  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['login']);
    }

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  siteKey: string = "6LeFVKEpAAAAAKJ4eWnnNe1G-xEPNni4MUR0jiA6";

  onSubmit() {



    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      
      this.userService.login(this.loginForm.value).subscribe(
        (res: User) => {
          localStorage.setItem('user', JSON.stringify(res));

          switch (res.Role) {
            case "MedicalStaff":
              this.router.navigate(['/injury/manageInjuries']);
              break;
            case "Player":
              this.router.navigate(['/team/view-team']);
              break;
            case "Trainer":
              this.router.navigate(['/training/manageTrainings']);
              break;
            default:
              this.router.navigate(['home']);
              break;
          }



        },

        
        (err) => {
          alert("Invalid email or password");
        }
      );
    }
    else {
      alert("Please fill all the required fields");
    }

    
  }

}