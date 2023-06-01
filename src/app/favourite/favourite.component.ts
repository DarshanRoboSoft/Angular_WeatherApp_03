import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../service/dialogbox/confirmation-dialog.service';
import { WeatherService } from '../service/weather.service';
import { Root } from '../network/weatherbycityname/Root';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  imagePath: string = '../assets/icons/icon_heart_white.png';
  rows: Root[];
  visiblilityRecentSearchTopbar: boolean = false
  
  constructor(private route: ActivatedRoute, private weatherService: WeatherService,
              private confirmationDialogService: ConfirmationDialogService) {

  }
  
  ngOnInit(): void { 
    let arrayWeather = Array.from(this.weatherService.hashMapWeather.values());
    this.rows = arrayWeather.filter(entry => entry.fevourite == true)
    
    this.route.params.subscribe((data) => {
      console.log('Result FavouriteComponent  ==== ', data)
    })
    this.visibilityRecentSearchToolbar()
  }

  onSaveFavouriteStatus(event: any) {
    if (event.target.checked == true) {
      console.log('checkbox is checked');
      this.imagePath = '../assets/icons/icon_heart_yellow.png'

    }
    else {
      console.log('checkbox is unchecked');
      this.imagePath = '../assets/icons/icon_heart_white.png'
    }
  }

  deleteRow(index: any, cityName: string) {
    this.rows.splice(index, 1);
    this.weatherService.hashMapWeather.delete(cityName)
    this.visibilityRecentSearchToolbar()
  }

  removeAll() {
    this.rows.forEach(x => this.weatherService.hashMapWeather.delete(x.name))
    this.rows.splice(0, this.rows.length)
    this.visibilityRecentSearchToolbar()
  }

  submit() {
    console.log(this.rows)
  }

  public openConfirmationDialog() {
    this.confirmationDialogService
      .confirm('Please confirm..', 'Are you sure want to remove all the favourites?')
      .then((confirmed) => {
        if (confirmed) {
           this.removeAll()
        }
        console.log('User confirmed:', confirmed)
      })
      .catch(() => {
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)');
      })
  }

  getFavouriteImagePath(position: number) {
    if (this.rows[position].fevourite) {
      return '../assets/icons/icon_heart_yellow.png'
    } else {
      return '../assets/icons/icon_heart_white.png'
    }
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



