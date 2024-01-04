import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { MouseService } from "./mouse.service";
import { Position } from "../models/position.model";

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  private displayMoveSubject = new Subject<Position>();
  displayMove$ = this.displayMoveSubject.asObservable();

  readonly mapXSize: number = 3000;
  readonly mapYSize: number = 2000;
  readonly cellSize: number = 50;

  private _position: Position = { x: 0, y: 0 };
  public get position(): Position {
    return this._position;
  }
  private offset: Position = { x: 0, y: 0 };

  constructor(private mouseService: MouseService) {

    mouseService.downDisplay$.subscribe((e) => {
      this.offset = {
        x: e.offsetX,
        y: e.offsetY
      }
    });

    mouseService.moveDisplay$.subscribe((e) => {
      let clientX: number;
      let clientY: number;

      let posX = e.clientX - this.offset.x;
      let posY = e.clientY - this.offset.y;

      let offX = window.innerWidth - this.mapXSize;
      let offY = window.innerHeight - this.mapYSize;

      if (posX <= 0 && posX >= offX) {
        clientX = posX;
      }
      else {
        clientX = posX > 0 ? 0 : offX;
      }

      if (posY <= 0 && posY >= offY) {
        clientY = posY;
      }
      else {
        clientY = posY > 0 ? 0 : offY;
      }
      
      this._position = {
        x: clientX,
        y: clientY
      }
      this.displayMoveSubject.next(this._position);
    });
  }
}
