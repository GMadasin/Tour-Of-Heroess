import { Component, OnInit } from '@angular/core';
import { PowerService } from '../power.service';
import { Power } from './power';
import { Hero } from '../heroes/hero';

@Component({
    selector: 'app-powers',
    templateUrl: './powers.component.html',
    styleUrls: ['./powers.component.css']
})
export class PowersComponent implements OnInit {
    powers: Power[] = [];
    heroes: Hero[] = [];

    constructor(
        private powerService: PowerService) { }

    ngOnInit(): void {
        this.getPowers();
    }

    getPowers(): void {
        this.powerService.getPowers()
            .subscribe(powers => {
                this.powers = powers})  
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }

        this.powerService.addPower(name)
            .subscribe(power => {
                this.powers.push(power);
            });
    } 

    delete(power: Power): void {
        this.powers = this.powers.filter(h => h !== power);
        this.powerService.deletePower(power.id).subscribe()
    }
}
  

export { PowerService };
