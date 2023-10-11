import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-set-view',
  templateUrl: './set-view.component.html',
  styleUrls: ['./set-view.component.scss']
})
export class SetViewComponent implements OnInit {

  set?: any;
  collection?: any;
  collectionId?: string;
  setId?: string;

  faTrash = faTrash;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router, private authService: AuthService) { 
    this.set = route.snapshot.data.set;
  }

  ngOnInit(): void {
    /*this.httpClient.get('/api/collections/' + this.collection.id + '/sets/' + this.setId, { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((result) => {
      this.set = result;
    });*/
  }

  back() {
    this.router.navigate(['/collections/' + this.collectionId]);
  }

}
