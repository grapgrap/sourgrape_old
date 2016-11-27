import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import {GameRateService} from "../service/game-rate.service";
import {GameService} from "../service/game.service";
import {PredictedRateService} from "../service/predicted-rate.service";
import {UserService} from "../service/user.service";

import {User} from "../model/user";
import { GameRate } from '../model/game-rate';
import {Observable} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [
    GameRateService,
    GameService,
  ]
})
export class MainComponent implements OnInit {
  private gameRates: GameRate[] = [];
  private currentUser: User;
  private errorMsg: string = '';
  private countGameRate = [];

  private count = 0;

  constructor(
    private gameRateService: GameRateService,
    private router: Router
  ) {
    let tempUser = new User('0235', '1234', 'AAA');
    localStorage.setItem('currentUser', JSON.stringify(tempUser));
    this.currentUser = JSON.parse( localStorage.getItem('currentUser') );
  }

  ngOnInit() {
    this.getGameRates();
    this.getRatePercent();
  }

  private getGameRates() {
    this.gameRateService.getGameRates().subscribe(
      res => { this.gameRates = res; },
      error => this.errorMsg = error
    );
  }

  //라우터 함수
  public moveToGameDetailPage(title: string) {
    this.router.navigate(['/game', title]);
  }
  public moveToResultPage(keyword: string) {
    if( keyword.length < 4 ) {
      alert('최소 4글자 이상을 입력해 주세요');
      return;
    } else {
      this.router.navigate(['/search', keyword]);
    }
  }
  public moveToRankMorePage() {
    this.router.navigate(['/game-rank-more']);
  }

  //취향 그래프용 함수
  private getRatePercent() {
    this.gameRateService.getCountAboutGameRateById( this.currentUser.id ).subscribe( res => {
      console.log( res );
      if( res == null ) return;
      let total = 0;
      for( let i = 0; i < res.length; i++ ){
        total = total + res[i].count;
      }
      for( let i = 0; i < res.length; i++ ){
        this.countGameRate[i] = res[i].count;
        this.countGameRate[i] = Math.floor(this.countGameRate[i] / total * 100);
      }
    });
  }

}
