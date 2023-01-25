import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.css']
})
export class LoginCallbackComponent {
  constructor(
    private readonly authService : AuthService,
    private readonly router : Router
  ){}

  ngOnInit(){
    this.authService.signinRedirectCallback().then(() => this.router.navigate(['home']));
  }
}
