import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { PuzzleCreationGridComponent } from './puzzle-creation-grid/puzzle-creation-grid.component';
import { LoginComponent } from './login/login.component';
import { RecordComponent } from './record/record.component';
import { TutorialComponent } from './tutorial/tutorial.component';

const routes: Routes = [
  { path: 'tutorial', component: TutorialComponent },
  { path: 'puzzle', component: HomeComponent },
  { path: 'records', component: RecordComponent },
  { path: 'puzzle-creation', component: PuzzleCreationGridComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
