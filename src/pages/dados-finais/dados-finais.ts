import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import { HomePage } from '../home/home';



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


  goPageHome(){
    this.navCtrl.setRoot(HomePage);
  }


}
