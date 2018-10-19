import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

import {AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {DadosFinaisPage} from '../dados-finais/dados-finais'
import {Vibration} from  '@ionic-native/vibration';
import { PrepararDadosPage } from '../preparar-dados/preparar-dados';

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
  user:any;
  userName:any;

  constructor(public navCtrl: NavController,public database:AngularFireDatabase, public vibrate:Vibration) {

    
    this.itensBasicos = this.database.list(this.nivelArvore).snapshotChanges().map(arr => {
          return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }) ).filter(i => i.$key !== 'dado' && i.$key !== 'final' && i.$key !== 'tipo')
    });

    this.itensBasicos.forEach(e =>{
      this.lenghtArray = e.length;      
    });  
    
    this.user = JSON.parse(localStorage.getItem('user'));   
    this.userName = this.user.displayName;
  }


  entrarNivel(key:string){

    this.nivelArvore = this.nivelArvore + '/' + key;
   
    console.log(this.nivelArvore);
    
    this.vibrate.vibrate(50);
     
 
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
       this.navCtrl.setRoot(PrepararDadosPage,{nivelArvore:this.nivelArvore});
       console.log('jp',this.validaFinal)
      }

    });

    this._slides.slideTo(0,1,true);
  }
  sairNivel(){
    this.vibrate.vibrate(50);
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
