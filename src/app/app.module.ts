import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PuzzleCreationComponent } from './puzzle-creation/puzzle-creation.component';
import { RecordComponent } from './record/record.component';
import { PuzzleGridComponent } from './puzzle-grid/puzzle-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PuzzleCreationComponent,
    RecordComponent,
    PuzzleGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
