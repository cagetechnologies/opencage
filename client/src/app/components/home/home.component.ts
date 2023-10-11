import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  scrolled = false;

  @HostListener("window:scroll", []) onWindowScroll() {
    // do some stuff here when the window is scrolled
    const verticalOffset = window.pageYOffset 
          || document.documentElement.scrollTop 
          || document.body.scrollTop || 0;

    console.log('Scrolled to ' + verticalOffset);
    this.scrolled = verticalOffset > 10;
  }

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
  }

  signUpNow() {
    this.router.navigate(['/register']);
  }
}
