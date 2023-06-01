import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Root } from '../network/weatherbycityname/Root';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-recent-search',
  templateUrl: './recent-search.component.html',
  styleUrls: ['./recent-search.component.css']
})
export class RecentSearchComponent {
  imagePath: string = '../assets/icons/icon_heart_white.png';
  rows: Root[]
  visiblilityRecentSearchTopbar: boolean = false

  constructor(private route: ActivatedRoute, private weatherService: WeatherService) {

  }

  ngOnInit(): void {
    this.rows = Array.from(this.weatherService.hashMapWeather.values());
    this.visibilityRecentSearchToolbar()
  }

  onSaveFavouriteStatus(event: any, position: number) {
    if (event.target.checked == true) {
      console.log('checkbox is checked');
      this.imagePath = '../assets/icons/icon_heart_yellow.png'
    } else {
      console.log('checkbox is unchecked');
      this.imagePath = '../assets/icons/icon_heart_white.png'
    }
  }

  getFavouriteImagePath(position: number) {
    if (this.rows[position].fevourite) {
      return '../assets/icons/icon_heart_yellow.png'
    } else {
      return '../assets/icons/icon_heart_white.png'
    }
  }

  clearAll() {
    this.weatherService.hashMapWeather.clear()
    this.rows.splice(0, this.rows.length)
    this.visibilityRecentSearchToolbar()
  }

  getPathOfWeatherIcon(iconcode: string) {
    return 'https://openweathermap.org/img/wn/' + iconcode + '@4x.png'
  }

  visibilityRecentSearchToolbar() {
    if (this.rows.length != 0) {
      this.visiblilityRecentSearchTopbar = true
     } else {
       this.visiblilityRecentSearchTopbar = false
     }
  }
}

