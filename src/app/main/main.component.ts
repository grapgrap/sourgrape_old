import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { GameRate } from '../game-rate';
import {GameRateService} from "../game-rate.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [
    GameRateService
  ]
})
export class MainComponent implements OnInit {
  private gameRates: GameRate[];
  private errorMsg: string;

  constructor(
    private gameRateService: GameRateService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getGameRates();
  }

  private getGameRates() {
    this.gameRateService.getGameRates()
      .subscribe(
        gameRates => this.gameRates = gameRates,
        error => this.errorMsg = <any>error
      );
  }

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
}
