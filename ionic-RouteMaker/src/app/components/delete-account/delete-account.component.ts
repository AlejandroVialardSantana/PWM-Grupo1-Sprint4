import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { Usuario } from '../../models/usuario';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from '../../services/user.service';
import { OpenOverlayService } from 'src/app/services/open-overlay.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
})
export class DeleteAccountComponent  implements OnInit {

 
  user$ = this.userService.currentUserProfile$;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
    public openOverlay: OpenOverlayService
    ){}

  ngOnInit(): void {

  }

  
  deleteAccount(user: Usuario) {   
    getAuth().currentUser?.delete().then(() => {
      this.userService.deleteUser(user).subscribe();
      this.authService.logout().subscribe(() => {
        this.router.navigate([""]);
      });
    });
  }
    

}
