import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { City } from '../cities/city';
import { CityService } from '../city.service';
import { HeroService } from '../hero.service';
import { Hero } from '../heroes/hero';

@Component({
    selector: 'app-city-detail',
    templateUrl: './city-detail.component.html',
    styleUrls: [ './city-detail.component.css' ]
})
export class CityDetailComponent implements OnInit {
    city: City | undefined;
    cities: City [] = [];
    heroes: Hero [] = [];

    constructor(
        private route: ActivatedRoute,
        private cityService: CityService,
        private location: Location,
        private heroService: HeroService) {}

    ngOnInit(): void {
        this.getCity();
    }

    getCity(): void {
        const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
        this.cityService.getCity(id)
            .subscribe(city => this.city = city);
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        if (this.city) {
            this.cityService.updateCity(this.city)
            .subscribe(() => {
                this.goBack();
                this.heroService.getHeroes()
                .subscribe(heroes => {this.heroes = heroes;
                    for(let heroIn of this.heroes) { 
                        if(heroIn.cityId == this.city!.id) {
                            heroIn.cityId = this.city!.id
                            this.heroService.updateHero(heroIn).subscribe();
                        }
                    }});
            })
        }
    }
}