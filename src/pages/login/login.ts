import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loadingIcon:boolean = false;
  loginForm:FormGroup;
  error_message: String;
  navCtrl: any;

  constructor(public nav: NavController, 
  public forgotCtrl: AlertController, 
  public menu: MenuController, 
  public formBuilder: FormBuilder,
  public toastCtrl: ToastController, 
  public authenticationService: AuthenticationService
  ) {
    this.menu.swipeEnable(false);
	//this.ionViewWillLoad();
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  /*
  login() {
    this.nav.setRoot(HomePage);
  }
  */
  
  ionViewWillLoad() {
    this.loadingIcon = false;
	this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.required)
    });
	
  }
  
  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }
  
  
  login(value){
    //let loading = this.loadingCtrl.create();
    //loading.present();
	this.loadingIcon = true;
	
    this.authenticationService.doLogin(value.username, value.password)
    .subscribe(res => {
       this.authenticationService.setUser({
         token: res.json().token,
         username: value.username,
         displayname: res.json().user_display_name,
         email: res.json().user_email
       });
	   this.loadingIcon = false;
       this.nav.setRoot(HomePage);
     },
     err => {
       this.error_message = "Invalid credentials.";
	   this.loadingIcon = false;
       console.log(err);
	   setTimeout( () => { this.error_message = ''; }, 4000);
     })
  }
  
  

  skipLogin(){
    this.navCtrl.setRoot(HomePage);
  }

  goToRegister(){
    this.navCtrl.push(RegisterPage);
  }
  

}
