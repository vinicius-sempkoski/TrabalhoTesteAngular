import {Routes} from '@angular/router';
import {OmdbComponent} from './omdb/omdb.component';
import {FavoritosComponent} from './favoritos/favoritos.component';

export const routes: Routes = [
  { path: '', component: OmdbComponent },
  { path: 'favoritos', component: FavoritosComponent },
];
