import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Root } from '../network/weatherbycityname/Root';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  hashMapWeather = new Map<string, Root>()

  _city: string = ''
  private app_id: string = '9e04eabef8e97e9ca279bbac6b5698da'
  clickedHomeTab: boolean = false
  clickedSearchButton: boolean = false

  private _successMsgSource = new Subject<string>();
  successMsg$ = this._successMsgSource.asObservable();

  constructor(private http: HttpClient) { }

  sendSuccessMsg(message: string) {
    this.clickedSearchButton = true
    this.city = message
    this._successMsgSource.next(message);
  }

  homeScreenLaunch() {
    console.log("WeatherService == homeScreenLaunch()")
    this.clickedHomeTab = true
  }

  public get city() {
    return this._city
  }

  public set city(theCity: string) {
    console.log("The City : ", theCity)
    this._city = theCity
  }

  getWeather(city: string, unit: string) {
    console.log("Result city : ", city, " , unit : ", unit)

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.app_id}&units=${unit}`

    console.log("Result url : ", url)
    return this.http.get<Root>(url)
  }

  getData() {
    console.log("Weather Data : ", localStorage.getItem("weather_data"))
    let stringJson = localStorage.getItem("weather_data")
    // ConvertjSON to an object
    let stringObject: Root[] = JSON.parse(JSON.stringify(stringJson));
    console.log("JSON object -", stringObject);
    stringObject.forEach(x => console.log("Value : ", x));

  }

  clearAll() {
    localStorage.clear()
    console.log("clearAll local storage : ", localStorage.length);
  }

  removeItem(rootWeather: Root) {
    rootWeather.name
  }
}
