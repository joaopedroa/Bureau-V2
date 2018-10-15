import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

import {AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {DadosFinaisPage} from '../dados-finais/dados-finais'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Slides) _slides:Slides;
  itensBasicos: Observable<any[]>;
  
  base = 'base';
  nivelArvore:string = 'base';
  validaFinal:string = 'base';
  lenghtArray:number;
  arrayPath = [];

  constructor(public navCtrl: NavController,public database:AngularFireDatabase) {

    
    this.itensBasicos = this.database.list(this.nivelArvore).snapshotChanges().map(arr => {
          return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }) ).filter(i => i.$key !== 'dado' && i.$key !== 'final' && i.$key !== 'tipo')
    });

    this.itensBasicos.forEach(e =>{
      this.lenghtArray = e.length;
      console.log('lenghtArray',this.lenghtArray)
    });
  
    console.log(this._slides);
  
  }


  entrarNivel(key:string){

    this.nivelArvore = this.nivelArvore + '/' + key;
   
    console.log(this.nivelArvore);
    
    this.itensBasicos = this.database.list(this.nivelArvore).snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }) ).filter(i => i.$key !== 'dado' && i.$key !== 'final' && i.$key !== 'tipo')
    });
    
    this.itensBasicos.forEach(e=>{
     console.log('arq',e)
      this.lenghtArray = e.length;
      if(e.length >0){
        this.validaFinal = e[0].dado; 
      }
      
        console.log(e.length)
      
      if(this.validaFinal == undefined){
       this.navCtrl.setRoot(DadosFinaisPage,{nivelArvore:this.nivelArvore});
       console.log('jp',this.validaFinal)
      }

    });

    this._slides.slideTo(0,1,true);
  }
  sairNivel(){
    
    this.arrayPath = this.nivelArvore.split('/');
    this.arrayPath.splice(-1,1);
    this.nivelArvore = this.arrayPath.join('/');
   console.log('sair',this.nivelArvore)
      this.itensBasicos = this.database.list(this.nivelArvore).snapshotChanges().map(arr => {
        return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }) ).filter(i => i.$key !== 'dado' && i.$key !== 'final' && i.$key !== 'tipo')
      });

      this.itensBasicos.forEach(e =>{
        this.lenghtArray = e.length;
      });
    
  }



}
