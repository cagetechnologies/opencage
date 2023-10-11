import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CreateKnowledgeSet } from '../models/create-knowledge-set';
import { KnowledgeSet } from '../models/knowledge-set';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService {

  knowledgeSets = new BehaviorSubject([]);

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    console.log("Getting knowledge");
    this.httpClient
    .get(
      "/api/knowledgesets",
      { headers: new HttpHeaders().set('X-Access-Token', `Bearer ${this.authService.token}`) }
    )
    .subscribe((results: KnowledgeSet[]) => {
      console.log('Got knowledge');
      let knowledgeSets = results;

      this.knowledgeSets.next(knowledgeSets);

    });
  }

  createKnowledgeSet(createKnowledgeSet: CreateKnowledgeSet) {
    let promise = new Promise<KnowledgeSet>((resolve, reject) => {
      this.httpClient
        .post(
          "/api/knowledgesets",
          createKnowledgeSet,
          { headers: new HttpHeaders().set("Content-Type", "application/json").set('X-Access-Token', `Bearer ${this.authService.token}`) }
        )
        .toPromise()
        .then(result => {
          console.log(result);
          if (result["result"] == 0) {
            let knowledgeSets = this.knowledgeSets.value;
            knowledgeSets.push(result['knowledgeSet']);
            this.knowledgeSets.next(knowledgeSets);
            resolve(result['knowledgeSet']);
          } else {
            reject();
          }
        });
    });

    return promise;
  }
}
