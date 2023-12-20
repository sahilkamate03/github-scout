import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user details', () => {
    const mockUser = { id: 1, name: 'John Doe' };
    const githubUsername = 'johndoe';

    service.getUser(githubUsername).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${githubUsername}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should get user repositories', () => {
    const mockRepos = [{ id: 1, name: 'repo1' }, { id: 2, name: 'repo2' }];
    const githubUsername = 'johndoe';
    const page = 1;
    const per_page = 10;

    service.getUserRepo(githubUsername, page, per_page).subscribe(repos => {
      expect(repos).toEqual(mockRepos);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${githubUsername}/repos?page=${page}&per_page=${per_page}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRepos);
  });

  it('should get page number from link header', () => {
    const linkHeader = '<https://api.github.com/users/johndoe/repos?page=2&per_page=10>; rel="next", <https://api.github.com/users/johndoe/repos?page=3&per_page=10>; rel="last"';

    const pageNumber = service.getPageNumber(linkHeader);

    expect(pageNumber).toBe(3);
  });

  it('should get max page number', async () => {
    const githubUsername = 'johndoe';
    const per_page = 10;
    const mockMaxPage = 5;

    service.getMaxPage(githubUsername, per_page).then(maxPage => {
      expect(maxPage).toBe(mockMaxPage);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${githubUsername}/repos?per_page=${per_page}`);
    expect(req.request.method).toBe('GET');
    req.flush([], { headers: { 'Link': `<https://api.github.com/users/${githubUsername}/repos?page=${mockMaxPage}&per_page=${per_page}>; rel="last"` } });
  });
});

