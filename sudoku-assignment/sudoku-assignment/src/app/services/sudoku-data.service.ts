import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Board } from '../model/board';
import { ValidateResponse } from '../model/validate-response';
import { SolveResponse } from '../model/solve-response';

@Injectable({
  providedIn: 'root'
})
export class SudokuDataService {

  constructor(private httpClient: HttpClient) { }
  
  private baseUrl = 'https://sugoku.onrender.com';
  headers = {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }};

  public getData(difficultylevel: string): Observable<Board> {
    return this.httpClient.get<Board>(`${this.baseUrl}/board?difficulty=${difficultylevel}`);
  }

  public solve(board: Board): Observable<SolveResponse> {
    return this.httpClient.post<SolveResponse>(`${this.baseUrl}/solve`, this.encodeParams(board), this.headers);
  }

  public validate(board: Board): Observable<ValidateResponse> {
    return this.httpClient.post<ValidateResponse>(`${this.baseUrl}/validate`,  this.encodeParams(board), this.headers);
     
  }

  private encodeBoard(board: any) {
    return board.reduce((result: any, row: any, i: any) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')
  }

  private encodeParams(params: any) {
    return Object.keys(params)
      .map(key => key + '=' + `%5B${this.encodeBoard(params[key])}%5D`)
      .join('&');
  }

}
