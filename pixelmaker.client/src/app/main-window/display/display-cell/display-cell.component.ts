import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { MouseService } from '../../../../shared/services/mouse.service';
import { CellsService } from '../../../../shared/services/cells.service';
import { Block } from '../../../../shared/models/block.model';

@Component({
  selector: 'app-display-cell',
  templateUrl: './display-cell.component.html',
  styleUrl: './display-cell.component.css'
})

export class DisplayCellComponent {
  @Input() block!: Block;

  onTop: boolean = false;

  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    this.onTop = true;
    this.mouseService.onCellDown({ event: e, cell: this.block });
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseService.onCellMove(e);
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(e: MouseEvent) {
    this.onTop = false;
    this.mouseService.onCellUp(e);
  }

  constructor(private mouseService: MouseService) {


  }
}
