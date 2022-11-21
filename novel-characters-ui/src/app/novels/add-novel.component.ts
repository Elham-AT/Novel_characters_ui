import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { Novel } from './novel.model';

@Component({
  selector: 'app-add-novel',
  templateUrl: './add-novel.component.html',
  styleUrls: ['./add-novel.component.scss']
})
export class AddNovelComponent {

  novel: Novel | undefined = undefined;
  name: string = "";
  genre: string = "";
  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<AddNovelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Novel | undefined
  ) {
    this.novel = data;
    if(this.novel) {
      this.name = this.novel.novelName;
      this.genre = this.novel.novelGenre;
    }
  }
  addEdit(): void {
    if (!this.novel)
      this.dataService.addNovel({
        novelName: this.name,
        novelGenre: this.genre
      }).subscribe();
    else 
    this.dataService.editNovel({
      novelId: this.novel.id,
      novelName: this.name,
      novelGenre: this.genre
    }).subscribe();
    this.dialogRef.close();
  }
}
