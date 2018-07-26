import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'page-local-weather',
  templateUrl: 'edit-profile.html'
})
export class EditProfilePage {
	
	loadingIcon: any;
	editForm: FormGroup;
	error_message: String;
	
	myInfo: any;
  
  constructor(
    public navCtrl: NavController,
	public formBuilder: FormBuilder,
	public aService: AuthenticationService
	) {
		
		this.myInfo = aService.userInfo;
  }

  ionViewWillLoad() {
	
	this.loadingIcon = false;
	this.editForm = this.formBuilder.group({
		id: new FormControl('', Validators.required),
		first_name: new FormControl('', Validators.compose([ Validators.required ])),
		last_name: new FormControl('', Validators.required),
		mobile_number: new FormControl('', Validators.required),
		address: new FormControl('', Validators.required),
		city: new FormControl('', Validators.required),
		state: new FormControl('', Validators.required),
		zip: new FormControl('', Validators.required)
		
    });
	
  }
  
  
  editProfile(value){
	  
	this.loadingIcon = true;
	
	this.aService.getUser()
      .then(
        data => {
			
			this.aService.editProfile(data.token,value)
			.subscribe(res => {
				this.loadingIcon = false;
				this.error_message = 'Updated Successfully!';
				setTimeout( () => { this.error_message = ''; }, 4000);
				
			},
			err => {
			   this.error_message = "Invalid credentials.";
			   this.loadingIcon = false;
			   this.error_message = 'Unable to update, Plese try later.';
			   setTimeout( () => { this.error_message = ''; }, 4000);
			 })
			
        }
      );
	
		
	  
  }
  

}
