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
  serachInput: any;
  isLoading: boolean = false;
  selectedOption = 10;
  errorMessage ='';

  // Get results for the given username
  getResults(username: any) {
    this.isLoading = true;
    this.githubUsername = username;
    this.getUserDetail(this.githubUsername);
    this.getRepoDetail(this.githubUsername);
    this.isLoading = false;
  }

  // Get user details for the given username
  getUserDetail(username: any) {
    this.isLoading = true;
    this.githubUsername = username;
    this.apiService.getUser(username).subscribe(
      (data: any) => {
        console.log(data);
        this.userData = data;
        this.isLoading = false;
        this.user = true;
      },
      (error: any) => {
        console.error(error);
        this.user = false;
        this.isLoading = false;
        console.log(error.errorMessage);
        this.errorMessage = 'User not found. Please enter a valid username.';
      }
    );
  }

  // Update the number of items per page
  updatePerPage(perPage: string) {
    this.isLoading = true;
    var perPageNumber = parseInt(perPage);
    this.currentPage = 1;
    if (perPageNumber >= 1 && perPageNumber <= 100) {
      this.perPage = perPageNumber;
      console.log("Per Page: " + this.perPage);
      this.getRepoDetail(this.githubUsername);
    } else {
      console.log("Invalid perPage value. Please enter a value between 1 and 100.");
    }
    this.isLoading = false;
  }

  // Get repository details for the given username
  getRepoDetail(username: any) {
    this.isLoading = true;
    this.githubUsername = username;
    this.apiService.getUserRepo(this.githubUsername, this.currentPage, this.perPage).subscribe((data: any) => {
      console.log(data);
      this.repoData = data;
    });
    this.handlePagination();
    this.isLoading = false;
  }

  // Update the current page number
  updateCurrentPageNumber(pageNumber: number) {
    this.isLoading = true;
    this.currentPage = pageNumber;
    console.log("Current Page Number: " + this.currentPage);
    this.getRepoDetail(this.githubUsername);
    this.isLoading = false;
  }

  constructor(
    private apiService: ApiService
  ) { }

  // Handle pagination
  async handlePagination() {
    this.isLoading = true;
    this.maxPage = await this.apiService.getMaxPage(this.githubUsername, this.perPage) ?? 1;
    this.isLoading = false;
  }

  ngOnInit() {
    // this.getResults(this.githubUsername);
  }

}
