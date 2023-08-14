import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Power } from './powers/power';
import { MessageService } from './message.service';
import { Hero } from './heroes/hero';
import { HeroService } from './hero.service';

@Injectable({ providedIn: 'root' })
export class PowerService {
    heroes: Hero[] = [];
    powers: Power[] = []
    powerHold! : Power;
    private powersUrl = `https://localhost:7053/api/Powers`;

     httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(

        private http: HttpClient,
        private messageService: MessageService,
        private heroService: HeroService) { }

    /** GET powers from the server */
    getPowers(): Observable<Power[]> {
        const url = this.powersUrl + `/AllPowers`

        return this.http.get<Power[]>(url).pipe (
            tap(powers => this.log('fetched powers')),
            catchError(this.handleError<Power[]>('getAllPowers', []))
        );
    }


     /** GET power by id. Will 404 if id not found */
    getPower(id: number): Observable<Power> {

        const url = this.powersUrl + `/` + id.toString()

        return this.http.get<Power>(url).pipe (
            tap(_ => this.log(`fetched power id=${id}`)),
            catchError(this.handleError<Power>(`getPower id=${id}`))
        );
    }

    /* GET powers whose name contains search term */
    searchPowers(term: string): Observable<Power[]> {

        if (!term.trim()) {
            return of([]);
        }

        const url = this.powersUrl + `/GetPower/` + term
        return this.http.get<Power[]>(url).pipe(
            tap(x => x.length ?
                this.log(`found powers matching "${term}"`) :
                this.log(`no powers matching "${term}"`)),
            catchError(this.handleError<Power[]>('searchPowers', []))
        );
    }

    /** POST: add a new power to the server */
    addPower(name: string): Observable<Power> {

        return this.getPowers().pipe (
            map(powers => {
                const initialPower: Power = { id: 0, name: '' };
                const maxIdPower = powers.reduce((prev, current) => (prev.id > current.id) ? prev : current, initialPower);
                return maxIdPower.id + 1;
            }),
            switchMap(newMaxId => {
                this.powerHold = {
                    id: newMaxId,
                    name: name,
                };
                const url = this.powersUrl + `/AddPower`;
                return this.http.post<Power>(url, this.powerHold);
            })
        );
    } 

    /** DELETE: delete the power from the server */
    deletePower(id: number): Observable<Power> {

        this.heroService.getHeroes()
            .subscribe(heroes => {this.heroes = heroes;

                for(let heroIn of this.heroes) {       
                   if(heroIn.cityId == id) {
                        heroIn.cityId = 0;
                        this.heroService.updateHero(heroIn).subscribe();
                    }
                }});

        const url = this.powersUrl + `/delete/` + id.toString();
        return this.http.delete<any>(url, this.httpOptions).pipe (
            tap(_ => this.log(`deleted power id=${id}`)),
            catchError(this.handleError<Power>('deletePower'))
        );
    }
    

    /** PUT: update the power on the server */
    updatePower(power: Power): Observable<any> {
        const url = this.powersUrl + `/UpdatePower`;
        return this.http.post<Hero>(url, power);
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
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

  /** Log a PowerService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`PowerService: ${message}`);
    }
}