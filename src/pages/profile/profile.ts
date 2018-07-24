import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user:any;
  avatar:string;
  emailVerified:string;
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              private alertCtrl:AlertController,
              private toastCtrl: ToastController
            ) {
    this.user = JSON.parse(localStorage.getItem('user'));    
    console.log( this.afAuth.auth.currentUser);
    this.avatar = this.user.photoURL === null?'../../assets/imgs/user.jpg':this.user.photoURL;
    this.emailVerified = this.user.emailVerified?'E-mail verificado.':'E-mail não verificado';
   
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  alertUpdateNome() {
    let alert = this.alertCtrl.create({
      title: 'Alterar Nome',
      inputs: [
        {          
          name: 'nome',
          placeholder: 'Digite seu nome.'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Alterar',
          handler: data => {            

            this.afAuth.auth.currentUser.updateProfile({displayName:data.nome,photoURL:this.user.photoURL})
              .then(success =>{
                let toast = this.toastCtrl.create({
                  duration: 3000,
                  position: "bottom"
                });

                localStorage.setItem('user', JSON.stringify(this.afAuth.auth.currentUser));
                this.user = JSON.parse(localStorage.getItem('user'));
                this.avatar = this.user.photoURL === null?'../../assets/imgs/user.jpg':this.user.photoURL;
                this.emailVerified = this.user.emailVerified?'E-mail verificado.':'E-mail não verificado';
                
                toast.setMessage('Nome alterado com sucesso.');
                toast.present();                      
              })
              .catch(error =>{
                let toast = this.toastCtrl.create({
                  duration: 3000,
                  position: "bottom"
                });
                toast.setMessage('Nome Inválido.');
                toast.present();              
              })
            }             
           
          
          }
        
      ]
    });
    alert.present();
  }

}
