import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  email?: string;

  title = "Telefonbok";

  constructor( private authService: AuthService){}

  ngOnInit(): void{
  }

  logOut(): void{
    this.authService.logout();
  }


}


