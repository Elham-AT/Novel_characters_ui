import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { NovelsComponent } from './novels/novels.component';

const routes: Routes = [  
  { path: '', component: NovelsComponent },  
  { path: 'characters/:novelId', component: CharactersComponent },  
  { path: 'characters', component: CharactersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
