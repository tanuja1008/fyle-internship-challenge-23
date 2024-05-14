// src/app/github.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private baseUrl = 'https://api.github.com/users';

  constructor(private http: HttpClient) {}

  getUserRepos(username: string, page: number = 1, perPage: number = 10): Observable<any> {
    const url = `${this.baseUrl}/${username}/repos?page=${page}&per_page=${perPage}`;
    return this.http.get<any>(url).pipe(
      map((data: any) => {
        return {
          repos: data,
          totalCount: data.length // GitHub API doesn't provide total count in this endpoint
        };
      })
    );
  }
}
