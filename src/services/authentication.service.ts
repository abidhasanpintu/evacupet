import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import * as Config from '../config';

@Injectable()
export class AuthenticationService {

	public userInfo: any;

  constructor(
    public storage: Storage,
    public http: Http
  ){}

  getUser(){
    return this.storage.get('User');
  }

  setUser(user){
    return this.storage.set('User', user);
  }

  logOut(){
    return this.storage.clear();
  }

  doLogin(username, password){
    return this.http.post(Config.WP_URL + 'wp-json/jwt-auth/v1/token',{
      username: username,
      password: password
    })
  }

  doRegister(data, token){
    //return this.http.post(Config.WP_API_URL + 'users?token=' + token, user_data);
	let header : Headers = new Headers();
	header.append('Authorization','Bearer ' + token);
	return this.http.post(Config.WP_API_URL + 'users/',data, {headers: header});
		
  }

  validateAuthToken(token){
    let header : Headers = new Headers();
    header.append('Authorization','Bearer ' + token);
    return this.http.post(Config.WP_URL + 'wp-json/jwt-auth/v1/token/validate?token=' + token,{}, {headers: header});
  }
  
  
  getMe(token){
	  
	let header : Headers = new Headers();
    header.append('Authorization','Bearer ' + token);
	
	//return this.http.post(Config.WP_API_URL + 'users/me?token=' + token,{}, {headers: header});
	return this.http.post(Config.WP_API_URL + 'users/me',{}, {headers: header});
	
  }
  
  editProfile(token,value){
		console.log(value);
		
		let data : any = {
			first_name : value.first_name,
			last_name : value.last_name,
			mobile_number: value.mobile_number,
			address: value.address,
			city: value.city,
			state: value.state,
			zip: value.zip,
		};
		
		//console.log(data);
		
	  
		let header : Headers = new Headers();
		header.append('Authorization','Bearer ' + token);
		//return this.http.post(Config.WP_API_URL + 'users/me?token=' + token,{}, {headers: header});
		return this.http.post(Config.WP_API_URL + 'users/' + value.id,data, {headers: header});
	  
  }
  
  
}
