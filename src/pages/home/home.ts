import { Component, ViewChild } from '@angular/core';
import { NavController, Slides,NavParams } from 'ionic-angular';

import {AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {DadosFinaisPage} from '../dados-finais/dados-finais'
import {Vibration} from  '@ionic-native/vibration';
import { PrepararDadosPage } from '../preparar-dados/preparar-dados';
import { AngularFireAuth } from 'angularfire2/auth';
import { NivelArvore } from '../../providers/nivelArvore';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild(Slides) _slides:Slides;
  itensBasicos: Observable<any[]>;
  itens: Observable<any[]>;
  base = 'base';
  
  nivel:any;
  validaFinal:string = 'base';
  lenghtArray:number;
  arrayPath = [];
  user:any;
  userName:any;
  arrayValues = [];
  arrayKeys = [];
  arrayTotal = [];
  arrayAntigo = [];
  tamanho;
  clicked:number;
  constructor(
                public navCtrl: NavController,
                public database:AngularFireDatabase, 
                public vibrate:Vibration,
                public navParams: NavParams,
                private afAuth: AngularFireAuth
              ) {

    this.itensBasicos = this.database.list(NivelArvore.nivelArvore).snapshotChanges().map(arr => {
          return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }) ).filter(i => i.$key !== 'dado' && i.$key !== 'final' && i.$key !== 'tipo')
    });
this.nivel = NivelArvore.nivelArvore;
    this.itensBasicos.forEach(e =>{
      this.lenghtArray = e.length;  
     console.log('itens',e) ;
    });  

    
  }

  counter(i:number){
    return new Array(i);
  }

steps(){
  this.itensBasicos.forEach(e=>{  
    

    for(var x=0;x<e.length;x++){
      this.tamanho = 1;       
      this.arrayValues = Object["values"](e[x]);
      let validation = e[x].dado; 
       
      
      while(validation !== undefined) {       
        validation = this.arrayValues[0].dado;
        this.arrayValues = Object["values"](this.arrayValues[0]);
        this.tamanho++;
      }
    this.arrayTotal.push(this.tamanho);
    
    }
    
  });

}

  entrarNivel(key:string,dado:string){

 
    
    let click =  this.clicked==undefined?-99:this.clicked;
    this.clicked =  this._slides.clickedIndex;
   
   
 
    NivelArvore.nivelArvore = NivelArvore.nivelArvore + '/' + key;
    this.nivel = NivelArvore.nivelArvore; 
    
    
    this.vibrate.vibrate(50);
     
 
    this.itensBasicos = this.database.list(NivelArvore.nivelArvore).snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }) ).filter(i => i.$key !== 'dado' && i.$key !== 'final' && i.$key !== 'tipo')
    });


    this.itensBasicos.forEach(e=>{
/*
      let tamanho = document.getElementsByClassName(e[0].dado)[0].childElementCount;
      let val = 0;
    
      for(let x=0;x<tamanho-1;x++){
       if(document.getElementsByClassName(e[0].dado)[0].children[x].className == 'active' && val === 0){
         
         document.getElementsByClassName(e[0].dado)[0].children[x].removeAttribute('class');
         document.getElementsByClassName(e[0].dado)[0].children[x+1].setAttribute('class','active');
         val = 1;
       }
      }
*/
     
      this.lenghtArray = e.length;
      if(e.length >0){
        this.validaFinal = e[0].dado; 
      }
      
       
      
      if(this.validaFinal == undefined){
       this.navCtrl.setRoot(PrepararDadosPage,{nivelArvore:NivelArvore.nivelArvore});
       
      }

    });

    if(click === -99 || click !== this.clicked){
    this.arrayAntigo = this.arrayTotal ;
    }
    this.arrayTotal = [];
    this.steps();   
    this._slides.slideTo(0,1,true);
  }

  ionViewDidLoad() {
    this.steps();   
  }

  sairNivel(){
    this.vibrate.vibrate(50);
    this.arrayPath = NivelArvore.nivelArvore.split('/');
    this.arrayPath.splice(-1,1);
    NivelArvore.nivelArvore = this.arrayPath.join('/');
  
      this.itensBasicos = this.database.list(NivelArvore.nivelArvore).snapshotChanges().map(arr => {
        return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }) ).filter(i => i.$key !== 'dado' && i.$key !== 'final' && i.$key !== 'tipo')
      });

      this.itensBasicos.forEach(e =>{
        this.lenghtArray = e.length;
      });
    
  }



}
