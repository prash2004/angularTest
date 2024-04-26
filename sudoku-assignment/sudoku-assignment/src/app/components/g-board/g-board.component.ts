import { Component, Input, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Board } from '../../model/board';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-g-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './g-board.component.html',
  styleUrls: ['./g-board.component.css']
})
export class GBoardComponent implements OnInit, OnChanges {

  constructor(private storeService: StoreService) { }


  @Input()
  public boardData!: Board;

  public solvedBoardData!: Board;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
   
    if (this.boardData) {
      this.solvedBoardData = {
        board: this.boardData.board.map(row => [...row])
      };
    }
  }

  needsDarkBorder(index: number): boolean {
    return (index == 2 || index == 5 || index == 8);
  }


  public setCurrentItemValue(event: any, rowIndex: number, columnIndex: number): void {

    this.solvedBoardData.board[rowIndex][columnIndex] = parseInt(event.target!.value);
    this.storeService.setBoard(this.solvedBoardData);

  }


  // public showBoardData() {
  //   console.log(this.boardData)
  //   console.log(this.solvedBoardData)
  // }

  public resetBoard(): void {
    this.solvedBoardData = {
      board: this.boardData.board.map(row => [...row])
    };
   
    this.boardData = {
      board: this.boardData.board.map(row => [...row])
    };
  }



  public getSolvedBoard(): Board {
    return this.solvedBoardData;
  }

}
