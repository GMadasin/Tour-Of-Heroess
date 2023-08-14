import { Component, OnInit } from '@angular/core';
import { CityService } from '../city.service';
import { City } from './city';

@Component({
    selector: 'app-cities',
    templateUrl: './cities.component.html',
    styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
    cities: City[] = [];

    constructor(private cityService: CityService) { }

    ngOnInit(): void {
        this.getCities();
    }

    getCities(): void {
        this.cityService.getCities()
            .subscribe(cities => {
                 this.cities = cities})  
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }

        this.cityService.addCity(name)
            .subscribe(city => {
                this.cities.push(city);
            });
    }

    delete(city: City): void {
        this.cities = this.cities.filter(h => h !== city);
        this.cityService.deleteCity(city.id).subscribe();
    }
}

export { CityService };
