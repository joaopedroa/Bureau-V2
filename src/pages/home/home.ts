import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  itensBasicos: Observable<any[]>;
  itensBasicosFilter = {};
  base = 'base';
  nivelArvore:string = 'base';
  constructor(public navCtrl: NavController,public database:AngularFireDatabase) {

    
    this.itensBasicos = this.database.list(this.nivelArvore + '/-LHjj5IDSxQaZ89wAL6p').snapshotChanges().map(arr => {
          return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }) ).filter(i => i.$key !== 'dado' && i.$key !== 'final' && i.$key !== 'tipo')
    });

    this.itensBasicos. forEach(e =>{
      //console.log(Object.getOwnPropertyNames(e[0])); 
      console.log(e); 
    });
  
  
  }

  entrarNivel(key:string){
    this.nivelArvore = this.nivelArvore + '/' + key;
    console.log(this.nivelArvore);
    this.itensBasicos = this.database.list(this.nivelArvore).snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }) ).filter(i => i.$key !== 'dado' && i.$key !== 'final' && i.$key !== 'tipo')
    });
  

  }
  sairNivel(){
    let arrayPath = [];
    arrayPath = this.nivelArvore.split('/');
    arrayPath.splice(-1,1);
    this.nivelArvore = arrayPath.toString().replace(',','/');
    this.itensBasicos = this.database.list(this.nivelArvore).snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }) ).filter(i => i.$key !== 'dado' && i.$key !== 'final' && i.$key !== 'tipo')
    });
   
    
  }

}
