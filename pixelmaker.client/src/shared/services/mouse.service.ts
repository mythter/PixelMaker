import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Block } from "../models/block.model";

@Injectable({
  providedIn: 'root'
})
export class MouseService {

  private createCellSubject = new Subject<MouseEvent>();
  createCell$ = this.createCellSubject.asObservable();

  private removeCellSubject = new Subject<MouseEvent>();
  removeCell$ = this.removeCellSubject.asObservable();

  private moveCellSubject = new Subject<MouseEvent>();
  moveCell$ = this.moveCellSubject.asObservable();

  private downCellSubject = new Subject<{ event: MouseEvent, cell: Block }>();
  downCell$ = this.downCellSubject.asObservable();

  private upCellSubject = new Subject<MouseEvent>();
  upCell$ = this.upCellSubject.asObservable();

  private moveDisplaySubject = new Subject<MouseEvent>();
  moveDisplay$ = this.moveDisplaySubject.asObservable();

  private downDisplaySubject = new Subject<MouseEvent>();
  downDisplay$ = this.downDisplaySubject.asObservable();

  private moveDisplay: boolean = false;

  private createCell: boolean = false;
  private removeCell: boolean = false;
  private moveCell: boolean = false;

  onDisplayDown(event: MouseEvent) {
    if (event.button == 0) {
      this.createCell = true;
      this.createCellSubject.next(event);
    }
    else if (event.button == 2) {
      this.moveDisplay = true;
      this.downDisplaySubject.next(event);
    }
  }

  onDisplayMove(event: MouseEvent) {
    if (this.createCell) {
      this.createCellSubject.next(event);
    }
    else if (this.moveCell) {
      this.moveCellSubject.next(event);
    }
  }

  onCellDown(object: { event: MouseEvent, cell: Block }) {
    this.moveCell = true;
    this.downCellSubject.next(object);
  }

  onCellMove(event: MouseEvent) {
    if (this.moveCell) {
      this.moveCellSubject.next(event);
    }
  }

  onCellUp(event: MouseEvent) {
    if (this.moveCell) {
      this.moveCell = false;
      this.upCellSubject.next(event);
    }
  }

  onMove(event: MouseEvent) {
    if (this.moveDisplay) {
      this.moveDisplaySubject.next(event);
    }
  }

  onReset() {
    console.log("reset");
    this.moveDisplay = false;

    this.createCell = false;
    this.moveCell = false;
    this.removeCell = false;
  }
}
