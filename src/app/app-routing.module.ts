import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlayersComponent} from './players/players.component';
import {PlayerListComponent} from './players/player-list/player-list.component';
import {PlayerDetailComponent} from './players/player-detail/player-detail.component';


const routes: Routes = [
  {path: '', redirectTo: '/top-player', pathMatch: 'full'},
  {path: 'top-player', component: PlayersComponent},
  {path: 'players', component: PlayerListComponent},
  {path: 'players/search', component: PlayerListComponent},
  {path: 'players/:id/details', component: PlayerDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
