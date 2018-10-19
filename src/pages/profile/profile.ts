import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {storage} from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user:any;
  avatar:string;
  emailVerified:string;
  photo:string;
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              private alertCtrl:AlertController,
              private toastCtrl: ToastController,
              private camera :Camera
              
            ) {
    
    this.avatar = this.afAuth.auth.currentUser.photoURL === null?'../../assets/imgs/user.jpg':this.afAuth.auth.currentUser.photoURL;
    this.emailVerified = this.afAuth.auth.currentUser.emailVerified?'E-mail verificado.':'E-mail não verificado';
   

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

            this.afAuth.auth.currentUser.updateProfile({displayName:data.nome,photoURL:this.afAuth.auth.currentUser.photoURL})
              .then(success =>{
                let toast = this.toastCtrl.create({
                  duration: 3000,
                  position: "bottom"
                });

                this.avatar = this.afAuth.auth.currentUser.photoURL === null?'../../assets/imgs/user.jpg':this.afAuth.auth.currentUser.photoURL;
                this.emailVerified = this.afAuth.auth.currentUser.emailVerified?'E-mail verificado.':'E-mail não verificado';

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
    console.log('storage',storage().ref(`pictures/`));
  }

  async uploadPhoto(){
   
    const uid = this.afAuth.auth.currentUser.uid;
    let photoURL:string;
    try{
        const options: CameraOptions = {
          quality: 50,
          targetHeight: 600,
          targetWidth:600,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true
        }

        const result = await this.camera.getPicture(options);

        const image = `data:image/jpeg;base64,${result}`;

        const pictures = storage().ref(`profile/${uid}`);
        pictures.putString(image, 'data_url'); 
       
        pictures.getDownloadURL().then(photo =>{
          this.photo = JSON.stringify(photo).replace(/[\\"]/g,'');
          

          this.afAuth.auth.currentUser.updateProfile({displayName:this.afAuth.auth.currentUser.displayName,photoURL:this.photo}).then(e =>{
            this.avatar = this.afAuth.auth.currentUser.photoURL === null?'../../assets/imgs/user.jpg':this.afAuth.auth.currentUser.photoURL;
            this.emailVerified = this.afAuth.auth.currentUser.emailVerified?'E-mail verificado.':'E-mail não verificado';
  
          });


        });
        
        

     
     
       


    }
    catch (e) {
      console.error(e);
    }

  }

}
