import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ProfileService } from 'src/app/service/profile.service';
import { User } from 'src/models/User';
import { userProfile } from 'src/models/userProfile';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
userProfile! : userProfile;
constructor ( private  profileService : ProfileService, private router:Router, private activatedRoute: ActivatedRoute, private location : Location) {}
 
ngOnInit(): void {
  this.activatedRoute.params.subscribe(
    (params) => {
      console.log('Params:', params['id']);

      this.profileService.getUserProfile(params['id']).subscribe(
        (user: any) => {
          console.log('user fetched successfully:', user);
          this.userProfile = this.userProfile;
        }
      );
    }
  );
}


goBack() {
  this.location.back();
}

profileEdit() {
  this.router.navigate(['/user/profileEdit', this.userProfile.id]);
}

}