import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html'
})
export class SplashPage {

  constructor(public nav: NavController, 
  public forgotCtrl: AlertController, 
  public menu: MenuController, 
  public formBuilder: FormBuilder,
  public toastCtrl: ToastController, 
  public authenticationService: AuthenticationService
  ) {
    this.menu.swipeEnable(false);
  }

}
