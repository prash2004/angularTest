import { Component, OnInit } from '@angular/core';
import { Difficultylevel } from '../../model/difficulty-level';
import { CommonModule } from '@angular/common';
import { SudokuDataService } from '../../services/sudoku-data.service';
import { HttpClientModule } from '@angular/common/http';
import { Board } from '../../model/board';
import { GBoardComponent } from '../../components/g-board/g-board.component';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-puzzle-view',
  standalone: true,
  imports: [CommonModule, HttpClientModule, GBoardComponent],
  providers: [SudokuDataService],
  templateUrl: './puzzle-view.component.html',
  styleUrls: ['./puzzle-view.component.css']
})
export class PuzzleViewComponent implements OnInit {

  constructor(private sudokuDataService: SudokuDataService, private storeService: StoreService) { }

  selectedDifficultyLevel!: { value: string, text: string };

  public currentBoardData!: Board;
  public currentStatus!: string;

  public difficultyLevels = this.enumToList(Difficultylevel);


  ngOnInit() {
  }

  private enumToList(enumObj: any): { value: string, text: string }[] {
    return Object.keys(enumObj)
      .map(key => ({
        value: key,
        text: enumObj[key]
      }));
  }


  public onSelectDifficulty(difficultyLevel: { value: string, text: string }): void {
    const dropdownDifficultyLevel = document.getElementById('dropdownDifficultyLevel');
    dropdownDifficultyLevel!.innerText = difficultyLevel.text
    this.selectedDifficultyLevel = difficultyLevel;
  }


  public loadPuzzle(): void {

    this.sudokuDataService.getData(this.selectedDifficultyLevel.value).subscribe(
      (next) => {
        this.currentBoardData = next;
        this.currentStatus = 'broken';
      }
    );
  }

  public validatePuzzle(): void {
    this.storeService.getBoard().subscribe((next) => {
      
        let solvedBoard = next;
        console.log(solvedBoard);
        this.sudokuDataService.validate(solvedBoard).subscribe((next) => {
          this.currentStatus = next.status;
        });
      
    });

  }

  public solvePuzzle(): void {
    this.sudokuDataService.solve(this.currentBoardData).subscribe((next) => {
      this.currentStatus = next.status;
      this.currentBoardData.board = next.solution;
      this.storeService.setBoard(this.currentBoardData);
    });
  }


}
