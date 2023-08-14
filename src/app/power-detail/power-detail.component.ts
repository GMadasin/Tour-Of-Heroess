import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Power } from '../powers/power'
import { PowerService } from '../power.service';
import { Hero } from '../heroes/hero';

@Component({
    selector: 'app-power-detail',
    templateUrl: './power-detail.component.html',
    styleUrls: [ './power-detail.component.css' ]
})
export class PowerDetailComponent implements OnInit {
    power: Power | undefined;
    powers: Power [] = [];
    heroes: Hero [] = []

    constructor(

        private route: ActivatedRoute,
        private powerService: PowerService,
        private location: Location ){}

    ngOnInit(): void {
        this.getPower();
    }

    getPower(): void {
        const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
        this.powerService.getPower(id)
            .subscribe(power => this.power = power);
    }

    goBack(): void {
        this.location.back();  
    }

    save(): void {
        if (this.power) {
            this.powerService.updatePower(this.power)
            .subscribe(() => {
                this.goBack();
            })
        }
    }
}
