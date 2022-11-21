import { Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data.service';
import { Novel } from '../novels/novel.model';
import { Character } from './characters.model';
import { forkJoin, of, throwError } from 'rxjs';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})

export class CharactersComponent {


  displayedColumns: string[] = ['novel-name', 'name', 'gender', 'age', 'action'];  
  dataSource: MatTableDataSource<Character> =  new MatTableDataSource<Character>();
  @ViewChild('table', { static: true }) table: MatTable<Character> | undefined;
  constructor(private dataService: DataService) {
    this.dataService.getCharacters().subscribe(characters => {
      this. getData();
    });
  }
  
  getData() {
    this.dataService.getCharacters().subscribe(characters => {
      this.dataSource.data = characters;
    });
  }
  delete(characterId: number) {
    this.dataService.deleteCharacter(characterId).subscribe(() => {
      this. getData();
    });
  }
}
