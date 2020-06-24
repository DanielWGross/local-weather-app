import { Observable, of } from 'rxjs';

import { ICurrentWeather } from '../interfaces';
import { IWeatherService } from './weather.service';

export const fakeWeather: ICurrentWeather = {
  city: 'Fake City',
  country: 'FK',
  date: 123456789,
  image: '',
  temperature: 72,
  description: 'fake weather',
};

export class WeatherServiceFake implements IWeatherService {
  getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
    return of(fakeWeather);
  }
}
