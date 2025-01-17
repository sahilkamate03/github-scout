# GitHub-Scout
GitHub-Scout is a web application built using Angular that allows users to retrieve comprehensive information about a GitHub user and their repositories. The project leverages the GitHub API to fetch details such as the user's bio, location, and other profile-related information. Additionally, it provides an in-depth overview of each repository, including descriptions and topics associated with the user's projects.

Users can input a GitHub username into the application, triggering a seamless and dynamic display of the requested information. The application enhances the user experience by presenting the data in a clean and organized format, making it easy to navigate and comprehend. GitHub-Scout is a powerful tool for developers and enthusiasts seeking quick insights into a user's GitHub profile and their repository landscape. It offers a convenient way to explore and understand the diverse projects hosted on GitHub.

## Installation

1. Fork this repository to your GitHub account.
2. Clone the forked repository and proceed with the steps mentioned below.

### Install requirements
* Install Angular CLI [Ref](https://angular.io/cli)
* Run `npm install` in this repository 

## Development server

Run `ng serve` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.


## Run Test Cases

Run `ng test` to start test cases. 

## Features

- **User Search**: Easily search for GitHub users by entering their username.
- **Profile Details**: Get detailed information about a user, including their bio, location, and social links.
- **Repository Display**: View a list of repositories for the searched user, complete with descriptions and languages used.
- **Pagination**: Navigate through multiple pages of repositories with pagination controls.
- **Loading Skeletons**: Experience a smooth loading experience with skeleton loaders while data is being fetched.
- **Error Handling**: Gracefully handle errors, providing informative messages for invalid input or failed API requests.

# Utilized Libraries

This Angular application makes use of several libraries to enhance functionality and streamline the development process:

## [Angular](https://angular.io/)
Angular serves as the core framework for this web application, providing robust capabilities for UI development and application logic management.

## [ngx-skeleton-loader](https://www.npmjs.com/package/ngx-skeleton-loader)
The `ngx-skeleton-loader` library is integrated to improve the user experience during data retrieval. It offers loading skeletons, creating a seamless transition while awaiting data.

## [HttpClientModule](https://angular.io/api/common/http/HttpClientModule)
`HttpClientModule`, an integral part of the Angular framework, is employed for making HTTP requests. It facilitates communication with the GitHub API to retrieve necessary data.

## [FormsModule](https://angular.io/guide/forms)
Angular's `FormsModule` is crucial for form handling and implementing two-way data binding. It enables the capture of user input for GitHub username search.

## [NgxSkeletonLoaderModule](https://www.npmjs.com/package/ngx-skeleton-loader)
The `NgxSkeletonLoaderModule` is imported to seamlessly integrate the `ngx-skeleton-loader` library, enhancing the user interface by incorporating loading skeletons during data retrieval.

