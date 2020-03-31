import { Component, OnInit } from '@angular/core';
import {Player} from '../player.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PlayersService} from '../players.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  isShowAddForm = false;
  isSearchMode = false;
  searchName: string = '';
  players: Player[] = [];
  isClickDeleteBut = false;

  constructor(private route: ActivatedRoute,
              private playersService: PlayersService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['searchName']) {
      this.isSearchMode = true;
      this.searchName = this.route.snapshot.queryParams['searchName'];
    }
    this.route.params.subscribe((params: Params) => {
      if (this.route.snapshot.queryParams['searchName']) {
        this.isSearchMode = true;
        this.searchName = this.route.snapshot.queryParams['searchName'];
      }
      this.initTable();
    });
  }

  onStateAddForm() {
    this.isShowAddForm = !this.isShowAddForm;
  }

  initTable() {
    if(this.isSearchMode) {
      this.playersService.getPlayerByName(this.searchName)
        .subscribe(players => {
          this.players = players;
        })
    } else {
      this.playersService.getPlayers()
        .subscribe(players => {
        this.players = players;
      })
    }
  }

  onDeletePlayer(player: Player) {
    this.isClickDeleteBut = true;
    this.playersService.deletePlayer(player)
      .subscribe(playerDeleted => {
        this.players.splice(this.players.indexOf(player), 1);
      });
  }


  onSubmitPlayer(form: NgForm) {
    const player: Player = new Player(
      form.value.name,
      form.value.country,
      form.value.age,
      form.value.points,
      form.value.tournaments
    )

    this.playersService.addPlayer(player).subscribe(
      player => {
        this.players.push(player);
        form.reset();
        this.isShowAddForm = false;
      }
    )
  }

  onClickPlayer(player: Player) {
    if(!this.isClickDeleteBut) {
      this.router.navigate(['/players',player.id,'details']);
    }
    this.isClickDeleteBut = false;
  }
}
