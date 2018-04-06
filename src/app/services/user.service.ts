import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import swal from 'sweetalert2';
import { User } from '../models/user.model';
import { API_URL } from '../helpers/constants';


@Injectable()
export class UserService {

  constructor(private _http:HttpClient) { }

  getTem(){

    let url = `${API_URL}/temp`;

    return this._http.get(url)
      .map((response:any)=>{
        return response;
      });
  }

  getUser(document:string){

    let url = `${API_URL}/user/${document}`;

    return this._http.get(url)
      .map((response:any)=>{
        return response.user;
      });
  }

  createUser(user:User, file:File){
    let url = `${API_URL}/user`;

    return this._http.post(url, user)
      .map((response:any)=>{
        this.uploadImage(file, response.user.document)
          .then((res:any)=>{
            swal({ 
              type: 'success', 
              title: 'El usuario se guardó correctamente!', 
              showConfirmButton: false, 
              timer: 1500 
            });
            return true;
          }).catch(err=> console.log(err));
      });
  }

  uploadImage(file:File, document:string){

    return new Promise((resolve, reject)=>{

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append('image', file, file.name);
      xhr.onreadystatechange = function() {
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Falló');
            reject(xhr.response);
          }
        }
      }

      let url = `${API_URL}/images/user/${document}`;
      xhr.open('POST', url, true);
      xhr.send(formData);

    });
  }

}