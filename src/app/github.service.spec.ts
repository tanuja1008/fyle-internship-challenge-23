// src/app/github.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService],
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrieve repositories by username', () => {
    const dummyRepos = [{ name: 'Repo 1' }, { name: 'Repo 2' }];
    service.getUserRepos('testuser').subscribe((repos) => {
      expect(repos.repos.length).toBe(2);
      expect(repos.repos).toEqual(dummyRepos);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/testuser/repos?page=1&per_page=10`);
    expect(req.request.method).
