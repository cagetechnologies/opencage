import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { KnowledgeService } from 'src/app/services/knowledge.service';

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss']
})
export class KnowledgeComponent implements OnInit {

  knowledgeSets: any[];

  constructor(private router: Router, private knowledgeSetsService: KnowledgeService, private cdr: ChangeDetectorRef, private authService: AuthService) { 
    this.knowledgeSetsService.knowledgeSets.subscribe((value) => {
      this.knowledgeSets = value;
      this.cdr.detectChanges();
    });
  }

  ngOnInit(): void {
  }

  gotoSettings() {
    this.router.navigate(['/settings']);
  }

}
