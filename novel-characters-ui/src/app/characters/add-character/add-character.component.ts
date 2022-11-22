import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { Novel } from 'src/app/novels/novel.model';
import { Character } from '../characters.model';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.scss']
})
export class AddCharacterComponent {

  character: Character | undefined = undefined;
  name: string = "";
  gender: string = "";
  age: number = 0;
  novelId: number = 0;

  novels: Novel[] = [];

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<AddCharacterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Character | undefined
  ) {
    this.character = data;
    if (this.character) {
      this.name = this.character.name;
      this.gender = this.character.gender;
      this.age = this.character.age;
      this.novelId = this.character.novel.id;
    }

    this.dataService.getNovels().subscribe(novels => {
      this.novels = novels;
      if (this.novelId == 0)
        this.novelId = this.novels[0].id;

    });
  }
  addEdit(): void {
    if (!this.character)
      this.dataService.addCharacter({
        name: this.name,
        gender: this.gender,
        age: this.age,
        novelId: this.novelId
      }).subscribe();
    else
      this.dataService.editCharacter({
        characterId: this.character.id,
        name: this.name,
        gender: this.gender,
        age: this.age,
        novelId: this.novelId
      }).subscribe();
    this.dialogRef.close();
  }

}
