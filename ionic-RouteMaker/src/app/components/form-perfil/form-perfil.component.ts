import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder  } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { UserService } from '../../services/user.service';
import { ImagenUploadService } from '../../services/imagen-upload.service';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { OpenOverlayService } from 'src/app/services/open-overlay.service';

@UntilDestroy()
@Component({
  selector: 'app-form-perfil',
  templateUrl: './form-perfil.component.html',
  styleUrls: ['./form-perfil.component.scss'],
})
export class FormPerfilComponent  implements OnInit {
  
  user$ = this.userService.currentUserProfile$;
  disableButton=true;

  profileForm = this.noNull.group({
    uid: [''],
    displayName: [''],
    displaySurname: ['']
  });

  constructor(
    private imagenUpload: ImagenUploadService,
    private userService: UserService,
    private toast: HotToastService,
    private noNull: NonNullableFormBuilder,
    public openOverlay: OpenOverlayService 
    ) { }

  ngOnInit(): void {
    this.userService.currentUserProfile$
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => {
        this.profileForm.patchValue({ ...user });
      });
  }
  uploadFile(event: any, { uid }: Usuario) {
    this.imagenUpload
      .uploadImage(event.target.files[0], `images/profile/${uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Uploading profile image...',
          success: 'Image uploaded successfully',
          error: 'There was an error in uploading the image',
        }),
        switchMap((photoURL) =>
          this.userService.updateUser({
            uid,
            photoURL,
          })
        )
      )
      .subscribe();
  }

  saveProfile() {
    this.disableButton = true
    console.log(this.disableButton + "Estado boton")
    const { uid, ...data } = this.profileForm.value;
    if (!uid) {
      return;
    }

    this.userService.updateUser({ uid, ...data})
      .pipe(
        this.toast.observe({
          loading: 'Guardando datos...',
          success: 'Perfil actualizado',
          error: 'No se ha podido actualizar el perfil',
        })
        )
        .subscribe();
  }
  
}
