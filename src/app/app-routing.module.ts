import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { CitiesComponent } from './cities/cities.component';
import { CityDetailComponent} from './city-detail/city-detail.component'
import { PowersComponent} from './powers/powers.component';
import { PowerDetailComponent} from './power-detail/power-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'cities', component: CitiesComponent},
  { path: 'city-detail/:id', component: CityDetailComponent},
  {path: 'powers', component: PowersComponent},
  { path: 'power-detail/:id', component: PowerDetailComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}