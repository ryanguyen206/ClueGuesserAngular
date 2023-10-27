import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PuzzleCreationComponent } from './puzzle-creation/puzzle-creation.component';
import { RecordComponent } from './record/record.component';
import { TutorialComponent } from './tutorial/tutorial.component';

const routes: Routes = [
  { path: '', component: TutorialComponent },
  { path: 'puzzle', component: HomeComponent },
  { path: 'records', component: RecordComponent },
  { path: 'puzzle-creation', component: PuzzleCreationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
