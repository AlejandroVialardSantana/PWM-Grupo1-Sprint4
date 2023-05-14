import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { switchMap } from 'rxjs';

export function passwordsMatch(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if(password && confirmPassword && password !== confirmPassword){
      return {
        passwordsDontMatch: true
      }
    }
    return null;
  };
}

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss'],
})
export class FormRegisterComponent  implements OnInit {
  
  signUpForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  },
    {validators: passwordsMatch() }
  )
  constructor( private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router,
    private userService: UserService
    ) { }

    get name(){
      return this.signUpForm.get('name');
    }
    get surname(){
      return this.signUpForm.get('surname');
    }
    get email(){
      return this.signUpForm.get('email');
    }
    get password(){
      return this.signUpForm.get('password');
    }
    get confirmPassword(){
      return this.signUpForm.get('confirmPassword');
    }
  ngOnInit() {}
  submit(){
    console.log("Registrando...")
    const { name, surname, email, password } = this.signUpForm.value;

    if (!this.signUpForm.valid || !name || !surname || !password || !email) {
      return;
    }

    this.authService
      .signUp(email, password).pipe(
        switchMap(({ user: { uid } }) => this.userService.addUser({ uid, email, displayName: name, displaySurname:surname})), 
        this.toast.observe({
          success: 'Registro correcto',
          loading: 'Registrando usuario...',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.router.navigate(['home']);
      });
  }
}
