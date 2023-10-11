import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  name: string;
  email: string;
  password1: string;
  password2: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  register() {
    this.authService.register(this.name, this.email, this.password1).then(() => {
      if (this.authService.isLoggedIn) {
        this.router.navigate(['/search']);
      }
    });
  }

}
