import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse, ICharacter } from '../types/api-response.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private readonly http: HttpClient) { }

  getCharacters(page: number): Observable<IApiResponse<ICharacter>> {
    return this.http.get<IApiResponse<ICharacter>>(`https://rickandmortyapi.com/api/character/?page=${page}`);
  }

  searchCharacter(name: string, page: number): Observable<IApiResponse<ICharacter>> {
    return this.http.get<IApiResponse<ICharacter>>(`https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`);
  }
}
