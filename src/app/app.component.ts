import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  repoData: any[] = [];
  userData: any;
  githubUsername: string = 'fylein';
  currentPage: number = 1;
  maxPage: number = 1;
  perPage: number = 10;
  serachInput: any;
  itemsPerPage = [10, 20, 50, 100];
  selectedOption = 10;

  // Get results for the given username
  getResults(username: any) {
    this.githubUsername = username;

    this.getUserDetail(this.githubUsername);
    this.getRepoDetail(this.githubUsername);
  }

  // Get user details for the given username
  getUserDetail(username: any) {
    this.githubUsername = username;

    this.apiService.getUser(username).subscribe((data: any) => {
      console.log(data);
      this.userData = data;
    });
  }

  // Update the number of items per page
  updatePerPage(perPage: string) {
    var perPageNumber = parseInt(perPage);
    this.currentPage = 1;
    if (perPageNumber >= 1 && perPageNumber <= 100) {
      this.perPage = perPageNumber;
      console.log("Per Page: " + this.perPage);
      this.getRepoDetail(this.githubUsername);
      this.handlePagination();
    } else {
      console.log("Invalid perPage value. Please enter a value between 1 and 100.");
    }
  }

  // Get repository details for the given username
  getRepoDetail(username: any) {
    this.githubUsername = username;
    this.apiService.getUserRepo(this.githubUsername, this.currentPage, this.perPage).subscribe((data: any) => {
      console.log(data);
      this.repoData = data;
    });
  }

  // Update the current page number
  updateCurrentPageNumber(pageNumber: number) {
    this.currentPage = pageNumber;
    console.log("Current Page Number: " + this.currentPage);
    this.getRepoDetail(this.githubUsername);
  }

  constructor(
    private apiService: ApiService
  ) { }

  // Handle pagination
  async handlePagination() {
    this.maxPage = await this.apiService.getMaxPage(this.githubUsername, this.perPage) ?? 1;
  }

  ngOnInit() {
    this.apiService.getUserRepo('fylein', this.currentPage, this.perPage).subscribe((data: any) => {
      console.log(data);
      this.repoData = data;
    });

    this.apiService.getUser('fylein').subscribe((data: any) => {
      console.log(data);
      this.userData = data;
    });

    this.handlePagination();
  }

}
