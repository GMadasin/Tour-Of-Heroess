import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { Hero } from './heroes/hero';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class HeroService {

    private heroesUrl = `https://localhost:7053/api/Heroes`
    heroes: Hero[] = [];
    heroHold!: Hero;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }

    /** GET heroes from the server */
    getHeroes(): Observable<Hero[]> {
        const url = this.heroesUrl + `/AllHeroes`

        return this.http.get<Hero[]>(url).pipe (
            tap(heroes => this.log('fetched heroes')),
            catchError(this.handleError<Hero[]>('getAllHeroes', []))
        );
    }


     /** GET hero by id. Will 404 if id not found */
    getHero(id: number): Observable<Hero> {
        const url = this.heroesUrl + `/`+ id.toString();
        return this.http.get<Hero>(url).pipe(
            tap(_ => this.log(`fetched hero id=${id}`)),
            catchError(this.handleError<Hero>(`getHero id=${id}`))
        );
    }

    /* GET heroes whose name contains search term */
    searchHeroes(term: string): Observable<Hero[]> {
        if (!term.trim()) {
            return of([]);
        }

        const url = this.heroesUrl + `/GetHero/` + term
        return this.http.get<Hero[]>(url).pipe(
            tap(x => x.length ?
                this.log(`found heroes matching "${term}"`) :
                this.log(`no heroes matching "${term}"`)),
            catchError(this.handleError<Hero[]>('searchHeroes', []))
        );
    }
 
    /** POST: add a new hero to the server */
    addHero(name: string): Observable<Hero> {
        return this.getHeroes().pipe(
            map(heroes => {
                return heroes.reduce((prev, current) => (prev.id > current.id) ? prev : current).id + 1;
            }),
            switchMap(newMaxId => {
                this.heroHold = {
                    id: newMaxId,
                    name: name,
                    cityId: 0
            };

                const url = this.heroesUrl + `/AddHero`;
                return this.http.post<Hero>(url, this.heroHold);
            })
        );
    }

    /** DELETE: delete the hero from the server */
    deleteHero(id: number): Observable<Hero> {

        const url = this.heroesUrl + `/delete/` + id.toString();

        return this.http.delete<Hero>(url, this.httpOptions).pipe(
            tap(_ => this.log(`deleted hero id=${id}`)),
            catchError(this.handleError<Hero>('deleteHero'))
        );
    }

    /** PUT: update the hero on the server */ 
    updateHero(hero: Hero): Observable<any> {
        const url = this.heroesUrl + `/UpdateHero`;
        return this.http.post<Hero>(url, hero);
    }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
}