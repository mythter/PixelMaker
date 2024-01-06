import { Component, HostListener, Input } from '@angular/core';
import { MouseService } from '../../../../shared/services/mouse.service';
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
    if (e.button == 0) {
      this.onTop = true;
      this.mouseService.onCellDown({ event: e, cell: this.block });
    }
    else if (e.button == 2) {
      this.mouseService.onDisplayDown(e);
    }
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
