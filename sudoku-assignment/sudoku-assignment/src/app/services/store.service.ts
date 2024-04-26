import { Injectable } from '@angular/core';
import { Board } from '../model/board';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private solvedBoard$: BehaviorSubject<Board>;
  private solvedBoard!: Board;

  constructor() {
    this.solvedBoard$ = new BehaviorSubject<Board>({} as Board);
  }

  public setBoard(board: Board): void {
    this.solvedBoard = board;
    this.solvedBoard$.next(board);
  }

  public getBoard(): Observable<Board> {
    return this.solvedBoard$.asObservable();
  }

  public getSolvedBoard(): Board {
    return this.solvedBoard;
  }

}
