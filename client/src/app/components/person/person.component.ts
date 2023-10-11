import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  text: string;
  user: any;

  constructor(private httpClient: HttpClient, private authService: AuthService) { 
    this.httpClient.get('/api/users/' + this.authService.user.id, { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((user) => {
      this.text = JSON.stringify(user);
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

}
