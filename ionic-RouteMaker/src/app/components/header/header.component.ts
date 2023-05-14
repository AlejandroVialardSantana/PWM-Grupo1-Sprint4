import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

const First_Mediaquery_Breakpoint = 910;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  user$ = this.userService.currentUserProfile$;

  menuVisible = false;
  navLeft: any; //Lo iniciamos en default
  navRight: any;

  constructor(private router: Router, public authService: AuthenticationService, private userService: UserService ) {
    // Escucha los eventos de finalización de la navegación.
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.menuVisible = false;  // Oculta el menú cuando la navegación termina
        this.hideOrShowHorizontalMenu(this.menuVisible);
      }
    });
  }
  logout(){
    this.authService.logout().subscribe(() => {
      this.router.navigate([""]);
    });
  }

  ngOnInit(): void {
    if (window.innerWidth > First_Mediaquery_Breakpoint){ //ya que cuando utilizamos (max-width: 890px) en el css, estamos diciendo que se ejecute si la pantalla es <= 890px
      this.navLeft = null;
      this.navRight = '0';
    }else{
      this.navLeft = '-100%';
      this.navRight = null;
    }
  }

  menuBtnClicked(event: Event) {
    const target = event.target as HTMLInputElement;
    //const isChecked = target.checked;
    this.menuVisible = !this.menuVisible;

    this.hideOrShowHorizontalMenu(this.menuVisible);
  }

  private hideOrShowHorizontalMenu(isMenuVisible:boolean):void{
    if (isMenuVisible){
      this.navLeft = '0';
    }else{
      this.navLeft = '-100%';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth > First_Mediaquery_Breakpoint){
      this.menuVisible = false; //Contraemos el menu, si se estaba mostrando
      this.navLeft = null;
      this.navRight = '0';
    }else{
      this.navRight = null;
      this.hideOrShowHorizontalMenu(this.menuVisible);
    }
  }
}