/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SudokuDataService } from './sudoku-data.service';

describe('Service: SudokuData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SudokuDataService]
    });
  });

  it('should ...', inject([SudokuDataService], (service: SudokuDataService) => {
    expect(service).toBeTruthy();
  }));
});
