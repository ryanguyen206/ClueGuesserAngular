import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PuzzleCreationComponent } from './puzzle-creation/puzzle-creation.component';
import { RecordComponent } from './record/record.component';
import { PuzzleGridComponent } from './puzzle-grid/puzzle-grid.component';
import { PuzzleCreationGridComponent } from './puzzle-creation-grid/puzzle-creation-grid.component';
import { TutorialComponent } from './tutorial/tutorial.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PuzzleCreationComponent,
    RecordComponent,
    PuzzleGridComponent,
    PuzzleCreationGridComponent,
    TutorialComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
