// src/app/repo-list/repo-list.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepoListComponent } from './repo-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GithubService } from '../github.service';
import { of } from 'rxjs';

describe('RepoListComponent', () => {
  let component: RepoListComponent;
  let fixture: ComponentFixture<RepoListComponent>;
  let githubService: GithubService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepoListComponent],
      imports: [HttpClientTestingModule],
      providers: [GithubService],
    }).compileComponents();

    fixture = TestBed.createComponent(RepoListComponent);
    component = fixture.componentInstance;
    githubService = TestBed.inject(GithubService);
  });

  it('should fetch repositories on username change', () => {
    const dummyRepos = [{ name: 'Repo 1' }, { name: 'Repo 2' }];
    spyOn(githubService, 'getUserRepos').and.returnValue(of({ repos: dummyRepos, totalCount: 2 }));

    component.username = 'testuser';
    component.ngOnChanges({
      username: {
        currentValue: 'testuser',
        previousValue: '',
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.repos.length).toBe(2);
    expect(component.repos).toEqual(dummyRepos);
  });
});
