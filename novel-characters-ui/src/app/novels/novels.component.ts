import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data.service';
import { AddNovelComponent } from './add-novel.component';
import { Novel } from './novel.model';

@Component({
  selector: 'app-novels',
  templateUrl: './novels.component.html',
  styleUrls: ['./novels.component.scss']
})
export class NovelsComponent {
  
  displayedColumns: string[] = ['name', 'genre', 'action'];
  dataSource: MatTableDataSource<Novel> =  new MatTableDataSource<Novel>();

  constructor(private dataService: DataService, 
              public dialog: MatDialog) {
    this.getData();
  }
  getData() {
    this.dataService.getNovels().subscribe(novels => {      
      this.dataSource.data = novels;
    });
  }
  openAddEditNovelDialog(novel: Novel | undefined = undefined): void {
    const dialogRef = this.dialog.open(AddNovelComponent, {
      data: novel,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getData();
    });
  }  
  delete(novelId: number) {
    this.dataService.deleteNovel(novelId).subscribe(() => {
      this.getData();
    });
  }
}
