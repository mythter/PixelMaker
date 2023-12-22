import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MouseService } from '../../shared/services/mouse.service';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrl: './main-window.component.css'
})
export class MainWindowComponent implements OnInit {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  @HostListener('mousedown', ['$event'])
  onMouseDown(e: Event) {
    console.log(e);
  }

  constructor(private mouseService: MouseService) {
    mouseService.clickCell$.subscribe(e => {
      console.log(e);
    });
  }

  ngOnInit(): void {
    console.log(this.container);
  }
}
