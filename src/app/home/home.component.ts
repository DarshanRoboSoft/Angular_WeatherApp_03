import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Root } from '../network/weatherbycityname/Root';
import { Clouds } from '../network/weatherbycityname/Clouds';
import { Coord } from '../network/weatherbycityname/Coord';
import { Main } from '../network/weatherbycityname/Main';
import { Sys } from '../network/weatherbycityname/Sys';
import { Weather } from '../network/weatherbycityname/Weather';
import { Wind } from '../network/weatherbycityname/Wind';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  favouriteStatus: boolean = false;
  TEXT_FAVOURITE_ADD_TO_FAVOURITE: string = 'Add to favourite';
  TEXT_FAVOURITE_ADDED_TO_FAVOURITE: string = 'Added to favourite';

  @ViewChild('label_C') labelC: ElementRef;
  @ViewChild('label_F') labelF: ElementRef;
  @ViewChild('checkBoxFavorites') checkBoxFavorites: ElementRef;
  theCity: string = '';
  jsonResult: object;
  imagePath: string = '../assets/icons/icon_heart_white.png';
  textFavouriteStatus: string = 'Add to favourite';
  tempretureUnitFlagC: boolean = true;
  tempretureUnitFlagF: boolean = false;
  weatherRoot: Root;
  visibleOfWeatherScreenDetails: boolean = false

  constructor(private weatherService: WeatherService, private route: ActivatedRoute) {

  }

  ngOnDestroy(): void {
    this.weatherService.clickedHomeTab = false
    this.weatherService.clickedSearchButton = false
  }

  onSaveFavouriteStatus(event: any, cityName: string) {

    if (event.target.checked == true) {
      console.log('checkbox is checked');
      this.imagePath = '../assets/icons/icon_heart_yellow.png'
      this.textFavouriteStatus = this.TEXT_FAVOURITE_ADDED_TO_FAVOURITE
      this.updateFavouriteStatus(true, cityName)
    } else {
      console.log('checkbox is unchecked');
      this.imagePath = '../assets/icons/icon_heart_white.png'
      this.textFavouriteStatus = this.TEXT_FAVOURITE_ADD_TO_FAVOURITE
      this.updateFavouriteStatus(false, cityName)
    }
  }

  updateFavouriteStatus(flag: boolean, cityName: string) {
    let rootWeather = this.weatherService.hashMapWeather.get(cityName)
    rootWeather!.fevourite = flag
    this.weatherService.hashMapWeather.set(cityName, rootWeather!)
  }

  ngOnInit(): void {
    console.log("HomeComponent == ngOnInit() : ", this.weatherService.clickedHomeTab, this.weatherService.clickedSearchButton)
   
    if (this.weatherService.clickedHomeTab) {
      console.log("HomeComponent == ngOnInit() 1: ",)
      let arrayWeather = Array.from(this.weatherService.hashMapWeather.values());
      let filterWeatherData: Root[] = arrayWeather.filter(entry => entry.fevourite == true)
      console.log("filterWeatherData : ", filterWeatherData)
      if (filterWeatherData.length == 0) {
        this.theCity = "Udupi"
      } else {
        this.theCity = filterWeatherData[0].name;
      }
      this.getWeather()
    }

    if (this.weatherService.clickedSearchButton) {
      console.log("HomeComponent == ngOnInit() 2: ",)
      this.theCity = this.weatherService.city;
      this.getWeather()
    }

    this.weatherService.successMsg$.subscribe(
      (message) => {
        console.log("HomeComponent == ngOnInit() 3: ",)
        this.theCity = message
        console.log("CITY Name Received : ", this.theCity)
        this.getWeather()
      }
    );
  }

  // imperial  metric
  getWeather() {
    // metric  imperial
    this.weatherService.getWeather(this.theCity, this.getTempretureUnits()).subscribe({
      next: (res) => {
        this.visibleOfWeatherScreenDetails = true
        let root = this.weatherService.hashMapWeather.get(res.name);
        console.log("getWeather() -- ", root)
        if (root == undefined) {
          this.favouriteStatus = false;
          this.imagePath = '../assets/icons/icon_heart_white.png';
          this.textFavouriteStatus = this.TEXT_FAVOURITE_ADD_TO_FAVOURITE;
        } else {
          // this.favouriteStatus = root.fevourite;
          if (root.fevourite) {
            this.imagePath = '../assets/icons/icon_heart_yellow.png';
            this.textFavouriteStatus = this.TEXT_FAVOURITE_ADDED_TO_FAVOURITE;
            this.favouriteStatus = root.fevourite;
          } else {
            this.imagePath = '../assets/icons/icon_heart_white.png';
            this.textFavouriteStatus = this.TEXT_FAVOURITE_ADD_TO_FAVOURITE;
            this.favouriteStatus = root.fevourite;
          }
          res.fevourite = root.fevourite
        }

        console.log("Result : ", res)
        let coord = new Coord(res.coord.lon, res.coord.lat);
        let clouds = new Clouds(res.clouds.all);
        let sys = new Sys(res.sys.type, res.sys.id, res.sys.country, res.sys.sunrise, res.sys.sunset);
        let wind = new Wind(res.wind.speed, res.wind.deg);
        let main = new Main(res.main.temp, res.main.feels_like, res.main.temp_min, res.main.temp_max, res.main.pressure, res.main.humidity);
        let weatherArray = [new Weather(res.weather[0].id, res.weather[0].main, res.weather[0].description, res.weather[0].icon)];

        this.weatherRoot = new Root(coord, weatherArray, res.base, main, res.visibility, wind, clouds, res.dt, sys,
          res.timezone, res.id, res.name, res.cod, res.fevourite)

        console.log("Result weatherRoot: ", this.weatherRoot)
        console.log("Result weatherRoot: ", this.weatherRoot.name)

        this.weatherService.hashMapWeather.set(res.name, res)
        console.log("this.weatherService.hashMapWeather ::", this.weatherService.hashMapWeather.size)
      },

      error: (error) => {
        this.visibleOfWeatherScreenDetails = false
        console.error(error.message);
      },

      complete: () => console.info("API Call Completed.")
    })
  }

  onTempretureUnitChanged(event: any, cityName: string) {
    console.log("onTempretureUnitChanged : ", event.target.value)
    this.theCity = cityName
    if (event.target.value === 'C') {
      console.log("onTempretureUnitChanged : C")
      this.tempretureUnitFlagC = true
      this.tempretureUnitFlagF = false
    } else if (event.target.value === 'F') {
      console.log("onTempretureUnitChanged : F")
      this.tempretureUnitFlagC = false
      this.tempretureUnitFlagF = true
    }
    this.getWeather()
  }

  getTempretureUnits() {
    if (this.tempretureUnitFlagC) {
      return "metric"
    } else {
      return "imperial"
    }
  }

  getTempBGColor1() {
    if (this.tempretureUnitFlagC) {
      return "#fff"
    } else {
      return '#FFFFFF00'
    }

  }
  getTempBGColor2() {
    if (this.tempretureUnitFlagF) {
      return "#fff"
    } else {
      return '#FFFFFF00'
    }
  }

  getTempTextColor1() {
    if (this.tempretureUnitFlagC) {
      return "#ff0000"
    } else {
      return '#fff'
    }

  }
  getTempTextColor2() {
    if (this.tempretureUnitFlagF) {
      return "#ff0000"
    } else {
      return '#fff'
    }
  }

  getPathOfWeatherIcon(iconcode: string) {
    return 'https://openweathermap.org/img/wn/' + iconcode + '@4x.png'
  }
}
