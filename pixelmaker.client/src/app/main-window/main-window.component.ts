import { Component, HostListener, OnInit } from '@angular/core';
import { MouseService } from '../../shared/services/mouse.service';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrl: './main-window.component.css'
})
export class MainWindowComponent implements OnInit {

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseService.onMove(e);
  }

  constructor(private mouseService: MouseService) {

  }

  ngOnInit(): void {
   
  }
}
