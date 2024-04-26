import { Routes } from '@angular/router';
import { PuzzleViewComponent } from './views/puzzle-view/puzzle-view.component';


export const routes: Routes = [

  { path: 'sudoku', component: PuzzleViewComponent },
  { path: '', redirectTo: '/sudoku', pathMatch: 'full' },

];
