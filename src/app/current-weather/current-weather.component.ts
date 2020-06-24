import { Component, OnInit } from '@angular/core';

import { ICurrentWeather } from '../interfaces';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather;

  constructor() {
    this.current = {
      city: 'Chalfont',
      country: 'USA',
      date: new Date(),
      image: 'assets/images/sunny.png',
      temperature: 72,
      description: 'Sunny',
    };
  }

  ngOnInit(): void {}
}
