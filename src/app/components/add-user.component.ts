import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';


import swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styles: []
})
export class AddUserComponent implements OnInit {

  public imageTemp:string;
  public imageToUpload: File;
  public user:User;

  constructor(private _userService:UserService) {
    this.user = new User('', '');
   }

  ngOnInit() {
  }

  saveUser(user:User){
    if(user.name=='' || user.document== '' || !this.imageToUpload){
      swal({ type: 'error', title: 'Complete todos los campos', showConfirmButton: false, timer: 1500 });
      return;
    }
    this._userService.createUser(user, this.imageToUpload).subscribe();
  }

  selectImage(file:File){
    if(!file) { this.imageToUpload = null; return;}

    if(file.type.indexOf('image')<0){
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imageToUpload = null;
      return;
    }
    this.imageToUpload = file;

    let reader = new FileReader();
    let urlImageTemp = reader.readAsDataURL(file);

    reader.onloadend = ()=> this.imageTemp = reader.result;
  }

}
