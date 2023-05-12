import { Component, HostListener, OnInit } from '@angular/core';

const First_Mediaquery_Breakpoint = 910;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  menuVisible = false;
  navLeft: any; //Lo iniciamos en default
  navRight: any;

  constructor() { }

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
