// import { Injectable } from '@angular/core';
// import { InMemoryDbService } from 'angular-in-memory-web-api';
// import { Hero } from './heroes/hero';

// @Injectable({
//   providedIn: 'root',
// })
// export class InMemoryDataService implements InMemoryDbService {
//   createDb() {//database of starter heroes, cities, and powers
//     const heroes: Hero[] = [
//       { id: 12, name: 'Dr. Nice', city: {name: 'none', id: 0}, powers: [{id: 0, name: 'none'}]},
//       { id: 13, name: 'Bombasto', city: {name: 'none', id: 0}, powers: [{id: 0, name: 'none'}] },
//       { id: 14, name: 'Celeritas', city: {name: 'none', id: 0} , powers: [{id: 0, name: 'none'}]},
//       { id: 15, name: 'Magneta', city: {name: 'none', id: 0} , powers: [{id: 0, name: 'none'}]},
//       { id: 16, name: 'RubberMan', city: {name: 'none', id: 0} , powers: [{id: 0, name: 'none'}]},
//       { id: 17, name: 'Dynama', city: {name: 'none', id: 0}, powers: [{id: 0, name: 'none'}]},
//       { id: 18, name: 'Dr. IQ' , city: {name: 'none', id: 0}, powers: [{id: 0, name: 'none'}]},
//       { id: 19, name: 'Magma' , city: {name: 'none', id: 0}, powers: [{id: 0, name: 'none'}]},
//       { id: 20, name: 'Tornado', city: {name: 'none', id: 0},powers: [{id: 0, name: 'none'}]}
//     ];
// const powers = [
//   {id: 0, name: 'none'},
//   {id: 1, name: 'flight'},
//   {id: 2, name: 'super speed'},
//   {id: 3, name: 'super strength'},
//   {id: 4, name: 'laser eyes'},
//   {id: 5, name: 'mind control'},
//   {id: 6, name: 'water bending'},
//   {id: 7, name: 'fire bending'},
//   {id: 8, name: 'earth bending'},
//   {id: 9, name: 'air bending'},
//   {id: 10, name: 'chair'},
// ]
//     const cities = [
//       {name: 'none', id: 0},
//       {name: 'Zooville', id: 1},
//       {name: 'Metrocity', id: 2},
//       {name: 'Texastown', id: 3},
//       {name: 'Altoona', id: 4},
//       {name: 'Baltimore', id: 5},
//       {name: 'Louisville', id: 6},
//     ]
//     return {cities, heroes,powers};
//   }

//   genId(heroes: Hero[]): number {
//     return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
//   }
// }