import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from './characters/characters.model';
import { AddNovelReq, EditNovelReq, Novel } from './novels/novel.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {  
  constructor(private http: HttpClient) { }
  apiUrl = '/api';
  getNovels(): Observable<Novel []> {
    return this.http.get<Novel []>(`${this.apiUrl}/novel`);
  }
  addNovel(novel: AddNovelReq) {
    return this.http.post<Novel>(`${this.apiUrl}/novel`, novel);
  }
  editNovel(novel: EditNovelReq) {
    return this.http.put<Novel>(`${this.apiUrl}/novel`, novel);
  }
  deleteNovel(novelId: number) {
    return this.http.delete(`${this.apiUrl}/novel/${novelId}`);
  }
  getCharacters(): Observable<Character []> {
    return this.http.get<Character []>(`${this.apiUrl}/fictional_character`);
  }  
  deleteCharacter(characterId: number) {
    return this.http.delete(`${this.apiUrl}/fictional_character/${characterId}`);
  }
}
