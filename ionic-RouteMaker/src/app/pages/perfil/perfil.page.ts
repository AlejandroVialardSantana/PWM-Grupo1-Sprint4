import { Component, OnInit } from '@angular/core';
import { OpenOverlayService } from 'src/app/services/open-overlay.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    public openOverlay: OpenOverlayService ) { }

  ngOnInit() {
  }

}
