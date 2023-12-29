import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.prod';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }


  getUser(githubUsername: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.apiKey}`);
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`, { headers });
  }

  getUserRepo(githubUsername: string, page: number, per_page: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.apiKey}`);
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos`,
      {
        headers,
        params: new HttpParams().set('per_page', per_page).set('page', page)
      });
  }

  getUserRepoLang(githubRepoLink: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.apiKey}`);
    return this.httpClient.get(githubRepoLink,
      {
        headers,
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
      const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.apiKey}`);
      this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos`, {
        headers,
        params: new HttpParams().set('per_page', per_page),
        observe: 'response'
      }).subscribe(response => {
        const linkHeader = response.headers.get('Link');
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
