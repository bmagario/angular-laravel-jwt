// Angular imports
import { NgModule } from '@angular/core';
import { SiteRoutingModule } from './site.routing.module';
import { CommonModule } from '@angular/common';

// Components
import { SiteComponent } from './site.component';
import { AppHeaderComponent } from '@app/shared/components/layout/header/header.component';

@NgModule({
  declarations: [
    SiteComponent,
    AppHeaderComponent
  ],
  imports: [
    CommonModule,
    SiteRoutingModule,
  ],
})
export class SiteModule { }
