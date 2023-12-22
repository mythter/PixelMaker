import { Component, HostListener, Input } from '@angular/core';
import { MouseService } from '../../../../shared/services/mouse.service';

@Component({
  selector: 'app-display-cell',
  templateUrl: './display-cell.component.html',
  styleUrl: './display-cell.component.css'
})

export class DisplayCellComponent {
  @Input() value: number = 0;

  @HostListener('mousedown', ['$event'])
  onMouseDown(e: Event) {
    this.mouseService.onClickCell(this.value);
  }

  constructor(private mouseService: MouseService) {

  }
}
