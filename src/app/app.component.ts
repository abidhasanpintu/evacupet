import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { LocalWeatherPage } from "../pages/local-weather/local-weather";
import { SplashPage } from "../pages/splash/splash";
import { EditProfilePage } from "../pages/edit-profile/edit-profile";

import { AuthenticationService } from '../services/authentication.service';


export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = LoginPage;
  rootPage: any;
  aService: AuthenticationService;

  appMenuItems: Array<MenuItem>;
  
  myInfo: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
	public authenticationService: AuthenticationService
	
  ) {
    this.initializeApp();
	this.aService = authenticationService;
	authenticationService.getUser()
      .then(
        data => {
			if(data==null){
				this.rootPage = LoginPage;
			}else{
				authenticationService.validateAuthToken(data.token).subscribe(
					res => {
						
						authenticationService.getMe(data.token).subscribe(
							res => { this.myInfo = res.json(); this.aService.userInfo = this.myInfo; console.log(this.myInfo); this.rootPage = HomePage; },
							err => this.rootPage = LoginPage
						);
						
					},
					err =>   this.rootPage = LoginPage
				)
			}
			
		  
          
        },
        err => this.rootPage = LoginPage
      );

    this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home'},
      {title: 'Animals', component: LocalWeatherPage, icon: 'logo-octocat'},
	  {title: 'About', component: LocalWeatherPage, icon: 'md-information-circle'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      this.keyboard.disableScroll(true);
	  
	  this.rootPage = SplashPage;
	  
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
	  this.aService.logOut();
	  this.nav.setRoot(LoginPage);
  }
  
  editProfile(){
	  
	  this.nav.setRoot(EditProfilePage);
	  
  }

}
