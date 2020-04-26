// Angular imports
import { Component } from '@angular/core';

// Services
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
  })
  export class HomeComponent {

  constructor(
    private homeService: HomeService,
  ) { }

  testAuth() {
    this.homeService.testAuth()
    .subscribe((data) => {
        alert('You\'re logged in ' + data.data);
    });
  }
}
