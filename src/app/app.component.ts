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

  getResults(username: any) {
    this.githubUsername = username;

    this.getUserDetail(username);
    this.getRepoDetail(username);
  }

  getUserDetail(username: any) {
    // Access the form data here and perform necessary actions
    // console.log(formData);
    this.githubUsername = username;

    this.apiService.getUser(username).subscribe((data: any) => {
      console.log(data); // Explore the data available
      this.userData = data; // Assign the JSON data to the property
    });
  }

  updatePerPage(perPage: number | null) {
    console.log("Per Page: " + perPage);
    if (perPage === null) {
      perPage = this.perPage;
    }
    if (perPage >= 1 && perPage <= 100) {
      this.perPage = perPage;
      console.log("Per Page: " + this.perPage);
      this.getRepoDetail(this.githubUsername);
    } else {
      console.log("Invalid perPage value. Please enter a value between 1 and 100.");
    }
  }

  getRepoDetail(username: any) {
    // Access the form data here and perform necessary actions
    // console.log(formData);
    this.githubUsername = username;

    this.apiService.getUserRepo(username, this.currentPage, this.perPage).subscribe((data: any) => {
      console.log(data); // Explore the data available
      this.repoData = data; // Assign the JSON data to the property
    });
  }

  updateCurrentPageNumber(pageNumber: number) {
    this.currentPage = pageNumber;
    console.log("Current Page Number: " + this.currentPage);
    this.getRepoDetail(this.githubUsername);
  }

  constructor(
    private apiService: ApiService
  ) { }

  async handlePagination() {
    this.maxPage = await this.apiService.getMaxPage(this.githubUsername, this.perPage) ?? 1;
  }

  ngOnInit() {
    this.apiService.getUserRepo('fylein', this.currentPage, this.perPage).subscribe((data: any) => {
      console.log(data); // Explore the data available
      this.repoData = data; // Assign the JSON data to the property
    });

    this.apiService.getUser('fylein').subscribe((data: any) => {
      console.log(data); // Explore the data available
      this.userData = data; // Assign the JSON data to the property
    });

    this.handlePagination();
  }

}

