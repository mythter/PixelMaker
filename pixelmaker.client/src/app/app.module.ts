import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainWindowComponent } from './main-window/main-window.component';
import { MouseService } from '../shared/services/mouse.service';
import { DisplayComponent } from './main-window/display/display.component';
import { DisplayCellComponent } from './main-window/display/display-cell/display-cell.component';
import { DisplayService } from '../shared/services/display.service';
import { CellsService } from '../shared/services/cells.service';
import { ToolsPanelComponent } from './main-window/tools-panel/tools-panel.component';
import { ToolButtonComponent } from './main-window/tools-panel/tool-button/tool-button.component';

@NgModule({
  declarations: [
    AppComponent,
    MainWindowComponent,
    DisplayComponent,
    DisplayCellComponent,
    ToolsPanelComponent,
    ToolButtonComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: MainWindowComponent, pathMatch: 'full' },
    ])
  ],
  providers: [
    MouseService,
    DisplayService,
    CellsService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private mouseService: MouseService) {

    document.addEventListener('contextmenu', (e) => e.preventDefault());

    window.addEventListener('mouseup', (e) => {
      mouseService.onReset();
    });

  }
}
