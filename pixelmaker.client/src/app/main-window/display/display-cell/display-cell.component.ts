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
  //@ViewChild("cell", { static: true }) cell!: ElementRef<HTMLElement>
  @Input() block!: Block;

  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    if (e.button == 0) {
      this.mouseService.onCellDown({ event: e, cell: this.block });
    }
    else if (e.button == 2) {
      e.preventDefault();
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseService.onCellMove(e);
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(e: MouseEvent) {
    this.mouseService.onCellUp(e);
  }


  constructor(private mouseService: MouseService,
    private cellsService: CellsService) {

    cellsService.cellMove$.subscribe(o => {
      if (o.cell == this.block) {
        this.block.x = o.position.x;
        this.block.y = o.position.y;
      }
    });

  }
}
