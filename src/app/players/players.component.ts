import { Component, OnInit } from '@angular/core';
import {Player} from './player.model';
import {PlayersService} from './players.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  topPlayers: Player[] = [];
  constructor(private playersService: PlayersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.playersService.getTopPlayers(3)
      .subscribe(topPlayers => {
        this.topPlayers = topPlayers;
      })
  }

  onSearchSubmit(form: NgForm) {
    // console.log(form.value.searchName)
    this.router.navigate(['/players/search'], {queryParams: {searchName: form.value.searchName}});
  }

  onPlayerSelect(topPlayer: Player) {
    this.router.navigate(['/players',topPlayer.id,'details']);
  }
}
