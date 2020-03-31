import {Component, OnInit, ViewChild} from '@angular/core';
import {Player} from '../player.model';
import {PlayersService} from '../players.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  @ViewChild('f', {static: false}) playerForm: NgForm;
  player: Player;
  id: number;

  constructor(private playersService: PlayersService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.id = +param['id'];
      this.playersService.getPlayerById(this.id).subscribe(player => {
        this.player = player;
        this.fillForm();
      });
    });
  }

  fillForm() {
    this.playerForm.setValue({
      id: this.player.id,
      name: this.player.name,
      country: this.player.country,
      age: this.player.age,
      points: this.player.point,
      tournaments: this.player.tournaments,
    });
  }


  onSubmit(form: NgForm) {
    const player: Player = new Player(
      form.value.name, form.value.country, form.value.age, form.value.points, form.value.tournaments,form.value.id
    );
    this.playersService.updatePlayers(player).subscribe(

    );
    // console.log(player);
    this.playerForm.reset();
  }

  onClickBack() {
    // this.router.navigate(['../'], {relativeTo: this.route});
    this.location.back();
  }
}
