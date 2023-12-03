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
  user: boolean = false;
  githubUsername: string = '';
  currentPage: number = 1;
  maxPage: number = 1;
  perPage: number = 10;
  isLoadingRepoDetail: boolean = false;
  isLoadingUserDetail: boolean = false;
  selectedOption: number = 10;
  errorMessage: string = '';

  // Get results for the given username
  getResults(username: any) {
    this.githubUsername = username;
    this.getUserDetail(this.githubUsername);
    this.getRepoDetail(this.githubUsername);
  }

  // Get user details for the given username
  getUserDetail(username: any) {
    this.isLoadingUserDetail = true;
    this.githubUsername = username;
    this.apiService.getUser(username).subscribe(
      (data: any) => {
        this.userData = data;
        this.user = true;
        setTimeout(() => {
          this.isLoadingUserDetail = false;
        }, 200);

      },
      (error: any) => {
        this.isLoadingUserDetail = false;
        this.user = false;
        this.errorMessage = 'User not found. Please enter a valid username.';
      }
    );
  }

  // Get repository details for the given username
  getRepoDetail(username: any) {
    this.isLoadingRepoDetail = true;
    this.githubUsername = username;
    this.apiService.getUserRepo(this.githubUsername, this.currentPage, this.perPage).subscribe((data: any) => {
      this.repoData = data;
    });
    this.handlePagination();

    setTimeout(() => {
      this.isLoadingRepoDetail = false;
    }, 200); // Delay of 0.5 seconds
  }

  // Update the number of items per page
  updatePerPage(perPage: string) {
    var perPageNumber = parseInt(perPage);
    this.currentPage = 1;
    if (perPageNumber >= 1 && perPageNumber <= 100) {
      this.perPage = perPageNumber;
      this.getRepoDetail(this.githubUsername);
    }
  }

  // Update the current page number
  updateCurrentPageNumber(pageNumber: number) {
    this.currentPage = pageNumber;
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

  }

}
