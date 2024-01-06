import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { MouseService } from "./mouse.service";
import { Block } from "../models/block.model";
import { BlockType } from "../enums/block-type";
import { DisplayService } from "./display.service";
import { Position } from "../models/position.model";

@Injectable({
  providedIn: 'root'
})
export class CellsService {

  private readonly cellSize: number;
  private readonly mapXSize: number;
  private readonly mapYSize: number;

  private position: Position = { x: 0, y: 0 };
  private oldPosition: Position = { x: 0, y: 0 };
  private offset: Position = { x: 0, y: 0 };

  private cell: Block = { x: 0, y: 0, type: BlockType.None, texture: "" };

  private removeCell: boolean = false;

  private createCellSubject = new Subject<Block>();
  createCell$ = this.createCellSubject.asObservable();

  private removeCellSubject = new Subject<Block>();
  removeCell$ = this.removeCellSubject.asObservable();

  private moveCellSubject = new Subject<{ cell: Block, position: Position }>();
  moveCell$ = this.moveCellSubject.asObservable();

  private placeCellSubject = new Subject<{ cell: Block, newPos: Position, oldPos: Position }>();
  placeCell$ = this.placeCellSubject.asObservable();

  constructor(
    private mouseService: MouseService,
    private displayService: DisplayService) {

    this.cellSize = displayService.cellSize;
    this.mapXSize = displayService.mapXSize;
    this.mapYSize = displayService.mapYSize;

    mouseService.createCell$.subscribe(e => {
      let xPos = Math.floor(e.offsetX / this.cellSize) * this.cellSize;
      let yPos = Math.floor(e.offsetY / this.cellSize) * this.cellSize;

      let block: Block = {
        texture: "https://art.pixilart.com/32675005a8e11ad.png",
        type: BlockType.Obstacle,
        x: xPos,
        y: yPos
      };

      this.createCellSubject.next(block);
    });

    mouseService.downCell$.subscribe(o => {
      this.offset = {
        x: o.event.offsetX,
        y: o.event.offsetY
      };

      this.cell = o.cell;
      this.oldPosition = { x: this.cell.x, y: this.cell.y };
    });

    mouseService.removeCell$.subscribe(e => {

    });

    mouseService.moveCell$.subscribe(e => {

      this.position = {
        x: e.clientX - displayService.position.x - this.offset.x,
        y: e.clientY - displayService.position.y - this.offset.y
      };

      this.cell.x = this.position.x;
      this.cell.y = this.position.y;
    });

    mouseService.upCell$.subscribe(e => {

      let remX = this.cell.x % this.cellSize;
      let remY = this.cell.y % this.cellSize;

      let x = remX > this.cellSize / 2 ? this.cell.x + (this.cellSize - remX) : this.cell.x - remX;
      let y = remY > this.cellSize / 2 ? this.cell.y + (this.cellSize - remY) : this.cell.y - remY;
      x = x <= this.mapXSize - this.cellSize ? x : this.mapXSize - this.cellSize;
      y = y <= this.mapYSize - this.cellSize ? y : this.mapYSize - this.cellSize;

      this.position = {
        x: x,
        y: y,
      };

      this.placeCellSubject.next({ cell: this.cell, newPos: this.position, oldPos: this.oldPosition });
    });
  }
}
