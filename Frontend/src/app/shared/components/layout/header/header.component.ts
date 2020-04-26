// Angular imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AuthenticationService } from '@core/services/auth/authentication.service';
import { StorageService } from '@core/services/storage/storage.service';

// Interfaces
import { CurrentUser } from '@interfaces/logged-user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent implements OnInit {
  currentUser: CurrentUser;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(this.storageService.getItem('currentUser'));
  }

  logout() {
    this.authenticationService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
