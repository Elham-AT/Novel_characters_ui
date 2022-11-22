import { Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data.service';
import { Novel } from '../novels/novel.model';
import { Character } from './characters.model';
import { forkJoin, of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddCharacterComponent } from './add-character/add-character.component';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})

export class CharactersComponent {


  displayedColumns: string[] = ['novel-name', 'name', 'gender', 'age', 'action'];  
  dataSource: MatTableDataSource<Character> =  new MatTableDataSource<Character>();
  @ViewChild('table', { static: true }) table: MatTable<Character> | undefined;
  novelId: number | undefined;


  constructor(private dataService: DataService, 
                public dialog: MatDialog,
               private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if(params['novelId']) 
        this.novelId = params['novelId'];
      else 
        this.novelId = undefined;
      this.getData();

    });
  }
  
  getData() {
    if(this.novelId) {
      this.dataService.getCharactersByNovelId(this.novelId).subscribe(characters => {
        this.dataSource.data = characters;
      });
    }
    else {
      this.dataService.getCharacters().subscribe(characters => {
        this.dataSource.data = characters;
      });
    }
  }
  
  openAddEditCharacterDialog(character: Character | undefined = undefined): void {
    const dialogRef = this.dialog.open(AddCharacterComponent, {
      data: character,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getData();
    });
  }  

  delete(characterId: number) {
    this.dataService.deleteCharacter(characterId).subscribe(() => {
      this. getData();
    });
  }
}
