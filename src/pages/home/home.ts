import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {DadosFinaisPage} from '../dados-finais/dados-finais'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  itensBasicos: Observable<any[]>;
  itensBasicosFilter = {};
  base = 'base';
  nivelArvore:string = 'base';
  validaFinal:string = 'base';
  lenghtArray:number;

  constructor(public navCtrl: NavController,public database:AngularFireDatabase) {

    
    this.itensBasicos = this.database.list(this.nivelArvore).snapshotChanges().map(arr => {
          return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }) ).filter(i => i.$key !== 'dado' && i.$key !== 'final' && i.$key !== 'tipo')
    });

    this.itensBasicos.forEach(e =>{
      this.lenghtArray = e.length;
      console.log('lenghtArray',this.lenghtArray)
    });
  
  
  }

  entrarNivel(key:string){

    this.nivelArvore = this.nivelArvore + '/' + key;

    console.log(this.nivelArvore);

    this.itensBasicos = this.database.list(this.nivelArvore).snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }) ).filter(i => i.$key !== 'dado' && i.$key !== 'final' && i.$key !== 'tipo')
    });

    this.itensBasicos.forEach(e=>{
     
      this.lenghtArray = e.length;
      if(e.length >0){
        this.validaFinal = e[0].dado;
      }
      
        console.log(e.length)
      
      if(this.validaFinal == undefined){
       this.navCtrl.push(DadosFinaisPage,{nivelArvore:this.nivelArvore});
       console.log('jp',this.validaFinal)
      }

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
