import { Injectable, NgZone } from '@angular/core';
import { window } from '@angular/platform-browser/src/facade/browser';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Store } from '@ngrx/store';


import { CLIENT_ID} from './constants';
import { GapiLoader } from "./gapi-loader.service";

@Injectable()
export class Authorization {
	private isSignedIn: boolean = false;
	private _googleAuth: any;

	constructor(
		private zone: NgZone,

		private gapiLoader: GapiLoader

		) {
		this.loadAuth();
	}

	loadAuth () {
		// attempt to SILENT authorize
		this.gapiLoader
			.load('auth2')
			.subscribe(authInstance => {
				if (authInstance && authInstance.currentUser) {
					return this._googleAuth = authInstance;
				}
				this.authorize()
					.then(GoogleAuth => {
						const isSignedIn = GoogleAuth.isSignedIn.get();
						this._googleAuth = GoogleAuth;
						if (isSignedIn) {
							this.signIn();
						}
					});
			});
	}

	authorize () {
		const authOptions = {
			client_id: `${CLIENT_ID}.apps.googleusercontent.com`
		};
		return window.gapi.auth2.init(authOptions);
	}

	signIn () {
		const run = (fn) => (r) => this.zone.run(() => fn.call(this, r));
		const scope = 'profile email https://www.googleapis.com/auth/youtube';
		const signOptions = { scope };
		if (this._googleAuth) {
			this._googleAuth
				.signIn(signOptions)
				.then(
					run(this.onLoginSuccess),
					run(this.onLoginFailed)
				);
		}
	}

	onLoginSuccess(response) {
		const token = response.getAuthResponse().access_token;
		this.isSignedIn = true;
		
	}

	onLoginFailed (response) {
		console.log('FAILED TO LOGIN:', response);
	}

	isSignIn () {
		return this.isSignedIn;
	}
}
