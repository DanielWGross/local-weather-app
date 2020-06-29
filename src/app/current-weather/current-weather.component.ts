import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ICurrentWeather } from '../interfaces';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnDestroy, OnInit {
  current: ICurrentWeather;
  currentWeatherSubscription: Subscription;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.currentWeatherSubscription = this.weatherService.currentWeather$.subscribe(
      (data) => (this.current = data)
    );
  }

  getOrdinal(date: number) {
    const n = new Date(date).getDate();
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : '';
  }

  ngOnDestroy() {
    this.currentWeatherSubscription.unsubscribe();
  }
}
