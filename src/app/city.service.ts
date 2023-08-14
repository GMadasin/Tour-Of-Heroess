import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { City } from './cities/city';
import { MessageService } from './message.service';
import { HeroService } from './hero.service';
import { Hero } from './heroes/hero';


@Injectable({ providedIn: 'root' })
export class CityService {
  private citiesUrl = `https://localhost:7053/api/Cities`;
  heroes: Hero[] = [];
  cityHold!: City;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
 
  constructor(

    private http: HttpClient,
    private messageService: MessageService,
    private heroService: HeroService) { }

    /** GET cities from the server */
    getCities(): Observable<City[]> {

        const url = this.citiesUrl + `/AllCities`;
        return this.http.get<City[]>(url).pipe (
            tap(cities => this.log('fetched cities')),
            catchError(this.handleError<City[]>('getAllCities', []))
        );
    }

    /** GET City by id. Will 404 if id not found */
    getCity(id: number): Observable<City> {

        const url = this.citiesUrl + `/` +  id.toString()
        return this.http.get<City>(url).pipe (
            tap(_ => this.log(`fetched hero id=${id}`)),
            catchError(this.handleError<City>(`getCity id=${id}`))
        );
    }

    /* GET cities whose name contains search term */
    searchCities(term: string): Observable<City[]> {

        if (!term.trim()) {
            return of([]);
        }

        const url = this.citiesUrl + `/GetCity/` + term
        return this.http.get<City[]>(url).pipe(
            tap(x => x.length ?
                this.log(`found cities matching "${term}"`) :
                this.log(`no cities matching "${term}"`)),
                catchError(this.handleError<City[]>('searchCities', []))
        );
    }

    /** POST: add a new City to the server */
    addCity(name: string): Observable<City> {

        return this.getCities().pipe (
            map(cities => {
                const initialCity: City = { id: 0, name: '' };
                const maxIdCity = cities.reduce((prev, current) => (prev.id > current.id) ? prev : current, initialCity);
                return maxIdCity.id + 1;
            }),
            switchMap(newMaxId => {
                this.cityHold = {
                    id: newMaxId,
                    name: name,
                };

                const url = this.citiesUrl + `/AddCity`;
                return this.http.post<City>(url, this.cityHold);
            })
        );
    }

    /** DELETE: delete the City from the server */
    deleteCity(id: number): Observable<City> {
        this.heroService.getHeroes()
            .subscribe(
                heroes => {
                    this.heroes = heroes;
                    for(let heroIn of this.heroes) {
                        if(heroIn.cityId == id) {
                            heroIn.cityId = 0;
                            this.heroService.updateHero(heroIn).subscribe();
                        }
                    }});

        const url = this.citiesUrl + `/delete/` + id.toString();
        return this.http.delete<any>(url, this.httpOptions).pipe(
            tap(_ => this.log(`deleted city id=${id}`)),
            catchError(this.handleError<City>('deleteCity'))
        );
    }

    updateCity(city: City): Observable<any> {
        
        const url = this.citiesUrl + `/UpdateCity`;
        return this.http.post<Hero>(url, city);
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
        this.messageService.add(`CityService: ${message}`);
    }
}