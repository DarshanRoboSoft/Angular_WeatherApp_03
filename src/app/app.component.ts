import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, map, share, timer } from 'rxjs';
import { WeatherService } from './service/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Angular_WeatherApp_03';
  rxTime = new Date();
  subscription: Subscription;
  city: string;
  @ViewChild('city_name') submittedCityName: ElementRef

  constructor(private router: Router, private weatherService: WeatherService) {

  }

  ngOnInit(): void {
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.rxTime = time;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSendCityName() {
    this.weatherService.sendSuccessMsg(this.submittedCityName.nativeElement.value);
    this.weatherService.city = this.submittedCityName.nativeElement.value
    console.log("City Name - ", this.submittedCityName.nativeElement.value)
    this.router.navigate(['/'])
    this.submittedCityName.nativeElement.value = ''
  }

  homeScreenLaunch() {
    this.weatherService.homeScreenLaunch()
  }

}

