import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Block } from '../../../shared/models/block.model';
import { MouseService } from '../../../shared/services/mouse.service';
import { DisplayService } from '../../../shared/services/display.service';
import { Position } from '../../../shared/models/position.model';
import { CellsService } from '../../../shared/services/cells.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent implements OnInit {
  @ViewChild("display", { static: true }) display!: ElementRef<HTMLElement>

  rows: number[] = [];
  columns: number[] = [];

  mapXSize: number;
  mapYSize: number;
  cellSize: number;

  blocks: Block[] = [];
  position: Position = { x: 0, y: 0 };

  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    console.log("down");
    if (e.target == this.display.nativeElement) {
      this.mouseService.onDisplayDown(e);
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (e.target == this.display.nativeElement) {
      this.mouseService.onDisplayMove(e);
    }
  }

  initMap() {
    this.rows = [...Array(this.mapYSize / this.cellSize + 1).keys()].map(i => i * this.cellSize);
    this.columns = [...Array(this.mapXSize / this.cellSize + 1).keys()].map(i => i * this.cellSize);
  }

  constructor(
    private mouseService: MouseService,
    private displayService: DisplayService,
    private cellsService: CellsService
  ) {

    this.mapXSize = displayService.mapXSize;
    this.mapYSize = displayService.mapYSize;
    this.cellSize = displayService.cellSize;

    this.initMap();

    displayService.displayMove$.subscribe(p => {
      this.position = p;
    });

    cellsService.createCell$.subscribe(b => {
      if (!this.blocks.some(bl => bl.x == b.x && bl.y == b.y)) {
        this.blocks.push(b);
      }
    });

    cellsService.placeCell$.subscribe(o => {
      if (this.blocks.some(b => b.x == o.newPos.x && b.y == o.newPos.y)) {
        o.cell.x = o.oldPos.x;
        o.cell.y = o.oldPos.y;
      }
      else {
        o.cell.x = o.newPos.x;
        o.cell.y = o.newPos.y;
      }
    });
  }
  ngOnInit(): void {
    this.displayService.initDisplay(this.display.nativeElement);
  }
}
