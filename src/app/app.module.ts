import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { MessagesComponent } from './messages/messages.component';
import { CitiesComponent} from './cities/cities.component';
import { CitySearchComponent} from './city-search/city-search.component';
import { CityDetailComponent } from './city-detail/city-detail.component';
import { PowersComponent } from './powers/powers.component';
import { PowerDetailComponent } from './power-detail/power-detail.component';
import { PowerSearchComponent } from './power-search/power-search.component';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatChipsModule} from '@angular/material/chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,



    //HttpClientInMemoryWebApiModule.forRoot(
      //InMemoryDataService, { dataEncapsulation: false }
    //)
  ], 
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent, 
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,
    CitiesComponent,
    CitySearchComponent,
    CityDetailComponent,
    PowersComponent,
    PowerDetailComponent,
    PowerSearchComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }