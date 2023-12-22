import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainWindowComponent } from './main-window/main-window.component';
import { TopPanelComponent } from './main-window//top-panel/top-panel.component';
import { LeftPanelComponent } from './main-window//left-panel/left-panel.component';
import { MouseService } from '../shared/services/mouse.service';
import { DisplayComponent } from './main-window/display/display.component';
import { DisplayCellComponent } from './main-window/display/display-cell/display-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    MainWindowComponent,
    TopPanelComponent,
    LeftPanelComponent,
    DisplayComponent,
    DisplayCellComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: MainWindowComponent, pathMatch: 'full' },
    ])
  ],
  providers: [MouseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
