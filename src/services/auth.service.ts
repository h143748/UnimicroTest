import { Injectable, EventEmitter } from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from "rxjs";
import {Environment} from '../environments/environments';
import {UserManager, Log, MetadataService, User} from 'oidc-client'
import { Token } from "@angular/compiler";

const settings: any = {
    authority: Environment.authority,
        client_id: Environment.client_id,
        redirect_uri: Environment.redirect_uri,
        post_logout_redirect_uri: Environment.post_logout_redirect_uri,
        response_type: Environment.response_type,
        scope: Environment.scope,
        filterProtocolClaims: Environment.filterProtocolClaims,
        loadUserInfo: Environment.loadUserInfo,
        automaticSilentRenew: true,
        silent_redirect_uri: Environment.silent_redirect_uri,
  
  };

userManager: UserManager;

  @Injectable({
    providedIn: 'root',
  })
  export class AuthService{
    mgr: UserManager;

    userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();
    currentUser?: User;
    authHeaders?: HttpHeaders;

    constructor(private http: HttpClient){
      this.mgr = new UserManager(settings);
    }

    public getUser(): Promise<User | null> {
      return this.mgr.getUser();
    }
  
    public login(): Promise<void> {
      return this.mgr.signinRedirect();
    }
  
    public renewToken(): Promise<User> {
      return this.mgr.signinSilent();
    }
  
    public logout(): Promise<void> {
      return this.mgr.signoutRedirect();
    }

    public signinRedirectCallback(): Promise<User> {
      return this.mgr.signinRedirectCallback().then(user => this.currentUser = user);
    }
    public isLoggedIn(): boolean{
      return !!this.currentUser && !this.currentUser.expired
    }

    public getToken(): string | undefined {
      return this.currentUser?.access_token;
    }



    // getToken

    //isLoggedInObs

    //isAdminUser
  }