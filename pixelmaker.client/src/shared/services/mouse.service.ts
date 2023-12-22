import { Subject } from "rxjs";

export class MouseService {

  private clickCellSubject = new Subject<number>();
  clickCell$ = this.clickCellSubject.asObservable();

  onClickCell(num: number) {
    this.clickCellSubject.next(num);
  }
}
