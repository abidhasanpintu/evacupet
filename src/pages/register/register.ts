import {Component} from "@angular/core";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

	loadingIcon:boolean = false;
	registerForm:FormGroup;
	error_message: any;

  constructor(public nav: NavController, 
  public authenticationService: AuthenticationService,
  public formBuilder: FormBuilder) {
	  
	  
	  
  }
  
  ionViewWillLoad() {
    this.loadingIcon = false;
	this.registerForm = this.formBuilder.group({
		username: new FormControl('', Validators.compose([ Validators.required ])),
		first_name: new FormControl('', Validators.compose([ Validators.required ])),
		last_name: new FormControl('', Validators.required),
		email: new FormControl('', Validators.compose([ Validators.required ])),
		mobile_number: new FormControl('', Validators.required),
		address: new FormControl('', Validators.required),
		city: new FormControl('', Validators.required),
		state: new FormControl('', Validators.required),
		zip: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required)
    });
	
  }
  
  

  // register and go to home page
  register(values) {
	this.loadingIcon = true;
	let username = 'vsidhaka'; // this should be an administrator Username
    let password = '3dev@EVACU'; // this should be an administrator Password
    //only authenticated administrators can create users
    this.authenticationService.doLogin(username, password)
    .subscribe(
      res => {
        let user_data = {
          username: values.username,
		  first_name: values.first_name,
		  last_name: values.last_name,
          email: values.email,
		  mobile_number: values.mobile_number,
		  address: values.address,
		  city: values.city,
		  state: values.state,
		  zip: values.zip,
          password: values.password
        };
        this.authenticationService.doRegister(user_data, res.json().token)
        .subscribe(
          result => {
            this.error_message = 'Your account has been created successfully. Please check your email to active your account.';
			this.loadingIcon = false;
          },
          error => {
			this.error_message = error.json().message;
			this.loadingIcon = false;
          }
        );
      },
      err => {
        console.log(err);
		this.loadingIcon = false;
      }
    )
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
