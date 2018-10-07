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



  nivelArvore:string;
  dadosBasicos: Observable<any[]>;
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides ;
  SwipedTabsIndicator :any= null;
  arrayVideos:Observable<any[]>;
  tabs:any=[];


  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public database:AngularFireDatabase
              
            ) {
    this.tabs=['book',"create","contacts","home"];
    this.nivelArvore = this.navParams.get('nivelArvore');

    this.dadosBasicos = this.database.list(this.nivelArvore).snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }) ).filter(i => i.$key !== 'dado' && i.$key !== 'final' && i.$key !== 'tipo')
});



 
   this.arrayVideos = this.database.list(this.nivelArvore).snapshotChanges().map(arr => {
    return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }) ).filter(i => i.tipo === 'Video')
});;
   

 


  }

// TABS
    ionViewDidEnter() {
      this.SwipedTabsIndicator = document.getElementById("indicator");
  }
    selectTab(index) {    
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(100*index)+'%,0,0)';
    this.SwipedTabsSlider.slideTo(index, 500);
  }

  updateIndicatorPosition() {
      
      if( this.SwipedTabsSlider.length()> this.SwipedTabsSlider.getActiveIndex())
      {
        this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(this.SwipedTabsSlider.getActiveIndex() * 100)+'%,0,0)';
      }
    
    }

  animateIndicator($event) {
    if(this.SwipedTabsIndicator)
        this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress* (this.SwipedTabsSlider.length()-1))*100) + '%,0,0)';
  }




}
