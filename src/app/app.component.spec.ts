import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent]
    });
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have initial values set correctly`, () => {
    expect(component.repoData).toEqual([]);
    expect(component.userData).toBeUndefined();
    expect(component.user).toBe(false);
    expect(component.githubUsername).toBe('');
    expect(component.currentPage).toBe(1);
    expect(component.maxPage).toBe(1);
    expect(component.perPage).toBe(10);
    expect(component.isLoadingRepoDetail).toBe(false);
    expect(component.isLoadingUserDetail).toBe(false);
    expect(component.selectedOption).toBe(10);
    expect(component.errorMessage).toBe('');
  });

  it('should update the number of items per page', () => {
    component.updatePerPage('20');
    expect(component.perPage).toBe(20);
  });

  it('should update the current page number', () => {
    component.updateCurrentPageNumber(2);
    expect(component.currentPage).toBe(2);
  });

  // Add more test cases for other methods and functionalities

});
