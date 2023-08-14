import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../heroes/hero';
import { HeroService } from '../hero.service';
import { City } from '../cities/city'
import { CityService } from '../city.service';
import { Power } from '../powers/power';
import { PowerService} from '../power.service';
import {FormControl, FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({

    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: [ './hero-detail.component.css' ],
})

export class HeroDetailComponent {

    hero! : Hero;
    heroCity!: City;
    powerHold!: Power;
    cities: City [] = [];
    powers: Power [] = [];
    heroPowers: Power[] = []; 
    powerIn!: Power;
    mySelectedItem!: string;
    heroForm = new FormGroup({
        name: new FormControl ('', Validators.required),
        city: new FormControl<City | null>(null),
        power: new FormControl<Power | null>(null),
        powers: new FormArray([])
    });

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private heroService: HeroService,
        private cityService: CityService,
        private powerService: PowerService,
        private http: HttpClient,
        private location: Location) { }

    ngOnInit(): void {
        this.getHero();
        this.getCities();
        this.getPowers();
    }  

    getCities(): void {
        this.cityService.getCities()
            .subscribe(cities => this.cities = cities);
    }

    getPowers(): void {
        this.powerService.getPowers()
            .subscribe(powers => {this.powers = powers;});
    }
    
    getHero(): void {

        const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
        this.heroService.getHero(id)
            .subscribe(hero => {
                this.hero = hero;
                this.heroForm.controls['name'].setValue(this.hero.name, { emitEvent: false });
                this.cityService.getCity(this.hero.cityId)
                    .subscribe(heroCity => {
                        this.heroCity = heroCity;
                        this.heroForm.controls['city'].setValue(this.heroCity, { emitEvent: false });
                        this.http.get<Power[]>(`https://localhost:7053/api/Heroes/GetPowers/${this.hero.id}`)
                            .subscribe(heroPowers => this.heroPowers = heroPowers);
                    });
            });
    }

    remove(powerIn: Power): void {
        this.http.delete(`https://localhost:7053/api/Heroes/DeletePower/${this.hero.id}/${powerIn.id}`).subscribe();
        this.http.get<Power[]>(`https://localhost:7053/api/Heroes/GetPowers/${this.hero.id}`)
                        .subscribe(heroPowers => this.heroPowers = heroPowers);
        console.log(this.heroPowers)
    }

    add(): void {

        let x = 0;
        this.powerIn = this.heroForm.controls['power'].value!
        console.log(this.powerIn)

        if(this.powerIn != null) {
            for(let power of this.heroPowers) {

                console.log(power, this.powerIn, x)
                if(power.id == this.powerIn.id) {
                    x = 1
                }
            }

            if(x == 0) {
                this.http.post<Power>(`https://localhost:7053/api/Heroes/AddPower/${this.hero.id}/${this.powerIn.id}`, {})
                    .subscribe(response => {
                        this.http.get<Power[]>(`https://localhost:7053/api/Heroes/GetPowers/${this.hero.id}`)
                            .subscribe(heroPowers => this.heroPowers = heroPowers);
                    });
            }
        }
        else {
            window.alert("power must be selected");
        }
    }

    save(): void {

        if(this.heroForm.controls['name'].value! != "") {
            this.hero.name = this.heroForm.controls['name'].value!
      
            for(let city of this.cities) {
                if(city.id == this.heroForm.controls.city.value?.id) {
                    this.hero.cityId = city.id;
                }
            }

            if (this.hero) {
                this.heroService.updateHero(this.hero)
                    .subscribe(() => {
                        this.goBack();
                })
            }
        }
        else {
            window.alert("fill in hero name");
        }
    }

    goBack(): void {
        this.location.back();
    }

    registrationForm = this.fb.group({
        cityName: ['', [Validators.required]]
    })
}
