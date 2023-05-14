import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss'],
})
export class FormRegisterComponent  implements OnInit {
  errorMessage="";
  email = "";
  validateEmail() {
    if (!this.email) {
      this.errorMessage = "Por favor, ingrese su correo electrónico.";
    } else {
      this.errorMessage = "Por favor, ingrese un correo electrónico válido.";
    }
  }

  constructor() { }

  ngOnInit() {}

}
