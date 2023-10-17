import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PuzzleCreationComponent } from './puzzle-creation/puzzle-creation.component';
import { RecordComponent } from './record/record.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'records', component: PuzzleCreationComponent },
  { path: 'puzzlecreation', component: RecordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
