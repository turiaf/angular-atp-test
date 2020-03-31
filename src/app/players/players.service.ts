import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Player} from './player.model';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private playersUrl = 'api/players';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl)
      .pipe(
        catchError(this.handleError<Player[]>('getPlayers', []))
      );
  }

  getTopPlayers(top: number): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl)
      .pipe(map(players =>
        players.sort(function(a, b) {
          return b.point - a.point;
        }).slice(0, top)
      ),
        catchError(this.handleError<Player[]>('getTopPlayers', []))
      );
  }

  getPlayerById(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.playersUrl}/${id}`)
      .pipe(
        catchError(this.handleError<Player>(`getPlayerById id=${id}`))
      );
  }

  getPlayerByName(nam: string): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl)
      .pipe(map(repPlayers => {
        const players: Player[] = [];
        for (const player of repPlayers) {
          if(player.name.toLowerCase().indexOf(nam.toLowerCase()) != -1) {
            players.push(player);
            // console.log(player.name.toLowerCase().indexOf(nam.toLowerCase()));
          }
        }
        return players;
        }),
      // tap(players => {
      //   console.log(players);
      // }),
        catchError(this.handleError<Player[]>('getTopPlayers', []))
      );
  }

  updatePlayers(player: Player): Observable<any> {
    return this.http.put(this.playersUrl, player, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updatePlayers'))
      );
  }

  deletePlayer (player: Player | number): Observable<Player> {
    const id = typeof player === 'number' ? player : player.id;
    const url = `${this.playersUrl}/${id}`;

    return this.http.delete<Player>(url, this.httpOptions).pipe(
      catchError(this.handleError<Player>('deletePlayer'))
    );
  }

  addPlayer (player: Player): Observable<Player> {
    return this.http.post<Player>(this.playersUrl, player, this.httpOptions).pipe(
      catchError(this.handleError<Player>('addPlayer'))
    );
  }

  handleError<T>(operation= 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(operation ,error);
      return of(result as T);
    }
  }
}
