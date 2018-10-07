import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';

import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';



@IonicPage()
@Component({
  selector: 'page-dados-finais',
  templateUrl: 'dados-finais.html',
})


export class DadosFinaisPage {


  categoria: string = "pdf";
  nivelArvore:string;
  dadosBasicos: Observable<any[]>;
  
  arrayVideos:Observable<any[]>;
  arrayImagens:Observable<any[]>;


  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public database:AngularFireDatabase
              
            ) {
  
    this.nivelArvore = this.navParams.get('nivelArvore');

    this.dadosBasicos = this.database.list(this.nivelArvore).snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }) ).filter(i => i.$key !== 'dado' && i.$key !== 'final' && i.$key !== 'tipo')
});



 
   this.arrayVideos = this.database.list(this.nivelArvore).snapshotChanges().map(arr => {
    return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }) ).filter(i => i.tipo === 'Video')
});;


   

 


  }





}
