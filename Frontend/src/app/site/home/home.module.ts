// Angular imports
import { NgModule } from '@angular/core';

// Components
import { HomeComponent } from './home.component';

// Modules
import { HomeRoutingModule } from './home.routing';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
  ]
})
export class HomeModule { }
