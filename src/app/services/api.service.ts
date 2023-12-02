import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }

  getUserRepo(githubUsername: string, page: number, per_page: number) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos`,
      {
        params: new HttpParams().set('per_page', per_page).set('page', page)
      });
  }

  getPageNumber(linkHeader: string): number | null {
    const regex = /page=(\d+)>; rel="last"/;
    const match = linkHeader.match(regex);

    if (match && match[1]) {
      return parseInt(match[1], 10);
    }

    return null;
  }

  getMaxPage(githubUsername: string, per_page: number): Promise<number> {
    return new Promise((resolve, reject) => {
      var maxPage = 1;
      this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos`, {
        params: new HttpParams().set('per_page', per_page),
        observe: 'response'
      }).subscribe(response => {
        const linkHeader = response.headers.get('Link');
        const links = linkHeader?.split(',');
        const prevLink = links?.find(l => l.includes('rel="prev"'));
        const nextLink = links?.find(l => l.includes('rel="next"'));
  
        const pageNumber = this.getPageNumber(linkHeader!);
        if (pageNumber !== null) {
          maxPage = pageNumber;
        }
      }, error => {
        reject(error);
      }, () => {
        resolve(maxPage);
      });
    });
  }
  

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
